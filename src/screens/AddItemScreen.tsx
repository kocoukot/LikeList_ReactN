import React, {useEffect, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from '../utils/Colors';

const Stack = createNativeStackNavigator();

export function ScreenContent() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Add new element here</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
