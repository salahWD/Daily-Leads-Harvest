import { KeyboardAvoidingView, ScrollView, StyleSheet, View, Text, TextInput, Button, Pressable, } from 'react-native';

import { db, FIREBASE_AUTH } from '@/firebaseConfig'; // Adjust the path as necessary
import { doc, setDoc, getDoc, query, collection, where } from "firebase/firestore";
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { router } from 'expo-router';
import CryptoJS from 'crypto-js';
import CustomDropdown from '@/components/CustomDropdown';


function verifyPassword(inputPassword: string, storedHashedPassword: string) {
  const hashedInputPassword = CryptoJS.SHA256(inputPassword).toString();
  return hashedInputPassword === storedHashedPassword;
}

export default function LoginScreen() {

  const [isRegister, setIsRegister] = useState(false);
  const [countryCode, setCountryCode] = useState("+961");
  const [phone, setPhone] = useState("");
  const [uplineName, setUplineName] = useState("");
  const [name, setName] = useState("");
  const [dxnId, setDxnId] = useState("");
  const [password, setPassword] = useState("");
  const auth = FIREBASE_AUTH;

  async function registerUser() {
    const hashedPassword = CryptoJS.SHA256(password).toString();
    const userDocRef = doc(db, 'Users', dxnId);

    const isRegisteredUser = await getDoc(doc(db, "Users", dxnId));

    console.log("is this user registered before ? ==>", isRegisteredUser.exists())

    if (isRegisteredUser.exists()) {
      alert("رقم العضوية هذا مسجل بالفعل, جرّب تسجيل الدخول او تواصل مع قائد الفريق (الأبلاين) لتعدي هذه العقبة")
    }else {
      
      await setDoc(userDocRef, {
        userId: dxnId,
        name: name,
        phone: phone,
        uplineName: uplineName,
        countryCode: countryCode,
        password: hashedPassword,
        createdAt: new Date(),
      });
  
      saveUserSession(dxnId);
      console.log('User registered successfully');
      router.replace('/(tabs)');
    }
  }

  async function loginUser() {
    const userDocRef = doc(db, 'Users', dxnId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const isPasswordCorrect = verifyPassword(password, userData.password);

      if (isPasswordCorrect) {
        console.log('Login successful');
        saveUserSession(dxnId);
        router.replace('/(tabs)');
        // Save user session data here
      } else {
        console.error('Invalid password');
      }
    } else {
      console.error('No user found with this email');
    }
  }

  async function saveUserSession(id: string) {
    await AsyncStorage.setItem('dxn_id', id);
  }

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "center", paddingVertical: 35, minHeight: "100%" }}>
      <KeyboardAvoidingView style={{ alignItems: "center", justifyContent: "center", width: "100%", flex: 1 }}>
        <Text style={{ fontSize: 35 }}>{isRegister ?  'إنشاء حساب': 'تسجيل الدخول' }</Text>
        <View style={styles.form}>
          <View style={styles.formRow}>
            <Text style={styles.label}>رقم العضوية</Text>
            <TextInput
              keyboardType='numeric'
              style={styles.input}
              onChangeText={setDxnId}
              value={dxnId}
              placeholder="رقم عضوية دي اكس ان"
            />
          </View>
          {!isRegister || (
            <>
              <View style={styles.formRow}>
                <Text style={styles.label}>الإسم</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setName}
                  value={name}
                  placeholder="الاسم الكامل"
                />
              </View>
              <View style={styles.formRow}>
                <Text style={styles.label}>رقم الواتساب</Text>
                <View
                  style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
                  <CustomDropdown
                    defaultState={{title: "لبنان", value: "+90"}}
                    onSelect={e => setCountryCode(e.value)}
                    data={[{title: "لبنان", value: "+90"}]} />
                  <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={setPhone}
                    value={phone}
                    placeholder="رقم التواصل"
                  />
                </View>
              </View>
              <View style={styles.formRow}>
                <Text style={styles.label}>اسم الراعي</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setUplineName}
                  value={uplineName}
                  placeholder="اسم الراعي المباشر"
                />
              </View>
            </>
          )}
          <View style={styles.formRow}>
            <Text style={styles.label}>كلمة المرور</Text>
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="كلمة المرور"
            />
          </View>
          <View style={{ marginBottom: 8, }}>
            <Button title={isRegister ?  'إنشاء حساب': 'تسجيل الدخول' } onPress={() => {
              if (isRegister) {
                registerUser()
              }else {
                loginUser()
              }
            }} />
          </View>
          <View style={{ marginBottom: 8, }}>
            <Pressable onPress={() => {
              setIsRegister(!isRegister)
            }}>
              <Text style={{ textAlign: "center",  }}>
                {!isRegister ?  'إنشاء حساب': 'تسجيل الدخول' }
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
    gap: 8,
    marginTop: 24,
    paddingHorizontal: 45,
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