import {Image} from "react-native";

export const Cloud = ({
    weather, 
    cloud_position_x,
    cloud_position_y,
} : {
    weather: string,
    cloud_position_x: number,
    cloud_position_y: number
}) => {
    if (weather == 'raining')
    return (
        <Image
            source={require('./../assets/raining.png')}
            style={{
                left:cloud_position_x + 10,
                top: cloud_position_y + 40,
                marginLeft: 1, 
                flex: 2, 
                resizeMode: 'contain', 
                aspectRatio: 1.5,
                height: "auto",
                zIndex:1
            }}
          />
        )
    else 
    return (
        <Image
            source={require('./../assets/cloud2.png')}
            style={{
              left:cloud_position_x,
              top: cloud_position_y,
              marginLeft: 1, 
              flex: 2, 
              resizeMode: 'contain', 
              aspectRatio: 3,
              height: "auto",
              zIndex:1
            }}
          />
        )
}