import { TextStyle, StyleSheet } from "react-native";

export interface Styles {
  farroBoldText: TextStyle;
  farroLightText: TextStyle;
  farroMediumText: TextStyle;
  farroRegularText: TextStyle;
  exo2BoldText: TextStyle;
  exo2RegularText: TextStyle;
}

export const styles: Styles = StyleSheet.create({
  farroBoldText: {
    fontFamily: "Farro-Bold.ttf",
    fontSize: 24,
  },
  farroLightText: {
    fontFamily: "Farro-Light.ttf",
    fontSize: 24,
  },
  farroMediumText: {
    fontFamily: "Farro-Medium.ttf",
    fontSize: 24,
  },
  farroRegularText: {
    fontFamily: "Farro-Regular.ttf",
    fontSize: 24,
  },
  exo2BoldText: {
    fontFamily: "Exo2-VariableFont_wght.ttf",
    fontSize: 30,
    fontWeight: "bold"
  },
  exo2RegularText: {
    fontFamily: "Exo2-VariableFont_wght.ttf",
    fontSize: 16,
  },
});
