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

  const [pos1, setPos1] = useState(0)
  const pos1Ref = useRef(0)
  const [pos2, setPos2] = useState(60)
  const pos2Ref = useRef(60)
  const [pos3, setPos3] = useState(120)
  const pos3Ref = useRef(120)
  const [pos4, setPos4] = useState(180)
  const pos4Ref = useRef(180)
  const [pos5, setPos5] = useState(240)
  const pos5Ref = useRef(240)
  const [pos6, setPos6] = useState(300)
  const pos6Ref = useRef(300)
  const [pos7, setPos7] = useState(360)
  const pos7Ref = useRef(360)

  const tmp = useRef(0);
  const tmp2 = useRef(0);

  const weather = useRef(plan.toJourney.rainfall >= 20 ? 'raining' : 'cloud')

  useEffect(() => {
    const rerender = () => {

      weather.current = plan.toJourney.rainfall >= 20 ? 'raining' : 'cloud';

      setCyclistPosition(cyclistPositionRef.current);
      if(cyclistPositionRef.current < 100) {
        tmp2.current = 1
      } else if(cyclistPositionRef.current > 110) {
        tmp2.current = -1
      }
      cyclistPositionRef.current += tmp2.current;
      
      setTreePosition(treePositionRef.current - 1);
      treePositionRef.current -= 10
      pos1Ref.current -= 10
      pos2Ref.current -= 10
      pos3Ref.current -= 10
      pos4Ref.current -= 10
      pos5Ref.current -= 10
      pos6Ref.current -= 10
      pos7Ref.current -= 10
      if(pos1Ref.current <= -20) pos1Ref.current = 400
      if(pos2Ref.current <= -20) pos2Ref.current = 400
      if(pos3Ref.current <= -20) pos3Ref.current = 400
      if(pos4Ref.current <= -20) pos4Ref.current = 400
      if(pos5Ref.current <= -20) pos5Ref.current = 400
      if(pos6Ref.current <= -20) pos6Ref.current = 400
      if(pos7Ref.current <= -20) pos7Ref.current = 400
      setPos1(pos1Ref.current)
      setPos2(pos2Ref.current)
      setPos3(pos3Ref.current)
      setPos4(pos4Ref.current)
      setPos5(pos5Ref.current)
      setPos6(pos6Ref.current)
      setPos7(pos7Ref.current)
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
          <Cloud weather = {weather.current} cloud_position_x = {cloud_position_x} cloud_position_y = {cloud_position_y}/>
          <Image
            source = {require('./../assets/tree.png')}
            style = {{
              left: tree_position,
              position: "absolute",
              top: 100,
            }}
          />
          <Subject subject = {plan.method} cyclist_position = {cyclist_position} />
          <Image
            source = {require('./../assets/road.png')}
            style = {{
              alignContent:"center",
              position: "absolute",
              top: 334,
            }}
          />
          <Image
            source = {require('./../assets/mark.png')}
            style = {{
              alignContent:"center",
              position: "absolute",
              top: 334,
              left: pos1
            }}
          />
          <Image
            source = {require('./../assets/mark.png')}
            style = {{
              alignContent:"center",
              position: "absolute",
              top: 334,
              left: pos2
            }}
          />
          <Image
            source = {require('./../assets/mark.png')}
            style = {{
              alignContent:"center",
              position: "absolute",
              top: 334,
              left: pos3
            }}
          />
          <Image
            source = {require('./../assets/mark.png')}
            style = {{
              alignContent:"center",
              position: "absolute",
              top: 334,
              left: pos4
            }}
          />
          <Image
            source = {require('./../assets/mark.png')}
            style = {{
              alignContent:"center",
              position: "absolute",
              top: 334,
              left: pos5
            }}
          />
          <Image
            source = {require('./../assets/mark.png')}
            style = {{
              alignContent:"center",
              position: "absolute",
              top: 334,
              left: pos6
            }}
          />
          <Image
            source = {require('./../assets/mark.png')}
            style = {{
              alignContent:"center",
              position: "absolute",
              top: 334,
              left: pos7
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
