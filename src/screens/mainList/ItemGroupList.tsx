import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  Image,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import GridView from 'react-native-draggable-gridview'
import {LikedItem} from '../../store/groups';

const windowWidth = Dimensions.get('window').width;


export function GroupsList(props: {itemsList: LikedItem[]}) {
  const navigation = useNavigation();
  
  function onCardSelect(itemGroup: string) {
    navigation.navigate(
      'Details' as never,
      {
        groupName: itemGroup,
      } as never,
    );
  }
  function renderCardItem(item: LikedItem) {
    return (
      <View style={[styles.cardOuterView]} key={item.key}>
        <Pressable
          style={({pressed}) => {
            return pressed
              ? [
                  styles.cardInnerView,
                  styles.pressed,
                  {backgroundColor: item.itemColor},
                ]
              : [styles.cardInnerView, {backgroundColor: item.itemColor}];
          }}
          // onPress={onCardSelect}
          android_ripple={{color: Colors.ripple, borderless: true}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: 1,
              paddingHorizontal: 18,
            }}>
            <Text style={styles.title}>{item.itemGroup}</Text>
            <View style={{width: 8}} />
            {/* //todo */}
            {/* <Image
              style={{
                flex: 1,
                tintColor: Colors.tabBarInactiveColor,
              }}
              resizeMode="contain"
              source={itemInfo.itemGroupIcon}
            /> */}
          </View>
        </Pressable>
      </View>
    );
  }

  function render_item(item: {name: string; key: string}) {
    return (
      <View style={styles.cardOuterView} key={item.key}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
    );
  }

  const initData = [
    {name: '1', key: 'one'},
    {name: '2', key: 'two'},
    {name: '3', key: 'three'},
    {name: '4', key: 'four'},
    {name: '5', key: 'five'},
    {name: '6', key: 'six'},
    {name: '7', key: 'seven'},
    {name: '8', key: 'eight'},
    {name: '9', key: 'night'},
    {name: '0', key: 'zero'},
  ];
  const [items, setItemsList] = useState(props.itemsList);
  // const [data, setData] = useState(initData);

  // function renderItem(item, index) {
  //   return <Card item={item} />;
  // }
  const [data, setData] = useState(['1', '2', '3', '4', '5', '6'])
  
  return (
    <View/>
    // <FlatList
    //   numColumns={2}
    //   contentContainerStyle={styles.list}
    //   data={itemsList}
    //   keyExtractor={item => item.id}
    //   renderItem={renderCardItem}
    // />
  );
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    // justifyContent: 'space-between',
    paddingBottom: 88,
  },
  cardOuterView: {
    margin: 8,
    aspectRatio: 2,
    width: windowWidth / 2 - 16,

    elevation: 4,
    borderRadius: 28,
  },
  cardInnerView: {
    flex: 1,
    // borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowRadius: 28,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0.02,
    textAlign: 'center',
    flex: 2,
  },
  pressed: {
    borderRadius: 28,
    opacity: 0.5,
  },
});
