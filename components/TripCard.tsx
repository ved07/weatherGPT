import { styles } from "@/constants/styles";
import { View, Text, StyleProp, ViewStyle, Image } from "react-native";

export interface LocationTime {
  location: string;
  time: string;
}

const LocationTimeDisplay = ({ location, time }: LocationTime) => (
  <View className="flex flex-col items-center justify-center bg-gray-100 w-32 h-32">
    {location === "Home" && (
      <Image
        source={require("./../assets/house.png")}
        style={{ aspectRatio: 1, width: "25%", height: "auto" }}
      />
    )}
    <View>
      <Text className="text-center">{location}</Text>
    </View>
    <View>
      <Text className="text-lg">{time}</Text>
    </View>
  </View>
);

export const TripCard = ({
  temperature,
  rainfall,
  start,
  end,
  style,
  disabled = false,
}: {
  temperature: number;
  start: LocationTime;
  end: LocationTime;
  rainfall: number;
  style?: StyleProp<ViewStyle>;
  disabled: boolean;
}) => {
  return (
    <View
      style={style}
      className="relative flex flex-row justify-between items-center bg-white"
    >
      {disabled && (
        <View className="absolute z-10 bg-black opacity-20 w-full h-full" />
      )}
      <LocationTimeDisplay {...start} />
      <View className="items-center p-1 h-32 w-24">
        <Image
          source={require("./../assets/rightarrow.png")}
          style={{ aspectRatio: 1, width: "30%", height: "auto" }}
        />
        <Image
          source={require("./../assets/thermometer.png")}
          style={{ aspectRatio: 1, width: "30%", height: "auto" }}
        />
        <Text>{(temperature || 0).toFixed(1)}°C</Text>
        <Image
          source={require("./../assets/rainycloud.png")}
          style={{ aspectRatio: 1, width: "30%", height: "auto" }}
        />
        <Text>{(rainfall || 0).toFixed(1)}%</Text>
      </View>
      <LocationTimeDisplay {...end} />
    </View>
  );
};
