import { Switch, View, Text } from "react-native";
import React, {useState} from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import TempRainSliders from "@/components/TempRainSliders"
import TimeSwitch from "@/components/24HourTimeSwitch"
import {styles} from "@/constants/styles";

export default function SettingsScreen() {
  const [temp, setTemp] = useState(0);
  const [rain, setRain] = useState(0);

  return (
    <SafeAreaView style={{ flexDirection: 'column', justifyContent: 'flex-start', margin: 30 }}>
      <View>
        <Text style={styles.exo2RegularText}>Settings</Text>
      
        <Text>Temperature: {settings.temperatureTolerance.toFixed(1)}°C</Text>
        <SettingSlider setInputValue={setTemp} minInputLimit={-10} maxInputLimit={40}/>

        <Text>Rainfall: {settings.rainfallTolerance.toFixed(1)}%</Text>
        <SettingSlider setInputValue={setRain} minInputLimit={0} maxInputLimit={100}/>
        
        <Text>Testing: temperature={settings.temperatureTolerance}, rainfall={settings.rainfallTolerance}</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 20 }}>
        <Text style={styles.exo2RegularText}>Enable 24 hour time</Text>
        <TimeSwitch />
      </View>

    </SafeAreaView>
  );
}
