import { KeyboardAvoidingView, StyleSheet, FlatList, Button, TextInput, Keyboard, Modal, ScrollView, View, Text, Pressable, } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';

import { db } from '@/firebaseConfig';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";

import AntDesign from '@expo/vector-icons/AntDesign';
import FloatBtn from "@/components/FloatBtn";
import LeadCard from '@/components/LeadCard';
import LeadForm from '@/components/LeadForm';
import GroupLeadForm from '@/components/GroupLeadForm';
import MemberForm from '@/components/MemberForm';
import { Lead } from '@/utils/types';
import CustomBtn from '@/components/CustomBtn';

export default function HomeScreen() {

  const [editLead, setEditLead] = useState<Lead | undefined>(undefined);
  const [visible, setVisible] = useState(0);
  const [leads, setLeads] = useState<Array<Lead>>([]);


  useEffect(() => {

    console.log("arraived to home page")
    
    const getTodayLeads = async () => {
      
      try {
        
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const querySnapshot = await getDocs(
          query(
            collection(db, "Leads"),
            where("date", ">=", startOfToday)
          )
        );

        const leadsList: Array<Lead> = [];
  
        if (querySnapshot.docs && querySnapshot.docs.length > 0) {
          querySnapshot.docs.forEach((doc: any) => {
            const dbLeadInfo = doc.data();
            leadsList.push({
              id: doc.id,
              ...dbLeadInfo,
              date: new Date(dbLeadInfo.date.seconds * 1000 + dbLeadInfo.date.nanoseconds / 1000000),
            });
          });
        }

        setLeads(leadsList);
      } catch (e) {
        console.error("Error fetching documents: ", e);
      }
    }

    getTodayLeads();
    
  }, []);

  const saveLead = async (lead: Lead, leadId: string | undefined) => {
    if (leadId) {// edit an existing lead
      try {
        if (lead.name) {
          const leadRef = doc(db, "Leads", leadId); // Replace leadId with the actual ID of the lead you want to edit
          await updateDoc(leadRef, {
            ...lead,
            contactMedia: lead.contactMedia != undefined && lead.contactMedia >= 0 ? lead.contactMedia : 0,
            relationShip: lead.relationShip != undefined && lead.relationShip >= 0 ? lead.relationShip : 0,
            date: new Date(),
          });
          console.log("Document updated with ID: ", leadId);
          
          setLeads(leads.map(l => l.id === leadId ? lead : l));
          setVisible(0);
          setEditLead(undefined)
        } else {
          setVisible(0);
          setEditLead(undefined)
          alert("الاسم مطلوب, يرجى تعبئته بشكل صحيح!")
          console.error("the lead name is required");
        }
      } catch (err) {
        alert("error updating lead: " + err);
        console.error("Error updating document: ", err);
      }
    }else {// add new lead
      try {
        if (lead.name) {
          const docRef = await addDoc(collection(db, "Leads"), {
            ...lead,
            contactMedia: lead.contactMedia != undefined && lead.contactMedia >= 0 ? lead.contactMedia : 0,
            relationShip: lead.relationShip != undefined && lead.relationShip >= 0 ? lead.relationShip : 0,
            date: new Date(),
          });
          console.log("Document written with ID: ", docRef.id);
          setLeads([...leads, lead])
          setVisible(0);
          setEditLead(undefined)
        }else {
          setVisible(0);
          setEditLead(undefined)
          alert("الاسم مطلوب, يرجى تعبئته بشكل صحيح!")
          console.error("the lead name is required")
        }
      } catch (err) {
        alert("error adding lead: " + err)
        console.error("Error adding document: ", err);
      }
    }
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30, paddingTop: 50, }}>
          <Text style={styles.title}>حالات الإستقطاب اليومية:</Text>
          {leads.map((lead, index) => {
            return (
              <LeadCard key={index}
                name={lead.name}
                leadsCount={lead.leadsCount}
                relationShip={lead.relationShip}
                contactMedia={lead.contactMedia}
                handler={(e) => {
                  setVisible(lead.leadsCount && lead.leadsCount > 0 ? 2 : 1)
                  setEditLead(lead)
                }}
                date={lead.date} />
            );
          })}
        </ScrollView>
        <View style={styles.actionBtns}>
          <Pressable onPress={() => {setVisible(1)}}>
            <View style={styles.actionBtn}>
              <AntDesign style={styles.actionBtnIcon} name="adduser" size={24} color="currentColor" />
              <Text style={styles.actionBtnText}>
                إستقطاب فردي
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={() => {setVisible(2)}}>
            <View style={styles.actionBtn}>
              <AntDesign style={styles.actionBtnIcon} name="addusergroup" size={24} color="currentColor" />
              <Text style={styles.actionBtnText}>
                إستقطاب جماعي
              </Text>
            </View>
          </Pressable>
        </View>
      </View>

      <FloatBtn icon="adduser" handler={() => {setVisible(3)}}/>
      <Modal
        transparent={true}
        animationType="fade"
        visible={visible == 1}
        onRequestClose={() => {
          setVisible(0)
          setEditLead(undefined)
        }}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={(e) => {
            setVisible(0);
            setEditLead(undefined)
          }}
        >
          <KeyboardAvoidingView style={styles.fullCenterContent}>
            <LeadForm saveHandler={saveLead} info={editLead} pressHandler={(e) => {
              e.stopPropagation();
            }} />
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
      <Modal
        transparent={true}
        animationType="fade"
        visible={visible == 2}
        onRequestClose={() => {
          setVisible(0)
          setEditLead(undefined)
        }}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={(e) => {
            setVisible(0);
            setEditLead(undefined)
          }}
        >
          <KeyboardAvoidingView style={styles.fullCenterContent}>
            <GroupLeadForm saveHandler={saveLead} info={editLead} pressHandler={(e) => {
              e.stopPropagation();
            }}/>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
      <Modal
        transparent={true}
        animationType="fade"
        visible={visible == 3}
        onRequestClose={() => {
          setVisible(0)
          setEditLead(undefined)
        }}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={(e) => {
            setVisible(0);
            setEditLead(undefined)
          }}
        >
          <KeyboardAvoidingView style={styles.fullCenterContent}>
            <MemberForm saveHandler={saveLead} info={editLead} />
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#121212",// dark mood
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
    flex: 1,
  }, 
  title: {
    fontSize: 26,
    marginBottom: 24,
    // color: "#aaa", // dark mood
    color: "#333",
  },
  dropdown: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  fullCenterContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
  },
  actionBtns: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-evenly",
    backgroundColor: "white",
    gap: 30,
    elevation: 7,
  },
  actionBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
  actionBtnIcon: {
    // color: "#1db345",
    color: "#19b1c2",
  },
  actionBtnText: {
    // color: "black",
    color: "#19b1c2",
    fontSize: 12,
    marginTop: 0
  },

});