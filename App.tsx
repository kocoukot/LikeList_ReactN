import React, { useEffect, useState } from 'react';
import {TabBar} from './src/navigation';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId: '342022364484-7bf2hd808bhea8knfsslg52nr6ucdg5n.apps.googleusercontent.com',
  offlineAccess: true,
});
function App() {

  return (
      <TabBar/>
  );
}

export default App;

// sudo lsof -i :8081 
// kill -9 1574  
