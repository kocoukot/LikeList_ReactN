import {FlatList, View, StyleSheet, Text, Pressable} from 'react-native';
import GroupModel from '../utils/GroupModel';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

export function GroupsList({itemsList}) {
  const myList = useSelector((state: RootState) => state.listItems).items;

  const navigation = useNavigation();

  function renderCardItem(itemData) {
    return <GroupCard itemInfo={itemData.item} />;
  }

  function GroupCard({itemInfo}) {
    function onCardSelect() {
      navigation.navigate('Details', {
        groupName: itemInfo.itemGroup,
      });
    }

    return (
      <View style={[styles.cardOuterView]}>
        <Pressable
          style={({pressed}) => {
            return pressed
              ? [
                  styles.cardInnerView,
                  styles.pressed,
                  {backgroundColor: itemInfo.itemColor},
                ]
              : [styles.cardInnerView, {backgroundColor: itemInfo.itemColor}];
          }}
          onPress={onCardSelect}
          android_ripple={{color: Colors.ripple, borderless: true}}>
          <Text>{itemInfo.itemGroup}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      numColumns={2}
      contentContainerStyle={styles.list}
      data={itemsList}
      keyExtractor={item => item.id}
      renderItem={renderCardItem}
    />
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
    aspectRatio: 1,
    flex: 1,
    elevation: 4,
    borderRadius: 28,
  },
  cardInnerView: {
    flex: 1,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowRadius: 28,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
  },
  title: {
    fontSize: 32,
  },
  pressed: {
    borderRadius: 28,
    opacity: 0.5,
  },
  
});
