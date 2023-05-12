import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

import likeListGroupReducer from './groups';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, likeListGroupReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store, null, () => {
  console.log('Store rehydrated');
});

export {store, persistor};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
