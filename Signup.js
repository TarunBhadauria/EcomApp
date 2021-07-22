import React, { Component, } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { LoginActions } from '../actions';
import Toast from 'react-native-simple-toast';
const { width, height } = Dimensions.get('screen');

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            name: '',
            password: ''
        }
    }
    validation = () => {
        if (this.state.phone == '') {
            Toast.show('Phone Number Cant Be Empty');
        }
        else if (this.state.name == '') {
            Toast.show('Phone Number Cant Be Empty');
        }
        else {
            if (this.state.phone.length < 10) {
                Toast.show('Length Of Phone Number Should Be 10')
            }
            else if (this.state.password == '') {
                Toast.show('Invalid Password')
            }
            else {
                this.props.GetSignup(
                    {
                        phone: this.state.phone,
                        password: this.state.password,
                        name: this.state.name
                    }
                )
            }
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.GetSignupSuccess) {
            var response = nextProps.GetSignupInfo.details
            // alert(JSON.stringify(nextProps.GetSignupInfo.details.code))
            if (response.code == 200) {
                Toast.show('Signup Success')
            }
            if (response.code == 145) {
                Toast.show('You Are Already Registered With This Number Kindly Login')

            }


        }



    }

    render() {
        return (
            <ScrollView horizontal={true}>
                <ImageBackground source={{ uri: "https://images.pexels.com/photos/6580673/pexels-photo-6580673.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" }} style={{ width: width, height: height }} resizeMode='stretch' >
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text style={{ textAlign: 'center', fontSize: 25, color: 'white', margin: '10%' }}>Sign up</Text>
                        <View style={{ backgroundColor: 'white', width: '20%', borderRadius: 50, alignSelf: 'center', margin: '10%' }}>
                            <Ionicons name='create-sharp' size={40} style={{ color: 'green', padding: 15, textAlign: 'center' }} />
                        </View>
                        <TextInput style={{ color: 'white', margin: '5%', textAlign: 'center', borderBottomWidth: 1, borderBottomColor: 'white' }}
                            editable
                            maxLength={40}
                            placeholder='Email ID Or Phone Number'
                            onChangeText={(phone) => { this.setState({ phone: phone }) }}

                        />
                        <TextInput style={{ color: 'white', margin: '5%', textAlign: 'center', borderBottomWidth: 1, borderBottomColor: 'white' }}
                            editable
                            maxLength={40}
                            placeholder='Name'
                            onChangeText={(name) => { this.setState({ name: name }) }}
                        />
                        <TextInput style={{ color: 'white', margin: '5%', textAlign: 'center', borderBottomWidth: 1, borderBottomColor: 'white' }}
                            editable
                            maxLength={40}
                            placeholder='Set Password (Minimum 8 Characters)'
                            onChangeText={(password) => { this.setState({ password: password }) }}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, borderRadius: 40, alignSelf: 'center', margin: '10%' }}>
                            <Text style={{ color: 'green', fontSize: 20, textAlign: 'center' }} onPress={() => { this.validation() }}>Sign up</Text>
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: "4%" }}>
                            <Text style={{ color: 'green', fontSize: 10, color: 'white' }}>Already Have Account ?</Text>
                            <Text style={{ color: 'green', fontSize: 15, color: 'white' }} onPress={() => { this.props.navigation.navigate('Login') }}>Login</Text>
                        </View>
                    </View>

                </ImageBackground>


            </ScrollView>
        );
    }
}
function mapStateToProps(state) {
    return {
        state,
        GetSignupInfo: state.GetSignup,
        GetSignupSuccess: state.GetSignup.success,
        GetSignupFetching: state.GetSignup.fetching,
    }
}
export default compose(connect(mapStateToProps, {
    ...LoginActions
}))(Signup);
