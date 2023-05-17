import {Platform} from 'react-native';
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
