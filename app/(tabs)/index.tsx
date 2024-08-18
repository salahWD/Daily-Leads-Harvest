import { StyleSheet, FlatList, Button, TextInput, Keyboard, Modal, ScrollView, View, Text, Pressable, } from 'react-native';
import { useEffect, useState } from 'react';

import { db } from '@/firebaseConfig'; // Adjust the path as necessary
import { collection, getDocs, addDoc } from 'firebase/firestore';


import LeadCard from '@/components/LeadCard';
import FloatBtn from '@/components/FloatBtn';
import LeadForm from '@/components/LeadForm';
import { Lead } from '@/utils/types';

export default function HomeScreen() {

  const [visible, setVisible] = useState(false);
  const [leads, setLeads] = useState<Array<Lead>>([]);

  useEffect(() => {

    const getTodayLeads = async () => {
      try {
  
        const querySnapshot = await getDocs(collection(db, "Leads"));
        const leadsList: Array<Lead> = [];
  
        querySnapshot.forEach((doc: any) => {
          // console.log("item =>", doc.data())
          const dbLeadInfo = doc.data();
          leadsList.push({
            id: doc.id,
            ...dbLeadInfo,
            date: new Date(dbLeadInfo.date.seconds * 1000 + dbLeadInfo.date.nanoseconds / 1000000),
          });
        });
        setLeads(leadsList);
      } catch (e) {
        console.error("Error fetching documents: ", e);
      }
    }

    getTodayLeads();
    
  }, []);

  const handleSaveInfo = async (lead: Lead) => {
    try {
      // Reference to your collection
      const docRef = await addDoc(collection(db, "Leads"), {
        ...lead,
        date: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      setLeads([...leads, lead])
      setVisible(false);
    } catch (err) {
      alert("error adding lead: " + err)
      console.error("Error adding document: ", err);
    }
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Today Leads:</Text>
        {leads.map((lead, index) => {
          return (
            <LeadCard key={index}
            name={lead.name}
            leadsCount={lead.leadsCount}
            relationShip={lead.relationShip}
            contactMedia={lead.contactMedia}
            date={lead.date} />
          );
        })}
      </ScrollView>
      <FloatBtn icon="adduser" handler={() => {setVisible(!visible)}}/>
      
      <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={(e) => {
            setVisible(false);
          }}
        >
          <Pressable onPress={e => {
            Keyboard.dismiss();
            e.stopPropagation();
          }}>
            <LeadForm saveHandler={handleSaveInfo} />
          </Pressable>
        </Pressable>
      </Modal>
      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    // backgroundColor: "#121212",// dark mood
    backgroundColor: "#f5f5f5",
    flex: 1,
    paddingHorizontal: 20,
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