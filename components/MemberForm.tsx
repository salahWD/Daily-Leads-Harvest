import { View, Text, StyleSheet, Button, TextInput, Pressable, GestureResponderEvent } from 'react-native'
import React, { useState } from 'react'

import CustomDropdown from '@/components/CustomDropdown';
import { Lead } from '@/utils/types';
import { groupContactMediaTypes } from '@/utils/valueLists';

type MemberFormProps = {
  saveHandler(info: Lead, isEdit: undefined | string): void,
  info?: Lead,
};

export default function MemberForm({ saveHandler, info }: MemberFormProps) {

  const [formInfo, setFormInfo] = useState<Lead>({
    name: info ? info.name: "",
    dxnId: info?.dxnId ?? "",
  });

  return (
    <View style={styles.modalContent}>
      <Pressable onPress={e => {
        e.stopPropagation();
      }}>
        <Text style={{ textAlign: "center", fontSize: 32, color: "#7d7d7d" }}>تسجيل عضوية</Text>
        <View style={styles.form}>
          <View style={styles.formRow}>
            <Text style={styles.label}>إسم العضو</Text>
            <TextInput
              style={styles.input}
              onChangeText={(e) => {
                setFormInfo({...formInfo, name: e})
              }}
              value={formInfo.name}
              placeholder="اسم العضو"
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>رقم العضوية</Text>
            <TextInput
              style={styles.input}
              onChangeText={(e) => {
                setFormInfo({...formInfo, dxnId: e})
              }}
              value={formInfo.dxnId}
              placeholder="رقم العضوية"
            />
          </View>
          <View style={{ marginBottom: 8, }}>
            <Button title="تسجيل العضو" onPress={() => saveHandler(formInfo, info?.id)} />
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