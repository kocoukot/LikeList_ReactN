import {
  Dimensions,
  Text,
  StyleSheet,
  View,
  Image,
  StatusBar,
} from 'react-native';
import {AutoDragSortableView} from 'react-native-drag-sort';
import React, {memo, useEffect, useState} from 'react';

import {ICONS_LIST} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {onOrderChange, LikedItem, removeItem} from '../../store/groups';
import { Colors } from '../../utils/Colors';

const {width, height} = Dimensions.get('window');
const deleteHeight = 150;


export const GroupsList = memo((list : {list: LikedItem[]}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [dataList, setListData] = useState<LikedItem[]>(list.list);
  const [isDragging, setIsDragging] = useState(-1);
  const [deleteStatus, setDeleteStatus] = useState(0);
  const [isBuffer, setBuffer] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number>(null);

  useEffect(() => {
    setListData(list.list);
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
          style={{flex: 1,}}
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

  function onDragging(gestureState, left, top) {
    if (isBuffer) return;

    if (
      gestureState.moveY + (StatusBar.currentHeight | 0) + deleteHeight >=
      height
    ) {
      setBuffer(true);
      setDeleteStatus(2);
      setBuffer(false);
      // this.setState({deleteStatus: 2},() => {this.isBuffer = false})
    } else if (deleteStatus !== 1) {
      setBuffer(true);
      setDeleteStatus(1);
      setBuffer(false);

      // this.isBuffer = true;
      // this.setState({deleteStatus: 1},() => {this.isBuffer = false})
    }
  }

  function onDragStart(fromIndex) {
    setDeleteStatus(1);
    setIsDragging(fromIndex);
  }

  function onDragEnd(startIndex, endIndex) {
    if (deleteStatus === 2) {
      if (startIndex === endIndex) {
        const newData = [...dataList];
        newData.splice(startIndex, 1);
        setDeleteStatus(0);
        setListData(newData);
      } else {
        setDeleteIndex(endIndex);
        setDeleteStatus(0);
      }
    } else {
      setDeleteStatus(0);
    }
    setIsDragging(-1);
  }

  function renderDeleteView() {
    if (deleteStatus === 1 || deleteStatus === 2) {
      return (
        <View style={styles.delete}>
          {/* <Image style={styles.delete_icon} source={require('../data/img/delete.png')}/> */}
          <Text style={styles.delete_txt}>
            {deleteStatus === 2 ? 'Release your hand to delete' : 'Delete'}
          </Text>
        </View>
      );
    }
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.sort}>
        <AutoDragSortableView
        bottomViewHeight={0}
          renderBottomView={<View style={{flex: 1, height: 150}} />}
          minOpacity={0.4}
          dataSource={dataList}
          isDragFreely={true}
          keyExtractor={(item) => item.key}
          parentWidth={width}
          onClickItem={(_, item) => {
            // dispatch(removeItem(item));
            onItemPress(item);
          }}
          childrenWidth={width / 2}
          childrenHeight={width / 3.5}
          renderItem={(item, index) => {
            return render_item(item, index);
          }}
          onDragging={onDragging}
          onDragStart={fromIndex => {
            onDragStart(fromIndex);
          }}
          onDragEnd={(fromIndex, toIndex) => {
            onDragEnd(fromIndex, toIndex);
          }}
          onDataChange={data => {
            if (deleteIndex != null) {
              setDeleteIndex(null);
              const itemToDelete = data[deleteIndex];
              dispatch(removeItem(itemToDelete));
            } 
             else {
              dispatch(onOrderChange(data));
            }
          }}
        />
      </View>
      {renderDeleteView()}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,

  },
  sort: {

    flex: 1,
  },
  cardOuterView: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    margin: 8,
    aspectRatio: 2,
    width: width / 2 - 16,
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
  delete: {
    width: width,
    paddingBottom: 80,
    height: deleteHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e19a7c',
    zIndex: 1,
  },
  delete_icon: {
    width: 24,
    height: 24,
  },
  delete_txt: {
    fontSize: 16,
    color: Colors.textColor,
    fontWeight:"600"
  },
});
