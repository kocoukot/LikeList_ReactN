import {GoogleSignin, User} from '@react-native-google-signin/google-signin';
import {useLayoutEffect, useState} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {Colors} from '../../utils/Colors';
import {delay} from '@reduxjs/toolkit/dist/utils';

export default function LoggedProfile({isLoggedIn}) {
  const [currentUser, setCurrentUser] = useState<User>();

  const googleUser = async () => {
    const user = await GoogleSignin.getCurrentUser();
    console.log('user ' + user.user.email);

    setTimeout(() => {
      setCurrentUser(user);
    }, 1500);
  };

  useLayoutEffect(() => {
    googleUser();
  }, []);

  return (
    <View
      style={[
        styles.container,
        {justifyContent: currentUser ? 'flex-start' : 'center'},
      ]}>
      <View>
        {!currentUser ? (
          <ActivityIndicator size="large" color={Colors.tabBarActiveColor} />
        ) : (
          <View style={styles.content}>
            <Text style={{}}>{currentUser.user.email}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 80,
  },

  content: {},
});
