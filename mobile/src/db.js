import realm from './realm'
import {hex2ascii} from "./utils";

export function storeTx(tx) {
    realm.write(() => {
        realm.create('Transaction', {
            name: tx['name'],
            data: tx['data'],
            gasLimit: tx['gasLimit'].toString(),
            gasPrice: tx['gasPrice'].toString(),
            address: tx['address'],
            value: tx['value'].toString(),
            nonce: tx['nonce'],
            r: tx['r'],
            s: tx['s'],
            v: tx['v']
        }, true);
    });
}

export function clearDB() {
    realm.write(() => {
        realm.deleteAll();
    });
}
