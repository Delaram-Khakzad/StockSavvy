import pandas as pd

class SandP500():
    def __init__(self, path='../datasets/sp500_companies.csv'):
        self.data = pd.read_csv(path)
        self.data.set_index('Symbol', inplace=True)
        
    def get_data(self):
        return self.data
    
    def industries(self):
        return self.data['Industry'].unique()
    
    def symbols(self) -> list:
        return list(self.data.index)
    
if __name__ == '__main__':
    sp500 = SandP500()
    print(sp500.get_data().head())
    print(sp500.industries())
    print(sp500.symbols())
