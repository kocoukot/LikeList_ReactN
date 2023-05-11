import {StyleSheet, View, Text} from 'react-native';
import {Colors} from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {useLayoutEffect} from 'react';

export function GroupItemList({route}) {
  const groupName = route.params.groupName;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: groupName,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Group {groupName} item list here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
