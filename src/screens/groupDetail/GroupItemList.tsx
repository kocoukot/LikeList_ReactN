import {
  StyleSheet,
  View,
  Text,
  SectionList,
  Dimensions,
  Pressable,
} from 'react-native';
import {Colors} from '../../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useLayoutEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import RatingBarContent from '../../components/RatingBarComponent';
import {LikedItem} from '../../store/groups';

const {width, height} = Dimensions.get('window');

interface IGroup {
  title: string;
  data: LikedItem[];
}

export function GroupItemList({route}) {
  const navigation = useNavigation();
  const selectedGroupName = route.params.groupName;

  const myList = useSelector((state: RootState) => state.items.list);
  const [groupList, setGroupList] = useState([]);

  const uniqueTags = [];
  const groupItemsList = myList.filter(item => {
    return item.itemGroup == selectedGroupName;
  });

  groupItemsList.map(groupItem => {
    if (uniqueTags.indexOf(groupItem.itemSubgroup) === -1) {
      uniqueTags.push(groupItem.itemSubgroup);
    }
  });

  const dataList = uniqueTags.map(subGroupItem => {
    const newItem: IGroup = {
      title: subGroupItem,
      data: groupItemsList.filter(gItem => {
        return gItem.itemSubgroup == subGroupItem;
      }),
    };
    return newItem;
  });

  useEffect(() => {
    setGroupList(dataList);
    console.log("useEffect myList " + dataList.map(item => {return }))
  }, [myList]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedGroupName,
    });
  }, [navigation]);

  function onRatingUpdate() {}

  function separator() {
    return <View style={{height: 8}} />;
  }
  function separator2() {
    return <View style={{height: 4}} />;
  }

  function onPress(item: LikedItem) {
    navigation.navigate(
      'ItemDetailInfo' as never,
      {selectedItem: item.key} as never,
    );
  }

  return (
    <View style={styles.container}>
      <SectionList
        ItemSeparatorComponent={separator2}
        SectionSeparatorComponent={separator}
        style={{backgroundColor: Colors.backgroundColor, marginTop: 16}}
        sections={groupList}
        keyExtractor={(item, index) => item.key + index}
        renderSectionHeader={({section: {title}}) => {
          return (
            <View style={{backgroundColor: Colors.backgroundColor}}>
              <View style={styles.headerView}>
                <Text style={styles.headerText}>{title}</Text>
              </View>
            </View>
          );
        }}
        renderItem={({item, index}) => {
          return (
            <Pressable
              style={({pressed}) => {
                return pressed
                  ? [styles.rowPress, styles.pressed]
                  : [styles.rowPress];
              }}
              onPress={() => {
                onPress(item);
              }}
              android_ripple={{color: Colors.ripple}}>
              <View style={styles.itemRow}>
                <Text style={styles.title}>{item.itemName}</Text>
                <RatingBarContent
                  initValue={item.itemRating}
                  readonlyMode={true}
                  onRatingSelect={onRatingUpdate}
                />
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingHorizontal: 16,
    // paddingTop: 16,
    overflow: 'visible',
  },
  headerView: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: Colors.buttonColor,
    verticalAlign: 'middle',
  },
  headerText: {
    fontSize: 22,
    textAlign: 'left',
    color: Colors.tabBarActiveColor,
  },
  rowPress: {},
  pressed: {
    opacity: 0.5,
  },
  itemRow: {
    paddingVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    color: Colors.textColor,
    flex: 0.9,
    fontSize: 18,
    paddingStart: 16,
  },
});
