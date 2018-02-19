import React from 'react';
import {View, Modal, StyleSheet, LayoutAnimation} from 'react-native';

import {Icon} from 'react-native-elements';

import Camera from 'react-native-camera';

export default class QRScan extends Modal {

    constructor(props) {
        super(props);
        this.state = {
            qrcode: ''
        }
    }


    onBarCodeRead = (e) => {
        if (e.data !== this.state.qrcode) {
            LayoutAnimation.spring();
            this.setState({qrcode: e.data});
            this.props.callback(e.data);
        }
    };

    onClose() {
        this.props.callback(-1);
    }

    render() {
        return (
            <View style={styles.container}>
                <Camera
                    style={styles.camera}
                    onBarCodeRead={this.onBarCodeRead}
                    ref={cam => this.camera = cam}
                    aspect={Camera.constants.Aspect.fill}>
                    <Icon name='close' type='font-awesome' style={styles.closeIcon} reverse={false} size={30}
                          color='white' onPress={() => this.onClose()}/>
                </Camera>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    camera: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingRight: 30,
        paddingTop: 30,
        backgroundColor: 'black'

    },

    closeIcon: {}
});
