import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';

import {Colors} from '../../utils/Colors';
import {MainAppButton} from '../../components/Buttons';
import {useDispatch} from 'react-redux';

import {useNavigation} from '@react-navigation/native';

import {addLikeItem, LikedItem} from '../../store/groups';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import InputComponent from '../../components/InputComponent';

import uuid from 'react-native-uuid';
import RatingBarContent from '../../components/RatingBarComponent';

import IconsListComponent from './content/IconsList';

import ColorPickerComponent from './content/ColorPickerComponent';
import {IImage} from '../../../assets';

//
export function AddNewItemScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // const [itemName, setItemName] = useState('');
  // const [itemGroupName, setItemGroupName] = useState('');
  // const [itemComments, setItemComments] = useState('');
  // const [selectedColor, setSelectedColor] = useState('#fff3d6');
  // const [selectedRating, setSelectedRating] = useState(4);
  // const [selectedIcon, setSelectedIcon] = useState<string>('');
  // const [itemSubGroup, setItemSubGroup] = useState('Undefined');

  const [likedItem, setLikedItem] = useState<LikedItem>({
    key: uuid.v4().toString(),
    itemName: '',
    itemComments: '',
    itemGroup: '',
    itemColor: '#fff3d6',
    itemRating: 4,
    itemGroupIcon: '',
    itemSubgroup: 'Undefined',
  });

  function onItemDataChanged(identifierKey: string, text: string) {
    console.log("identifierKey " + identifierKey + " text " + text )
    setLikedItem(current => {
      return {
        ...current,
        [identifierKey]: text.trim(),
      };
    });
    console.log("likedItem " + likedItem  )

  }

  function checkAvailable() {
    return (
      likedItem.itemName.length > 0 &&
      likedItem.itemGroup.length > 0 &&
      !!(likedItem.itemGroupIcon.length > 0)
    );
  }

  function onAddNewItem() {
    if (checkAvailable()) {
      dispatch(addLikeItem(likedItem));
      navigation.goBack();
    }
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
            flexDirection: 'column',
            backgroundColor: Colors.backgroundColor,
          }}
          nestedScrollEnabled={true}
          alwaysBounceVertical={false}>
          <View style={styles.viewStyle}>
            <InputComponent
              limitAmount={30}
              placeholder={'Item name'}
              onTextChanged={(text: string) => {
                onItemDataChanged('itemName', text);
                // setItemName(text);
              }}
            />

            <RatingBarContent
              onRatingSelect={rating => {
                onItemDataChanged('itemRating', rating);
              }}
            />

            <InputComponent
              limitAmount={500}
              isMultiline={true}
              placeholder={'Comments'}
              onTextChanged={(text: string) => {
                onItemDataChanged('itemComments', text);
              }}
            />
            <InputComponent
              limitAmount={30}
              placeholder={'Subgroup'}
              onTextChanged={(text: string) => {
                onItemDataChanged('itemSubgroup', text);
              }}
            />

            <View
              style={{
                height: 1,
                backgroundColor: Colors.buttonColor,
                marginTop: 24,
                marginBottom: 12,
              }}
            />
            <InputComponent
              limitAmount={30}
              placeholder={'Item group'}
              onTextChanged={(text: string) => {
                onItemDataChanged('itemGroup', text);
              }}
            />

            <View style={styles.colorSection}>
              <IconsListComponent
                onIconSelect={(item: IImage) => {
                  onItemDataChanged('itemGroupIcon', item.title);
                }}
                selectedIcon={likedItem.itemGroupIcon}
                selectedColor={likedItem.itemColor}
              />

              <ColorPickerComponent
                onSelectColor={color => {
                  onItemDataChanged('itemColor', color.hex);
                }}
              />
            </View>
            <View style={{flex: 1}} />
            <MainAppButton
              title={'Add new item'}
              isEnable={checkAvailable()}
              onPress={onAddNewItem}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.backgroundColor,
  },

  viewStyle: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
  },
  colorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
