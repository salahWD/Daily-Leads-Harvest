import { View, Text, StyleSheet, Button, TextInput, Pressable, GestureResponderEvent } from 'react-native'
import React, { useState } from 'react'

import CustomDropdown from '@/components/CustomDropdown';
import { Lead } from '@/utils/types';
import { groupContactMediaTypes } from '@/utils/valueLists';

type GroupLeadFormProps = {
  saveHandler(info: Lead, isEdit: undefined | string): void,
  info?: Lead,
  pressHandler?(e: GestureResponderEvent): void,
};

export default function GroupLeadForm({ saveHandler, info, pressHandler }: GroupLeadFormProps) {

  const [formInfo, setFormInfo] = useState<Lead>({
    name: "استقطاب جماعي",
    leadsCount: info?.leadsCount ?? 0,
    contactMedia: info?.contactMedia ?? 0,
  });

  return (
    <View style={styles.modalContent}>
      <Pressable onPress={pressHandler}>
        <Text style={{ textAlign: "center", fontSize: 32, color: "#7d7d7d" }}>حالة الإستقطاب</Text>
        <View style={styles.form}>
          <View style={styles.formRow}>
            <Text style={styles.label}>عدد المستقطبين</Text>
            <TextInput
              style={styles.input}
              keyboardType='numeric'
              onChangeText={(e) => {
                setFormInfo({...formInfo, leadsCount: isNaN(parseInt(e)) ? 0 : parseInt(e)})
              }}
              value={(formInfo?.leadsCount && formInfo.leadsCount > 0) ? (isNaN(formInfo.leadsCount) ? "": formInfo.leadsCount.toString()): ""}
              placeholder="عدد المستقطبين"
            />
          </View>
          <View>
            <Text style={styles.label}>وسيلة التواصل</Text>
            <CustomDropdown
              data={groupContactMediaTypes}
              onSelect={(e) => {
                // setFormInfo({...formInfo, contactMedia: e.map(item => item.value)})
                setFormInfo({...formInfo, contactMedia: e.value})
              }}
              defaultState={{
                title: formInfo.contactMedia != undefined && formInfo.contactMedia >= 0 ? groupContactMediaTypes[formInfo.contactMedia].title: "وسيلة الإستقطاب",
                value: formInfo.contactMedia
              }}
              // multiSelect={true}
            />
          </View>
          <View style={{ marginBottom: 8, }}>
            <Button title="حفظ الحالة" onPress={() => saveHandler(formInfo, info?.id)} />
          </View>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    maxWidth: '80%',
    width: "100%",
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