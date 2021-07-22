import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class Profiles extends Component {
    constructor(props) {
        super(props)
    this.state={
        items:{}
    }
    }
    UNSAFE_componentWillMount(){
        this.setState({
            items:this.props.route.params.item
        })
    }
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Ionicons name="arrow-back-outline" size={40} onPress={() => {this.props.navigation.goBack()}} color='black' />
                <Text>{this.state.items.name}</Text>
            </View>
        );
    };
}
export default Profiles;