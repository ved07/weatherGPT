import { Text, Button, View, Image, StyleSheet } from "react-native";
import { Children, ReactNode, useEffect, useRef, useState } from "react";
import { Directions } from "react-native-gesture-handler";

interface BackgroundProps {
    children: ReactNode;
}

var tree_position = 100;
var cyclist_position = 0;
var sun_position = 0;
var cloud_position = 0;

export const Background = ({ children } : BackgroundProps) => {
  const [cyclist_position, setCyclistPosition] = useState(0)
  const cyclistPositionRef = useRef(0)
  const [tree_position, setTreePosition] = useState(0)
  const treePositionRef = useRef(0)

  useEffect(() => {
    const rerender = () => {
      setCyclistPosition(cyclistPositionRef.current);
      if(cyclistPositionRef.current > 100) {
        cyclistPositionRef.current -= 10
      } else if(cyclistPositionRef) {
        cyclistPositionRef.current += 10
      }
      setTreePosition(treePositionRef.current - 1);
      treePositionRef.current -= 10
      if(treePositionRef.current < -300) {
        treePositionRef.current = 1000
      }

      console.log()

      setTimeout(rerender, 50)
    }

    setTimeout(rerender, 50)
  }, [])
    
    return (
      <View style={{backgroundColor: "#089FF3"}}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
          <Image
              source={require('./../assets/sun.png')}
              style={{ 
                left: sun_position, 
                top: sun_position,
                marginLeft: 0, 
                flex: 1, 
                resizeMode: 'contain', 
                aspectRatio: 1,
                position: "absolute"
              }}
          />
          <Image
              source={require('./../assets/cloud.png')}
              
              style={{ 
                left:66,
                marginLeft: 1, 
                flex: 2, 
                resizeMode: 'contain', 
                aspectRatio: 3,
              }}
          />
          <Image
            source = {require('./../assets/tree.png')}
            style = {{
              left: tree_position,
              position: "absolute",
              top: 100
            }}
          />
          <Image
            source = {require('./../assets/cyclist.png')}
            style = {{
              left: cyclist_position,
              position: "absolute",
              top: 160
            }}
          />
          <Image
            source = {require('./../assets/road.png')}
            style = {{
              alignContent:"center",
              position: "absolute",
              top: 334
            }}
          />
      </View>
        <View style = {{
          backgroundColor: "#0FC100",
          marginTop: 350,
          height: 700,
          ...StyleSheet.absoluteFillObject,
        }}/>
        {children}
      </View>
    )
}
