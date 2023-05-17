import {StyleSheet, View, Text, FlatList, Image} from 'react-native';
import {Colors} from '../../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {useLayoutEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import RatingBarContent from '../../components/RatingBarComponent';

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


  function onRatingUpdate(){

  }
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.key}
        data={filteredList}
        renderItem={itemData => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text>
              {itemData.index + 1}. {itemData.item.itemName}
            </Text>
            {/* <View style={{flex:1}}/> */}

            <RatingBarContent
              initValue={itemData.item.itemRating}
              readonlyMode={true}
              onRatingSelect={onRatingUpdate}
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
    padding: 16,
  },
});
