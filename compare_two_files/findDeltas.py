# method 1 isin() metthod
import pandas as pd

df1 = pd.read_csv("old_ids_one.csv")
df2 = pd.read_csv("old_ids_two.csv")

c_result = df1[df1.apply(tuple,1).isin(df2.apply(tuple,1))]
print(c_result)