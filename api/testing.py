from market import *
from sandp import *
import json

m = Market.from_file("./datasets/Siccodes17.txt")

sp = SandP500()

d = json.load(open('datasets/cats.json', 'r'))

# for industry in sp.industries():
#     if d.get(industry) is None:
#         # ask user for sic
#         print(f"Industry: {industry}")
#         sic = input("Enter SIC: ")
#         d[industry] = int(sic)
#         json.dump(d, open('datasets/sics.json', 'w'))

industries = sp.industries()
# batch industries into groups of 5
for industries in [industries[i:i+5] for i in range(0, len(industries), 5)]:
    # skip if already loaded
    if all(d.get(industry) is not None for industry in industries):
        continue
    print("Classsify the following industries:\n")
    for industry in industries:
        print(industry)
    print("into one of the following categories:\n")
    for i, industry in enumerate(m.get_industry_long_names()):
        print(i, industry)
    print()
    print("Only output the index of the category that the industry belongs to.")
    for industry in industries:
        cat = input(f"{industry}: ")
        d[industry] = int(cat)
        json.dump(d, open('datasets/cats.json', 'w'))

exit()
for long_name in m.get_industry_long_names():
    print(long_name, end=', ')

