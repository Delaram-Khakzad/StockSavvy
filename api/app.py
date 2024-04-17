from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/api/stock-data')
def get_stock():
    # Dummy data for demonstration
    stock_data = {
        'symbol': 'AAPL',
        'name': 'Apple Inc.',
        'price': 150.23,
        'change': 2.34,
        'percent_change': 1.58
    }
    return jsonify(stock_data)

@app.route('/api/recommendations')
def get_recommendations():
    # Dummy data for demonstration
    recommendations = [
        {'symbol': 'AAPL', 'name': 'Apple Inc.', 'price': 150.23},
        {'symbol': 'MSFT', 'name': 'Microsoft Corporation', 'price': 300.45}
    ]
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
