import {Rating} from 'react-native-ratings';
import {StyleSheet} from 'react-native';
import {Colors} from '../utils/Colors';

export default function RatingBarContent({
  initValue = 4,
  readonlyMode = false,
  onRatingSelect,
  style,
}) {
  

  return (
    <Rating
    readonly={readonlyMode}
      imageSize={30}
      startingValue={4}
      type='custom'
      tintColor={Colors.backgroundColor}
      ratingBackgroundColor={Colors.tabBarColor}
      ratingColor={Colors.tabBarInactiveColor}
      style={style}
      ratingImage={require('../../assets/heart.png')}
      onFinishRating={(value: number) => {
        onRatingSelect(value);
      }}
/>   
  );
}

const styles = StyleSheet.create({
  selectedIcon: {
    width: 30,
    height: 30,
    tintColor: Colors.tabBarInactiveColor,
  },
  notSelectedIcon: {
    width: 30,
    height: 30,
    tintColor: Colors.buttonColor,
  },
});
