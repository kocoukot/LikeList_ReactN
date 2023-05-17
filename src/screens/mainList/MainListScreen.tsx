import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Colors} from '../../utils/Colors';

import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {GroupsList} from './GroupsList';

export function ListScreen({navigation}) {
  const myList = useSelector((state: RootState) => state.items.list);

  const itemsList = myList.filter((item, index, self) => {
    return index == self.findIndex(t => t.itemGroup == item.itemGroup);
  });

  return (
    <View style={styles.container}>
      {itemsList.length == 0 ? (
        <Text style={styles.emptyText}>Like list is empty</Text>
      ) : (
        <GroupsList list={itemsList} />
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
