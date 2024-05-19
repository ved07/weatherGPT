import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

interface Settings {
  temperatureTolerance: number;
  rainfallTolerance: number;
  use24hrTime: boolean;
}

export const defaultSettings = {
  temperatureTolerance: 15,
  rainfallTolerance: 40,
  use24hrTime: false,
}

export const defaultSettingsContext = {
  settings: defaultSettings,
  loading: true,
  setSettings: async (value: Settings) => {}
}

export const useSettings = () => {
  const [settings, setSettingsState] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('settings');
        const settings = jsonValue != null ? JSON.parse(jsonValue) : defaultSettings;
        setSettingsState(settings);
      } catch (error) {
        console.error('Failed to load settings', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const setSettings = async (value: Settings) => {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('settings', jsonValue);
    setSettingsState(value);
  };

  return {
    settings,
    loading,
    setSettings
  };
};

export const SettingsContext = createContext<{settings: Settings, loading: boolean, setSettings: (value: Settings) => Promise<void>} | undefined>(undefined);
