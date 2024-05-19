import Slider from '@react-native-community/slider';

type SettingSliderProps = {
  initialValue: number;
  setInputValue: (value: number) => void;
  onFinish: (value: number) => void;
  minInputLimit: number;
  maxInputLimit: number;
  step: number;
};

export default function SettingSlider({ initialValue, setInputValue, minInputLimit, maxInputLimit, onFinish, step } : SettingSliderProps) {
  return <Slider
    value={initialValue}
    style={{width: 200, height: 40}}
    minimumValue={minInputLimit}
    maximumValue={maxInputLimit}
    onValueChange={setInputValue}
    onSlidingComplete={onFinish}
    step={step}
    minimumTrackTintColor="#000000"
    maximumTrackTintColor="#808080"
  />
};
