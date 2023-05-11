import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import ColorPicker, {
  Panel1,
  HueSlider,
  SaturationSlider,
} from 'reanimated-color-picker';
import {Colors} from '../utils/Colors';
import {MainAppButton} from '../components/Buttons';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store/store';
import {addLikeItem} from '../store/groups';
import GroupModel from '../utils/GroupModel';
import {useNavigation} from '@react-navigation/native';

export function AddNewItemScreen() {
  const [likeItemModel, setGroupName] = useState(new GroupModel());

  const [selectedColor, setSelectedColor] = useState('black');
  const navigation = useNavigation();

  const onSelectColor = ({hex}) => {
    console.log(hex);
    const updatedPerson = {...likeItemModel, itemColor: hex};
    setGroupName(updatedPerson);
  };

  function onAddNewItem() {
    const updatedPerson = {...likeItemModel, key: Math.random().toString()};
    setGroupName(updatedPerson);
    dispatch(addLikeItem(likeItemModel));
    console.log('element ' + likeItemModel);

    //    navigation.goBack();
  }

  function onNameChanged(itemName: string) {
    // const updatedPerson = {...likeItemModel, itemName: itemName};
    // setGroupName(updatedPerson);
  }

  const listItem = useSelector((state: RootState) => state.listItems.items);
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.viewStyle}>
          <TextInput
            placeholder="Item name"
            style={styles.inputStyle}
            onChangeText={text => {
              onNameChanged(text);
            }}
          />
          <TextInput
            placeholder="Item group"
            style={styles.inputStyle}
            onChangeText={text => {
              // setGroupName(text);
            }}
          />
          <TextInput
            placeholder="Item subgroup"
            style={styles.inputStyle}
            onChangeText={text => {
              // setGroupName(text);
            }}
          />


          <ColorPicker style={{paddingVertical:24}} value="red" onComplete={onSelectColor}>
            <View style={styles.colorSection}>
              <SaturationSlider
                style={styles.slider}
                vertical={true}
                boundedThumb={true}
                reverse={true}
              />
              <View style={styles.iconsSection}></View>

              <HueSlider
                style={styles.slider}
                boundedThumb={true}
                vertical={true}
              />
            </View>
          </ColorPicker>

          <View></View>
          <MainAppButton title={'Add new item'} onPress={onAddNewItem} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    
  },
  inputStyle: {
    marginTop: 16,
    textTransform: 'capitalize',
  },
  viewStyle: {
    paddingHorizontal: 16,
  },
  colorSection: {flexDirection: 'row', flex: 1},
  iconsSection: {
    flex: 1,
    borderColor: Colors.buttonColor,
    borderWidth:2,
    marginHorizontal:8,
    borderRadius:28
  },
  slider: {
    height: 200,
  },
});
