/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, } from 'react';
import {
  StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Switch, Image, AsyncStorage,
} from 'react-native';
import { colors } from '../../colors';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { set } from 'react-native-reanimated';
import moment from 'moment';
import PushNotification from 'react-native-push-notification';
import { ProductActions } from '../actions';




const { width, height } = Dimensions.get("screen");

const color = ["#182C61", "#2C3A47", "#2c3e50", "#2d3436", "#192a56", "#273c75", "#0c2461", "#3c6382"]
// const category = [
//   { name: "Shirts", discount: 1, days: 15, color: ["#fd79a8", "#0984e3"] },
//   { name: "Chinos", discount: 5, days: 30, color: ["#cf6a87", "#f19066"] },
//   { name: "Jeans", discount: 3, devicedays: 15, color: ["#686de0", "#30336b"] },
//   { name: "T-Shirts", discount: 7, days: 13, color: ["#ecf0f1", "#34495e"] },
// ]

// const categories = [
//   { icon: <Ionicons name="shirt-sharp" size={30} color="#273c75" />, name: "Shirts" },
//   { icon: <Ionicons name="sad-sharp" size={30} color="#273c75" />, name: "Watches" },
//   { icon: <Ionicons name="wallet-sharp" size={30} color="#273c75" />, name: "Wallets" },
//   { icon: <Ionicons name="headset-sharp" size={30} color="#273c75" />, name: "Headphones" },
//   { icon: <Ionicons name="tennisball-sharp" size={30} color="#273c75" />, name: "Sports" },
// ]


// const profiles = [
//   { icon: "people-sharp", name: "Theatre", category: "Living Room" },
//   { icon: "wine-sharp", name: "Party", category: "Courtyard" },
//   { icon: "bed-sharp", name: "Sleep", category: "Entire Home" },
//   { icon: "bonfire-sharp", name: "Water Heater", category: "Bath Room 1" },
//   { icon: "briefcase-sharp", name: "Work", category: "Entire Home" },
// ]
// const clothes = [
//   { image: "https://i.pinimg.com/736x/c9/4e/8b/c94e8b60e8b7327eea121e73df666c70.jpg", name: "Wrist Watch", price: "3000", description: "Analog Watch" },
//   { image: "https://img.freepik.com/free-photo/fashionable-concept-stylish-black-leather-belt-grey-background-top-view_133994-2245.jpg?size=626&ext=jpg", name: "Belt", price: "750", description: "Leather Belt" },
//   { image: "https://myprimeboon.com/wp-content/uploads/2020/09/villain-edp-perdume.jpg", name: "Perfume", price: "850", description: "Villen Perfume" }
// ]

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchEnable: false,
      bestoffers: [],
      categories: [],
      bestselling: [],
      cartlength: 0,
      item: [],
      user: { name: '' }
    }

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
        AsyncStorage.setItem('token', token.token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        if (notification.userInteraction == true) {
          if (notification.data.type !=='') {
            props.navigation.navigate(notification.data.type)

          }
        }
        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });

  }
  getUser = async () => {
    var user = JSON.parse(await AsyncStorage.getItem('user'))
    if (user.length > 0) {
      this.setState({
        user: user
      })
    }
    // alert(JSON.stringify(this.state.user))
  }
  UNSAFE_componentWillMount() {
    console.log('Connecting...');
    this.props.GetHomeData();
    this.getUser()
    // alert(moment().format('h:mm:ss a'))

  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    var responce = nextProps.GetHomeDataInfo.details;

    if (nextProps.GetHomeDataSuccess) {



      if (responce.code == 200) {
        // Toast.show('Login Success')
        this.setState({
          bestoffers: responce.bestoffers,
          categories: responce.categories,
          bestselling: responce.bestselling,
        })
      }
      if (responce.code == 108) {
        this.props.navigation.navigate('Login')
        Toast.show('Please Login')
      }

    }
    if (nextProps.AddToCartSuccess) {
      var responce = nextProps.AddToCartInfo.details;
      this.setState({
        cartlength: responce.newdata.length,

      })



    }

  }

  render() {


    return (
      <View style={{ backgroundColor: colors.white, flex: 1 }}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Ionicons name="menu-outline" size={30} style={{ padding: 15 }} onPress={() => { this.props.navigation.openDrawer(); }} />
          <Text> <Ionicons name="cart-outline" size={30} style={{ padding: 15 }} onPress={() => { this.props.navigation.navigate('Cart') }} />{this.state.cartlength}</Text>

        </View>
        <ScrollView>

          <View style={{ padding: 15 }}>
            <Text style={{ fontSize: 35, fontWeight: 'bold' }} onPress={() => { this.props.navigation.navigate('Login') }}>Welcome</Text>
            <Text style={{ fontSize: 25 }}>{this.state.user.name}</Text>

          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {this.state.bestoffers.map(item => (<TouchableOpacity onPress={() => { this.props.navigation.navigate('Category', { item: item }) }}>
              <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                locations={[0, 1.0]} colors={[color[Math.floor(Math.random() * color.length)], color[Math.floor(Math.random() * color.length)]]} style={styles.linearGradient}>
                <Text style={{ fontSize: 20, color: colors.white, textTransform: 'uppercase', fontWeight: 'bold', padding: 8 }}>{item.name}</Text>
                <Text numberOfLines={1} style={{ color: colors.white, padding: 8 }}>{item.discount}%Discount  |Valid Upto {item.days} Days</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 10 }}>
                  <Ionicons name="shirt-outline" size={20} color={colors.white} />
                  <Ionicons name="sunny-sharp" size={20} color={colors.white} />
                  <Ionicons name="cloudy-night-sharp" size={20} color={colors.white} />
                  <Ionicons name="umbrella-sharp" size={20} color={colors.white} /> 
                </View>
              </LinearGradient>
            </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={{ padding: 17, fontSize: 20, fontWeight: 'bold' }}>Categories</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
            {this.state.categories.map(item => (
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('QuickAccess', { item: item }) }}>
                <View style={{ margin: 10, alignItems: 'center' }}>
                  <View style={{ padding: 10, backgroundColor: '#bdc3c7', borderRadius: 50, margin: 5, }}>
                    <Ionicons name={item.icon} size={30} color="#273c75" />
                  </View>
                  <Text style={{ margin: 5 }}>{item.name}</Text>
                </View>

              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Best Selling</Text>
            <Text style={{ fontSize: 20 }}>See All</Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {this.state.bestselling.map(item => (
              <View style={{ margin: "2%", width: "46%", height: width / 2 + 50 }} >
                <Image source={{ uri: item.image }} style={{ height: "70%", width: "100%", resizeMode: 'stretch' }} />
                <View style={{ margin: 15 }}>
                  <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                  <Text style={{ color: 'grey' }}>{item.description}</Text>
                  <Text style={{ fontWeight: 'bold', color: 'green' }}>₹ {item.price}</Text>
                </View>
              </View>
            ))}
          </View>
          {/* <View style={{ backgroundColor: '#dfe6e9', flex: 1, marginTop: 15, padding: 15 }}> */}
          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
               <Text style={{ padding: 15, fontSize: 20, fontWeight: 'bold', marginLeft: -5 }}>Profiles</Text>
               <TouchableOpacity >
                 <Text style={{ borderWidth: 1, borderColor: colors.blue, borderRadius: 20, textAlign: 'center', textAlignVertical: 'center', color: colors.blue, backgroundColor: colors.white, padding: 6, fontWeight: 'bold', width: width / 3.8 }} >Edit</Text>
               </TouchableOpacity>
             </View> */}


          {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
               {profiles.map(item => (
                 <TouchableOpacity style={{ width: '31.3%', backgroundColor: colors.white, borderRadius: 10, margin: '1%', padding: 15, justifyContent: 'center', alignItems: 'center' }} onPress={()=>{this.props.navigation.navigate('Profiles',{item:item})}}>
                 <View >
                   <Ionicons name={item.icon} size={50} color={colors.blue} />
                   <Text style={{ fontSize: 15, textTransform: 'capitalize', fontWeight: 'bold', marginTop: 8 }}>  {item.name}</Text>
                   <Text style={{ fontSize: 13, textTransform: 'capitalize', color: 'grey' }}>  {item.category}</Text>
                 </View>
                 </TouchableOpacity>
               ))}
               <TouchableOpacity onPress={()=>{this.props.navigation.navigate('AddProfiles')}} style={{ width: '31.3%', margin: '1%', padding: 15, justifyContent: 'center', alignItems: 'center' }}>
               <View >
                 <Ionicons name={"add-circle-sharp"} size={50} color={colors.blue} />
                 <Text style={{ fontSize: 15, textTransform: 'capitalize', fontWeight: 'bold', marginTop: 8 }}>  Add Profile</Text>
               </View>
               </TouchableOpacity>
             </View> */}
          {/* </View> */}
          <View style={{ height: 50 }}>

          </View>
        </ScrollView>
        {/* <View style={{ elevation: 1, backgroundColor: '#dfe6e9', flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderTopWidth: 0.5, borderTopColor: 'grey' }}>
           {this.state.switchEnable ?
             <TouchableOpacity onPress={() => this.setState({ switchEnable: false })}>
               <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                 locations={[0.1, 1.0]} colors={['#ffff', 'red']} style={{ width: 150, height: 40, borderRadius: 20, flexDirection: 'row', alignItems: 'center', elevation: 1 }}>
                 <View style={{ height: 30, width: 30, borderRadius: 30, backgroundColor: colors.white, margin: 5 }}></View>
                 <Text style={{ fontSize: 16, color: colors.white, paddingLeft: 8 }}>Safe Mode</Text>
               </LinearGradient>
             </TouchableOpacity> :
             <TouchableOpacity onPress={() => this.setState({ switchEnable: true })}>
               <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 2.0 }}
                 locations={[0.5, 1.0]} colors={['green', 'white']} style={{ width: 150, height: 40, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                 <Text style={{ fontSize: 16, color: colors.white, paddingLeft: 8 }}>Unsafe Mode</Text>
                 <View style={{ height: 30, width: 30, borderRadius: 30, backgroundColor: colors.white, margin: 5, elevation: 1 }}></View>
               </LinearGradient>
             </TouchableOpacity>}
           <View style={{ flexDirection: 'row', flex: 0.5, justifyContent: 'space-evenly' }}>
             <Ionicons name="home-outline" size={35} color={'grey'} />
             <Ionicons name="grid-outline" size={35} color={'grey'} />
           </View>
         </View> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({

  linearGradient: {
    padding: 15,
    width: width / 2 + 50,
    margin: 8,
    borderRadius: 10,
  }
});

function mapStateToProps(state) {
  return {
    state,
    GetHomeDataInfo: state.GetHomeData,
    GetHomeDataSuccess: state.GetHomeData.success,
    GetHomeDataFetching: state.GetHomeData.fetching,

    AddToCartInfo: state.addToCart,
    AddToCartSuccess: state.addToCart.success,
    AddToCartFetching: state.addToCart.fetching
  }
}
export default compose(connect(mapStateToProps, {
  ...ProductActions
}))(Home);
