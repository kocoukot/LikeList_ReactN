import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import {DraggableGrid} from 'react-native-draggable-grid';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {LikedItem} from '../store/groups';
import {useNavigation} from '@react-navigation/native';
import {ICONS_LIST} from '../../assets';

const windowWidth = Dimensions.get('window').width;

export function MyTest({list}) {
  const [data, setData] = useState<LikedItem[]>(list);
  const navigation = useNavigation();

  function render_item(item: LikedItem) {

    const image = ICONS_LIST.find(listItem => {
      return listItem.title == item.itemGroupIcon
    })

    return (
      <View
        style={[styles.cardOuterView, {backgroundColor: item.itemColor}]}
        key={item.key}>
        <Text style={styles.title}>{item.itemGroup}</Text>
        <Image
          style={{
            flex: 1,
            tintColor: Colors.tabBarInactiveColor,
          }}
          resizeMode="contain"
          source={image.image}
        />
      </View>
    );
  }
  function onItemPress(item: LikedItem) {
    navigation.navigate(
      'Details' as never,
      {
        groupName: item.itemGroup,
      } as never,
    );
  }

  return (
    <DraggableGrid
      itemHeight={windowWidth / 3.5}
      numColumns={2}
      onItemPress={onItemPress}
      renderItem={render_item}
      data={data}
      onDragRelease={data => {
        setData(data);
      }}
    />
  );
}

const styles = StyleSheet.create({
  cardOuterView: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    margin: 8,
    aspectRatio: 2,
    width: windowWidth / 2 - 16,
    elevation: 4,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowRadius: 4,
    shadowOpacity: 0.4,
    shadowOffset: {width: 0, height: 1},
  },

  cardInnerView: {
    flex: 1,
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
});
