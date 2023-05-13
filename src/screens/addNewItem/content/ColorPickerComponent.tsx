import ColorPicker, {HueSlider} from 'reanimated-color-picker';
import { StyleSheet } from 'react-native';

export default function ColorPickerComponent({onSelectColor}) {
  const sliderThikness = 6;
  const thumbSize = 20;
  return (
    <ColorPicker
      boundedThumb={true}
      thumbSize={thumbSize}
      sliderThickness={sliderThikness}
      style={{paddingVertical: 24}}
      value="#ffd6d6"
      thumbShape="circle"
      onComplete={onSelectColor}>
      <HueSlider adaptSpectrum={true} style={styles.slider} vertical={true} />
    </ColorPicker>
  );
}


const styles = StyleSheet.create({
    slider: {
        height: 200,
      },
})