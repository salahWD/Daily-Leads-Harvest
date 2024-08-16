import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, } from 'react-native';

export default function NewLeadScreen() {

  const [formInfo, setFormInfo] = useState({
    name: "",
    relationShip: 1,
    contactMedia: 1,
  });

  return (
    <View style={ styles.container }>
      <Text style={{ textAlign: "center", fontSize: 32, color: "#7d7d7d" }}>حالة الإستقطاب</Text>
      <View style={styles.form}>
        <View style={styles.formRow}>
          <Text style={styles.label}>إسم المستقطَب</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => {setFormInfo({...formInfo, name: e})}}
            value={formInfo.name}
            placeholder="الاسم الكامل"
          />
        </View>
        <View style={styles.formRow}>
          <Text style={styles.label}>العلاقة مع المستقطَب</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => {setFormInfo({...formInfo, relationShip: parseInt(e)})}}
            value={formInfo.relationShip.toString()}
            keyboardType='numeric'
            placeholder="نوع العلاقة"
          />
        </View>
        <View style={styles.formRow}>
          <Text style={styles.label}>وسيلة التواصل مع المستقطَب</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => {setFormInfo({...formInfo, contactMedia: parseInt(e)})}}
            value={formInfo.contactMedia.toString()}
            keyboardType='numeric'
            placeholder="وسيلة التواصل"
          />
        </View>
      </View>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    // backgroundColor: "#121212",// dark mood
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  }, 
  form: {
    gap: 24,
    marginTop: 24,
    paddingHorizontal: 15,
  }, 
  formRow: {
    gap: 4,
    borderBottomColor: "#999",
    borderBottomWidth: 1,
  }, 
  label: {
    fontSize: 18,
    color: "#666",
  },
  input: {
  },
});
