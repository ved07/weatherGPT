import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

interface Settings {
  temperatureTolerance: number;
  rainfallTolerance: number;
  use24hrTime: boolean;
}

const defaultSettings = {
  temperatureTolerance: 15,
  rainfallTolerance: 40,
  use24hrTime: false,
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
