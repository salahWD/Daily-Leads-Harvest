import { Tabs } from 'expo-router';

import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';

import { Colors } from '@/constants/Colors';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'الرئيسية',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
          tabBarLabelStyle: { paddingBottom: 5}
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'الإحصائات',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
          tabBarLabelStyle: { paddingBottom: 5}
        }}
      />
    </Tabs>
  );
}
