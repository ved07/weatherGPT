import { useState } from "react";
import { TextStyle, View, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

export const TextBlog = ({
  text,
  bold,
  hidden,
  textStyle,
  title,
}: {
    text: string
    bold?: boolean
    hidden: string
    textStyle?: TextStyle
    title? : boolean
}) => {

  const [open, setOpen] = useState(false);

  return (
    <Text style = {{textAlign: "center"}}>
      {open && (
        <TouchableHighlight style = {{
          alignSelf:"center",
          width:250,
          borderColor: "black",
          borderWidth: 0,
          margin: 10,
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          paddingVertical: title ? 40 : 10,
        }}
        onPress={() => setOpen(!open)}
        
        >
          <View>
            <View style = {{
              borderBottomWidth: 1,
              borderColor: "black",
              width: 250,
            }}>
              <Text style = {textStyle}>{text}</Text>
            </View>
            <Text>{hidden}</Text>
          </View>
        
        </TouchableHighlight>
      )}
      {!open && (
        <TouchableHighlight style = {{
          height:50,
          width:250,
          borderColor: "black",
          borderWidth: 0,
          margin: 10,
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          paddingVertical: title ? 40 : 10,
        }}
        
        onPress = {() => setOpen(!open)}
        >
          <View>
            <Text style={textStyle}>{text}</Text>
          </View>
        </TouchableHighlight>
    )}
    </Text>
  )
}
