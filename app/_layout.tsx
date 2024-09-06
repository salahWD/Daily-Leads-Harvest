import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
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
  const [logedIn, setLogedIn] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (isMounted && loaded) {
      async function checkUserState() {
        const Id = await getUserSession();

        if (Id) {
          console.log('User is logged in:', Id);
          setLogedIn(true);
          router.replace('/(tabs)');
        } else {
          console.log('User should login');
          setLogedIn(false);
          router.replace('/login');
        }
      }

      checkUserState();
    }
  }, [isMounted, loaded]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        {logedIn ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="login" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}