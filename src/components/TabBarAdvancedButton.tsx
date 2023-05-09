import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TabBg} from '../svg';
import {Colors} from '../utils/Colors';

export function TabBarAdvancedButton() {
  return (
    <View style={styles.container} pointerEvents="box-none">
      <TabBg color={Colors.tabBarColor} style={styles.background} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent,
    position: 'relative',
    width: 130,
    alignItems: 'center',
  },
  background: {
    backgroundColor: Colors.transparent,
    position: 'absolute',
    top: 0,
  },
});
