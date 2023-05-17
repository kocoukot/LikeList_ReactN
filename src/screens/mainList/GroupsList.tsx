import {
  Dimensions,
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
} from 'react-native';
import {AutoDragSortableView} from 'react-native-drag-sort';
import React, {useEffect, useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ICONS_LIST} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {onOrderChange, LikedItem} from '../../store/groups';

const windowWidth = Dimensions.get('window').width;

interface Props {
  list: LikedItem[];
}
export const GroupsList: React.FC<Props> = React.memo(({list}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [data, setData] = useState<LikedItem[]>(list);
  const [isDragging, setIsDragging] = useState(-1);

  useEffect(() => {
    setData(list);
  }, [list]);

  function render_item(item: LikedItem, index: number) {
    const image = ICONS_LIST.find(listItem => {
      return listItem.title == item.itemGroupIcon;
    });

    return (
      <View
        style={[
          styles.cardOuterView,
          {backgroundColor: item.itemColor},
          !(isDragging == index) && styles.cardShadow,
        ]}
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
    <AutoDragSortableView
      minOpacity={0.4}
      dataSource={list}
      keyExtractor={(item, index) => item.key}
      parentWidth={windowWidth}
      onClickItem={(_, item) => {
        onItemPress(item);
      }}
      childrenWidth={windowWidth / 2}
      childrenHeight={windowWidth / 3.5}
      renderItem={(item, index) => {
        return render_item(item, index);
      }}
      onDragStart={fromIndex => {
        setIsDragging(fromIndex);
      }}
      onDragEnd={() => {
        setIsDragging(-1);
      }}
      onDataChange={item => {
        setData(item);
        dispatch(onOrderChange(item));
      }}
    />
  );
});

const styles = StyleSheet.create({
  cardOuterView: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    margin: 8,
    aspectRatio: 2,
    width: windowWidth / 2 - 16,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardShadow: {
    elevation: 4,
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
