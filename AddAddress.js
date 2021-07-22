import React, { Component } from "react";
import { AsyncStorage, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import { compose } from "redux";
import { AddressActions } from '../actions';
import Toast from 'react-native-simple-toast';


class AddAddress extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            number: '',
            Address: '',
            City: ''
        }
    }
     validation = async() => {
        if (this.state.name == '') {
            Toast.show('Name Cant Be Empty');
        }
        else {
            if (this.state.number.length < 10) {
                Toast.show('Length Of Phone Number Should Be 10')
            }
            else if (this.state.Address === '') {
                Toast.show('Invalid Address')
            }
            else if (this.state.Address === '') {
                Toast.show('Invalid City')
            }
            else {
                this.props.AddAddress(
                    {
                        name: this.state.name,                        
                        number: this.state.number,
                        address:this.state.Address,
                        city:this.state.City
                    }
                )
                
               
            }
            
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.AddAddressSuccess) {
            
            Toast.show('Address Added');
            this.props.navigation.navigate('Checkout')
            this.props.ShowAddress();
         
        }
    }
    render() {
        return (
            <View>
                <Ionicons name="arrow-back-circle-sharp" size={35} style={{ padding: 5 }} onPress={() => { this.props.navigation.goBack() }} />
                <Text style={{ margin: "5%", fontSize: 25 }}>Add Address</Text>
                <View >
                    <View style={{ margin: '5%', textAlign: 'center', borderWidth: 1, borderColor: 'black' }}>
                        <TextInput style={{ textAlign: 'center', backgroundColor: '#7f8c8d' }}
                            maxLength={40}
                            placeholder="Enter Name"
                            onChangeText={(name) => { this.setState({ name: name }) }}
                        />

                    </View>
                    <View style={{ margin: '5%', textAlign: 'center', borderWidth: 1, borderColor: 'black' }}>
                        <TextInput style={{ textAlign: 'center', backgroundColor: '#7f8c8d' }}
                            maxLength={40}
                            placeholder="Phone Number"
                            onChangeText={(number) => { this.setState({ number: number }) }}
                        />

                    </View>
                    <View style={{ margin: '5%', textAlign: 'center', borderWidth: 1, borderColor: 'black' }}>
                        <TextInput style={{ textAlign: 'center', backgroundColor: '#7f8c8d' }}
                            maxLength={40}
                            placeholder="Address"
                            onChangeText={(Address) => { this.setState({ Address: Address }) }}
                        />

                    </View>
                    <View style={{ margin: '5%', textAlign: 'center', borderWidth: 1, borderColor: 'black' }}>
                        <TextInput style={{ textAlign: 'center', backgroundColor: '#7f8c8d' }}
                            maxLength={40}
                            placeholder="City"
                            onChangeText={(City) => { this.setState({ City: City }) }}
                        />

                    </View>

                    <TouchableOpacity style={{ backgroundColor: '#273c75', margin: "10%", borderRadius: 10 }} onPress={() => { this.validation() }}>
                        <Text style={{ textAlign: 'center', padding: 10, color: 'white' }} >Add Address</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        state,
        AddAddressInfo: state.AddAddress,
        AddAddressSuccess: state.AddAddress.success,
        AddAddressFetching: state.AddAddress.fetching
    }
}
export default compose(connect(mapStateToProps, {
    ...AddressActions
}))(AddAddress);
