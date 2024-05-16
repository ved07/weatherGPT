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
const settingsTable: React.FC = () => {
    const [stData, setStData] = useState<stitem[]>([
        { id: '1', day: 'Monday', startTime: '08:00', endTime: '16:00', location: 'Office', ticked: true },
  { id: '2', day: 'Tuesday', startTime: '08:00', endTime: '16:00', location: 'Home', ticked: true },
  { id: '3', day: 'Wednesday', startTime: '08:00', endTime: '16:00', location: 'Gym', ticked: true },
  { id: '4', day: 'Thursday', startTime: '08:00', endTime: '16:00', location: 'Client Site', ticked: true },
  { id: '5', day: 'Friday', startTime: '08:00', endTime: '16:00', location: 'Coffee Shop', ticked: true },
  { id: '6', day: 'Saturday', startTime: '10:00', endTime: '14:00', location: 'Weekend Market', ticked: true },
  { id: '7', day: 'Sunday', startTime: '12:00', endTime: '18:00', location: 'Beach', ticked: true }
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
        />          <TextInput
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
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cell: {
    flex: 1,
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
});

export default settingsTable;
