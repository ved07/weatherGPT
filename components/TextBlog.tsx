import { TextStyle, View, Text } from "react-native";

export const TextBlog = ({
  text,
  bold,
  hidden,
  textStyle
}: {
    text: string
    bold?: boolean
    hidden: string
    textStyle?: TextStyle
}) => {

  return (
    <Text style = {{textAlign: "center"}}>
      <View style = {{
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
        backgroundColor: 'white'
      }}>
        <Text style = {{
          textAlign: "center", 
          fontSize: 15,
          fontWeight: bold ? 'bold' : 'normal',
          }}>{text}</Text>
      </View>
    </Text>
  )
}
