import React, { Component } from "react";
import { AsyncStorage, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import { compose } from "redux";
import { AddressActions } from '../actions';
import Toast from 'react-native-simple-toast';
import { DrawerItem } from "@react-navigation/drawer";


class EditAddress extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            number: '',
            Address: '',
            City: '',
            id: '',
            items: []

        }
    }
    async UNSAFE_componentWillMount() {
        // alert(JSON.stringify(this.props.route.params.item.name))
        // this.props.EditAddress(this.props.route.params.item.name)
        var response = this.props.route.params.item
        // alert(response.id)
        await this.setState({
            name: response.name,
            Address: response.address,
            City: response.city,
            number: response.number,
            id: response.id,
            items: response
        })
        // alert(JSON.stringify(this.state.items))

    }

    validation = async () => {
       
        if (this.state.name == '') {
            Toast.show('Name Cant Be Empty');
        }
        else {
            if (this.state.items.number.length < 10) {
                Toast.show('Length Of Phone Number Should Be 10')
            }
            else if (this.state.Address === '') {
                Toast.show('Invalid Address')
            }
            else if (this.state.Address === '') {
                Toast.show('Invalid City')
            }
            else {
                this.props.EditAddress(
                    {
                        name: this.state.name,
                        number: this.state.number,
                        address: this.state.Address,
                        city: this.state.City,
                        id: this.state.items.id
                    }
                   
                )

                this.props.navigation.navigate('Checkout')
            }

        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.EditAddressSuccess) {
           
            Toast.show('Address Edited ');
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
                            value={this.state.name}
                        />

                    </View>
                    <View style={{ margin: '5%', textAlign: 'center', borderWidth: 1, borderColor: 'black' }}>
                        <TextInput style={{ textAlign: 'center', backgroundColor: '#7f8c8d' }}
                            maxLength={40}
                            placeholder="Phone Number"
                            onChangeText={(number) => { this.setState({ number: number }) }}
                            value={this.state.number}
                        />

                    </View>
                    <View style={{ margin: '5%', textAlign: 'center', borderWidth: 1, borderColor: 'black' }}>
                        <TextInput style={{ textAlign: 'center', backgroundColor: '#7f8c8d' }}
                            maxLength={40}
                            placeholder="Address"
                            onChangeText={(Address) => { this.setState({ Address: Address }) }}
                            value={this.state.Address}
                        />

                    </View>
                    <View style={{ margin: '5%', textAlign: 'center', borderWidth: 1, borderColor: 'black' }}>
                        <TextInput style={{ textAlign: 'center', backgroundColor: '#7f8c8d' }}
                            maxLength={40}
                            placeholder="City"
                            onChangeText={(City) => { this.setState({ City: City }) }}
                            value={this.state.City}
                        />

                    </View>

                    <TouchableOpacity style={{ backgroundColor: '#273c75', margin: "10%", borderRadius: 10 }} onPress={() => { this.validation() }}>
                        <Text style={{ textAlign: 'center', padding: 10, color: 'white' }} >Edit Address</Text>
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
        AddAddressFetching: state.AddAddress.fetching,

        EditAddress: state.EditAddress,
        EditAddressSuccess: state.EditAddress.success,
        EditAddressFetching: state.EditAddress.fetching
    }
}
export default compose(connect(mapStateToProps, {
    ...AddressActions
}))(EditAddress);
