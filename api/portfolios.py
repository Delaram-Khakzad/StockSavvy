import pandas as pd
import datetime

#Date column is YYYYMMDD
data = pd.read_csv('./datasets/17_Industry_Portfolios_Daily.csv', na_values=[-99.99, -999])
data['Date'] = pd.to_datetime(data['Date'], format='%Y%m%d')
# use date as index
data.set_index('Date', inplace=True)
# # trim to only past 2015
# data = data.loc['2015-01-01':]
# converert percentages to actual values
data = data / 100
# calculate variance of each column (excluding Date)
variance = data.var()
returns = pd.DataFrame(columns=data.columns)
initail_value = 1
returns.loc[0] = initail_value
# calculate returns
for i in range(1, len(data)):
    returns = returns * 1 + data.iloc[i]
# calculate percentage returns
percentage_returns = returns - initail_value
print(percentage_returns)

