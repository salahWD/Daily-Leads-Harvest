import { StyleSheet, FlatList, Button, TextInput, Keyboard, Modal, ScrollView, View, Text, Pressable, } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';

import { db } from '@/firebaseConfig'; // Adjust the path as necessary
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";

import AntDesign from '@expo/vector-icons/AntDesign';
import LeadCard from '@/components/LeadCard';
import LeadForm from '@/components/LeadForm';
import { Lead } from '@/utils/types';
import CustomBtn from '@/components/CustomBtn';

export default function HomeScreen() {

  const [editStatus, setEditStatus] = useState<Lead | undefined>(undefined);
  const [visible, setVisible] = useState(false);
  const [leads, setLeads] = useState<Array<Lead>>([]);

  useEffect(() => {

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

  const handleSaveInfo = async (lead: Lead, leadId: string | undefined) => {
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
          setVisible(false);
          setEditStatus(undefined)
        } else {
          setVisible(false);
          setEditStatus(undefined)
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
          setVisible(false);
          setEditStatus(undefined)
        }else {
          setVisible(false);
          setEditStatus(undefined)
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
                setVisible(true)
                setEditStatus(lead)
              }}
              date={lead.date} />
            );
          })}
          <CustomBtn
            withBg={true}
            customStyle={{
              borderStyle: "dashed",
              borderWidth: 1,
              borderColor: "gray",
            }}
            handler={() => {
              // setVisible(!visible)
              router.replace('/login');
            }}>
              <AntDesign style={{ color: "gray", }} name={"adduser"} size={35} color="currentColor" />
              <Text style={{ color: "gray", fontSize: 18, marginTop: 10 }}>
                إضافة حالة إستقطاب
              </Text>
          </CustomBtn>
        </ScrollView>
      </View>

      {/* <FloatBtn icon="adduser" handler={() => {setVisible(!visible)}}/> */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
        onRequestClose={() => {
          setVisible(false)
          setEditStatus(undefined)
        }}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={(e) => {
            setVisible(false);
            setEditStatus(undefined)
          }}
        >
          <Pressable onPress={e => {
            Keyboard.dismiss();
            e.stopPropagation();
          }}>
            <LeadForm saveHandler={handleSaveInfo} info={editStatus} />
          </Pressable>
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
  
});