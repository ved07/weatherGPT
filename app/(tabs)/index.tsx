import { LocationTime, TripCard } from "@/components/TripCard";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { Plan, usePlanner } from "@/hooks/usePlanner";
import { useSettings } from "@/hooks/useSettings";
import { useWeather } from "@/hooks/useWeather";
import { ActivityIndicator, Text, View } from "react-native";
import SafeAreaView from "@/components/SafeAreaView";

const TopGraphic = () => {
  return (
    <View>
      <Text>TOP GRAPHIC HERE</Text>
    </View>
  )
}

const Banner = ({
  method
}: {
  method: string
}) => {
  return (
    <View>
      <Text>You're good to {method}!</Text>
    </View>
  )
}

export default function HomeScreen() {
  const {settings, loading} = useSettings()
  const plan = usePlanner()

  if (loading) return <SafeAreaView className="flex items-center justify-center"><ActivityIndicator /></SafeAreaView>

  return (
    <SafeAreaView className="flex flex-col items-center justify-center w-full h-full bg-red-100">
      <TopGraphic />
      <Banner method={plan.method} />
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
    </SafeAreaView>
  );
}
