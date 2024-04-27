from flask import Flask, jsonify, request, redirect
from flask_cors import CORS
from sandp import SandP500
import time

app = Flask(__name__)

import stock_info
import stock_graph

DEBUG = True

# allow CORS
@app.after_request
def after_request(response):
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


app.add_url_rule('/api/stocks', view_func=stock_info.get_symbols)
app.add_url_rule('/api/stock/<symbol>', view_func=stock_info.get_stock)
app.add_url_rule('/api/stock/<symbol>/summary', view_func=stock_info.summary)
app.add_url_rule('/api/stock/<symbol>/graph', view_func=stock_graph.plot_stock_price)


# @app.route('/api/recommendations')
# def get_recommendations():
#     # Dummy data for demonstration
#     recommendations = [
#         {'symbol': 'AAPL', 'name': 'Apple Inc.', 'price': 150.23},
#         {'symbol': 'MSFT', 'name': 'Microsoft Corporation', 'price': 300.45}
#     ]
#     return jsonify(recommendations)

if __name__ == '__main__':
    app.config['ENV'] = 'development'
    app.config['DEBUG'] = DEBUG
    if DEBUG:
        CORS(app)
    app.run(debug=DEBUG)
