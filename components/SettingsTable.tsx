import { daysOfWeek, defaultTable } from "@/constants/defaultSettings";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Colors } from "@/constants/Colors";
import { formatTime } from "@/utils/time";
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
  use24hrTime,
  onSave,
}: {
  startingValue?: TableItem[];
  use24hrTime: boolean;
  onSave: (tableValues: TableItem[]) => void;
}) => {
  const [showTimeSelect, setShowTimeSelect] = useState(false);
  const [startEndFlag, setstartEndFlag] = useState("e");
  const [day, setDay] = useState(0);
  const [stData, setStData] = useState<TableItem[]>(
    startingValue || defaultTable
  );

  const handleCheckboxChange = (index: number) => {
    const newStData = [...stData];
    newStData[index].ticked = !newStData[index].ticked;
    setStData(newStData);
    onSave(newStData);
  };

  const handleTimeChange = (index: number, flag = "s") => {
    setstartEndFlag(flag);
    setDay(index);
    setShowTimeSelect(true);
  };

  const setTime = (event: DateTimePickerEvent, date?: Date) => {
    setShowTimeSelect(false);
    if (event.type == "set" && typeof date != "undefined") {
      const newStData = [...stData];
      if (startEndFlag == "s") {
        newStData[day].startTime = date;
      } else {
        newStData[day].endTime = date;
      }
      setStData(newStData);
      onSave(newStData);
    }
  };

  const handleLocationChange = (location: string, index: number) => {
    const newStData = [...stData];
    newStData[index].location = location;
    setStData(newStData);
    onSave(newStData);
  };

  return (
    <View className="bg-gray-50 rounded-xl p-2 shadow-sm">
      <View className="flex flex-row justify-between mb-2">
        <View className="ml-7 w-10"><Text className="text-xs">Enable</Text></View>
        <View className="flex flex-1 flex-row justify-between mx-5">
          <View className=""><Text className="text-xs">Work start</Text></View>
          <View><Text className="text-xs">Work end</Text></View>
          <View><Text className="text-xs">Location</Text></View>
        </View>
        <View className="w-16"><Text className="text-xs">Cycle time</Text></View>
      </View>
      {stData.map((item, index) => (
        <View key={index} style={styles.item}>
          <View className="w-8 flex flex-row items-center">
            <Text className="text-xs" style={styles.cell}>{daysOfWeek[item.day]}</Text>
          </View>
          <View className="w-10">
            <BouncyCheckbox
              fillColor={Colors.tint}
              isChecked={item.ticked}
              onPress={() => handleCheckboxChange(index)}
            />
          </View>
          <Pressable
            className="flex flex-row items-center px-1 mr-2 h-7"
            style={styles.input}
            onPress={() => handleTimeChange(index)}
          >
            <Text>{formatTime(item.startTime, use24hrTime)}</Text>
          </Pressable>
          <Pressable
            className="flex flex-row items-center px-1 mr-2 h-7"
            style={styles.input}
            onPress={() => handleTimeChange(index, "e")}
          >
            <Text>{formatTime(item.endTime, use24hrTime)}</Text>
          </Pressable>
          <TextInput
            className="px-1 mr-2 w-[30%] h-7"
            style={styles.input}
            value={item.location}
            onChangeText={(text) => handleLocationChange(text, index)}
            keyboardType="default"
          />
          <View className="w-10 h-7">
            <TextInput
              className="px-1 h-6 py-1"
              style={styles.input}
              value={item.cycleTime.toString()}
              onChangeText={(text) => {
                const newStData = [...stData];
                newStData[index].cycleTime = parseInt(text);
                setStData(newStData);
                onSave(newStData);
              }}
              keyboardType="number-pad"
            />
          </View>
        </View>
      ))}
      {showTimeSelect && (
        <RNDateTimePicker
          value={new Date(2020, 10, 20)}
          mode="time"
          display="spinner"
          onChange={setTime}
          is24Hour={use24hrTime}
        />
      )}
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
    marginBottom: 5,
    paddingHorizontal: 5, // Add horizontal padding
    paddingVertical: 0,
  },
  cell: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: "white",
  },
});

export default SettingsTable;
