import { LocationTime, TripCard } from "@/components/TripCard";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TopGraphic = () => {
  return (
    <View>
      <Text>TOP GRAPHIC HERE</Text>
    </View>
  )
}

const TransportMethodBanner = () => {
  return (
    <View>
      <Text>You're good to cycle!</Text>
    </View>
  )
}

const tempStart: LocationTime = {
  location: "Home",
  time: "8:32"
}

const tempEnd: LocationTime = {
  location: "Chemistry Department",
  time: "17:00"
}

export default function HomeScreen() {

  return (
    <SafeAreaView className="flex flex-col items-center">
      <TopGraphic />
      <TransportMethodBanner />
      <TripCard temperature={17} rainfall={20} start={tempStart} end={tempEnd} />
      <TripCard temperature={11} rainfall={13} start={tempEnd} end={tempStart} />
    </SafeAreaView>
  );
}
