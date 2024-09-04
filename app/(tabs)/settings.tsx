import { RefreshControl, StyleSheet, ScrollView, View, Text, } from 'react-native';
import { useEffect, useState } from 'react';

import AntDesign from '@expo/vector-icons/AntDesign';
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts'

import { Colors } from "@/constants/Colors"
import Card from "@/components/Card"

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig"; 
import { getUserSession } from "@/utils/functions"
import { Lead } from '@/utils/types';

export default function SettingsScreen() {

  const LineDefaultProps = {
    isAnimationActive: false,
    stroke: "black",
    strokeWidth: 2,
  }

  const getCurrentMonthLeadsCount = async (userId: string) => {
    try {
      
      const now = new Date();
      // const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      const dailyLeadsCount = new Array(daysInMonth).fill(0);

      const leadsQuery = query(
        collection(db, "Leads"),
        where("date", ">=", startOfMonth),
        where("userId", "==", userId)
      );

      const querySnapshot = await getDocs(leadsQuery);

      const leadsCount = querySnapshot.size;
      
      querySnapshot.forEach(doc => {
        const leadDate = doc.data().date.toDate();
        const day = leadDate.getDate(); 
        const val = doc.data().leadsCount ? parseInt(doc.data().leadsCount) : 1
        dailyLeadsCount[day - 1] += isNaN(val) ? 1 : val;
      });

      console.log(`Leads count for the current month: ${leadsCount}`);
      return {leadsCount: leadsCount, dailyLeadsCount: dailyLeadsCount};
    } catch (err) {
      console.error("Error getting leads count: ", err);
      return {leadsCount: 0, dailyLeadsCount: []};
    }
  };

  const getCurrentMonthMembersCount = async (userId: string) => {
    try {
      
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      const dailyMembersCount = new Array(daysInMonth).fill(0);

      const membersQuery = query(
        collection(db, "Members"),
        where("date", ">=", startOfMonth),
        where("userId", "==", userId)
      );

      const querySnapshot = await getDocs(membersQuery);

      const membersCount = querySnapshot.size;
      
      querySnapshot.forEach(doc => {
        const memberDate = doc.data().date.toDate(); // Convert Firestore timestamp to JS Date
        const day = memberDate.getDate(); // Get the day of the month (1-31)
        dailyMembersCount[day - 1] += 1; // Increment the count for that day
      });

      console.log(`Members count for the current month: ${membersCount}`);
      console.log(dailyMembersCount)
      return {membersCount: membersCount, dailyMembersCount: dailyMembersCount};
    } catch (err) {
      console.error("Error getting members count: ", err);
      return {membersCount: 0, dailyMembersCount: []};
    }
  };

  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [leadsCount, setLeadsCount] = useState(0);
  const [membersCount, setMembersCount] = useState(0);
  const [membersData, setMembersData] = useState([]);
  const [dxnId, setDxnId] = useState("");
  
  const refreshData = async (id: string) => {
    const {leadsCount, dailyLeadsCount } = await getCurrentMonthLeadsCount(id);
    const {membersCount, dailyMembersCount} = await getCurrentMonthMembersCount(id);
    setLeadsCount(leadsCount);
    setData(dailyLeadsCount);
    setMembersData(dailyMembersCount);
    setMembersCount(membersCount);
    console.log("Refresh Data")
  }
  
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Perform your refresh logic here, e.g., fetch new data
      console.log("Refreshing data...");
      await refreshData(dxnId);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };
  
  useEffect(() => {
    
    async function init() {
      const id = await getUserSession();
      if (id) {
        setDxnId(id)
        const {leadsCount, dailyLeadsCount} = await getCurrentMonthLeadsCount(id);
        const {membersCount, dailyMembersCount} = await getCurrentMonthMembersCount(id);
        setLeadsCount(leadsCount);
        setData(dailyLeadsCount);
        setMembersData(dailyMembersCount);
        setMembersCount(membersCount);
        console.log(data)
      }else {
        console.error("there is no dxn id");
      }
    }

    init();

  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={{ ...styles.container }}>
        <Text style={styles.title}>أعداد المستقطبين هذا الشهر</Text>
      </View>
      <View style={{ height: 250, flexDirection: 'row', paddingHorizontal: 10 }}>
        <View style={{ flexDirection: "column-reverse", justifyContent: "space-evenly", gap: 20, paddingTop: 10, paddingBottom: 50 }}>
          {[...Array(10)].map((e, i) => {
            const number = Math.ceil((Math.max(...data, ...membersData) * (0.1 * (i + 1))) * 10) / 10;
            return (
              <Text style={{ color: "gray", fontSize: 10, }} key={i}>{number}</Text>
            )}
          )}
        </View>
        <ScrollView horizontal={true} >
          <View style={{ height: 250, width: 600, paddingHorizontal: 12 }}>
            <LineChart
              style={{ flex: 1 }}
              data={[
                { data: data },
                { data: membersData, svg: { stroke: 'green' }},
              ]}
              gridMin={0}
              contentInset={{ top: 10, bottom: 10 }}
              svg={{ stroke: Colors.light.tint }}
              {...LineDefaultProps}
            >
              <Grid {...LineDefaultProps} />
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
      </View>
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
                {leadsCount}
              </Text>
            </View>
          </Card>
          <Card>
            <Text style={styles.cardLabel}>عدد المسجلين</Text>
            <View style={{ flexDirection: 'row', alignItems: "center", gap: 8, paddingHorizontal: 8 }}>
              <AntDesign name="caretup" size={18} color={"green"} />
              <Text style={{ fontSize: 18, color: "green", }}>
                +{membersCount}
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