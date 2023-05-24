import React, { useEffect, useState } from 'react';
import {TabBar} from './src/navigation';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { API_FIREBASE_AUTH } from './api';

GoogleSignin.configure({
  webClientId: API_FIREBASE_AUTH,
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
// npx react-native run-ios --device "Cat’s phone" 
