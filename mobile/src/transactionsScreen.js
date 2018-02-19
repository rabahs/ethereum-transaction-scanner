import React from 'react';
import {Text, StyleSheet, View, Platform, TouchableOpacity} from 'react-native';
import {ListView} from 'realm/react-native';

import {Button, Icon} from 'react-native-elements';

import realm from './realm';

import {clearDB} from './db';

import TxDetails from './txDetails';


export default class TransactionsScreen extends React.Component {
    static navigationOptions = {
        title: 'Transactions',
    };

    constructor(props) {
        super(props);
        clearDB();
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        };
    }

    componentWillMount() {
        const transactions = realm.objects('Transaction');
        this.setState({realm, dataSource: this.state.dataSource.cloneWithRows(transactions)});

        transactions.addListener(() => {
            this.setState({realm, dataSource: this.state.dataSource.cloneWithRows(transactions)});
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <ListView dataSource={this.state.dataSource}
                          renderRow={(txData) => this._renderTxItem(JSON.parse(JSON.stringify(txData)))}
                          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
                          enableEmptySections={true}/>


                <Button title="Add Tx" onPress={() => navigate('TxDetails', null)}/>


            </View>
        );
    }

    _renderTxItem(txData) {
        const {navigate} = this.props.navigation;
        return (

            <TouchableOpacity onPress={() => navigate({key: 'txDetails', routeName: 'TxDetails', params: txData})}>

                <View style={styles.txItem}>
                    <Text style={styles.text}>
                        {txData.name}
                    </Text>
                    <Text style={styles.text}>
                        {txData.nonce}
                    </Text>

                    <Text style={styles.text}>
                        {txData.value}
                    </Text>
                </View>
            </TouchableOpacity>)
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 40,
        alignItems: 'center'
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    txItem: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    text: {
        marginLeft: 12,
        fontSize: 16,
    },

    header: {
        marginLeft: -5,
        marginTop: 5,
        marginBottom: (Platform.OS === 'ios') ? -7 : 0,
        lineHeight: 24,
        color: '#5357b6'
    },
});
