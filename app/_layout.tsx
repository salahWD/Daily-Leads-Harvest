import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { I18nManager } from 'react-native';

import { getUserSession } from "@/utils/functions"

// Enable RTL
I18nManager.forceRTL(true);
// If you want to mirror the layout for RTL
I18nManager.allowRTL(true);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    
    async function checkUserState() {
      const Id = await getUserSession();

      if (Id) {
        console.log('User is logged in:', Id);
        router.replace('/login');
        // router.replace('/(tabs)');
        // You can retrieve user data from Firestore if needed
      } else {
        console.log('user should login');
        router.replace('/login');
      }
    }

    checkUserState();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
