import { KeyboardAvoidingView, ScrollView, StyleSheet, View, Text, TextInput, Button, Pressable, } from 'react-native';

import { db, FIREBASE_AUTH } from '@/firebaseConfig'; // Adjust the path as necessary
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState } from 'react';
import { User } from '@/utils/types';

import { router } from 'expo-router';
import bcrypt from 'bcryptjs';

async function registerUser({name, phone, dxnId, uplineName, password}: User) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const userDocRef = doc(db, 'Users', dxnId); // Using email as the document ID

  await setDoc(userDocRef, {
    name: name,
    phone: phone,
    dxnId: dxnId,
    uplineName: uplineName,
    password: hashedPassword,
    createdAt: new Date(),
  });

  console.log('User registered successfully');
}

async function loginUser(dxnId: string, password: string ) {
  const userDocRef = doc(db, 'Users', dxnId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    // const isPasswordCorrect = await bcrypt.compare(password, userData.password);
    const isPasswordCorrect = await bcrypt.compare(await bcrypt.hash(password, 10), userData.password);

    if (isPasswordCorrect) {
      console.log('Login successful');
      // Save user session data here
    } else {
      console.error('Invalid password');
    }
  } else {
    console.error('No user found with this email');
  }
}

export default function LoginScreen() {

  const [isRegister, setIsRegister] = useState(false);
  const [phone, setPhone] = useState("");
  const [uplineName, setUplineName] = useState("");
  const [name, setName] = useState("");
  const [dxnId, setDxnId] = useState("");
  const [password, setPassword] = useState("");
  const auth = FIREBASE_AUTH;

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "center", paddingVertical: 35, minHeight: "100%" }}>
      <KeyboardAvoidingView style={{ alignItems: "center", justifyContent: "center", width: "100%", flex: 1 }}>
        <Text style={{ fontSize: 35 }}>{isRegister ?  'إنشاء حساب': 'تسجيل الدخول' }</Text>
        <View style={styles.form}>
          {!isRegister || (
            <>
              <View style={styles.formRow}>
                <Text style={styles.label}>الإسم</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={text => setName(text)}
                  value={name}
                  placeholder="الاسم الكامل"
                />
              </View>
              <View style={styles.formRow}>
                <Text style={styles.label}>رقم الهاتف</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={e => setPhone(e)}
                  value={phone}
                  placeholder="رقم التواصل"
                />
              </View>
              <View style={styles.formRow}>
                <Text style={styles.label}>اسم الراعي</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={upline => setUplineName(upline)}
                  value={uplineName}
                  placeholder="الاسم الراعي المباشر"
                />
              </View>
            </>
          )}
          <View style={styles.formRow}>
            <Text style={styles.label}>رقم المعرف</Text>
            <TextInput
              keyboardType='numeric'
              style={styles.input}
              onChangeText={id => {
                setDxnId(id)
              }}
              value={dxnId}
              placeholder="رقم معرف دي اكس ان"
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>كلمة المرور</Text>
            <TextInput
              style={styles.input}
              onChangeText={pass => setPassword(pass)}
              value={password}
              placeholder="كلمة المرور"
            />
          </View>
          <View style={{ marginBottom: 8, }}>
            <Button title={!isRegister ?  'إنشاء حساب': 'تسجيل الدخول' } onPress={async (e) => {
              await loginUser(dxnId, password)
            }} />
          </View>
          <View style={{ marginBottom: 8, }}>
            <Pressable onPress={() => {
              setIsRegister(!isRegister)
            }}>
              <Text style={{ textAlign: "center",  }}>
                {isRegister ?  'إنشاء حساب': 'تسجيل الدخول' }
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