import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Colors} from '../../utils/Colors';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import NotLoggedScreen from './NotLoggedProfile';
import LoggedProfile from './LoggedProfile';
import {useNavigation} from '@react-navigation/native';
import ItemIcon, { PressableIcon } from '../../components/IconResolve';

export function ProfileScreen() {
  const navigation = useNavigation();

  const [isUserSigned, setIsSigned] = useState<boolean>();

  async function signOut() {
    const isSignOut = await GoogleSignin.signOut();
    setIsSigned(false);
  }

  const isSignedIn = async () => {
    const isSigned = await GoogleSignin.isSignedIn();
    console.log('signinWithGoogle isSigned ' + isSigned);
    setIsSigned(isSigned);
  };

  useLayoutEffect(() => {
    isSignedIn();
    navigation.setOptions({
      headerRight: () =>
        isUserSigned && (
          <View style={{paddingEnd: 16}}>
            <PressableIcon  icon={'log-out'} color={Colors.red} size={24} onPress={signOut}/>
          </View>
        ),
    });
  }, [isUserSigned]);

  return (
    <View style={styles.container}>
      {isUserSigned ? (
        <LoggedProfile isLoggedIn={setIsSigned} />
      ) : (
        <NotLoggedScreen isLoggedIn={setIsSigned} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  item: {
    margin: 10,
    height: 90,
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.5,
  },
});
