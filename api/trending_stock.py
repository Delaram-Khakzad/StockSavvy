from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup

def get_top_trending_stocks():
    url = 'https://finance.yahoo.com/most-active'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    table = soup.find('table', {'class': 'W(100%)'})
    rows = table.find_all('tr')[1:4]  # Get the top 3 rows for the top 3 active stocks
    
    top_stocks = []
    for row in rows:
        symbol = row.find('td', {'aria-label': 'Symbol'}).text.strip()
        top_stocks.append(symbol)
    
    return top_stocks


