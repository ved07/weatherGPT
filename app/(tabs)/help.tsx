import { Text, Button, View, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextBlog } from "@/components/TextBlog";
import { Background } from "@/components/Background";
import { LinearTransition } from "react-native-reanimated";
import { LinearGradient } from "react-native-linear-gradient";
import { Children, ReactNode } from "react";
import { styles } from "@/constants/styles";
import { usePlanner } from "@/hooks/usePlanner";

export default function HelpScreen() {
  const plan = usePlanner();
  return (
    <Background plan={plan}>
      <View
        className="w-full h-full flex flex-col items-center"
        style={{
          paddingTop: "50%",
        }}
      >
        <TextBlog
          text={"FAQs"}
          hidden={
            "Take a look at some of our frequently asked questions! We're here to help."
          }
        />
        <TextBlog
          text={"How do I input my location?"}
          hidden={
            "Press the button labelled 'settings' at the bottom of the screen -> press the search bar labelled 'set location' on top of the map -> tap in your location -> submit."
          }
        />
        <TextBlog
          text={"What does setting thresholds do?"}
          hidden={
            "Your temperature threshold is the minimum temperature you would be willing to cycle in. Your precipitation threshold is the maximum level of rainfall you would be willing to cycle in."
          }
        />
        <TextBlog
          text={"What’s unique about this app?"}
          hidden={
            "As cyclists, all too often we show up to our destinations soaking wet. No more! This app will let you know when the weather is good to cycle in. "
          }
        />
        <TextBlog
          text={"How do I change my routes?"}
          hidden={
            "Press the button labelled 'settings' at the bottom of the screen, and then tap in your location for the day you want to change your route for."
          }
        />
        <TextBlog
          text={"Any other Questions?\n Contact our Support Team!"}
          hidden={
            "Phone:  +86 (0)1223 337733\nEmail: Support@weathergpt.ai\nPostal Address:\n1600 Pennsylvania Avenue NW, Washington, DC 20500, USA"
          }
        />
      </View>
    </Background>
  );
}
