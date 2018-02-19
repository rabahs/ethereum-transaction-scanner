import rlp
import codecs
import binascii

from rlp.sedes import big_endian_int, binary, List


def decode_tx(tx):
    if tx.startswith('0x'):
        tx = tx[2:len(tx)]
    sedes = List(
        [big_endian_int, big_endian_int, big_endian_int, binary, big_endian_int, binary, big_endian_int, binary,
         binary])
    txc = codecs.decode(tx, "hex")
    keys = ['nonce', 'gasPrice', 'gasLimit', 'address', 'value', 'data', 'v', 'r', 's']
    values = rlp.decode(txc, sedes)
    tx = {}
    for k, v in zip(keys, values):
        if k in ['address', 'r', 's']:
            tx[k] = binascii.hexlify(v).decode('ascii')
        elif k in ['data']:
            tx[k] = v.decode('ascii')
        else:
            tx[k] = v
    return tx
