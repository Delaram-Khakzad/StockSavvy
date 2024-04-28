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


def get_random_ticker_from_industry(index):
    index = int(index)
    random_description = choice(index_description[index])

    # get a ticker with that description
    for row, data in sorted(iter(sp.get_data().iterrows()), key=lambda k: random.random()):
        if data['Industry'] == random_description:
            return {'symbol': row, 'name': data['Shortname']}

if __name__ == '__main__':
    ticjer = get_random_ticker_from_industry(0)
    print(ticjer)

