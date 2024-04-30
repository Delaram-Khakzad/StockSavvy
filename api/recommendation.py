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
    # attempt to extract tickers from text
    random.seed(user_text + str(nonce))
    tickers = sp.extract_tickers(user_text)
    tickers_industries = [sp.get_data().loc[ticker, 'Industry'] for ticker in tickers]
    print(tickers_industries)
    # 33% chance of returning a ticker from the industry of the extracted tickers
    if len(tickers_industries) > 0 and random.random() > 0.33:
        random_description = choice(tickers_industries)
        for row, data in sorted(iter(sp.get_data().iterrows()), key=lambda k: random.random()):
            if data['Industry'] == random_description:
                if row in tickers:
                    continue
                return {'symbol': row, 'name': data['Shortname']}
    index = int(index)
    random_description = choice(index_description[index])

    # get a ticker with that description
    for row, data in sorted(iter(sp.get_data().iterrows()), key=lambda k: random.random()):
        if data['Industry'] == random_description:
            return {'symbol': row, 'name': data['Shortname']}

if __name__ == '__main__':
    ticjer = get_random_ticker_from_industry(0)
    print(ticjer)

