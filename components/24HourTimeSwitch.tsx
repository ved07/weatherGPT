import React, {useState} from 'react';
import {View, Switch, StyleSheet, Text} from 'react-native';
import {styles} from "@/constants/styles";
import { Colors } from '@/constants/Colors';

export const TimeSwitch = ({ onChange, defaultValue }: {
  onChange: (value: boolean) => void;
  defaultValue?: boolean;
}) => {
  const [isEnabled, setIsEnabled] = useState(defaultValue || false);
  const toggleSwitch = () => {
    onChange(!isEnabled)
    setIsEnabled(previousState => !previousState)
  };

  return (
    <View style={{marginLeft: 20}}>
      <Switch
        trackColor={{false: "#D4D4D4", true: Colors.tint}}
        thumbColor={isEnabled ?  '#075872' : "#B5B5B5"}
        ios_backgroundColor="#F4F3F3"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};