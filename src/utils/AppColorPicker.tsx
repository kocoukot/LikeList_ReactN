import React, { useState } from 'react';
import { Button, Modal, StyleSheet, View } from 'react-native';
import {Colors} from '../utils/Colors';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import {MainAppButton} from '../components/Buttons';

export default function AppColorPicker({onPress}) {
  

  const onSelectColor = ({ hex }) => {
    // do something with the selected color.
    console.log(hex);
  };

  return (
    
      <View style={styles.container}>
        
        <ColorPicker style={{}} value='green' onComplete={onSelectColor}>
          <Preview style={{marginVertical:8}}/>
          <Panel1 style={{marginVertical:8}} />
          <HueSlider style={{marginVertical:8}} />
          <OpacitySlider style={{marginVertical:8}} />
        </ColorPicker>

        <MainAppButton title='Ok' onPress={onPress} />
      
     
     </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:32, 
    justifyContent: 'flex-start',
    backgroundColor: Colors.backgroundColor
  },
});