import { Text, Button, View, Image, StyleSheet } from "react-native";
import { Children, ReactNode, useEffect, useRef, useState } from "react";
import { Subject } from "./Subject";
import { Cloud } from "./Cloud";
import { Plan } from "@/hooks/usePlanner";

interface BackgroundProps {
    children: ReactNode;
    plan: Plan
}

export const Background = ({ children, plan } : BackgroundProps) => {
  const [cyclist_position, setCyclistPosition] = useState(100)
  const cyclistPositionRef = useRef(99)
  const [tree_position, setTreePosition] = useState(0)
  const treePositionRef = useRef(0)
  const [sun_position_x, setSunPositionX] = useState(0)
  const sunposition_xRef = useRef(0)
  const [cloud_position_x, setCloudPositionX] = useState(66)
  const cloud_position_xRef = useRef(66)
  const [cloud_position_y, setCloudPositionY] = useState(-100)
  const cloud_position_yRef = useRef(-100)

  const tmp = useRef(0);
  const tmp2 = useRef(0);

  const subject = plan.method
  const weather = plan.toJourney.rainfall >= 10 ? 'raining' : 'cloud'

  useEffect(() => {
    const rerender = () => {


      setCyclistPosition(cyclistPositionRef.current);
      if(cyclistPositionRef.current < 100) {
        tmp2.current = 1
      } else if(cyclistPositionRef.current > 110) {
        tmp2.current = -1
      }
      cyclistPositionRef.current += tmp2.current;
      
      setTreePosition(treePositionRef.current - 1);
      treePositionRef.current -= 10
      if(treePositionRef.current < -300) {
        treePositionRef.current = 500
      }

      setCloudPositionX(cloud_position_xRef.current);
      setCloudPositionY(cloud_position_yRef.current);
      if(cloud_position_xRef.current < 67) {
        tmp.current = 1;
      } else if(cloud_position_xRef.current > 70) {
        tmp.current = -1
      }
      cloud_position_xRef.current += tmp.current;
      cloud_position_yRef.current += tmp.current;
      sunposition_xRef.current += tmp.current;
      setSunPositionX(sunposition_xRef.current);

      setTimeout(rerender, 50)
    }

    setTimeout(rerender, 50)
  }, [])
    //  style={{backgroundColor: "#089FF3"}}
    return (
      <View style={{
        width: "100%",
        height: "100%",
      }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#089FF3",
          width: "100%", height: 350, position: "absolute", top: 0, left: 0, right: 0, bottom: 0
        }}>
          <Image
            source={require('./../assets/sun.png')}
            style={{ 
              left: sun_position_x, 
              top: 0,
              marginLeft: 0, 
              flex: 1, 
              resizeMode: 'contain', 
              aspectRatio: 1,
              position: "absolute"
            }}
          />
          <Cloud weather = {weather} cloud_position_x = {cloud_position_x} cloud_position_y = {cloud_position_y}/>
          <Image
            source = {require('./../assets/tree.png')}
            style = {{
              left: tree_position,
              position: "absolute",
              top: 100
            }}
          />
          <Subject subject = {subject} cyclist_position = {cyclist_position} />
          <Image
            source = {require('./../assets/road.png')}
            style = {{
              alignContent:"center",
              position: "absolute",
              top: 334,
            }}
          />
        </View>
        <View style = {{
          backgroundColor: "#0FC100",
          height: 10000,
          zIndex: -1,
          ...StyleSheet.absoluteFillObject,
        }}/>
        <View style={{
          width: "100%",
          height: "100%",
        }}>
          {children}
        </View>
      </View>
    )
}
