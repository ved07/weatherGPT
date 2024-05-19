import { Switch, View, Text } from "react-native";
import React, {useContext, useEffect, useState} from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import SettingSlider from "@/components/SettingSlider"
import TimeSwitch from "@/components/24HourTimeSwitch"
import {styles} from "@/constants/styles";
import { SettingsContext, defaultSettingsContext, useSettings } from "@/hooks/useSettings";
import SettingsTable from "@/components/SettingsTable";

export default function SettingsScreen() {
  const {settings, loading, setSettings} = useContext(SettingsContext) || defaultSettingsContext;

  const [rainfall, setRainfall] = useState(0)
  const [temperature, setTemperature] = useState(0)

  const saveSettings = () => {
    setSettings({
      ...settings,
      rainfallTolerance: rainfall,
      temperatureTolerance: parseFloat((temperature - 10.0).toFixed(1))
    })
  }

  useEffect(() => {
    setRainfall(settings.rainfallTolerance)
    setTemperature(parseFloat((settings.temperatureTolerance + 10.0).toFixed(1)))
  }, [loading])

  if (loading) return (<View></View>)

  return (
    <SafeAreaView style={{ flexDirection: 'column', justifyContent: 'flex-start', margin: 30}}>
      <View>
        <Text style={styles.exo2RegularText}>Settings</Text>
      
        <Text>Temperature: {(temperature - 10.0).toFixed(1)}°C</Text>
        <SettingSlider initialValue={temperature} step={0.1} setInputValue={setTemperature} onFinish={saveSettings} minInputLimit={0} maxInputLimit={50}/>
        <Text>Rainfall: {rainfall}mm</Text>
        <SettingSlider initialValue={rainfall} step={0.1} setInputValue={setRainfall} onFinish={saveSettings} minInputLimit={0} maxInputLimit={100}/>
        
        <Text>Testing: temperature={settings.temperatureTolerance}, rainfall={settings.rainfallTolerance}</Text>
      </View>

      <View style={{paddingTop: 60}}>
        <SettingsTable/>
      </View>
    </SafeAreaView>
  );
}
