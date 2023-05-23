import {StyleSheet, View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../utils/Colors';

export function MainAppButton({title, isEnable, onPress}) {
  const [btnState, setBtnState] = useState(false);

  return (
    <View style={[styles.buttonOuterView, isEnable ? styles.buttonShadow : {backgroundColor:Colors.buttonColor}]}>
      <Pressable
        style={({pressed}) => {
          return  pressed && isEnable
            ? [styles.buttonInnerView, styles.pressed]
            : [styles.buttonInnerView];
        }}
        onPress={onPress}
        android_ripple={isEnable ? {color: Colors.ripple, borderless: true} : null}>
        <Text style={styles.btnText}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterView: {
    marginVertical: 16,
    borderRadius: 28,
    marginBottom:20,
    backgroundColor: Colors.buttonColor,
  },

  buttonInnerView: {
    backgroundColor: Colors.buttonColor,
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  
  buttonShadow : {
    elevation: 8,
    shadowColor: Colors.shadowColor,
    shadowRadius: 8,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
  },

  btnText: {
    color: Colors.textColor,
    textAlign: 'center',
  },
  pressed: {
    borderRadius: 28,
    opacity: 0.5,
  },
});
