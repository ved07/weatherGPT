import { Text, Button, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HelpScreen() {
  return (
    <View>
      <View style={{alignItems:"center"}}>
        <View><Text>HELP</Text></View>
        <View><Text>FAQs</Text></View>
        <View><Text>How do I input my location?</Text></View>
        <View><Text>What does setting thresholds do?</Text></View>
        <View><Text>What’s unique about this app?</Text></View>
        <View><Text>How do I change my routes?</Text></View>
        <View><Text>Any other Questions? Contact our Support Team!</Text></View>
        <View><Text>Phone:  +86 (0)1223 337733
            Email: Support@weathergpt.ai
            Postal Address:
            1600 Pennsylvania Avenue NW, Washington, DC 20500, USA
            </Text>
        </View>
      </View>
    </View>
  );
}