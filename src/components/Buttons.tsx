import {StyleSheet, View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../utils/Colors';

export function MainAppButton({title, onPress}) {
  const [btnState, setBtnState] = useState(false);

  return (
    <View style={[styles.buttonOuterView, {elevation: btnState ? 0 : 4}]}>
      <Pressable
        style={({pressed}) => {
          setBtnState(pressed);
          return pressed
            ? [styles.buttonInnerView, styles.pressed]
            : [styles.buttonInnerView];
        }}
        onPress={onPress}
        android_ripple={{color: Colors.ripple, borderless: true}}>
        <Text style={styles.btnText}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterView: {
    marginVertical: 16,
    borderRadius: 28,
  },

  buttonInnerView: {
    backgroundColor: Colors.buttonColor,
    borderRadius: 28,
    shadowColor: Colors.shadowColor,
    shadowRadius: 28,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    paddingHorizontal: 16,
    paddingVertical: 8,
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
