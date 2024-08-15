import { StyleSheet, FlatList, ScrollView, View, Text, } from 'react-native';
import LeadCard, { LeadCardProps } from '@/components/LeadCard';
import { useState } from 'react';


export default function HomeScreen() {

  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "ahmed",
      relationShip: "friend",
      contactMedia: "1 to 1 meeting",
      date: new Date(),
    },
    {
      id: 2,
      name: "khaled",
      relationShip: "family member",
      contactMedia: "1 to 1 meeting",
      date: new Date(),
    },
    {
      id: 3,
      name: "jamal",
      relationShip: "neighbour",
      contactMedia: "phone call",
      date: new Date(),
    },
  ]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Today Leads:</Text>
      {leads.map((lead, index) => {
      return (
        <LeadCard key={index}
          name={lead.name}
          relationShip={lead.relationShip}
          contactMedia={lead.contactMedia}
          date={lead.date} />
      )})}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    // backgroundColor: "#121212",// dark mood
    backgroundColor: "#f5f5f5",
    flex: 1,
    paddingHorizontal: 20,
  }, 
  title: {
    fontSize: 26,
    marginBottom: 12,
    // color: "#aaa", // dark mood
    color: "#333",
  },
});