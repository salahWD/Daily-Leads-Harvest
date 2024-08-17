import { StyleSheet, FlatList, Button, TextInput, Keyboard, Modal, ScrollView, View, Text, Pressable, } from 'react-native';
import { useEffect, useState } from 'react';
import {  } from 'react-native'

import LeadCard from '@/components/LeadCard';
import FloatBtn from '@/components/FloatBtn';
import LeadForm from '@/components/LeadForm';
import { Lead } from '@/utils/types';

export default function HomeScreen() {

  const [visible, setVisible] = useState(false);
  const [leads, setLeads] = useState<Array<Lead>>([
    {
      id: 1,
      leadsCount: 1,
      name: "أحمد",
      relationShip: "friend",
      contactMedia: "1 to 1 meeting",
      date: new Date(),
    },
    {
      id: 2,
      leadsCount: 3,
      name: "خالد",
      relationShip: "family member",
      contactMedia: "1 to 1 meeting",
      date: new Date(),
    },
    {
      id: 3,
      leadsCount: 1,
      name: "جمال",
      relationShip: "neighbour",
      contactMedia: "phone call",
      date: new Date(),
    },
  ]);

  const handleSaveInfo = (e: Lead) => {
    setLeads([...leads, e])
    setVisible(false);
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