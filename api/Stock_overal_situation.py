from flask import Flask, request, jsonify
import yfinance as yf
import openai

app = Flask(__name__)

# Hardcoding the OpenAI API key (not recommended for production)
openai.api_key = 'sk-proj-2SsYcZ67svKuBHqIA3dgT3BlbkFJUjVGIv1CUVe7owKOzXAd'

@app.route('/summarize_recommendations', methods=['GET'])
def summarize_recommendations():
    ticker = request.args.get('ticker')
    if not ticker:
        return jsonify({'error': 'Ticker parameter is required'}), 400

    stock = yf.Ticker(ticker)
    recommendations = stock.recommendations

    if recommendations is None or recommendations.empty:
        return jsonify({'message': 'No analyst recommendations available for this stock.'}), 404

    # Prepare data for summarization
    summary_prompt = f"Summarize the following analyst recommendations for {ticker} in three sentences:\n"
    summary_prompt += recommendations.tail(10).to_string(index=False)  # Convert DataFrame to string for API input

    # Call the OpenAI GPT API for summarization
    response = openai.Completion.create(
        engine="gpt-3.5-turbo-instruct",
        prompt=summary_prompt,
        max_tokens=150,
        temperature=0.7
    )

    # Return the summarized response
    return jsonify({'summary': response.choices[0].text.strip()})

if __name__ == '__main__':
    app.run(debug=True)
