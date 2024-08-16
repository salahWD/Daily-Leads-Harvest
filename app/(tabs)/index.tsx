import { StyleSheet, FlatList, ScrollView, View, Text, } from 'react-native';
import LeadCard from '@/components/LeadCard';
import FloatBtn from '@/components/FloatBtn';
import { useEffect, useState } from 'react';

export default function HomeScreen() {

  const [leads, setLeads] = useState([
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
      <FloatBtn icon="adduser" />
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
});