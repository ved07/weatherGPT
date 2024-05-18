import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
interface stitem {
    id: string, 
    day: string, 
    startTime: string,
    endTime: string,
    location: string,
    ticked: boolean
}

/* */
const SettingsTable: React.FC = () => {
    const [stData, setStData] = useState<stitem[]>([
        { id: '1', day: 'Mon', startTime: '08:00', endTime: '16:00', location: 'Office', ticked: true },
        { id: '2', day: 'Tue', startTime: '08:00', endTime: '16:00', location: 'Home', ticked: true },
        { id: '3', day: 'Wed', startTime: '08:00', endTime: '16:00', location: 'Gym', ticked: true },
        { id: '4', day: 'Thu', startTime: '08:00', endTime: '16:00', location: 'Client Site', ticked: true },
        { id: '5', day: 'Fri', startTime: '08:00', endTime: '16:00', location: 'Coffee Shop', ticked: true },
        { id: '6', day: 'Sat', startTime: '10:00', endTime: '14:00', location: 'Weekend Market', ticked: true },
        { id: '7', day: 'Sun', startTime: '12:00', endTime: '18:00', location: 'Beach', ticked: true }
    ])
    
    const handleCheckboxChange = (index: number) => {
        const newStData = [...stData];
        newStData[index].ticked = !newStData[index].ticked;
        setStData(newStData);
    }
    
    const handleTimeChange = (time1: string, index:number, flag='s') => {
        const newStData = [...stData];
        if (flag=='s'){
            newStData[index].startTime = time1;
            setStData(newStData);   
        }
        else {
            newStData[index].endTime = time1;
            setStData(newStData); 
        }   
    }
    const handleLocationChange = (location: string, index:number) => {
        const newStData = [...stData];
        newStData[index].location  = location;
        setStData(newStData); 
    }
    
    const renderitem = ({item, index}:{index: number, item: stitem}) => (
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
            onChangeText={(text) => handleTimeChange(text, index, 'e')}
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
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    borderColor: '#ccc',
    borderRadius: 5,
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    width: "50%"
  },
});

export default SettingsTable;
