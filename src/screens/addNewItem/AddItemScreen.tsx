import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import {Colors} from '../../utils/Colors';
import {MainAppButton} from '../../components/Buttons';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {addLikeItem, LikedItem, onUpdateItem} from '../../store/groups';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import InputComponent from '../../components/InputComponent';
import uuid from 'react-native-uuid';
import RatingBarContent from '../../components/RatingBarComponent';
import IconsListComponent from './content/IconsList';
import ColorPickerComponent from './content/ColorPickerComponent';
import {IImage} from '../../../assets';
import {RootState} from '../../store/store';

//
export function AddNewItemScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const selectedItemKey = route.params?.selectedGroupKey;
  const myList = useSelector((state: RootState) => state.items.list);

  const selectedItem =
    !!selectedItemKey &&
    myList.find(item => {
      return item.key === selectedItemKey;
    });
  console.log('selectedItemKey ' + !!selectedItemKey);

  const [likedItem, setLikedItem] = useState<LikedItem>({
    key: uuid.v4().toString(),
    itemName: '',
    itemComments: '',
    itemGroup: '',
    itemColor: '#fff3d6',
    itemRating: 4,
    itemGroupIcon: '',
    itemSubgroup: '',
  });

  useEffect(() => {
    !!selectedItemKey && setLikedItem(selectedItem);
  }, [selectedItem]);

  useLayoutEffect(() => {
    !!selectedItemKey && navigation.setOptions({title: 'Edit group'});
  }, [navigation]);

  function onItemDataChanged(identifierKey: string, text: string) {
    console.log('identifierKey ' + identifierKey + ' text ' + text);
    setLikedItem(current => {
      return {
        ...current,
        [identifierKey]: text,
      };
    });
    console.log('likedItem ' + likedItem);
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
      !!selectedItemKey 
      ? dispatch(onUpdateItem(likedItem))
      : dispatch(addLikeItem(likedItem))
      navigation.goBack();
    }
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        {/* <ScrollView */}
        {/* contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
            flexDirection: 'column',
            backgroundColor: Colors.backgroundColor,
          }}
          nestedScrollEnabled={true}
          alwaysBounceVertical={false}> */}
        <View style={styles.viewStyle}>
          {!!!selectedItemKey && (
            <View>
              <InputComponent
                initValue={likedItem.itemName}
                limitAmount={30}
                placeholder={'Item name'}
                onTextChanged={(text: string) => {
                  onItemDataChanged('itemName', text);
                }}
              />

              <RatingBarContent
                onRatingSelect={(rating:number) => {
                  onItemDataChanged('itemRating', rating.toString());
                }}
              />

              <InputComponent
                initValue={likedItem.itemComments}
                limitAmount={500}
                isMultiline={true}
                placeholder={'Comments (optional)'}
                onTextChanged={(text: string) => {
                  onItemDataChanged('itemComments', text);
                }}
              />
              <InputComponent
                initValue={likedItem.itemSubgroup}
                limitAmount={30}
                placeholder={'Subgroup (optional)'}
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
            </View>
          )}

          <InputComponent
            limitAmount={30}
            placeholder={'Item group'}
            initValue={likedItem.itemGroup}
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
              initColor={likedItem.itemColor}
              onSelectColor={color => {
                onItemDataChanged('itemColor', color.hex);
              }}
            />
          </View>
          <View style={{flex: 1}} />
          <MainAppButton
            title={!!selectedItemKey ? 'Save item' : 'Add new item'}
            isEnable={checkAvailable()}
            onPress={onAddNewItem}
          />
        </View>
        {/* </ScrollView> */}
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
