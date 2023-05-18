// @ts-ignore
import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationTabs} from './NavigationTabs';
import {GroupItemList} from '../screens/groupDetail/GroupItemList';
import {Colors} from '../utils/Colors';
import {Provider} from 'react-redux';
import {store, persistor} from '../store/store';
import {PersistGate} from 'redux-persist/integration/react';
import ItemDetailInfo from '../screens/itemDetail/ItemDetailInfo';
const ListStack = createNativeStackNavigator();

export const TabBar: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
      <SafeAreaView
        style={{flex: 0, backgroundColor: Colors.backgroundColor}}
      />

      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <ListStack.Navigator
            screenOptions={{
              headerStyle: [styles.headerStyle, styles.screenStyle],
              headerTintColor: Colors.textColor,
            }}>
            <ListStack.Screen
              name="NavTabs"
              options={{
                headerShown: false,
              }}
              component={NavigationTabs}
            />

            <ListStack.Screen
              name="Details"
              component={GroupItemList}
              options={{
                headerStyle: [styles.headerStyle],
              }}
            />
            <ListStack.Screen
              name="ItemDetailInfo"
              component={ItemDetailInfo}
              options={{headerStyle: [styles.headerStyle]}}
            />
          </ListStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </PersistGate>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.tabBarColor,
  },
  headerStyle: {
    backgroundColor: Colors.backgroundColor,
  },
  screenStyle: {
    backgroundColor: Colors.backgroundColor,
  },
});
