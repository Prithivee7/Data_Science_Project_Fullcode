import pandas as pd

resume1 = pd.read_csv('Resume.csv')

# print(resume1.head())

resume2 = pd.read_csv('Resume_Remaining.csv')

# print(resume2.head())

df = pd.concat([resume1, resume2], ignore_index=False)

df.to_csv('Resume Data.csv', index=False)