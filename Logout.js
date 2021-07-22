import React, { Component, } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { LoginActions } from '../actions';
import Toast from 'react-native-simple-toast';
const { width, height } = Dimensions.get('screen');


class Logout extends Component {
    constructor(props) {
        super(props)
    }

    UNSAFE_componentWillMount() {
        this.props.GetLogout()

    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.GetLogoutSuccess) {
            var response = nextProps.GetLogoutInfo.details
            if (response.code == 200) {
                this.props.navigation.reset({
                    routes: [{ name: 'Login' }],
                    index: 0
                })
                Toast.show('Logged Out Succesfully')
            }
        }
    }
    render() {
        return (
            <View>
                <View style={{marginTop:width/2+50}}>
                    <Text style={{ textAlign: 'center', color: 'grey', fontSize: 30 }}>Logging You Out...</Text>

                </View>

            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
        state,
        GetLogoutInfo: state.GetLogout,
        GetLogoutSuccess: state.GetLogout.success,
        GetLogoutFetching: state.GetLogout.fetching,
    }
}
export default compose(connect(mapStateToProps, {
    ...LoginActions
}))(Logout);
