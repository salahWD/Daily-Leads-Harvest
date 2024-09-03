import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import React, { useState } from 'react'

import CustomDropdown from '@/components/CustomDropdown';
import { Lead } from '@/utils/types';
import { contactMediaTypes, relationShipTypes } from '@/utils/valueLists';

type LeadFormProps = {
  // formInfo: Lead,
  saveHandler(info: Lead, isEdit: undefined | string): void,
  info?: Lead,
};
// الاسم

export default function LeadForm({ saveHandler, info }: LeadFormProps) {

  const [formInfo, setFormInfo] = useState<Lead>({
    name: info?.name ?? "",
    relationShip: info?.relationShip ?? 0,
    contactMedia: info?.contactMedia ?? 0,
  });

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
        <View>
          <Text style={styles.label}>وسيلة التواصل مع المستقطَب</Text>
          <CustomDropdown
            data={relationShipTypes}
            onSelect={(e) => {
              setFormInfo({...formInfo, relationShip: e.value})
            }}
            defaultState={{
              title: formInfo.relationShip != undefined && formInfo.relationShip >= 0 ? relationShipTypes[formInfo.relationShip].title: "وسيلة الإستقطاب",
              value: formInfo.relationShip
            }}
          />
        </View>
        <View>
          <Text style={styles.label}>العلاقة مع المستقطَب</Text>
          <CustomDropdown
            data={contactMediaTypes}
            onSelect={(e) => {
              setFormInfo({...formInfo, contactMedia: e.value})
            }}
            defaultState={{
              title: formInfo.contactMedia != undefined && formInfo.contactMedia >= 0 ? contactMediaTypes[formInfo.contactMedia].title: "إختر علاقة",
              value: formInfo.contactMedia}
            } />
        </View>
        <View style={{ marginBottom: 8, }}>
          <Button title="حفظ الحالة" onPress={() => saveHandler(formInfo, info?.id)} />
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
    gap: 8,
    marginTop: 24,
    paddingHorizontal: 15,
  }, 
  formRow: {
    marginBottom: 12,
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