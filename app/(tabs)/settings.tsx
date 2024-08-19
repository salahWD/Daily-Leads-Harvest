import { StyleSheet, FlatList, Button, TextInput, Keyboard, Modal, ScrollView, View, Text, Pressable, } from 'react-native';
import { useEffect, useState } from 'react';

import { Colors } from "@/constants/Colors"
import { LineChart, XAxis, Grid } from 'react-native-svg-charts'

export default function SettingsScreen() {

  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

  const LineDefaultProps = {
    isAnimationActive: false,
    stroke: "black",
    strokeWidth: 2,
  }

  return (
    <ScrollView>
      <View style={{ ...styles.container, paddingTop: 50 }}>
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
            />
        </View>
      </ScrollView>
      <View style={styles.container}>
      </View>
    </ScrollView>
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