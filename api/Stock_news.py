if __name__ == '__main__':
    print("This app should be included in the main app.py file")
    exit(1)

from flask import Flask, request, jsonify
import requests
import re
import openai

from __main__ import app

# Directly set your API keys here for demonstration (not recommended for production)
NEWS_API_KEY = '705baf27dc3f461fbb61ab7e949db0df'
OPENAI_API_KEY = '#sk-proj-72WC2N3leEulHSLrrdMdT3BlbkFJV9MqCKXALTeTqojjfma3'
openai.api_key = OPENAI_API_KEY

@app.route('/fetch_news/<symbol>', methods=['GET'])
def fetch_news(symbol):
    stock_name = symbol.upper()
    if not stock_name:
        return jsonify({'error': 'Stock name parameter is required'}), 400

    url = f"https://newsapi.org/v2/everything?q={stock_name}&pageSize=50&apiKey={NEWS_API_KEY}"
    articles_list = []

    try:
        response = requests.get(url)
        data = response.json()
        articles = data.get('articles', [])
        for article in articles:
            articles_list.append((article['title'], article['url']))
        return jsonify(articles_list)
    except requests.RequestException as e:
        return jsonify({'error': f'Error fetching news: {str(e)}'}), 500

@app.route('/rerank_articles', methods=['POST'])
def rerank_articles():
    data = request.get_json()
    articles = data.get('articles')
    stock_name = data.get('stock_name')

    if not articles or not stock_name:
        return jsonify({'error': 'Articles and stock name are required'}), 400

    scored_articles = []
    for title, url in articles:
        try:
            prompt = f"On a scale of 0 to 10, rate the relevance of the following news article title to the concept of '{stock_name} being stuck': {title}"
            response = openai.Completion.create(
                model="gpt-3.5-turbo-instruct",
                prompt=prompt,
                max_tokens=10
            )
            match = re.search(r'\d+', response['choices'][0]['text'])
            if match:
                score = int(match.group(0))
            else:
                continue  # Skip if no score found
            scored_articles.append((score, title, url))
        except Exception as e:
            continue  # Log actual errors in production

    scored_articles.sort(reverse=True, key=lambda x: x[0])
    return jsonify(scored_articles[:5])

