import React, { Component } from 'react';
import { Button, Image, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PickImage from '../components/PickImage';

class UploadImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showUploadDialog: false,
            images: ''
        }
    }
    UNSAFE_componentWillMount() {

    }
    render() {
        return (
            <View style={{}}>
                <View style={{ margin: 10 }}>
                    <Ionicons name="arrow-back-outline" size={40} onPress={() => { this.props.navigation.goBack() }} color='black' />
                    <Text>Upload Image</Text>
                </View>
                <PickImage showUploadDialog={this.state.showUploadDialog}
                    closeModal={() => {
                        this.setState({ showUploadDialog: false })
                    }}

                    selectedImage={(image) => {
                        this.setState({ showUploadDialog: false })
                        // var images=[...this.state.images]
                        // images.push(image.path)
                        this.setState({ images: image.path })
                    }}
                />
                {/* <Button title="Open Modal" onPress={() => { this.setState({ showUploadDialog: true }) }} />
                 */}
                <View style={{ backgroundColor: 'grey', borderRadius: 50,alignSelf:'center',alignItems:'center' }}>
                    <Ionicons name="person-outline" size={35} />

                </View>
                {/* {this.state.images.map((item)=>( */}
                <View>
                    <Image source={{ uri: this.state.images }} style={{ height: 100, width: 100, resizeMode: 'contain' }} />
                </View>
                {/* ))} */}
            </View>
        );
    };
}
export default UploadImage;