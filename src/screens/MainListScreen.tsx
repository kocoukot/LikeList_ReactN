import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Colors} from '../utils/Colors';
import {GroupsList} from '../components/ItemGroupList';
import GroupModel from '../utils/GroupModel';

export function ListScreen({navigation}) {
  const listData = [
    new GroupModel('Item 1', 'Group A', '', 'red'),
    new GroupModel('Item 2', 'Group B', '', 'blue'),
    new GroupModel('Item 3', 'Group B', '', 'green'),
    new GroupModel('Item 1', 'Group A', '', 'red'),
    new GroupModel('Item 2', 'Group B', '', 'blue'),
    new GroupModel('Item 3', 'Group B', '', 'green'),
    new GroupModel('Item 1', 'Group A', '', 'red'),
    new GroupModel('Item 2', 'Group B', '', 'blue'),
    new GroupModel('Item 3', 'Group B', '', 'green'),
    new GroupModel('Item 1', 'Group C', '', 'green'),
    new GroupModel('Item 2', 'Group C', '', 'blue'),
    new GroupModel('Item 3', 'Group B', '', 'green'),
    new GroupModel('Item 1', 'Group A', '', 'green'),
    new GroupModel('Item 2', 'Group B', '', 'blue'),
    new GroupModel('Item 3', 'Group B', '', 'green'),
    new GroupModel('Item 1', 'Group A', '', 'red'),
    new GroupModel('Item 2', 'Group B', '', 'blue'),
    new GroupModel('Item 3', 'Group B', '', 'green'),
    new GroupModel('Item 1', 'Group A', '', 'red'),
    new GroupModel('Item 2', 'Group C', '', 'blue'),
    new GroupModel('Item 3', 'Group B', '', 'green'),
    new GroupModel('Item 2', 'Group B', '', 'blue'),
    new GroupModel('Item 3', 'Group B', '', 'green'),
    new GroupModel('Item 1', 'Group A', '', 'red'),
    new GroupModel('Item 2', 'Group D', '', 'yellow'),
    new GroupModel('Item 3', 'Group B', '', 'green'),
  ];

  const filteredList = 
  listData.filter((item, index, self) => {
    return index === self.findIndex(t => t.itemGroup === item.itemGroup);
  });

  return (
    <View style={styles.container}>
       {filteredList.length == 0 ? <Text style={styles.emptyText}>Your list is empty</Text> :
      <GroupsList itemsList={filteredList} />}
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
