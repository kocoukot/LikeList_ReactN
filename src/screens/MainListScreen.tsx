import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Colors} from '../utils/Colors';
import {GlobalTexts} from '../utils/Texts';
import {MainAppButton} from '../components/Buttons';



export function ListScreen({navigation}) {
  function detailNavigate(){
    navigation.navigate("Details")
  }
  return (
    <View style={styles.container}>
      <Text>{GlobalTexts.emptyMainScreen}</Text>
      <MainAppButton onPress={detailNavigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundColor,
  },
});
