import { LocationTime, TripCard } from "@/components/TripCard";
import { Background } from "@/components/Background";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { Plan, usePlanner } from "@/hooks/usePlanner";
import { useSettings } from "@/hooks/useSettings";
import { useWeather } from "@/hooks/useWeather";
import { ActivityIndicator, Image, TextStyle, SafeAreaView, StyleSheet, Text, View } from "react-native";

export interface Styles {
  farroBoldText: TextStyle;
  farroLightText: TextStyle;
  farroMediumText: TextStyle;
  farroRegularText: TextStyle;
  exo2BoldText: TextStyle;
  exo2RegularText: TextStyle;
}

export const styles: Styles = StyleSheet.create({
  farroBoldText: {
    fontFamily: "Farro-Bold.ttf",
    fontSize: 24,
  },
  farroLightText: {
    fontFamily: "Farro-Light.ttf",
    fontSize: 24,
  },
  farroMediumText: {
    fontFamily: "Farro-Medium.ttf",
    fontSize: 24,
  },
  farroRegularText: {
    fontFamily: "Farro-Regular.ttf",
    fontSize: 24,
  },
  exo2BoldText: {
    fontFamily: "Exo2-VariableFont_wght.ttf",
    fontSize: 30,
    fontWeight: "bold"
  },
  exo2RegularText: {
    fontFamily: "Exo2-VariableFont_wght.ttf",
    fontSize: 16,
  },
});

const Banner = ({
  method
}: {
  method: string
}) => {
  return (
    <View className="bg-white rounded-full py-2 w-[90%] flex flex-row justify-center items-center">
      {method === 'cycle' ? (
        <Text style={styles.farroRegularText}>You're good to {method}!</Text>
      ) : (
        <Text style={styles.farroRegularText}>You'll have to {method} today!</Text>
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
      <SafeAreaView className="flex flex-col items-center justify-between space-y-4 min-h-[80vh]">
        <Banner method={plan.method} />
        <View className="flex flex-col space-y-5">
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
      </SafeAreaView>
    </Background>
  );
}
