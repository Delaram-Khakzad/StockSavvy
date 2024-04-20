import pandas as pd

class SandP500():
    def __init__(self):
        self.data = pd.read_csv('datasets/sp500_companies.csv')
        self.data.set_index('Symbol', inplace=True)
        
    def get_data(self):
        return self.data
    
    def industries(self):
        return self.data['Industry'].unique()
