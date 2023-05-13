import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Colors} from '../../utils/Colors';
import {GroupsList} from './ItemGroupList';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {LikedItem} from '../../store/groups';



export function ListScreen({navigation}) {
  const myList = useSelector((state: RootState) => state.items.list);
  console.log('myList ' + myList);

  const filteredList = myList.filter((item, index, self) => {
    return index == self.findIndex(t => t.itemGroup == item.itemGroup);
  });

  

  return (
    <View style={styles.container}>
      {filteredList.length == 0 ? (
        <Text style={styles.emptyText}>Your list is empty</Text>
      ) : (
        <GroupsList itemsList={filteredList} />
      )}
    </View>
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
