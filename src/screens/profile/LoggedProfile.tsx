import {GoogleSignin, User} from '@react-native-google-signin/google-signin';
import {useEffect, useLayoutEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default function LoggedProfile({isLoggedIn}) {
  const [currentUser, setCurrentUser] = useState<User>();

  const googleUser = async () => {
    const user = await GoogleSignin.getCurrentUser();
    console.log('user ' + user.user.email);
    setCurrentUser(user);
  };

  useEffect(() => {
    googleUser();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={{}}>{currentUser.user.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 80,
  },
});
