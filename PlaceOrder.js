import React, { Component } from "react";
import { AsyncStorage, ScrollView, Text, ToastAndroid, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from "../../colors";
import Toast from 'react-native-simple-toast';
import { CartActions } from "../actions";
import { compose } from "redux";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

class PlaceOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: [],
            payments: {
                mrp: 0,
                discount: 0,
                grandtotal: 0

            },
           

        }
    }
     UNSAFE_componentWillMount() {
        var response = this.props.route.params.item
        // alert(JSON.stringify(response))
        var payment = this.props.route.params.payment
        // alert(JSON.stringify(payment))

         this.setState({
            item: response,
            payments: payment,

        })
        
        var mrp = 0, discount = 0, grandtotal = 0
        payment.map((item) => {
            mrp += item.data.price * item.count
            discount += mrp * item.data.discount/100
            grandtotal += mrp-discount
        })
        this.setState({ payments: { mrp, discount, grandtotal } })
    }
    placeOrder=()=>{
       let body ={
           name:this.state.item.name,
           phone:this.state.item.number,
           address:this.state.item.address,
           orders:JSON.stringify(this.props.route.params.payment)
       }
       this.props.PlaceOrder(body)
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        if (nextProps.PlaceOrderSuccess) {
            Toast.show('Order Placed')
            AsyncStorage.removeItem('cart')
            this.props.navigation.reset({
                routes:[{name:'HomeDrawer'}],
                index:0
            })
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: colors.white, flex: 1 }}>
                <Ionicons name="arrow-back-circle-sharp" size={35} style={{ padding: 5 }} onPress={() => { this.props.navigation.goBack() }}/>
                <ScrollView>
                    <Text style={{ textAlign: 'center', fontSize: 25 }}>Address Details</Text>
                    <View style={{ borderRadius: 10, elevation: 5, margin: 10, padding: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>

                        <Ionicons name="home-sharp" size={35} />
                        <View style={{ padding: 10 }}>
                            <Text>{this.state.item.name}</Text>
                            <Text>{this.state.item.number}</Text>
                            <Text>{this.state.item.address}</Text>
                            <Text>{this.state.item.city}</Text>
                        </View>

                    </View>
                    <Text style={{ textAlign: 'center', fontSize: 25 }}>Payment Details</Text>
                    <View style={{ borderRadius: 10, elevation: 5, margin: 10, padding: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>

                        <Ionicons name="wallet-sharp" size={35} />
                        <View style={{ padding: 10 }}>
                            <View style={{ flexDirection: 'row' ,justifyContent:'space-between',padding:8}}>
                                <Text style={{}}>MRP</Text>
                                <Text style={{}}>{this.state.payments.mrp}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' ,justifyContent:'space-between',padding:8}}>
                                <Text style={{}}>Discount</Text>
                                <Text style={{}}>   -{this.state.payments.discount}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' ,justifyContent:'space-between',padding:8,borderTopWidth:1}}>
                                <Text style={{color:'green',fontFamily:'Poppins-SemiBold'}}>Total</Text>
                                <Text style={{color:'green',fontFamily:'Poppins-SemiBold'}}>₹ {this.state.payments.grandtotal}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={{backgroundColor:'#2c3e50'}} onPress={()=>{this.placeOrder()}}>
                        <Text style={{textAlign:'center',padding:10,color:colors.white,fontSize:18}}>Place Order</Text>
                    </TouchableOpacity>
                    <Spinner visible={this.props.PlaceOrderInfo.fetching}/>            
                    </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        state,
        PlaceOrderInfo: state.PlaceOrder,
        PlaceOrderSuccess: state.PlaceOrder.success,
        PlaceOrderFetching: state.PlaceOrder.fetching,
    }
}
export default compose(connect(mapStateToProps, {
    ...CartActions,
}))(PlaceOrder);
