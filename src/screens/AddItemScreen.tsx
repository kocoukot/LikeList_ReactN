import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import ColorPicker, {
  HueSlider,
  SaturationSlider,
} from 'reanimated-color-picker';
import {Colors} from '../utils/Colors';
import {MainAppButton} from '../components/Buttons';
import {useDispatch} from 'react-redux';

import GroupModel from '../utils/GroupModel';
import {useNavigation} from '@react-navigation/native';
import {addLikeItem} from '../store/groups';

export function AddNewItemScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [itemName, setItemName] = useState('');
  const [itemGroupName, setItemGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#c9fffb');

  const onSelectColor = ({hex}) => {
    setSelectedColor(hex);
    console.log(hex);
  };

  function onAddNewItem() {
    const groupModel = new GroupModel(itemName, itemGroupName, selectedColor);
    dispatch(addLikeItem(groupModel));
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.viewStyle}>
          <TextInput
            value={itemName}
            placeholder="Item name"
            style={styles.inputStyle}
            onChangeText={text => {
              setItemName(text);
            }}
          />
          <TextInput
            value={itemGroupName}
            placeholder="Item group"
            style={styles.inputStyle}
            onChangeText={text => {
              setItemGroupName(text);
            }}
          />

          <ColorPicker
            style={{paddingVertical: 24}}
            value={selectedColor}
            onComplete={onSelectColor}>
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
    borderWidth: 2,
    marginHorizontal: 8,
    borderRadius: 28,
  },
  slider: {
    height: 200,
  },
});
