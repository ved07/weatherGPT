import { LocationTime, TripCard } from "@/components/TripCard";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { Plan, usePlanner } from "@/hooks/usePlanner";
import { useSettings } from "@/hooks/useSettings";
import { useWeather } from "@/hooks/useWeather";
import { ActivityIndicator, Image, SafeAreaView, Text, View } from "react-native";

const TopGraphic = () => {
  return (
    <View>
      <Image
        source={require('./../../assets/sun.png')}
        style={{ width: 50, height: 50, margin: 10 }}
      />
    </View>
  )
}

const Banner = ({
  method
}: {
  method: string
}) => {
  return (
    <View className="bg-white rounded-full py-2 w-[90%] flex flex-row justify-center">
      {method === 'cycle' ? (
        <Text>You're good to {method}!</Text>
      ) : (
        <Text>You'll have to {method} today!</Text>
      )}
    </View>
  )
}

export default function HomeScreen() {
  const {settings, loading} = useSettings()
  const plan = usePlanner()

  if (loading) return <SafeAreaView className="flex items-center justify-center"><ActivityIndicator /></SafeAreaView>

  return (
    <SafeAreaView className="flex flex-col items-center justify-between space-y-4 min-h-[80vh]">
      <TopGraphic />
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
  );
}
