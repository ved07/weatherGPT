import React, {useState} from 'react';
import {View, Switch, StyleSheet, Text} from 'react-native';
import {styles} from "@/constants/styles";

export const TimeSwitch = ({ onChange }: {
  onChange: (value: boolean) => void;
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    onChange(!isEnabled)
    setIsEnabled(previousState => !previousState)
  };

  return (
    <View style={{marginLeft: 20}}>
      <Switch
        trackColor={{false: "#D4D4D4", true: "#0FAF01"}}
        thumbColor={isEnabled ? "#086A00" : "#B5B5B5"}
        ios_backgroundColor="#F4F3F3"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};