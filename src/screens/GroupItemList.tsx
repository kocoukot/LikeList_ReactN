import {StyleSheet, View, Text, FlatList, Image} from 'react-native';
import {Colors} from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {useLayoutEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {RatingBar} from '@aashu-dubey/react-native-rating-bar';

export function GroupItemList({route}) {
  const navigation = useNavigation();
  const selectedGroupName = route.params.groupName;
  const myList = useSelector((state: RootState) => state.items.list);

  const filteredList = myList.filter(item => {
    return item.itemGroup == selectedGroupName;
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedGroupName,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.key}
        data={filteredList}
        renderItem={itemData => (
          <View style={{flexDirection: 'row', justifyContent:'space-between', alignContent:'space-between', alignItems:"center"}}>
            <Text>
              {itemData.index + 1}. {itemData.item.itemName}
            </Text>
            {/* <View style={{flex:1}}/> */}
            <RatingBar
              rateStyles={{
                container: {
                  alignContent: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  alignItems:"flex-end",
                },
                starContainer: {
                  alignContent: 'center',
                  justifyContent: 'center',
                },
              }}
              initialRating={itemData.item.itemRating}
              direction="horizontal"
              allowHalfRating
              itemCount={5}
              itemPadding={4}
              ratingElement={{
                full: (
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: Colors.tabBarInactiveColor,
                    }}
                    resizeMode="contain"
                    source={require('../../assets/heart.png')}
                  />
                ),
                half: (
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: Colors.tabBarInactiveColor,
                    }}
                    resizeMode="contain"
                    source={require('../../assets/heart_half.png')}
                  />
                ),
                empty: (
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: Colors.buttonColor,
                    }}
                    resizeMode="contain"
                    source={require('../../assets/heart_border.png')}
                  />
                ),
              }}
              onRatingUpdate={value => {}}
            />
          </View>
        )}></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    padding:16
  },
});
