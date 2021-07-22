import React, { Component, } from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class AddProfiles extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Ionicons name="arrow-back-outline" size={40} onPress={() => { this.props.navigation.goBack(); }} color='black' />
                <Text>AddProfiles</Text>
            </View>
        );
    }
}
export default AddProfiles;
