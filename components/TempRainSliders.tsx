import {View, Text, Image, ScrollView, TextInput} from "react-native";
import Slider from '@react-native-community/slider';
import React, {useState} from 'react';

type SettingSliderProps = {
  setInputValue: (value: number) => void;
  minInputLimit: number;
  maxInputLimit: number;
};

const SettingSlider = ({ setInputValue, minInputLimit, maxInputLimit } : SettingSliderProps) => {
  return <View>
    <Slider
      style={{width: 200, height: 40}}
      minimumValue={minInputLimit}
      maximumValue={maxInputLimit}
      onValueChange = {(e) => setInputValue(e)}
      minimumTrackTintColor="#000000"
      maximumTrackTintColor="#808080"
    />
  </View>
};

type TempRainSlidersProp = {
  temp: number;
  setTemp: (value: number) => void;
  rain: number;
  setRain: (value: number) => void;
};

export default function TempRainSliders({temp, setTemp, rain, setRain} : TempRainSlidersProp) {
  return (
    <View style={{marginTop: 50}}>
      <Text>Temperature: {temp.toFixed(1)}°C</Text>
      <SettingSlider setInputValue={setTemp} minInputLimit={-10} maxInputLimit={40}/>

      <Text>Rainfall: {rain.toFixed(1)}%</Text>
      <SettingSlider setInputValue={setRain} minInputLimit={0} maxInputLimit={100}/>
    </View>
  );
};