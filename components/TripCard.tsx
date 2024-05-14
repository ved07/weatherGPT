import { FontAwesome } from "@expo/vector-icons";
import { View, Text } from "react-native";
import {styled} from 'nativewind'

export interface LocationTime {
  location: string;
  time: string;
}

const LocationTimeDisplay = styled(({location, time}: LocationTime) => (
  <View className="flex flex-col items-center bg-gray-200">
    {location == "Home" && <FontAwesome size={28} name="home" />}
    <View><Text>{location}</Text></View>
    <View><Text className="text-red-300">{time}</Text></View>
  </View>
))

export const TripCard = styled(({
  temperature,
  rainfall,
  start,
  end
}: {
  temperature: number,
  start: LocationTime,
  end: LocationTime,
  rainfall: number
}) => {
  
  return (
    <View className="flex flex-row bg-gray-200">
      <LocationTimeDisplay {...start} />
      <LocationTimeDisplay {...end} />
    </View>
  )
})
