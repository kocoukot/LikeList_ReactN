import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Colors} from '../../utils/Colors';
import {GroupsList} from './ItemGroupList';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {LikedItem} from '../../store/groups';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { MyTest} from '../test';

export function ListScreen({navigation}) {
  const myList = useSelector((state: RootState) => state.items.list);


  const itemsList = myList.filter((item, index, self) => {
    return index == self.findIndex(t => t.itemGroup == item.itemGroup);
  });

  return (
    // <GestureHandlerRootView>
       <View style={styles.container}>
    {/* //     {itemsList.length == 0 ? (
    //       <Text style={styles.emptyText}>Your list is empty</Text>
    //     ) : ( */}
          <MyTest list={myList}/>
          {/* // <GroupsList itemsList={itemsList} />
    //     )} */}
       </View>
    // </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'space-around',
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundColor,
  },
  emptyText: {
    paddingTop: 64,
    color: Colors.textColor,
    fontSize: 32,
    textAlign: 'center',

    alignContent: 'center',
    justifyContent: 'center',
  },
});
