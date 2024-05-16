import { styles } from "@/constants/styles";
import { View, Text, StyleProp, ViewStyle } from "react-native";

export interface LocationTime {
  location: string;
  time: string;
}

const LocationTimeDisplay = ({location, time}: LocationTime) => (
  <View className="flex flex-col items-center justify-center bg-gray-50 w-32 h-32">
    <View><Text className="text-center">{location}</Text></View>
    <View><Text className="text-lg">{time}</Text></View>
  </View>
)

export const TripCard = ({
  temperature,
  rainfall,
  start,
  end,
  style
}: {
  temperature: number,
  start: LocationTime,
  end: LocationTime,
  rainfall: number
  style?: StyleProp<ViewStyle>
}) => {
  
  return (
    <View style={style} className="flex flex-row justify-between bg-white">
      <LocationTimeDisplay {...start} />
      <View>
        <Text>Data here...</Text>
      </View>
      <LocationTimeDisplay {...end} />
    </View>
  )
}
