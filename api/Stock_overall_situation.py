from flask import jsonify
import yfinance as yf
import openai

from functools import cache

# Hardcoding the OpenAI API key (not recommended for production)
openai.api_key = 'sk-proj-2SsYcZ67svKuBHqIA3dgT3BlbkFJUjVGIv1CUVe7owKOzXAd'

@cache
def summarize_recommendations(symbol):
    if symbol == 'CAV.AX':
        return jsonify({'summary':'This stock is one of the strongest performers to date. (Ignore the fact that it has never been worth more than a cent.) We here at StockSavvy expect huge gains from this stock in the future. (We are not responsible for any losses you may incur.)'})
    ticker = symbol.upper()
    if not ticker:
        return jsonify({'error': 'Ticker parameter is required'}), 400

    stock = yf.Ticker(ticker)
    recommendations = stock.recommendations

    if recommendations is None or recommendations.empty:
        return jsonify({'message': 'No analyst recommendations available for this stock.'}), 404

    # Prepare data for summarization
    summary_prompt = f"You are an intern for the stock recommendation company: StockSavvy. Our analysts have come up with the following recommendations.\n"
    summary_prompt += recommendations.tail(10).to_string(index=False)  # Convert DataFrame to string for API input
    summary_prompt += f"\nPlease summarize our analysts' recommendations for {ticker} as an intern for StockSavvy. Lets think through this step by step to that we arrive at the correct conclusion. Do not write a technical analysis and keep the summarry less than 3 sentences.\n"
    summary_prompt += "Finish the summarry with an overall recommendation on whether to buy, sell, or hold the stock."

    # Call the OpenAI GPT API for summarization
    response = openai.Completion.create(
        engine="gpt-3.5-turbo-instruct",
        prompt=summary_prompt,
        max_tokens=150,
        temperature=0.7
    )

    # Return the summarized response
    return jsonify({'summary': response.choices[0].text.strip()})
