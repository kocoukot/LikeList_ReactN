// @ts-ignore
import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ListScreen} from '../screens/MainListScreen';
import {TabBarAdvancedButton} from '../components';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {EmptyScreen} from '../components/EmptyScreen';
import {AddNewItemScreen} from '../screens/AddItemScreen';
import {ProfileScreen} from '../screens';
import {Colors} from '../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import {store} from '../store/store';

// pod 'RNVectorIcons', :path => '../node_modules/react-native-vector-icons'
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const windowWidth = Dimensions.get('window').width;

export function NavigationTabs() {
  
  return (
    <Provider store={store}>

    <Stack.Navigator
      screenOptions={{
        headerStyle: [styles.header],
        headerTintColor: Colors.textColor
      }}>
      <Stack.Screen
        name="MainScreen"
        options={{
          headerShown: false,
        }}
        component={MainScreenTabs}
        />

      <Stack.Screen name="AddNewItem" component={AddNewItemScreen} />
    </Stack.Navigator>
        </Provider>
  );
}

function MainScreenTabs() {
  const navigation = useNavigation();
  const [btnState, setBtnState] = useState(false);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Tab.Navigator
        screenOptions={({route, navigation}) => {
          return {
            tabBarOptions: {
              showLabel: false,
            },
            tabBarActiveTintColor: Colors.tabBarActiveColor,
            tabBarInactiveTintColor: Colors.tabBarInactiveColor,
            tabBarStyle: [styles.tabBar],
            tabBarItemStyle: {
              backgroundColor: Colors.tabBarColor,
            },
            headerStyle: [styles.header],
          };
        }}>
        <Tab.Screen
          name="LikeList"
          component={ListScreen}
          options={{
            tabBarIcon: ({color, size}) => {
              return <Ionicons name="list" size={size} color={color} />;
            },
          }}
        />

        <Tab.Screen
          name="AddItem"
          component={EmptyScreen}
          options={({route, navigation}) => {
            return {
              tabBarButton: props => <TabBarAdvancedButton />,
            };
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
            tabBarIcon: ({color, size}) => {
              return <Ionicons name="person" size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>

      <View style={[styles.buttonOuterView, {elevation: btnState ? 0 : 4}]}>
        <Pressable
          style={({pressed}) => {
            // setBtnState(pressed);
            return pressed
              ? [styles.buttonInnerView, styles.pressed]
              : [styles.buttonInnerView];
          }}
          android_ripple={{color: Colors.ripple, borderless: true}}
          onPress={() => navigation.navigate('AddNewItem')}>
          <Ionicons name="add" size={42} color={Colors.textColor} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    elevation: 0,
    borderTopColor: Colors.transparent,
    backgroundColor: Colors.transparent,
  },
  header: {
    backgroundColor: Colors.backgroundColor,
  },
  buttonOuterView: {
    bottom: 20,
    left: windowWidth / 2 - 32,
    position: 'absolute',    
    borderRadius: 32,
    shadowColor: Colors.shadowColor,
    shadowRadius: 32,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},

  },
  buttonInnerView: {
    borderRadius: 32,
    backgroundColor: Colors.buttonColor,

    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
  },
  pressed: {
    borderRadius: 28,
    opacity: 0.5,
  },
});
