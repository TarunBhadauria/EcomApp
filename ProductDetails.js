import React, { Component, } from 'react';
import { AsyncStorage, Dimensions, Image, ScrollView, Text, ToastAndroid, View } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { CartActions, ProductActions } from '../actions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';


const { width, height } = Dimensions.get('screen');

const size = ["S", "M", "L", "XL", "XXL",]
class ProductDetils extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            sizeindicator: false
        }

    }
    clearCart = async () => {
        await AsyncStorage.clear('cart');
    }
    UNSAFE_componentWillMount() {
        console.log('Connecting...');
        this.props.ProductDetailsById(this.props.route.params.item.id)

    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        var responce = nextProps.ProductDetailsByIdInfo.details;
        if (nextProps.ProductDetailsByIdSuccess) {
            // alert(JSON.stringify(responce))
            if (responce.result.length > 0) {
                this.setState({
                    items: responce.result[0]
                })
            }

        }

        if (nextProps.AddToCartSuccess) {
            var responce = nextProps.AddToCartInfo.details;
            Toast.show("Product Added To Cart")



        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView >
                    <View style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', elevation: 1, width: width, backgroundColor: 'rgba(256,256,256,0)' }}>
                        <Ionicons name="arrow-back-circle-sharp" size={35} onPress={() => { this.props.navigation.goBack() }} />
                    </View>
                    <Image source={{ uri: this.state.items.image }} style={{ height: width - 80, width: width }} resizeMode='contain' />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 15 }}>
                        <Text style={{ fontSize: 30, fontFamily: 'poppins-semibold' }}>{this.state.items.name}</Text>
                        <View>
                            <Text style={{ fontSize: 20, color: 'green' }}>{this.state.items.discount}% Off</Text>
                            <Text style={{ fontSize: 30, fontFamily: 'poppins-semibold' }}>₹ {this.state.items.price}</Text>
                        </View>
                    </View>
                    <Text style={{ textTransform: 'uppercase', color: 'grey', fontSize: 20 }}>Aviable Size</Text>
                    <View style={{ padding: 15, flexDirection: 'row', alignItems: 'center', margin: 10 }}>

                        {size.map((size, index) => <TouchableOpacity onPress={() => { this.setState({ sizeindicator: index }) }} style={{ flexDirection: 'row', margin: '5%', justifyContent: 'center' }}>
                            <Text style={[{ borderWidth: 0.5, borderRadius: 10, width: 30, height: 30 }], this.state.sizeindicator === index ? { borderWidth: 0.5, borderRadius: 10, width: 30, height: 30, textAlign: 'center', textAlignVertical: 'center', backgroundColor: '#686de0', color: 'white' } : { borderWidth: 0.5, borderRadius: 10, width: 30, height: 30, textAlign: 'center', textAlignVertical: 'center', color: 'black' }}>{size}</Text>
                        </TouchableOpacity>
                        )}
                        
                    </View>
                    <Text style={{marginLeft:'10%'}}>a garment for the upper body made of cotton or a similar fabric, with a collar and sleeves, and with buttons down the front.</Text>
                </ScrollView>
                <View style={{ bottom: 0, flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'grey' }}>
                    <View style={{ backgroundColor: 'white', justifyContent: 'center', padding: 10, borderRadius: 5, width: "50%" }}>
                        <Text onPress={() => { this.props.navigation.goBack() }} style={{ fontSize: 25, textAlign: "center" }}>Cancel</Text>
                    </View>

                    <TouchableOpacity onPress={() => { this.props.addToCart(this.state.items) }}
                        style={{ backgroundColor: '#686de0', justifyContent: 'center', borderRadius: 5, width: width / 2, padding: 10 }}>
                        <Text style={{ fontSize: 25, textAlign: "center" }}>Add To Cart</Text>
              
                    </TouchableOpacity>

                </View>
                <Spinner visible={this.props.ProductDetailsByIdFetching || this.props.AddToCartInfo} />
            </View>
        );
    }
}




function mapStateToProps(state) {
    return {
        state,
        ProductDetailsByIdInfo: state.ProductDetailsById,
        ProductDetailsByIdSuccess: state.ProductDetailsById.success,
        ProductDetailsByIdFetching: state.ProductDetailsById.fetching,

        AddToCartInfo: state.addToCart,
        AddToCartSuccess: state.addToCart.success,
        AddToCartFetching: state.addToCart.fetching
    }
}
export default compose(connect(mapStateToProps, {
    ...ProductActions, ...CartActions
}))(ProductDetils);
