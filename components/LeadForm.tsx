import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import React, { useState } from 'react'

import CustomDropdown, { Option } from '@/components/CustomDropdown';
import { Lead } from '@/utils/types';


type LeadFormProps = {
  // formInfo: Lead,
  saveHandler(e: any): void,
};

export default function LeadForm({ saveHandler }: LeadFormProps) {

  const [formInfo, setFormInfo] = useState<Lead>({
    name: "",
    relationShip: 0,
    contactMedia: 0,
  });

  const relationShips: Array<Option> = [
    { title: 'قريب', value: 1 },
    { title: 'صديق', value: 2 },
    { title: 'جار', value: 3 },
    { title: 'عن طريق الانترنت', value: 4 },
  ];

  const contactMedias: Array<Option> = [
    { title: 'لقاء شخصي', value: 1 },
    { title: 'إتصال فردي', value: 2 },
    { title: 'محاضرة جماعية', value: 3 },
    { title: 'رسائل واتساب', value: 4 },
    { title: 'غير ذلك', value: 5 },
  ];

  return (
    <View style={styles.modalContent}>
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
          <CustomDropdown data={relationShips} onSelect={(e) => {setFormInfo({...formInfo, relationShip: e.value})}} defaultState={{title: "إختر علاقة", value: formInfo.relationShip}} />
        </View>
        <View style={{ ...styles.formRow, }}>
          <Text style={styles.label}>وسيلة التواصل مع المستقطَب</Text>
          <CustomDropdown data={contactMedias} onSelect={(e) => {setFormInfo({...formInfo, contactMedia: e.value})}} defaultState={{title: "وسيلة الإستقطاب", value: formInfo.contactMedia}} />
        </View>
        <View style={{ ...styles.formRow, }}>
          <Button title="حفظ الحالة" onPress={() => saveHandler(formInfo)} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    maxWidth: '95%',
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },


  form: {
    gap: 24,
    marginTop: 24,
    paddingHorizontal: 15,
  }, 
  formRow: {
    borderBottomColor: "#999",
    borderBottomWidth: 1,
  }, 
  label: {
    fontSize: 18,
    color: "#666",
  },
  input: {
    paddingVertical: 6,
    fontSize: 16,
  },
});