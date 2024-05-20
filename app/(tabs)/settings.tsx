import { Switch, StyleSheet, View, Text } from "react-native";
import React, {useContext, useEffect, useState} from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import SettingSlider from "@/components/SettingSlider"
import { TimeSwitch } from "@/components/24HourTimeSwitch"
import {styles} from "@/constants/styles";
import { SettingsContext, defaultSettingsContext, useSettings } from "@/hooks/useSettings";
import SettingsTable, { TableItem } from "@/components/SettingsTable";

export default function SettingsScreen() {
  const {settings, loading, setSettings} = useContext(SettingsContext) || defaultSettingsContext;
  const [rainfall, setRainfall] = useState(0)
  const [temperature, setTemperature] = useState(0)

  const saveSettings = () => {
    setSettings({
      ...settings,
      rainfallTolerance: parseFloat((rainfall).toFixed(1)),
      temperatureTolerance: parseFloat((temperature - 10.0).toFixed(1))
    })
  }

  const onTableSave = (newTable: TableItem[]) => {
    setSettings({
      ...settings,
      settingsTable: newTable
    })
  }

  useEffect(() => {
    setRainfall(parseFloat((settings.rainfallTolerance).toFixed(1)))
    setTemperature(parseFloat((settings.temperatureTolerance + 10.0).toFixed(1)))
  }, [loading])

  if (loading) return (<View></View>)

  return (
    <SafeAreaView style={styles.settingsContainer}>
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Settings</Text>
        </View>

        <View style={styles.settingsSection}>
          <View style={styles.sectionBackground}>
            <View style={styles.switchContainer}>
              <Text style={styles.label}>Temperature: {(temperature - 10.0).toFixed(1)}°C</Text>
              <SettingSlider
                initialValue={temperature}
                step={0.1}
                setInputValue={setTemperature}
                onFinish={saveSettings}
                minInputLimit={0.1}
                maxInputLimit={50}
              />
            </View>
          </View>

          <View style={styles.sectionBackground}>
            <View style={styles.switchContainer}>
              <Text style={styles.label}>Rainfall: {rainfall.toFixed(1)}%</Text>
              <SettingSlider
                initialValue={rainfall}
                step={0.1}
                setInputValue={setRainfall}
                onFinish={saveSettings}
                minInputLimit={0.1}
                maxInputLimit={100}
              />
            </View>
          </View>

          <Text>Testing: temperature={settings.temperatureTolerance}, rainfall={settings.rainfallTolerance}</Text>

          <View style={styles.switchContainer}>
            <View style={styles.sectionBackground}>
              <Text style={styles.label}>24-Hour Time</Text>
              <TimeSwitch onChange={(value) => setSettings({...settings, use24hrTime: value})} />
            </View>
          </View>
        </View>
      </View>

      <View>
        <SettingsTable startingValue={settings.settingsTable} onSave={onTableSave}/>
      </View>
    </SafeAreaView>
  );
}
