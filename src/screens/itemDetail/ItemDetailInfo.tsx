import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useLayoutEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';
import InputComponent from '../../components/InputComponent';
import RatingBarContent from '../../components/RatingBarComponent';
import {MainAppButton} from '../../components/Buttons';
import {LikedItem, onUpdateItem} from '../../store/groups';

export default function ItemDetailInfo({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selectedItemKey = route.params.selectedItem;
  const selectedItem = useSelector((state: RootState) => state.items.list).find(
    item => {
      return selectedItemKey == item.key;
    },
  );
  const [likedItem, setLikedItem] = useState<LikedItem>();
  useEffect(() => {
    setLikedItem(selectedItem);
  }, [navigation]);
  
  useLayoutEffect(() => {
    console.log('selectedItem ' + selectedItem.itemRating);
    navigation.setOptions({
      title: selectedItem.itemName,
    });
  }, [navigation]);

  function onItemDataChanged(identifierKey: string, text: string) {
    console.log('identifierKey ' + identifierKey + ' text ' + text);
    setLikedItem(current => {
      return {
        ...current,
        [identifierKey]: text,
      };
    });
    // console.log('likedItem ' + likedItem);
  }

  function onSaveItem() {
    dispatch(onUpdateItem(likedItem));
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <InputComponent
        initValue={likedItem?.itemName}
        limitAmount={30}
        placeholder={'Item name'}
        onTextChanged={(text: string) => {
          onItemDataChanged('itemName', text);
        }}
      />

      {!!selectedItem.itemRating && (
        <RatingBarContent
          initValue={likedItem?.itemRating ? likedItem?.itemRating: 3}
          onRatingSelect={(rating: number) => {
            onItemDataChanged('itemRating', rating.toString());
          }}
        />
      )}
      <InputComponent
        initValue={likedItem?.itemComments}
        limitAmount={500}
        isMultiline={true}
        placeholder={'Comments'}
        onTextChanged={(text: string) => {
          onItemDataChanged('itemComments', text);
        }}
      />

      <View style={{height: 32}} />
      <MainAppButton title={'Save item'} isEnable={true} onPress={onSaveItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.backgroundColor,
  },
});
