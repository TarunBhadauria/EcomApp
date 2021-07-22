import { Dimensions, Image, Text, View } from "react-native";
import React, { Component, } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons"
import { colors } from "../../colors";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { compose } from "redux";
import { connect } from "react-redux";
import { CartActions } from "../actions";
const { width, height } = Dimensions.get('screen')


class MyOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }
    UNSAFE_componentWillMount() {

        this.props.GetMyOrders('Deepak Yadav')
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        var responce = nextProps.GetMyOrdersInfo.details;
        // alert(responce)
        if (nextProps.GetMyOrdersSuccess) {
            this.setState({
                items: (responce.result)
            })
            // alert(typeof(responce.result))
        }
    }
    render() {
        // alert(JSON.stringify(this.state.items))
        return (
            <View style={{ backgroundColor: colors.white, flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons name="arrow-back-circle-sharp" size={30} style={{ padding: 15 }} onPress={() => { this.props.navigation.goBack(); }} />
                </View>
                <View style={{ margin: "4%" }}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 25 }}>Orders</Text>
                </View>
                <ScrollView style={{ backgroundColor: '#dfe6e9' }}>
                    {this.state.items.map(item => (
                        JSON.parse(item.orders).map(data => (
                            <TouchableOpacity>
                                <View style={{ elevation: 5, backgroundColor: colors.white, margin: "5%", padding: "10%", borderRadius: 10 }}>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ marginRight: "10%" }}>

                                            <Image source={{ uri: data.data.image }} style={{ height: width / 4 + 20, width: width / 4 - 20, borderRadius: 10 }} />

                                        </View>
                                        <View style={{flexDirection:'row',alignSelf:'center',justifyContent:'space-between'}}>
                                        <View style={{ marginLeft: "10%" }}>
                                            <Text style={{ fontFamily: 'Poppins-SemiBold', textAlign: 'center', display: 'flex' }}>Status</Text>
                                            <Text style={{}}>{data.data.name}</Text>

                                        </View>
                                        <View style={{}}>
                                            <Ionicons name="chevron-forward-outline" size={30} style={{ textAlignVertical: 'center', marginLeft: 25, color: 'grey' }} onPress={() => { this.props.navigation.goBack(); }} />

                                        </View>
                                        </View>
                                        

                                    </View>

                                </View>
                            </TouchableOpacity>
                        ))
                    ))}
                    {/* <Text>{data.data.name}</Text> */}
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        state,
        GetMyOrdersInfo: state.GetMyOrders,
        GetMyOrdersSuccess: state.GetMyOrders.success,
        GetMyOrdersFetching: state.GetMyOrders.fetching,


    }
}
export default compose(connect(mapStateToProps, {
    ...CartActions
}))(MyOrders);
