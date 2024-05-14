import { FontAwesome } from "@expo/vector-icons";
import { View, Text } from "react-native";

export interface LocationTime {
  location: string;
  time: string;
}

const LocationTimeDisplay = ({location, time}: LocationTime) => (
  <View className="flex flex-1 flex-col items-center justify-center bg-gray-50 w-20 h-20">
    {location == "Home" && <FontAwesome size={28} name="home" />}
    <View><Text className="text-center">{location}</Text></View>
    <View><Text className="text-lg">{time}</Text></View>
  </View>
)

export const TripCard = ({
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
    <View className="flex flex-1 flex-row justify-between bg-white h-20">
      <LocationTimeDisplay {...start} />
      <View>
        <Text>Data here...</Text>
      </View>
      <LocationTimeDisplay {...end} />
    </View>
  )
}
