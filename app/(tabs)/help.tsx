import { Text, Button, View, Image, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextBlog } from "@/components/TextBlog";
import { Background } from "@/components/Background";
import { LinearTransition } from "react-native-reanimated";
import { LinearGradient } from 'react-native-linear-gradient';
import { Children, ReactNode } from "react";
import { styles } from "@/constants/styles";

export default function HelpScreen() {
  return (
    <Background>
      <View>
        <TextBlog text = {"HELP"} hidden = {""} textStyle = {styles.exo2BoldText} />
        <TextBlog text = {"FAQs"} hidden = {""} textStyle = {styles.exo2BoldText} />
        <TextBlog text = {"How do I input my location?"} hidden = {""} textStyle = {styles.exo2RegularText} />
        <TextBlog text = {"What does setting thresholds do?"} hidden = {""} textStyle = {styles.exo2RegularText} />
        <TextBlog text = {"What’s unique about this app?"} hidden = {""} textStyle = {styles.exo2RegularText} />
        <TextBlog text = {"How do I change my routes?"} hidden = {""} textStyle = {styles.exo2RegularText} />
        <TextBlog text = {"Any other Questions?\n Contact our Support Team!"} 
          hidden = {"Phone:  +86 (0)1223 337733\nEmail: Support@weathergpt.ai\nPostal Address:\n1600 Pennsylvania Avenue NW, Washington, DC 20500, USA"} 
        />
      </View>
    </Background>
  );
}
