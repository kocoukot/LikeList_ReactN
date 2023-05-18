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

  const [itemName, setItemName] = useState('');
  const [itemGroupName, setItemGroupName] = useState('');
  const [itemComments, setItemComments] = useState('');
  const [selectedColor, setSelectedColor] = useState('#fff3d6');
  const [selectedRating, setSelectedRating] = useState(4);
  const [selectedIcon, setSelectedIcon] = useState<string>('');
  const [itemSubGroup, setItemSubGroup] = useState('Undefined');

  const onSelectColor = ({hex}) => {
    setSelectedColor(hex);
    console.log(hex);
  };

  function checkAvailable(){
    return itemName.length > 0 && itemGroupName.length > 0 && ((selectedIcon.length > 0) ? true : false)
  }

  function onAddNewItem() {
    if (checkAvailable()) {
      const newItem: LikedItem = {
        key: uuid.v4().toString(),
        itemName: itemName.trim(),
        itemComments: itemComments.trim(),
        itemGroup: itemGroupName.trim(),
        itemColor: selectedColor,
        itemRating: selectedRating,
        itemGroupIcon: selectedIcon,
        itemSubgroup: itemSubGroup.trim(),
      };

      dispatch(addLikeItem(newItem));
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
                setItemName(text);
              }}
            />

            <RatingBarContent onRatingSelect={setSelectedRating} />

            <InputComponent
              limitAmount={500}
              isMultiline={true}
              placeholder={'Comments'}
              onTextChanged={(text: string) => {
                setItemComments(text);
              }}
            />

            <InputComponent
              limitAmount={30}
              placeholder={'Subgroup'}
              onTextChanged={(text: string) => {
                setItemSubGroup(text);
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
                setItemGroupName(text);
              }}
            />

            <View style={styles.colorSection}>
              <IconsListComponent
                onIconSelect={(item: IImage) => {
                  setSelectedIcon(item.title);
                }}
                selectedIcon={selectedIcon}
                selectedColor={selectedColor}
              />

              <ColorPickerComponent onSelectColor={onSelectColor} />
            </View>
            <View style={{flex: 1}} />
            <MainAppButton
              title={'Add new item'}
              isEnable={
                checkAvailable()
              }
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
