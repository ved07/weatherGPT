import { Text, Button } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HelpScreen() {
  return (
    <SafeAreaView className="bg-gray-200">
      <Text className="text-blue-200">Hi this is a test</Text>
      <Button color="#FF0000" title="Click me"/>
    </SafeAreaView>
  );
}
