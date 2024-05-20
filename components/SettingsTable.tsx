import { daysOfWeek, defaultTable } from "@/constants/defaultSettings";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, FlatList } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
export interface TableItem {
  day: number;
  startTime: Date;
  endTime: Date;
  location: string;
  ticked: boolean;
  cycleTime: number;
}

const SettingsTable = ({
  startingValue,
  onSave,
}: {
  startingValue?: TableItem[];
  onSave: (tableValues: TableItem[]) => void;
}) => {
  const [stData, setStData] = useState<TableItem[]>(startingValue || defaultTable);

  const handleCheckboxChange = (index: number) => {
    const newStData = [...stData];
    newStData[index].ticked = !newStData[index].ticked;
    setStData(newStData);
    onSave(newStData);
  };

  const handleTimeChange = (time1: string, index: number, flag = "s") => {
    // const newStData = [...stData];
    // if (flag == "s") {
    //   newStData[index].startTime = time1;
    //   setStData(newStData);
    // } else {
    //   newStData[index].endTime = time1;
    //   setStData(newStData);
    // }
    // onSave(newStData)
  };
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
          <TextInput
            style={styles.input}
            value={item.startTime.toLocaleTimeString()}
            onChangeText={(text) => handleTimeChange(text, index)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={item.endTime.toLocaleTimeString()}
            onChangeText={(text) => handleTimeChange(text, index, "e")}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={item.location}
            onChangeText={(text) => handleLocationChange(text, index)}
            keyboardType="default"
          />
        </View>
      ))}
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
