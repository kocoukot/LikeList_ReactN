import {Platform, Pressable, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../utils/Colors';

export default function ItemIcon({icon, color, size}) {
  Platform;
  return Platform.OS == 'ios' ? (
    <Icon ios={icon} color={color} size={size} />
  ) : (
    <Ionicons name={icon} color={color} size={size} />
  );
}

export function PressableIcon({icon, color, size, onPress}) {
  return (
    <Pressable
      style={({pressed}) => {
        return pressed
          ? [
              {height: size, width: size, justifyContent: 'center'},
              styles.pressed,
            ]
          : [{height: size, width: size, justifyContent:"center"}];
      }}
      android_ripple={{color: Colors.ripple, borderless: true}}
      onPress={onPress}>
      <ItemIcon icon={icon} color={color} size={size} />
    </Pressable>
  );
}


export function PressableImage({image, color, size, onPress}) {
  return (
    <Pressable
      style={({pressed}) => {
        return pressed
          ? [
              {height: size, width: size, justifyContent: 'center'},
              styles.pressed,
            ]
          : [{height: size, width: size, justifyContent:"center"}];
      }}
      android_ripple={{color: Colors.ripple, borderless: true}}
      onPress={onPress}>
     <Image style={{ height: size, width: size, tintColor:color}} source={image}/>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
});
