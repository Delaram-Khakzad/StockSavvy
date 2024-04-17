from market import *
from sandp import *
import json

m = Market.from_file("./datasets/Siccodes17.txt")

sp = SandP500()

d = json.load(open('datasets/sics.json', 'r'))

print(len(sp.industries())-len(d))

for industry in sp.industries():
    if d.get(industry) is None:
        # ask user for sic
        print(f"Industry: {industry}")
        sic = input("Enter SIC: ")
        d[industry] = int(sic)
        json.dump(d, open('datasets/sics.json', 'w'))
