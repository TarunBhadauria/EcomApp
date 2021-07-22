import React, { Component } from "react";
import { AsyncStorage, Dimensions, Modal, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import { compose } from "redux";
import { AddressActions } from '../actions';
import Toast from 'react-native-simple-toast';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Spinner from "react-native-loading-spinner-overlay";
import { colors } from "../../colors";
const { width, height } = Dimensions.get('screen')





var addressindex =0;
class Checkout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            addressIndicator: false,
            modalVisible: false,
            payment:[]
           
        }
    }

    UNSAFE_componentWillMount() {
        this.props.ShowAddress();
        // alert(JSON.stringify(this.props.route.params.item))
        this.setState({
            payment:this.props.route.params.item
        })
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        // var responce = nextProps.GetHomeDataInfo.details;
        if (nextProps.ShowAddressSuccess) {
            var responce = nextProps.ShowAddressInfo.details;
            this.setState({
                items: responce.result
            })
        
        }
        if (nextProps.DeleteAddressSuccess) {
            // alert(JSON.stringify(this.state.items))
            var responce = nextProps.ShowAddressInfo.details;
           Toast.show('Address Deleted')
           this.props.ShowAddress();

        }
    
        }
      Delete=()=>{
         
        // this.props.DeleteAddress(this.props.route.params.item.data.name)
        
      }
    
    render() {

        return (
            <View>
                <Ionicons name="arrow-back-circle-sharp" size={35} style={{ padding: 5 }} onPress={() => { this.props.navigation.goBack() }} />
                <Text style={{ margin: "5%", fontSize: 25 }}>Checkout</Text>
                <TouchableOpacity style={{ borderWidth: 1, borderColor: 'black', margin: "5%" }} >
                    <Text style={{ textAlign: 'center', padding: 10, fontSize: 15 }} onPress={() => { this.props.navigation.navigate('AddAddress') }}>Add Address</Text>
                </TouchableOpacity>
                <ScrollView style={{height:height/2+50}}>
                {this.state.items == null ? <Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', padding: "5%" }}>Add At Least One Address</Text> :
                   
                   this.state.items.map((item, index) => (
                    
                    <TouchableOpacity style={{ margin: "5%" }} onPress={() => { this.setState({ addressIndicator: !this.state.addressIndicator }) ,addressindex=index }}>
                            <View style={addressindex == index ?  { borderWidth: 2, borderColor: '#9b59b6', borderRadius: 15, padding: 10, flexDirection: 'row', justifyContent: 'space-between',backgroundColor:'#dfe6e9' } : { flexDirection: 'row', borderWidth: 2, borderRadius: 15, padding: 10, justifyContent: 'space-between' }}>
                         
                           
                              
                                <View>
                                    <Text style={{ textAlign: 'left', fontSize: 20, fontFamily: 'Poppins-SemiBold' }}>{item.name} </Text>
                                    <Text style={{ textAlign: 'left', fontSize: 15 }}>{item.number}</Text>
                                    <Text style={{ textAlign: 'left' }}>{item.address}</Text>
                                    <Text style={{ textAlign: 'left' }}>{item.city}</Text>
                                </View>
                                <View >

                                    <Ionicons style={{ padding: "5%" }} name="trash-outline" size={25} onPress={() => {this.props.DeleteAddress(this.state.items[index])}}/>
                                    <Ionicons style={{ padding: "5%" }} name="pencil-outline" size={25} onPress={() => { this.props.navigation.navigate('EditAddress',{item:this.state.items[index]})}}/>
                                
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                    </ScrollView>
                    <TouchableOpacity style={{backgroundColor:'#2c3e50'}} onPress={()=>{this.props.navigation.navigate('PlaceOrder',{item:this.state.items[addressindex],payment:this.state.payment})}}>
                        <Text style={{textAlign:'center',padding:10,color:colors.white,fontSize:18}}>Place Order</Text>
                    </TouchableOpacity>
                    <Spinner visible={this.props.DeleteAddressFetching || this.props.ShowAddressFetching} />
                {/* <TouchableOpacity style={{ backgroundColor: '#2d3436', borderRadius: 5, width: "80%", alignSelf: 'center', margin: "10%" }} >
                    <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }} >Check out</Text>
                </TouchableOpacity> */}
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        state,
        ShowAddressInfo: state.ShowAddress,
        ShowAddressSuccess: state.ShowAddress.success,
        ShowAddressFetching: state.ShowAddress.fetching,
        
        EditAddressInfo: state.EditAddress,
        EditAddressSuccess: state.EditAddress.success,
        EditAddressFetching: state.EditAddress.fetching,

        DeleteAddressInfo: state.DeleteAddress,
        DeleteAddressSuccess: state.DeleteAddress.success,
        DeleteAddressFetching: state.DeleteAddress.fetching

    }
}
export default compose(connect(mapStateToProps, {
    ...AddressActions
}))(Checkout);