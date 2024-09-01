import { StyleSheet, ScrollView, View, Text, Pressable, } from 'react-native';
import { useEffect, useState } from 'react';

import { Colors } from "@/constants/Colors"
import { LineChart, XAxis, Grid } from 'react-native-svg-charts'
import AntDesign from '@expo/vector-icons/AntDesign';

import Card from "@/components/Card"

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig"; // Adjust the import based on your project structure


/* const getCurrentMonthLeadsCount = async (userId) => {
  try {
    // Get the start of the current month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Query the leads for the current month
    const leadsQuery = query(
      collection(db, "Leads"),
      where("date", ">=", startOfMonth),
      where("userId", "==", userId) // Assuming you have user-specific data
    );

    const querySnapshot = await getDocs(leadsQuery);
    const leadsCount = querySnapshot.size;

    console.log(`Leads count for the current month: ${leadsCount}`);
    return leadsCount;
  } catch (err) {
    console.error("Error getting leads count: ", err);
    return 0;
  }
}; */

// Example usage
// const userId = "exampleUserId"; // Replace with the actual user ID
// getCurrentMonthLeadsCount(userId);


export default function SettingsScreen() {

  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

  const LineDefaultProps = {
    isAnimationActive: false,
    stroke: "black",
    strokeWidth: 2,
  }

  return (
    <ScrollView>
      <View style={{ ...styles.container }}>
        <Text style={styles.title}>أعداد المستقطبين اخر 30 يوماً</Text>
      </View>
      <ScrollView horizontal={true} >
        <View style={{ height: 250, width: 600, paddingHorizontal: 18, }}>
          <LineChart
              style={{ flex: 1 }}
              data={data}
              gridMin={0}
              contentInset={{ top: 10, bottom: 10 }}
              svg={{ stroke: Colors.light.tint }}
              {...LineDefaultProps}
            >
              <Grid />
            </LineChart>
            <XAxis
              style={{ marginHorizontal: -10 }}
              data={data}
              formatLabel={(value: any, index: number) => index}
              contentInset={{ left: 10, right: 10 }}
              svg={{ fontSize: 10, fill: 'black' }}
              {...LineDefaultProps}
            />
        </View>
      </ScrollView>
      <View style={{ ...styles.container, ...styles.analiticsSection, }}>
        <Text style={styles.title}>مراجعات الأداء</Text>
        <View style={{ flexDirection: "row", gap: 5, }} >
          {/* <Card>
            <Text>عدد المستقطبين</Text>
            <View style={{ flexDirection: 'row', alignItems: "center", gap: 8, paddingHorizontal: 8 }}>
              <AntDesign name="caretup" size={18} color={"green"} />
              <Text style={{ fontSize: 18, color: "green", }}>
                +5%
              </Text>
            </View>
          </Card> */}
          <Card>
            <Text style={styles.cardLabel}>عدد المستقطبين</Text>
            <View style={{ flexDirection: 'row', alignItems: "center", gap: 8, paddingHorizontal: 8 }}>
              <AntDesign name="addusergroup" size={24} color="black" />
              <Text style={{ fontSize: 18, }}>
                +{}
              </Text>
            </View>
          </Card>
          <Card>
            <Text style={styles.cardLabel}>عدد الأعضاء</Text>
            <View style={{ flexDirection: 'row', alignItems: "center", gap: 8, paddingHorizontal: 8 }}>
              <AntDesign name="caretup" size={18} color={"green"} />
              <Text style={{ fontSize: 18, color: "green", }}>
                +5%
              </Text>
            </View>
          </Card>
        </View>
      </View>
    </ScrollView>
  );

}


const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#121212",// dark mood
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  analiticsSection: {
    paddingTop: 25,
    paddingBottom: 15,
    borderTopColor: "#999",
    borderTopWidth: 1,
    flex: 1,
    elevation: 5,
    marginTop: 30,
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
  cardLabel: {
    marginBottom: 8,
  }
});