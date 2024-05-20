import React, { useState } from 'react';
import { View, Text, TextInput,Pressable, StyleSheet, FlatList} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
interface stitem {
    id: string, 
    day: string, 
    startTime: string,
    endTime: string,
    location: string,
    ticked: boolean,
    date: Date
}

/* */
const SettingsTable: React.FC = () => {
    const [showTimeSelect, setShowTimeSelect] = useState(false);
    const [startEndFlag, setstartEndFlag] = useState('e');
    const [day, setDay] = useState(0);
    const [twofourhour, setTwoFourHour] = useState(true);
    const [stData, setStData] = useState<stitem[]>([
        { id: '1', day: 'Mon', startTime: '08:00', endTime: '16:00', location: 'Office', ticked: true, date: new Date() },
        { id: '2', day: 'Tue', startTime: '08:00', endTime: '16:00', location: 'Home', ticked: true, date: new Date() },
        { id: '3', day: 'Wed', startTime: '08:00', endTime: '16:00', location: 'Gym', ticked: true, date: new Date() },
        { id: '4', day: 'Thu', startTime: '08:00', endTime: '16:00', location: 'Client Site', ticked: true, date: new Date() },
        { id: '5', day: 'Fri', startTime: '08:00', endTime: '16:00', location: 'Coffee Shop', ticked: true,date: new Date() },
        { id: '6', day: 'Sat', startTime: '10:00', endTime: '14:00', location: 'Weekend Market', ticked: true,date: new Date()},
        { id: '7', day: 'Sun', startTime: '12:00', endTime: '18:00', location: 'Beach', ticked: true, date: new Date()}
    ])
    const formatString = (sNum: number) => {
      return (('0' + sNum.toString()).slice(-2))
    }
    const handleCheckboxChange = (index: number) => {
        const newStData = [...stData];
        newStData[index].ticked = !newStData[index].ticked;
        setStData(newStData);
    }
    
    const handleTimeChange = (index:number, flag='s') => {
        const newStData = [...stData];
        setstartEndFlag(flag);
        setDay(index);  
        setShowTimeSelect(true);  
    }
    const setTime = (event: DateTimePickerEvent, date?: Date) => {
      setShowTimeSelect(false);
      if (event.type == 'set' && typeof date != 'undefined'){
        const newStData = [...stData];
      if (startEndFlag=='s'){
          newStData[day].startTime = `${formatString(date.getUTCHours())}:${formatString(date.getUTCMinutes())}`;
      }
      else {
          newStData[day].endTime = `${formatString(date.getUTCHours())}:${formatString(date.getUTCMinutes())}`;
      }   
      newStData[day].date = date;
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
          <Pressable
            style={styles.input}
            
            onPress={() => handleTimeChange(index)}
          ><Text>{item.startTime}</Text></Pressable>
          <Pressable
            style={styles.input}
            
            onPress={() => handleTimeChange(index, 'e')}
          ><Text>{item.endTime}</Text></Pressable>
          
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
            {showTimeSelect && <RNDateTimePicker value={new Date(2020, 10, 20,)} mode="time" display = "spinner" onChange={setTime} is24Hour = {twofourhour}/>}
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
