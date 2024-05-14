import { View } from "react-native";

export interface LocationTime {
  location: string;
  time: string;
}

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
    <View>
      
    </View>
  )
}
