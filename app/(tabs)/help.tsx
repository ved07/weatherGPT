import { Text, Button, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextBlog } from "@/components/TextBlog";
import { LinearTransition } from "react-native-reanimated";
import LinearGradient from 'react-native-linear-gradient';


export default function HelpScreen() {
  return (
    <View>
    <LinearGradient 
      colors={['#87CEEB', '#1E90FF']}
      style={{flex:1}}
    >
      <TextBlog text = {"HELP"} hidden = {""} bold = {true} />
      <TextBlog text = {"FAQs"} hidden = {""} />
      <TextBlog text = {"How do I input my location?"} hidden = {""} />
      <TextBlog text = {"What does setting thresholds do?"} hidden = {""} />
      <TextBlog text = {"What’s unique about this app?"} hidden = {""} />
      <TextBlog text = {"How do I change my routes?"} hidden = {""} />
      <TextBlog text = {"Any other Questions?\n Contact our Support Team!"} 
        hidden = {"Phone:  +86 (0)1223 337733\nEmail: Support@weathergpt.ai\nPostal Address:\n1600 Pennsylvania Avenue NW, Washington, DC 20500, USA"} 
        bold = {true}/>
    </LinearGradient>
    </View>
  );
}