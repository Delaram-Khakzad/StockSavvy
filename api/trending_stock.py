from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup

import requests
from bs4 import BeautifulSoup
import random
import time

def get_top_trending_stocks():
    url = 'https://finance.yahoo.com/most-active'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    table = soup.find('table', {'class': 'W(100%)'})
    rows = table.find_all('tr')[1:11]  # Get the top 10 rows for the top 10 active stocks
    
    top_stocks = []
    for row in rows:
        symbol = row.find('td', {'aria-label': 'Symbol'}).text.strip()
        top_stocks.append(symbol)
    # seed by the current 10 minute interval
    random.seed(time.time() // 600)
    return random.sample(top_stocks, 3)  # Randomly pick 3 stocks from the top 10




