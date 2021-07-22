import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Text,
    TouchableOpacity
} from 'react-native';

const { width, height } = Dimensions.get('window');
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import colors from '../../colors'
import Toast from 'react-native-simple-toast'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { checkMultiple, PERMISSIONS, request } from 'react-native-permissions';
import { Platform } from 'react-native';

export default class PickImage extends Component {

    openGallery = () => {

        if (Platform.OS === "android") {
            checkMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]).then(
                (statuses) => {
                    if (statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === "denied") {
                        request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((result) => {
                            // console.log(result)
                            this.openGallery();
                        });
                    }
                    if (statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === "blocked") {
                        alert("Allow Camera access from settings")
                    }
                    if (statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === "granted") {
                        ImagePicker.openPicker({
                            cropping: true,
                            compressImageQuality: 0.1
                        }).then(image => {
                            if (image.size > 1000000) {
                                Toast.show("Selected Image file size is large.")
                            } else {
                                this.props.selectedImage(image)
                            }
                        });
                    }
                    // console.log('Camera', statuses[PERMISSIONS.ANDROID.CAMERA]);
                    // console.log('WRITE_EXTERNAL_STORAGE', statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]);
                },
            );
        } else {
            checkMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]).then(
                (statuses) => {
                    if (statuses[PERMISSIONS.IOS.PHOTO_LIBRARY] === "denied") {
                        request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
                            // console.log(result)
                            this.openCamera();
                        });
                    }
                    if (statuses[PERMISSIONS.IOS.PHOTO_LIBRARY] === "blocked") {
                        alert("Allow Photo Library access from settings")
                    }
                    if (statuses[PERMISSIONS.IOS.PHOTO_LIBRARY] === "granted") {
                        ImagePicker.openPicker({
                            cropping: true,
                            compressImageQuality: 0.1
                        }).then(image => {
                            if (image.size > 1000000) {
                                Toast.show("Selected Image file size is large.")
                            } else {
                                this.props.selectedImage(image)
                            }
                        });
                    }

                },
            );
        }

    }

    openCamera = () => {
        if (Platform.OS === "android") {
            checkMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]).then(
                (statuses) => {
                    if (statuses[PERMISSIONS.ANDROID.CAMERA] === "denied") {
                        request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
                            // console.log(result)
                            this.openCamera();
                        });
                    }
                    if (statuses[PERMISSIONS.ANDROID.CAMERA] === "blocked") {
                        alert("Allow Camera access from settings")
                    }
                    if (statuses[PERMISSIONS.ANDROID.CAMERA] === "granted") {
                        ImagePicker.openCamera({
                            cropping: true,
                            compressImageQuality: 0.1
                        }).then(image => {
                            if (image.size > 1000000) {
                                Toast.show("Selected Image file size is large.")
                            } else {
                                this.props.selectedImage(image)
                            }
                        });
                    }
                },
            );
        } else {
            checkMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]).then(
                (statuses) => {
                    if (statuses[PERMISSIONS.IOS.CAMERA] === "denied") {
                        request(PERMISSIONS.IOS.CAMERA).then((result) => {
                            // console.log(result)
                            this.openCamera();
                        });
                    }
                    if (statuses[PERMISSIONS.IOS.CAMERA] === "blocked") {
                        alert("Allow Camera access from settings")
                    }
                    if (statuses[PERMISSIONS.IOS.CAMERA] === "granted") {
                        ImagePicker.openCamera({
                            cropping: true,
                            compressImageQuality: 0.1
                        }).then(image => {
                            if (image.size > 1000000) {
                                Toast.show("Selected Image file size is large.")
                            } else {
                                this.props.selectedImage(image)
                            }
                        });
                    }

                },
            );
        }

    }


    render() {

        return (
            <View>
                <Modal isVisible={this.props.showUploadDialog} style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ width: width, height: width / 1.4, position: "absolute", bottom: 0 }}>
                            <View style={{ width: width, height: width / 7.2 }}>
                                <View style={{ alignSelf: "center", backgroundColor: 'white', borderRadius: 30, padding: 5 }}>
                                    <TouchableOpacity onPress={
                                        this.props.closeModal
                                    }>
                                        <Ionicons name="close" size={30} color={'red'} />
                                    </TouchableOpacity>


                                </View>
                            </View>
                            <View style={{ backgroundColor: 'white', width: width, height: width / 1.8, borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
                                <Text style={{ margin: 15, fontSize: 12 }}>UPLOAD FROM</Text>

                                <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20 }}>

                                    <View>
                                        <TouchableOpacity onPress={() => {
                                            this.openCamera()
                                        }}>
                                            <View style={{ backgroundColor: '#1e3799', width: 50, height: width / 7.2, justifyContent: "center", borderRadius: 25 }}>
                                                <Ionicons name="camera" size={25} style={{ alignSelf: "center", opacity: 1 }} color={'white'} />
                                            </View>
                                            <Text style={{ textAlign: "center", fontSize: 9, paddingTop: 10 }}>Camera</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View>
                                        <TouchableOpacity onPress={() => {
                                            this.openGallery()
                                        }}>
                                            <View style={{ backgroundColor: '#1e3799', width: 50, height: width / 7.2, justifyContent: "center", borderRadius: 25 }}>
                                                <Ionicons name="image" size={25} style={{ alignSelf: "center", opacity: 1 }} color={'white'} />
                                            </View>
                                            <Text style={{ textAlign: "center", fontSize: 9, paddingTop: 10 }}>Gallery</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

