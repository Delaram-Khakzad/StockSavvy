from flask import Flask, jsonify
from flask_cors import CORS
from trending_stock import get_top_trending_stocks
from Stock_news import fetch_and_rerank_news

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

@app.route('/api/trending_stocks')
def top_trending_stocks():
    try:
        stocks = get_top_trending_stocks()
        return jsonify(stocks)
    except Exception as e:
        return 'error', 400
    

def stock_news():
    try:
        news = fetch_and_rerank_news()  
        return jsonify(news)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
