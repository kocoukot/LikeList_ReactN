import {useState} from 'react';
import {RatingBar} from '@aashu-dubey/react-native-rating-bar';
import {Image, StyleSheet} from 'react-native';
import {Colors} from '../utils/Colors';

export default function RatingBarContent({onRatingSelect}) {
  const [selectedRating, setSelectedRating] = useState(5);

  return (
    <RatingBar
      rateStyles={{
        container: {
          alignItems: 'center',
        },
        starContainer: {
          alignContent: 'center',
          marginTop: 16,
          justifyContent: 'center',
        },
      }}
      initialRating={selectedRating}
      direction="horizontal"
      allowHalfRating
      itemCount={5}
      itemPadding={4}
      ratingElement={{
        full: (
          <Image
            style={styles.selectedIcon}
            resizeMode="contain"
            source={require('../../assets/heart.png')}
          />
        ),
        half: (
          <Image
            style={styles.selectedIcon}
            resizeMode="contain"
            source={require('../../assets/heart_half.png')}
          />
        ),
        empty: (
          <Image
            style={styles.notSelectedIcon}
            resizeMode="contain"
            source={require('../../assets/heart_border.png')}
          />
        ),
      }}
      onRatingUpdate={(value: number) => {
        setSelectedRating(value);
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
