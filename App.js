/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { Component, } from 'react';
import {
  StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Switch, AsyncStorage,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { colors } from './colors';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from './src/container/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Category from './src/container/Category';
import QuickAccess from './src/container/QuickAccess';
import Profiles from './src/container/Profiles';
import AddProfiles from './src/container/AddProfile';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './src/reducers'
import { logger, createLogger } from 'redux-logger';
import GlobalFont from 'react-native-global-font';
import Login from './src/container/Login';
import Signup from './src/container/Signup';
import ProductDetails from './src/container/ProductDetails';
import Cart from './src/container/Cart';
import Checkout from './src/container/Chekout';
import AddAddress from './src/container/AddAddress';
import EditAddress from './src/container/EditAddress';
import PlaceOrder from './src/container/PlaceOrder';

// import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import MyOrders from './src/container/MyOrders';
import Logout from './src/container/Logout';
import UploadImage from './src/container/UploadImage';



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    GlobalFont.applyGlobal('Poppins-Regular')
  }


  render() {
    const logger = createLogger();

    return (<Provider store={createStore(reducer, compose(applyMiddleware(thunk, logger)))}>
      <NavigationContainer >
        <Stack.Navigator initialRouteName="HomwDrawer" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="QuickAccess" component={QuickAccess} />
          <Stack.Screen name="Profiles" component={Profiles} />
          <Stack.Screen name="AddProfiles" component={AddProfiles} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="AddAddress" component={AddAddress} />
          <Stack.Screen name="EditAddress" component={EditAddress} />
          <Stack.Screen name="PlaceOrder" component={PlaceOrder} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

    )
  }
}
function HomeDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerType='slide' overlayColor='grey' drawerStyle={{

    }}>
      <Drawer.Screen name="HomeTab" component={HomeTab} />
      <Drawer.Screen name="MyOrders" component={MyOrders} />
      <Drawer.Screen name="UploadImage" component={UploadImage} />
      <Drawer.Screen name="Logout" component={Logout} />
      {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
    </Drawer.Navigator>
  );
}
function HomeTab() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: () => <Ionicons name="home" size={25} /> }} />
      <Tab.Screen name="More" component={AddProfiles} options={{ tabBarIcon: () => <Ionicons name="albums" size={25} /> }} />

    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({


});

export default App;
