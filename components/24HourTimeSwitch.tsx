import React, {useState} from 'react';
import {View, Switch, StyleSheet} from 'react-native';
import {styles} from "@/constants/styles";

const ToggleSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View>
      <Switch
        trackColor={{false: '#D4D4D4', true: '#0FAF01'}}
        thumbColor={isEnabled ? '#B5B5B5' : '#086A00'}
        ios_backgroundColor="#F4F3F3"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default function TimeSwitch() {

}
