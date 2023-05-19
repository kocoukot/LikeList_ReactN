import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../utils/Colors';
import StarRating from 'react-native-star-rating';
import {useEffect, useState} from 'react';
//
export default function RatingBarContent({
  initValue = 4,
  readonlyMode = false,
  onRatingSelect,
}) {
  function ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
    onRatingSelect(rating);
  }

  const [rating, setRating] = useState(initValue);
  useEffect(()=>{

    setRating(initValue)
  }, [initValue])
  return (
    <StarRating
      starSize={readonlyMode ? 28 : 32}
      containerStyle={{paddingTop: readonlyMode ? 0 : 16}}
      starStyle={{paddingHorizontal: readonlyMode ? 4 : 18}}
      emptyStar={Platform.OS == 'ios' ? 'ios-heart' : 'heart'}
      fullStar={Platform.OS == 'ios' ? 'ios-heart' : 'heart'}
      halfStar={Platform.OS == 'ios' ? 'ios-heart' : 'heart'}
      iconSet={Platform.OS == 'ios' ? 'Ionicons' : 'Foundation'}
      fullStarColor={Colors.tabBarInactiveColor}
      emptyStarColor={Colors.buttonColor}
      halfStarColor={Colors.tabBarInactiveColor}
      disabled={readonlyMode}
      maxStars={5}
      rating={rating}
      selectedStar={rating => {
        setRating(rating);
        ratingCompleted(rating);
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
