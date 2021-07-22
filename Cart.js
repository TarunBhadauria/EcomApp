import React, { Component, } from 'react';
import { AsyncStorage, Dimensions, Image, ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { or } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { CartActions } from '../actions';


const { width, height } = Dimensions.get('screen')


const orders = [
    {
        name: "Leather Chair",
        color: "Brown",
        days: "15",
        price: "800",
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2hhaXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Coffe Table",
        color: "Brown",
        days: "10",
        price: "800",
        image: "https://images.unsplash.com/photo-1542372147193-a7aca54189cd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y29mZmUlMjB0YWJsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Study Table",
        color: "Black",
        days: "17",
        price: "900",
        image: "https://images.unsplash.com/photo-1488381297039-d6ee94af777e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80"
    },
    // {
    //     name: "Coffe Table",
    //     color: "Brown",
    //     Description: "6 months Warranty",
    //     price: "800",
    //     image: "https://images.unsplash.com/photo-1542372147193-a7aca54189cd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y29mZmUlMjB0YWJsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    // }
]
class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: [],
            total: 0
        }
    }
    getCart = async () => {
        var responce = JSON.parse(await AsyncStorage.getItem('cart'));
        // alert(responce)
        if (responce !== null) {
            this.setState({
                item: responce,
            })
        }


    }
    UNSAFE_componentWillMount() {
        this.getCart()
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        if (nextProps.AddToCartSuccess) {
            var response = nextProps.AddToCartInfo.details
            this.setState({
                item:response.newdata
            })
        }
        if (nextProps.RemoveFromCartSuccess) {
            var response = nextProps.RemoveFromCartInfo.details
            this.setState({
                item:response.newdata
            })
        }
    }
    render() {
        // AsyncStorage.clear()
        var total = 0
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Ionicons name="arrow-back-circle-sharp" size={35} style={{ padding: 5 }} onPress={() => { this.props.navigation.goBack() }} />
                    <Ionicons name="share-social-outline" size={30} style={{ padding: 5 }} />
                </View>
                <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 25, padding: 15 }}>Shopping Cart</Text>
                <View style={{ fontFamily: 'Poppins-Regular', padding: 15, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 2, borderBottomColor: 'grey' }}>
                    <Text style={{ color: 'grey', fontSize: 20 }} >{this.state.item.length} Items</Text>
                    <Text style={{ color: '#2c3e50', fontSize: 20 }} >Edit</Text>
                </View>

                <ScrollView style={{ height: height / 2 }}>
                    {this.state.item.length == 0 ? <Text style={{ textAlign: 'center', fontFamily: 'Poppins-SemiBold', fontSize: 20 }}>Nothing In Your Cart</Text> :
                        this.state.item.map(items => {
                            total += items.data.price * items.count
                            return (

                                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'grey' }}>
                                    <View style={{ width: width / 4, height: height / 4, margin: "5%" }}>
                                        <Image source={{ uri: items.data.image }} style={{ height: width / 2 - 20, width: width / 2 - 50, borderRadius: 10 }} />
                                    </View>
                                    <View style={{ padding: "10%" }}>
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15 }}>{items.data.name}</Text>
                                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 10, color: 'grey' }}>Discount : {items.data.discount} % | Quantity : {items.count}</Text>
                                        <View style={{ paddingTop: "30%" }}>
                                            <Text style={{ fontSize: 20 }}>₹ {items.data.price * items.count}</Text>

                                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                                <TouchableOpacity style={{ padding: 10 }} onPress={() => { this.props.removeFromCart(items.data) }}>
                                                    <Ionicons name="remove-outline" size={30} />
                                                </TouchableOpacity>
                                                <View style={{ padding: 15 }}>
                                                    <Text>{items.count}</Text>
                                                </View>
                                                <TouchableOpacity style={{ padding: 10 }} onPress={() => { this.props.addToCart(items.data) }}>
                                                    <Ionicons name="add-outline" size={30} />
                                                </TouchableOpacity>

                                            </View>

                                        </View>
                                    </View>
                                    <View>

                                    </View>

                                </View>


                            )
                        })}
                </ScrollView>
                <View style={{ height: '30%', borderTopWidth: 1, borderTopColor: 'grey' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                        <Text style={{ fontSize: 20, color: 'grey' }}>Total</Text>
                        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 20 }}>₹ {total}</Text>
                    </View>
                    <TouchableOpacity style={{ backgroundColor: '#2d3436', borderRadius: 5, width: "80%", alignSelf: 'center', margin: "5%" }} disabled={this.state.item.length>0?false:true} onPress={() => { this.props.navigation.navigate('Checkout', { item: this.state.item }) }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }} >Check out</Text>
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', fontSize: 15, paddingBottom: 10 }} onPress={() => { this.props.navigation.navigate('HomeDrawer') }}>Continue Shopping</Text>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        state,
        AddToCartInfo: state.addToCart,
        AddToCartSuccess: state.addToCart.success,
        AddToCartFetching: state.addToCart.fetching,

        RemoveFromCartInfo: state.removeFromCart,
        RemoveFromCartSuccess: state.removeFromCart.success,
        RemoveFromCartFetching: state.removeFromCart.fetching
    }
}
export default compose(connect(mapStateToProps, {
    ...CartActions
}))(Cart);

