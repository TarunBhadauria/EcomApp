import React, { Component, } from 'react';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { CartActions, ProductActions } from '../actions';
import Toast from 'react-native-simple-toast';


const { width, height } = Dimensions.get("screen");
// const clothes = [
//     { name: 'Shirt', image: 'https://i.pinimg.com/originals/8e/20/3a/8e203aacb5e15c758bb0270a07f92d62.png', description: 'Cotton Shirt', price: '700' },
//     { name: 'Chinos', image: 'https://cdn2.stylicy.com/global/image-1165-167413917-1-big.jpg', description: 'Olive Chinos', price: '1500' },
//     { name: 'T-shirt', image: 'https://img.looksgud.com/upload/item-image/109/2ct5/2ct5-bewakoof-black-cotton-daaru-band-mens-graphic-printed-t_500x500_0.jpg', description: 'Printed T-Shirt', price: '300' },
//     { name: 'Watch', image: 'https://i.pinimg.com/736x/c9/4e/8b/c94e8b60e8b7327eea121e73df666c70.jpg', description: 'Analog Watch', price: '2500' },
//     { name: 'Jacket', image: 'https://5.imimg.com/data5/WY/TY/MY-34876737/mens-brown-leather-jacket-500x500.jpg', description: 'Leather Jacket', price: '3500' },
//     { name: 'Goggles', image: 'https://cdn.shopify.com/s/files/1/2225/0583/products/Rex_Latest_Kabir_Singh_Sunglasses_for_Men_by_Arzonai-_Silver-Black_IMAGE_3_906x700.jpg?v=1578295814', description: 'Parada', price: '750' }
// ]
class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
            ,
        }
    }
    UNSAFE_componentWillMount() {
        this.props.GetProductByCategory(this.props.route.params.item.category)
        
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.GetProductByCategorySuccess) {
            var response = nextProps.GetProductByCategoryInfo.details
            // alert(JSON.stringify(response))
            this.setState({ items: response.result })
            
        }
        if (nextProps.AddToCartSuccess) {
           Toast.show('Product Added To Cart')
            
        }
        
    }

    render() {
        return (<ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15 }}>
                <Ionicons name="arrow-back-outline" size={40} onPress={() => { this.props.navigation.goBack(); }} color='black' />
                <TouchableOpacity style={{ backgroundColor: '#dfe6e9', width: width / 4, borderRadius: 50, }}>
                    <Text style={{ fontSize: 20, color: '#fd79a8', textAlign: 'center' }}>Edit</Text>
                </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 30, fontWeight: 'bold', padding: 15, color: '#e84393', textTransform: 'uppercase' }}>{this.state.items.name}</Text>

            <View style={{ flexDirection: 'row', flexWrap:'wrap' }}>
                {this.state.items.map((item) => (
                    
                    <View style={{ margin: "2%", width: width/2-20, height: width / 2 +50,elevation:5,margin:10 }}>
                       <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ProductDetails',{ item: item })}}>
                        <Image  source={{ uri: item.image }} style={{ height: width/2, width: width/2-30, resizeMode: 'stretch',borderRadius:15}}  />
                        </TouchableOpacity>
                        <View style={{ marginLeft: 5 }}>
                            <Text  style={{ fontWeight: 'bold' }}>{item.name}</Text>
                            <Text style={{ color: 'grey' }}>{item.description}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{ fontWeight: 'bold', color: 'green' }}>₹ {item.price}</Text>
                        <View style={{flexDirection:'row'}}> 
                        <Ionicons name="heart-outline"  size={25} onPress={()=>{this.setState({icon:true})}}/>
                        <Ionicons name="cart-outline" size={25} onPress={()=>{this.props.addToCart(this.state.items)}}/>
                       
                        
                        </View>
                        </View>
                        </View>
                    </View>
                    

                ))}
            </View>
           
            <View style={{ height: 50 }}>

            </View>

        </ScrollView>
        );
    }
}
function mapStateToProps(state) {
    return {
        state,
        GetProductByCategoryInfo: state.GetProductByCategory,
        GetProductByCategorySuccess: state.GetProductByCategory.success,
        GetProductByCategoryFetching: state.GetProductByCategory.fetching,

        AddToCartInfo: state.addToCart,
        AddToCartSuccess: state.addToCart.success,
        AddToCartFetching: state.addToCart.fetching
    }
}
export default compose(connect(mapStateToProps, {
    ...ProductActions,...CartActions
}))(Category);
