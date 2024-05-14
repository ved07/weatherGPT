import { View, Text } from "react-native";
import React, {useState} from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import TempRainSliders from "@/components/TempRainSliders"

export default function SettingsScreen() {
  const [temp, setTemp] = useState(0);
  const [rain, setRain] = useState(0);

  return (
    <SafeAreaView>
      <TempRainSliders temp={temp} setTemp={setTemp} rain={rain} setRain={setRain}/>
      <Text>Testing: temperature={temp}, rainfall={rain}</Text>
    </SafeAreaView>
  );
}
