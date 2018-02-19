import React from 'react';
import {View, Text, StyleSheet, Modal, TextInput, Button} from 'react-native';
import QRScan from "./qrScan";
import Config from 'react-native-config'

import {storeTx} from './db';

export default class TxDetails extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.navigation.state.params == null) {
            this.state = {
                scannerVisible: true,
                storedTx: false,
                txData: {
                    name: '',
                    nonce: '',
                    address: '',
                    value: '',
                    data: '',
                    gasPrice: '',
                    gasLimit: '',
                    v: '',
                    s: '',
                    r: ''
                }
            };
        } else {
            console.log(this.props.navigation.state.params);
            this.state = {
                scannerVisible: false,
                storedTx: true,
                txData: this.props.navigation.state.params
            }
        }
    }

    _updateTx() {
        console.log("updating" + this.state.txData);
        storeTx(this.state.txData);
        this.setState({storedTx: true, scannerVisible: false});
        this.props.navigation.goBack(null);

    }


    handleScannerResponse(scannerResponse) {
        this.setState({scannerVisible: false});

        if (scannerResponse === -1) {
            console.log("closing barcode scanner");
            return;
        }

        console.log("decoding on server");
        return fetch(Config.API_URL, {
            method: 'POST',
            body: JSON.stringify({'tx': scannerResponse}),
            headers: {
                'user-agent': 'Mobile Ethtx',
                'content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((txJson) => {
                console.log(txJson);
                txJson['name'] = '';
                this._updateTxState(txJson)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _updateTxState(txData) {
        console.log("updating tx state" + txData);
        if (txData['address'] === this.state.txData.address) {
            console.warn("tx already fetched");
        } else {
            this.setState({txData: txData});
        }

    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.txDetails}>

                    <Text style={styles.text && styles.field_header}>Name</Text>
                    <TextInput
                        style={{
                            height: 30, marginTop: 20,
                            marginLeft: 12, borderColor: 'gray', borderWidth: 1
                        }}
                        onChangeText={(name) => {
                            this.setState((previousState) => {
                                previousState.txData.name = name;
                                return previousState;
                            })
                        }}
                        value={this.state.txData.name}
                        placeholder={'Name'}
                        editable={true}
                    />

                    <Text style={styles.text && styles.field_header}>Address</Text>
                    <Text style={styles.text} adjustsFontSizeToFit={true} numberOfLines={1}>
                        {this.state.txData.address}
                    </Text>

                    <Text style={styles.text && styles.field_header}>Nonce</Text>
                    <Text style={styles.text}>{this.state.txData.nonce}</Text>

                    <Text style={styles.text && styles.field_header}>Data</Text>
                    <Text style={styles.text} adjustsFontSizeToFit={false}>{this.state.txData.data}</Text>

                    <Text style={styles.text && styles.field_header}>Value</Text>
                    <Text style={styles.text}>{this.state.txData.value}</Text>

                    <Text style={styles.text && styles.field_header}>GasPrice</Text>
                    <Text style={styles.text} adjustsFontSizeToFit={true}>{this.state.txData.gasPrice}</Text>

                    <Text style={styles.text && styles.field_header}>GasLimit</Text>
                    <Text style={styles.text}>{this.state.txData.gasLimit}</Text>

                    <Text style={styles.text && styles.field_header}>r</Text>
                    <Text style={styles.text} adjustsFontSizeToFit={true} numberOfLines={1}>{this.state.txData.r}</Text>

                    <Text style={styles.text && styles.field_header}>s</Text>
                    <Text style={styles.text} adjustsFontSizeToFit={true} numberOfLines={1} selectable={true}>
                        {this.state.txData.s}
                    </Text>

                    <Text style={styles.text && styles.field_header}>v</Text>
                    <Text style={styles.text} adjustsFontSizeToFit={true}>{this.state.txData.v}</Text>

                    {this._renderScannerModal()}


                </View>
                {this.state.txData.address.length === 0 && (
                    <Button style={styles.scan} title="Scan Tx"
                            onPress={() => this.setState({scannerVisible: true})}/>)}
                {this.state.txData.name.length !== 0 && this.state.txData.address.length !== 0 &&
                (<Button style={styles.scan} title="Update" onPress={() => this._updateTx()}/>)
                }
            </View>
        )
    }

    _renderScannerModal() {
        return (
            <Modal
                visible={this.state.scannerVisible}
                animationType={'slide'}
                onRequestClose={() => this.setState({scannerVisible: false})}>
                <QRScan callback={this.handleScannerResponse.bind(this)}/>
            </Modal>
        )

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    txDetails: {
        flex: 1,
        padding: 12,
        justifyContent: 'flex-start',
    },
    text: {

        marginLeft: 12,

        height: 30,

        fontSize: 16,
        flexDirection: 'row',
        textAlign: "left",
        textAlignVertical: "center"
    },
    field_header: {
        marginTop: 1,
        fontWeight: 'bold'
    },
    scan: {
        position: 'absolute',
        justifyContent: 'flex-end'

    }
});
