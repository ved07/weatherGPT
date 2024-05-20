import { TableItem } from '@/components/SettingsTable';
import { defaultTable } from '@/constants/defaultSettings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

interface Settings {
  temperatureTolerance: number;
  rainfallTolerance: number;
  use24hrTime: boolean;
  settingsTable: TableItem[];
}

export const defaultSettings = {
  temperatureTolerance: 15,
  rainfallTolerance: 40,
  use24hrTime: false,
  settingsTable: defaultTable
}

export const defaultSettingsContext = {
  settings: defaultSettings,
  loading: true,
  setSettings: async (value: Settings) => {}
}

const dateTimeReviver = (key: string, value: any) => {
  if (key === 'startTime' || key === 'endTime') {
    return new Date(value);
  }
  return value;
}

export const useSettings = () => {
  const [settings, setSettingsState] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('settings');
        const settings = jsonValue != null ? JSON.parse(jsonValue, dateTimeReviver) : defaultSettings;
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
