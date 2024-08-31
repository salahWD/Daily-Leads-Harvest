import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, } from 'react-native';
import CustomDropdown, { Option } from '@/components/CustomDropdown';
import { useRouter } from 'expo-router';

export default function NewLeadScreen() {

  const router = useRouter();

  const [formInfo, setFormInfo] = useState({
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

  const handleSaveInfo = () => {
    console.log(formInfo);
    console.log(router)
    router.back()
  }

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
          <CustomDropdown data={relationShips} onSelect={(e) => {setFormInfo({...formInfo, relationShip: e.value})}} defaultState={{title: "إختر علاقة", value: formInfo.relationShip}} />
        </View>
        <View style={{ ...styles.formRow, }}>
          <Text style={styles.label}>وسيلة التواصل مع المستقطَب</Text>
          <CustomDropdown data={contactMedias} onSelect={(e) => {setFormInfo({...formInfo, contactMedia: e.value})}} defaultState={{title: "وسيلة الإستقطاب", value: formInfo.contactMedia}} />
        </View>
        <View style={{ ...styles.formRow, }}>
          <Button title="حفظ الحالة" onPress={handleSaveInfo} />
        </View>
      </View>
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
    paddingVertical: 6,
    fontSize: 16,
  },
  
  dropdownBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  selectedValue: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
  },
});
