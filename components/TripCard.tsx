import { styles } from "@/constants/styles";
import {View, Text, StyleProp, ViewStyle, Image} from "react-native";

export interface LocationTime {
  location: string;
  time: string;
}

const LocationTimeDisplay = ({location, time}: LocationTime) => (
  <View className="flex flex-col items-center justify-center bg-gray-100 w-32 h-32">
    <Image
      source = {require('./../assets/house.png')}
      style = {{ aspectRatio: 1, width: '25%', height: "auto"}}
    />
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
    <View style={style} className="flex flex-row justify-between items-center bg-white">
      <LocationTimeDisplay {...start} />
      <View className="items-center p-4">
        <Image
          source = {require('./../assets/rightarrow.png')}
          style = {{ aspectRatio: 1, width: '50%', height: "auto"}}
        />
        <Image
          source = {require('./../assets/thermometer.png')}
          style = {{ aspectRatio: 1, width: '50%', height: "auto"}}
        />
        <Text>{temperature.toFixed(1)}°C</Text>
        <Image
          source = {require('./../assets/rainycloud.png')}
          style = {{ aspectRatio: 1, width: '50%', height: "auto"}}
        />
        <Text>{rainfall.toFixed(1)}mm</Text>
      </View>
      <LocationTimeDisplay {...end} />
    </View>
  )
}
