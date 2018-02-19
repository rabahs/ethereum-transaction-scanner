import React, { Component } from 'react';
import TransactionsScreen from './src/transactionsScreen';
import TxDetails from './src/txDetails';

import { StackNavigator } from 'react-navigation';

const App = StackNavigator({
    Transactions: { screen: TransactionsScreen },
    TxDetails: { screen: TxDetails },
});

export default App;
