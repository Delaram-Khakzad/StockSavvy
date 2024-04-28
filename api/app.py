from flask import Flask, jsonify, request, redirect
from flask_cors import CORS
from sandp import SandP500
import time
from trending_stock import get_top_trending_stocks
from Stock_news import fetch_and_rerank_news

app = Flask(__name__)

import stock_info
import stock_graph
import Stock_overall_situation
import recommendation

DEBUG = True

# allow CORS
@app.after_request
def after_request(response):
  # prevent duplicated headers
  if 'Access-Control-Allow-Origin' in response.headers:
    return response

  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

# redirect to the frontend
@app.route('/')
def index():
    # redirect the user to the same ip but on port 3000
    domain = request.url_root
    return redirect(domain.replace('5000', '3000'))

def stock_news(symbol):
    try:
        news = fetch_and_rerank_news(symbol)  
        return jsonify(news)
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
def get_multiple_recommendations(index, count):
    tries = 100
    index = int(index)
    count = int(count)
    recommendations = []
    while count > 0:
        new_recommendation = recommendation.get_random_ticker_from_industry(index)
        if new_recommendation in recommendations:
            tries -= 1
            if tries == 0:
                break
            continue
        recommendations.append(new_recommendation)
        count -= 1
    return jsonify(recommendations)


app.add_url_rule('/api/stocks', view_func=stock_info.get_symbols)
app.add_url_rule('/api/stock/<symbol>', view_func=stock_info.get_stock)
app.add_url_rule('/api/stock/<symbol>/summary', view_func=stock_info.summary)
app.add_url_rule('/api/stock/<symbol>/graph', view_func=stock_graph.plot_stock_price)
app.add_url_rule('/api/summarize_recomendations/<symbol>', view_func=Stock_overall_situation.summarize_recommendations)
app.add_url_rule('/api/stock/<symbol>/news', view_func=stock_news)
app.add_url_rule('/api/recommendations/<index>', view_func=recommendation.get_random_ticker_from_industry)
app.add_url_rule('/api/recommendations/<index>/<count>', view_func=get_multiple_recommendations)


# @app.route('/api/recommendations')
# def get_recommendations():
#     # Dummy data for demonstration
#     recommendations = [
#         {'symbol': 'AAPL', 'name': 'Apple Inc.', 'price': 150.23},
#         {'symbol': 'MSFT', 'name': 'Microsoft Corporation', 'price': 300.45}
#     ]
#     return jsonify(recommendations)

@app.route('/api/trending_stocks')
def top_trending_stocks():
    try:
        stocks = get_top_trending_stocks()
        return jsonify(stocks)
    except Exception as e:
        return 'error', 400
    




if __name__ == '__main__':
    app.config['ENV'] = 'development'
    app.config['DEBUG'] = DEBUG
    if DEBUG:
        pass
        # CORS(app)
    app.run(debug=DEBUG)
