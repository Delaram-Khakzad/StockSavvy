if __name__ == '__main__':
    print("This app should be included in the main app.py file")
    exit(1)

from flask import Flask, request, jsonify
import requests
import re
import openai

from functools import cache



# Directly set your API keys here for demonstration (not recommended for production)
NEWS_API_KEY = '705baf27dc3f461fbb61ab7e949db0df'
OPENAI_API_KEY = 'sk-proj-2SsYcZ67svKuBHqIA3dgT3BlbkFJUjVGIv1CUVe7owKOzXAd'
openai.api_key = OPENAI_API_KEY

@cache
def fetch_and_rerank_news(stock):

    if not stock:
        return jsonify({'error': 'Stock name parameter is required'}), 400

    # Fetch news articles
    url = f"https://newsapi.org/v2/everything?q={stock}&pageSize=20&apiKey={NEWS_API_KEY}"
    articles_list = []
    try:
        response = requests.get(url)
        data = response.json()
        if 'code' in data and data['code'] == 'rateLimited':
            return jsonify([{'score': 10, 'title': 'oops, our API key was rate limited. Please try again later.', 'url': ''}])
        articles = data.get('articles', [])
        for article in articles:
            articles_list.append((article['title'], article['url']))
    except requests.RequestException as e:
        return jsonify({'error': f'Error fetching news: {str(e)}'}), 500

    # Rerank articles based on relevance using OpenAI's model
    scored_articles = []
    for title, url in articles_list:
        try:
            prompt = f"Please rate the relevance of the following news article title on a scale from 0 to 10 regarding its pertinence to the stock of '{stock}'. Begin by considering the following step: If the title is not in English, assign a score of 0. Article Title: {title}"
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
    scored_articles = scored_articles[:5]
    # decompose into named dictionary
    articles = [{'score': score, 'title': title, 'url': url} for score, title, url in scored_articles]
    return articles


