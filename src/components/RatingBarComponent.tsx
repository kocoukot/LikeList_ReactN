import {Rating} from 'react-native-ratings';
import {StyleSheet} from 'react-native';
import {Colors} from '../utils/Colors';

export default function RatingBarContent({
  initValue = 4,
  readonlyMode = false,
  onRatingSelect,
  style,
}) {
  function ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
    onRatingSelect(rating);
  }

  return (
    <Rating
      readonly={readonlyMode}
      imageSize={30}
      startingValue={initValue}
      type="custom"
      tintColor={Colors.backgroundColor}
      ratingBackgroundColor={Colors.tabBarColor}
      ratingColor={Colors.tabBarInactiveColor}
      style={style}
      ratingImage={require('../../assets/heart.png')}
      onFinishRating={ratingCompleted}
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
