import { LocationTime, TripCard } from "@/components/TripCard";
import { Background } from "@/components/Background";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { Plan, usePlanner } from "@/hooks/usePlanner";
import { useSettings } from "@/hooks/useSettings";
import { useWeather } from "@/hooks/useWeather";
import { ActivityIndicator, Image, TextStyle, SafeAreaView, StyleSheet, Text, View, StyleProp, ViewStyle } from "react-native";
import { styles } from "@/constants/styles";

const Banner = ({
  method,
  style
}: {
  method: string
  style?: StyleProp<ViewStyle>
}) => {
  return (
    <View style={style} className="bg-white rounded-full py-2 w-[90%] flex flex-row justify-center items-center">
      {method === 'cycle' ? (
        <Text>You're good to {method}!</Text>
      ) : (
        <Text>You'll have to {method} today!</Text>
      )}
      <Image
        source={require('./../../assets/checkmark.png')}
        style={{ width: 24, height: 24, marginLeft: 20}}
      />
    </View>
  )
}

export default function HomeScreen() {
  const {settings, loading} = useSettings()
  const plan = usePlanner()

  if (loading) return <SafeAreaView className="flex items-center justify-center"><ActivityIndicator /></SafeAreaView>

  return (
    <Background>
      <View style={{
        width: "100%",
        height: "100%",
        paddingTop: 360,
        paddingBottom: 10,
      }} className="flex flex-col items-center justify-between">
        <Banner method={plan.method} />
        <View className="flex flex-col">
          <TripCard
            temperature={13}
            rainfall={20}
            start={{
              location: "Home",
              time: "8:32"
            }}
            end={{
              location: "Chemistry Lab",
              time: "9:00"
            }}
          />
          <TripCard
            style={{ marginTop: 20 }}
            temperature={18}
            rainfall={5}
            start={{
              location: "Chemistry Lab",
              time: "17:00"
            }}
            end={{
              location: "Home",
              time: "17:28"
            }}
          />
        </View>
      </View>
    </Background>
  );
}
