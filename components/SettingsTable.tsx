import { defaultTable } from "@/constants/defaultSettings";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, FlatList } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
export interface stitem {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  location: string;
  ticked: boolean;
  cycleTime: number;
}

/* */
const SettingsTable = ({
  startingValue,
  onSave,
}: {
  startingValue?: stitem[];
  onSave: (tableValues: stitem[]) => void;
}) => {
  const [stData, setStData] = useState<stitem[]>(startingValue || defaultTable);

  const handleCheckboxChange = (index: number) => {
    const newStData = [...stData];
    newStData[index].ticked = !newStData[index].ticked;
    setStData(newStData);
    onSave(newStData);
  };

  const handleTimeChange = (time1: string, index: number, flag = "s") => {
    const newStData = [...stData];
    if (flag == "s") {
      newStData[index].startTime = time1;
      setStData(newStData);
    } else {
      newStData[index].endTime = time1;
      setStData(newStData);
    }
    onSave(newStData)
  };
  const handleLocationChange = (location: string, index: number) => {
    const newStData = [...stData];
    newStData[index].location = location;
    setStData(newStData);
    onSave(newStData)
  };

  const renderitem = ({ item, index }: { index: number; item: stitem }) => (
    <View style={styles.item}>
      <Text style={styles.cell}>{item.day}</Text>
      <BouncyCheckbox
        isChecked={item.ticked}
        onPress={() => handleCheckboxChange(index)}
      />
      <TextInput
        style={styles.input}
        value={item.startTime}
        onChangeText={(text) => handleTimeChange(text, index)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={item.endTime}
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
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={stData}
        renderItem={renderitem}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
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
    marginBottom: 10,
    paddingHorizontal: 5, // Add horizontal padding
    paddingVertical: 10, // Add vertical padding
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
    height: 40,
    paddingHorizontal: 10,
    width: "50%",
  },
});

export default SettingsTable;
