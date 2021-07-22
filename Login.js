import React, { Component, } from 'react';
import { Alert, AsyncStorage, Dimensions, Image, ImageBackground, Modal, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { LoginActions } from '../actions';
import Toast from 'react-native-simple-toast';
import { updateFcmToken } from '../actions/LoginActions';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
const { width, height } = Dimensions.get('screen');



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            showAnimation: false,
            loggedIn: false,
            userInfo: [],
            modalVisible: false
        }
    }
    validation = () => {
        if (this.state.phone == '') {
            Toast.show('Phone Number Cant Be Empty');
        }
        else {
            if (this.state.phone.length < 10) {
                Toast.show('Length Of Phone Number Should Be 10')
            }
            else if (this.state.password === '') {
                Toast.show('Invalid Password')
            }
            else {
                this.props.GetLogin(
                    {
                        phone: this.state.phone,
                        password: this.state.password
                    }
                )

            }
        }
    }
    updateToken = async () => {
        var token = await AsyncStorage.getItem('token');
        updateFcmToken({ token: token })
    }
    componentWillMount() {
        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
                '366300968415-o4tshkh8icaq03nqkksbla516nap47qn.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
    }
    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.GetLoginSuccess) {

            var responce = nextProps.GetLoginInfo.details
            if (responce.code == 200) {
                AsyncStorage.setItem('user', JSON.stringify(responce.result[0]))
                this.setState({
                    showAnimation: true
                })
                this.props.navigation.replace('HomeDrawer')
                this.updateToken();
                Toast.show('Login Success')
            }

            if (responce.code == 146) {
                Toast.show('User Not Found')

            }

        }
        // alert(JSON.stringify(nextProps.SocialLoginInfo))
        if (nextProps.SocialLoginSuccess) {
            console.log("called")
            var responce = nextProps.SocialLoginInfo.details
            if (responce.code == 200) {
                this.props.navigation.replace('HomeDrawer')
                Toast.show('Login Success')
            }
            if (responce.code == 146) {
                Alert.alert(
                    "Not Registered",
                    "Do You Want To Register....??",
                    [
                        {
                            text: "Yes",
                            onPress: () => this.setState({ modalVisible: true })
                        },
                        {
                            text: "No",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },

                    ]
                );
            }
        }
        if (nextProps.SocialRegisterSuccess) {
            var responce = nextProps.SocialRegisterInfo.details
            if (responce.code == 200) {
                Toast.show('Registration Successfull')
                this.setState({modalVisible:!this.state.modalVisible})
            }
            else {
                Toast.show('Registration Failed')
            }
        }
    }

    socialValidate = () => {
        if (this.state.phone.length < 10) {
            Toast.show("Enter 10 Digit Mobile Number")
        }
        else {
            this.props.SocialRegister({...this.state.userInfo,phone:this.state.phone})
        }
    }

    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userData = await GoogleSignin.signIn();
            this.setState({userInfo:userData.user})
            // setloggedIn(true);
            // console.log(userData.user);
            this.props.SocialLogin(userData.user);

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                alert('Cancel');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('Signin in progress');
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('PLAY_SERVICES_NOT_AVAILABLE');
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    render() {

        return (
            <ScrollView >
                <ImageBackground source={{ uri: "https://images.pexels.com/photos/6580673/pexels-photo-6580673.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" }} style={{ width: width, height: height }} resizeMode='stretch' >
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text style={{ textAlign: 'center', fontSize: 25, color: 'white', margin: '10%' }}>Login</Text>
                        <View style={{ backgroundColor: 'white', width: '20%', borderRadius: 50, alignSelf: 'center', margin: '10%' }}>
                            <Ionicons name={this.state.showAnimation ? 'lock-open-sharp' : 'lock-closed-sharp'} size={40} style={{ color: 'green', padding: 15, textAlign: 'center' }} />
                        </View>
                        <TextInput style={{ color: 'white', margin: '5%', textAlign: 'center', borderBottomWidth: 1, borderBottomColor: 'white' }}
                            onChangeText={(phone) => { this.setState({ phone: phone }) }}

                            maxLength={40}
                            placeholder='Email ID Or Phone Number'
                            value={this.state.phone}

                        />
                        <TextInput style={{ color: 'white', margin: '5%', textAlign: 'center', borderBottomWidth: 1, borderBottomColor: 'white' }}
                            onChangeText={(password) => { this.setState({ password: password }) }}

                            placeholder='Password'
                            value={this.state.password}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, borderRadius: 40, alignSelf: 'center', margin: '5%' }}>
                            <Text style={{ color: 'green', fontSize: 20, textAlign: 'center' }} onPress={() => { this.validation() }}>Login</Text>
                        </TouchableOpacity>
                        <GoogleSigninButton
                            style={{ width: 192, height: 48, alignSelf: 'center' }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this._signIn}
                        />
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: "4%" }}>
                            <Text style={{ color: 'green', fontSize: 10, color: 'white' }}>Dont Have Account ?</Text>
                            <Text style={{ color: 'green', fontSize: 15, color: 'white' }} onPress={() => { this.props.navigation.navigate('Signup') }}>Signup</Text>
                        </View>
                    </View>

                </ImageBackground>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        this.setState({ modalVisible: !this.state.modalVisible })
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput style={{ color: "black", textAlign: 'center', width: width - 100, borderBottomWidth: 1 }}
                                onChangeText={(phone) => { this.setState({ phone: phone }) }}
                                numberOfLines={1}
                                maxLength={40}
                                placeholder='Enter Phone Number'
                                placeholderTextColor="black"
                                value={this.state.phone}
                                keyboardType="number-pad"
                            />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => { this.socialValidate() }}
                            >
                                <Text style={styles.textStyle}>Register</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>


            </ScrollView>

        );
    }
}

function mapStateToProps(state) {
    return {
        state,
        GetLoginInfo: state.GetLogin,
        GetLoginSuccess: state.GetLogin.success,
        GetLoginFetching: state.GetLogin.fetching,

        SocialLoginInfo: state.SocialLogin,
        SocialLoginSuccess: state.SocialLogin.success,
        SocialLoginFetching: state.SocialLogin.fetching,

        SocialRegisterInfo: state.SocialRegister,
        SocialRegisterSuccess: state.SocialRegister.success,
        SocialRegisterFetching: state.SocialRegister.fetching,
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        width: width
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 5
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
export default compose(connect(mapStateToProps, {
    ...LoginActions
}))(Login);
