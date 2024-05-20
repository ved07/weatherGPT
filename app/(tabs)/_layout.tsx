import { Tabs } from 'expo-router';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Colors } from '@/constants/Colors';
import { WeatherContext, useWeather } from '@/hooks/useWeather';
import { SettingsContext, useSettings } from '@/hooks/useSettings';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabLayout() {
  const weather = useWeather();
  const settings = useSettings();
  
  return (
    <GestureHandlerRootView>
      <SettingsContext.Provider value={settings}>
        <WeatherContext.Provider value={weather}>
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: Colors.tint,
              headerShown: false,
            }}>
            <Tabs.Screen
              name="help"
              options={{
                title: 'Help',
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="question" color={color} />,
              }}
            />
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
              }}
            />
            <Tabs.Screen
              name="settings"
              options={{
                title: 'Settings',
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
              }}
            />
          </Tabs>
        </WeatherContext.Provider>
      </SettingsContext.Provider>
    </GestureHandlerRootView>
  );
}
