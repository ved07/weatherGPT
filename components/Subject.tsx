import { useState } from "react";
import { TextStyle, View, Text, Image } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

export const Subject = ({
    subject, 
    cyclist_position
} : {
    subject: string
    cyclist_position: number
}) => {
    if(subject == 'cycle')
        return (
            <View>
                <Image
                    source = {
                        require('./../assets/cyclist.png')
                    }
                    style = {{
                        left: cyclist_position,
                        position: "absolute",
                        top: 160
                    }}
                />
            </View>
        )
    else if(subject == 'bus') 
        return (
            <Image
            source = {
            require('./../assets/bus.png')
            }
            style = {{
            left: cyclist_position - 40,
            position: "absolute",
            top: 188,
            }}
            />
        )
    else
    return (
        <Image
        source = {
        require('./../assets/walk.gif')
        }
        style = {{
        left: cyclist_position,
        position: "absolute",
        top: 194,
        }}
        />
    )
}