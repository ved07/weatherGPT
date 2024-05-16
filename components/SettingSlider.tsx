import Slider from '@react-native-community/slider';

type SettingSliderProps = {
  setInputValue: (value: number) => void;
  minInputLimit: number;
  maxInputLimit: number;
};

export default function SettingSlider({ setInputValue, minInputLimit, maxInputLimit } : SettingSliderProps) {
  return <Slider
    style={{width: 200, height: 40}}
    minimumValue={minInputLimit}
    maximumValue={maxInputLimit}
    onValueChange = {setInputValue}
    minimumTrackTintColor="#000000"
    maximumTrackTintColor="#808080"
  />
};
