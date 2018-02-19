from flask import (Flask, request,render_template,send_from_directory)
from flask import jsonify
from flask_basicauth import BasicAuth
import os

from lib import decode_tx

app = Flask(__name__)

basic_auth = BasicAuth(app)


@app.route('/decode/', methods=['POST'])
def decode():
    data = request.get_json()
    if data is None or 'tx' not in data.keys() or data['tx'] == '':
        return "invalid tx", 401
    return jsonify(decode_tx(data['tx']))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9001, debug=True)
