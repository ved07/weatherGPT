import { Text, Button, View, Image, StyleSheet } from "react-native";
import { Children, ReactNode } from "react";

interface BackgroundProps {
    children: ReactNode;
}

const TopGraphic = () => {
    return (
      <View>
        <Image
          source={require('./../assets/sun.png')}
          style={{ width: 70, height: 70, margin: 10 }}
        />
      </View>
    )
}

export const Background = ({ children } : BackgroundProps) => {
    return (
      <View style={{backgroundColor: "#089FF3"}}>
        <TopGraphic/>
        <View style = {{
          backgroundColor: "#0FC100",
          marginTop: 270,
          height: 700,
          ...StyleSheet.absoluteFillObject,
        }}/>
        {children}
      </View>
    )
}