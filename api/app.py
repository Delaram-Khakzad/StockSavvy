from flask import Flask, jsonify, request, redirect
from flask_cors import CORS
from sandp import SandP500

app = Flask(__name__)

DEBUG = True

sp500 = SandP500('../datasets/sp500_companies.csv')

# dummy info
stock_data = {
    'AAPL': {
        'symbol': 'AAPL',
        'name': 'Apple Inc.',
        'price': 150.23,
        'change': 2.34,
        'percent_change': 1.58
    },
    'MSFT': {
        'symbol': 'MSFT',
        'name': 'Microsoft Corporation',
        'price': 300.45,
        'change': 3.45,
        'percent_change': 1.15
    }
}

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

@app.route('/')
def index():
    # redirect the user to the same ip but on port 3000
    domain = request.url_root
    return redirect(domain.replace('5000', '3000'))

@app.route('/api/symbols')
def get_symbols():
    return jsonify(sp500.symbols())

@app.route('/api/stock/<symbol>')
def get_stock(symbol):
    global stock_data
    data = stock_data.get(symbol)
    if data is None:
        return jsonify({'error': 'Invalid stock symbol'}), 400
    return jsonify(data)

@app.route('/api/all_stock_names')
def all_stock_names():
    global stock_data
    return jsonify(list(stock_data.keys()))


@app.route('/api/recommendations')
def get_recommendations():
    # Dummy data for demonstration
    recommendations = [
        {'symbol': 'AAPL', 'name': 'Apple Inc.', 'price': 150.23},
        {'symbol': 'MSFT', 'name': 'Microsoft Corporation', 'price': 300.45}
    ]
    return jsonify(recommendations)

if __name__ == '__main__':
    if DEBUG:
        CORS(app)
    app.run(debug=DEBUG)
