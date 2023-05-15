import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';

import {Colors} from '../../utils/Colors';
import {MainAppButton} from '../../components/Buttons';
import {useDispatch} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import {addLikeItem} from '../../store/groups';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import InputComponent from '../../components/InputComponent';
import {rgbToHex} from '../../utils';
import {LikedItem} from '../../store/groups';
import uuid from 'react-native-uuid';
import RatingBarContent from '../../components/RatingBarComponent';

import IconsListComponent from './content/IconsList';

import ColorPickerComponent from './content/ColorPickerComponent';
//
export function AddNewItemScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [itemName, setItemName] = useState('');
  const [itemGroupName, setItemGroupName] = useState('');
  const [itemComments, setItemComments] = useState('');
  const [selectedColor, setSelectedColor] = useState('#ffd6d6');
  const [selectedRating, setSelectedRating] = useState(4);
  const [selectedIcon, setSelectedIcon] = useState('');

  const onSelectColor = ({hex}) => {
    setSelectedColor(hex);
    console.log(hex);
  };

  function onAddNewItem() {
    if (itemName.length > 0 && itemGroupName.length > 0) {
      const newItem: LikedItem = {
        key: uuid.v4().toString(),
        itemName: itemName,
        itemComments: itemComments,
        itemGroup: itemGroupName,
        itemColor: selectedColor,
        itemRating: selectedRating,
        itemGroupIcon: selectedIcon,
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
              onTextChanged={text => {
                setItemName(text);
              }}
            />

            <RatingBarContent
              onRatingSelect={setSelectedRating}
              style={{
                container: {
                  alignItems: 'center',
                },
                starContainer: {
                  alignContent: 'center',
                  marginTop: 16,
                  justifyContent: 'center',
                },
              }}
            />

            <InputComponent
              limitAmount={500}
              isMultiline={true}
              placeholder={'Comments'}
              onTextChanged={text => {
                setItemComments(text);
              }}
            />

            <View style={{height: 24}} />
            <InputComponent
              limitAmount={30}
              placeholder={'Item group'}
              onTextChanged={text => {
                setItemGroupName(text);
              }}
            />

            <View style={styles.colorSection}>
              <IconsListComponent
                onIconSelect={setSelectedIcon}
                selectedIcon={selectedIcon}
                selectedColor={selectedColor}
              />

              <ColorPickerComponent onSelectColor={onSelectColor} />
            </View>
            <View style={{flex: 1}} />
            <MainAppButton
              title={'Add new item'}
              isEnable={
                itemName.length > 0 &&
                itemGroupName.length > 0 &&
                selectedIcon != ''
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
