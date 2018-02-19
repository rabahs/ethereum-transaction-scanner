import Realm from "realm";


export const TransactionSchema = {
    name: 'Transaction',
    primaryKey: 'address',
    properties: {
        name: 'string',
        data: 'string',
        gasLimit: 'string',
        gasPrice: 'string',
        address: 'string',
        value: 'string',
        nonce: 'int',
        r: 'string',
        s: 'string',
        v: 'int'
    }
};


export default new Realm({schema: [TransactionSchema]});

