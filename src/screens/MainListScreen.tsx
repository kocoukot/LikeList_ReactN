import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Colors} from '../utils/Colors';
import {GroupsList} from '../components/ItemGroupList';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import GroupModel from '../utils/GroupModel';

// import GroupModel from '../utils/GroupModel';

export function ListScreen({navigation}) {
  const myList = useSelector((state: RootState) => state.items.todos);
  console.log("myList " + myList )

  
  const userList = myList.map(userObject => createUserFromObject(userObject));

  function createUserFromObject(myList) {
    return new GroupModel(myList.itemName, myList.itemGroup, myList.itemColor, myList.id);
  }
  console.log("userList " + userList )
  



  const filteredList = userList.filter((item, index, self) => {
    return index == self.findIndex(t => t.itemGroup == item.itemGroup);
  });

  console.log("myList filteredList " + filteredList.length + " end")

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
