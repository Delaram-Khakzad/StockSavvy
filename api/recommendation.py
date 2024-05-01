import json
from sandp import SandP500
from market import Market

from random import choice
import random

m = Market.from_file("../datasets/Siccodes17.txt")

sp = SandP500()

d = json.load(open('../datasets/cats.json', 'r'))

index_description = {i:[] for i in range(17)}
for industry, index in d.items():
    index_description[index] += [industry]


def get_random_ticker_from_industry(index, user_text=None, nonce=None):
    # add in stock weights if present in user_text
    stock2industry = json.load(open('../datasets/stock2industry.json', 'r'))
    industries = m.get_industry_long_names()
    tickers = sp.extract_tickers(user_text)
    base_bias = 0.65 # tinker with the starting industry bias
    query_bias = [base_bias if index == id else 0 for id in range(17)]
    
    if len(tickers) != 0:
        # add in stock weights
        stock_choice_bias = [0]*17
        
        for ticker in tickers:
            industry_biases = stock2industry.get(ticker)
            if industry is not None:
                for ind, bias in industry_biases.items():
                    stock_choice_bias[industries.index(ind)] += bias
        # # normalize
        # stock_choice_bias = [b/sum(stock_choice_bias) for b in stock_choice_bias]

        stock_weight = 1.15
        # add in stock weights
        for i in range(17):
            query_bias[i] += stock_weight * stock_choice_bias[i]

        # renormalize
        query_bias = [b/sum(query_bias) for b in query_bias]

    # score each stock with cosine similarity
    scores = {}
    for stock in stock2industry.keys():
        stock_biases = stock2industry[stock]
        score = 0
        for i, ind in enumerate(industries):
            score += query_bias[i]*stock_biases.get(ind, 0)
        score /= sum(query_bias) * sum(stock_biases.values())
        scores[stock] = score
    ordered_stocks = sorted(scores.keys(), key=lambda x: scores[x], reverse=True)
    chosen_stock = ordered_stocks[nonce % len(ordered_stocks)]
    # return {'symbol': 'AAPL', 'name': 'Apple Inc.'}
    return {'symbol': chosen_stock, 'name': sp.get_data().loc[chosen_stock]['Shortname']}

    # if len(tickers_industries) > 0 and random.random() > 0.33:
    #     random_description = choice(tickers_industries)
    #     for row, data in sorted(iter(sp.get_data().iterrows()), key=lambda k: random.random()):
    #         if data['Industry'] == random_description:
    #             if row in tickers:
    #                 continue
    #             return {'symbol': row, 'name': data['Shortname']}
    # index = int(index)
    # random_description = choice(index_description[index])

    # # get a ticker with that description
    # for row, data in sorted(iter(sp.get_data().iterrows()), key=lambda k: random.random()):
    #     if data['Industry'] == random_description:
    #         return {'symbol': row, 'name': data['Shortname']}
    return {'symbol': 'AAPL', 'name': 'Apple Inc.'}

if __name__ == '__main__':
    ticjer = get_random_ticker_from_industry(0)
    print(ticjer)

