- Client (React Native)
  - Scan QR code of a signed Ethereum transaction
  - Post to server for decoding
  - Allows user to label the transaction and store on the device


- REST Server (Python/Flask)
  - POST /decode with json body:

    { "tx": "transaction hex value"}

  - Response is decoded transaction in json:
  {
    "address": "transaction address",
    "data": "tx data",
    "gasLimit": 20000,
    "gasPrice": 0,
    "nonce": 0,
    "r": "",
    "s": "",
    "v": 7,
    "value": 300000000000
  }
