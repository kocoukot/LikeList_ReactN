import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Button, View, StyleSheet, Text, Pressable, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GlobalTexts} from '../../utils/Texts';
import {Colors} from '../../utils/Colors';

export default function NotLoggedScreen({isLoggedIn}) {
  async function signinWithGoogle() {

    try {
      const {idToken} = await GoogleSignin.signIn();
      console.log('signinWithGoogle idToken ' + idToken);
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      isLoggedIn(true);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log('error ' + error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{GlobalTexts.pleaseLogin}</Text>
      <View style={styles.loginIcon}>
        <Pressable
          style={styles.iconPressable}
          onPress={signinWithGoogle}
          android_ripple={{color: Colors.tabBarInactiveColor, borderless: true}}>
          <Image
            style={{flex: 1}}
            source={require('../../../assets/ic_google.png')}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
  },
  loginIcon: {
    backgroundColor:Colors.buttonColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 50,
  },
  iconPressable: {
    height: 64,
    width: 64,

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  text: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    padding: 16,
    color: Colors.textColor,
  },
});
