import { daysOfWeek, defaultTable } from "@/constants/defaultSettings";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, Pressable } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
export interface TableItem {
  day: number;
  startTime: Date;
  endTime: Date;
  location: string;
  ticked: boolean;
  cycleTime: number;
}

const formatString = (sNum: number) => {
  return (('0' + sNum.toString()).slice(-2))
}

const fullFormatString = (date: Date) => {
  return `${formatString(date.getUTCHours())}:${formatString(date.getUTCMinutes())}`
}

const SettingsTable = ({
  startingValue,
  use24hrTime,
  onSave,
}: {
  startingValue?: TableItem[];
  use24hrTime: boolean;
  onSave: (tableValues: TableItem[]) => void;
}) => {
  const [showTimeSelect, setShowTimeSelect] = useState(false);
  const [startEndFlag, setstartEndFlag] = useState('e');
  const [day, setDay] = useState(0);
  const [stData, setStData] = useState<TableItem[]>(startingValue || defaultTable);

  const handleCheckboxChange = (index: number) => {
    const newStData = [...stData];
    newStData[index].ticked = !newStData[index].ticked;
    setStData(newStData);
    onSave(newStData);
  };

  const handleTimeChange = (index:number, flag='s') => {
    setstartEndFlag(flag);
    setDay(index);  
    setShowTimeSelect(true);  
  }

  const setTime = (event: DateTimePickerEvent, date?: Date) => {
    setShowTimeSelect(false);
    if (event.type == 'set' && typeof date != 'undefined'){
      const newStData = [...stData];
      if (startEndFlag=='s') {
        newStData[day].startTime = date;
      }
      else {
        newStData[day].endTime = date;
      }
      setStData(newStData); 
      onSave(newStData)
    }
  }

  const handleLocationChange = (location: string, index: number) => {
    const newStData = [...stData];
    newStData[index].location = location;
    setStData(newStData);
    onSave(newStData)
  };

  return (
    <View>
      {stData.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.cell}>{daysOfWeek[item.day]}</Text>
          <BouncyCheckbox
            isChecked={item.ticked}
            onPress={() => handleCheckboxChange(index)}
          />
          <Pressable
            style={styles.input}
            
            onPress={() => handleTimeChange(index)}
          ><Text>{fullFormatString(item.startTime)}</Text></Pressable>
          <Pressable
            style={styles.input}
            
            onPress={() => handleTimeChange(index, 'e')}
          ><Text>{fullFormatString(item.endTime)}</Text></Pressable>
          <TextInput
            style={styles.input}
            value={item.location}
            onChangeText={(text) => handleLocationChange(text, index)}
            keyboardType="default"
          />
        </View>
      ))}
      {showTimeSelect && <RNDateTimePicker value={new Date(2020, 10, 20,)} mode="time" display = "spinner" onChange={setTime} is24Hour = {use24hrTime}/>}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  item: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    paddingHorizontal: 5, // Add horizontal padding
    paddingVertical: 0,
  },
  cell: {
    flex: 1,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    flex: 1,
    height: 28,
    paddingHorizontal: 6,
    width: "50%",
  },
});

export default SettingsTable;
