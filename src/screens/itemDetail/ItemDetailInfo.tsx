import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {useNavigation} from '@react-navigation/native';
import {useLayoutEffect, useState} from 'react';
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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedItem.itemName,
    });
  }, [navigation]);

  const [selectedRating, setSelectedRating] = useState(selectedItem.itemRating);
  const [itemName, setItemName] = useState(selectedItem.itemName);
  const [itemComments, setItemComments] = useState(selectedItem.itemComments);

  function onSaveItem() {
    const newItem: LikedItem = {
      key: selectedItem.key,
      itemName: itemName.trim(),
      itemComments: itemComments.trim(),
      itemGroup: selectedItem.itemGroup,
      itemColor: selectedItem.itemColor,
      itemRating: selectedRating,
      itemGroupIcon: selectedItem.itemGroupIcon,
      itemSubgroup: selectedItem.itemSubgroup,
    };
    dispatch(onUpdateItem(newItem));
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <InputComponent
        initValue={selectedItem.itemName}
        limitAmount={30}
        placeholder={'Item name'}
        onTextChanged={(text: string) => {
            setItemName(text);
        }}
      />

      <RatingBarContent
        initValue={selectedRating}
        onRatingSelect={setSelectedRating}
      />

      <InputComponent
        initValue={selectedItem.itemComments}
        limitAmount={500}
        isMultiline={true}
        placeholder={'Comments'}
        onTextChanged={(text: string) => {
            setItemComments(text);
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
