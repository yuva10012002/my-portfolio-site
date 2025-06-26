import pandas as pd
from sklearn.preprocessing import LabelEncoder, OneHotEncoder

# Load dataset
df = pd.read_csv("data.csv")

# Check the first few rows
print(df.head())

# Check unique values of x4 to determine encoding strategy
print(df["x4"].unique())

# **1. Ordinal Encoding for x4**
ordinal_encoder = LabelEncoder()
df_ordinal = df.copy()
df_ordinal["x4"] = ordinal_encoder.fit_transform(df_ordinal["x4"])

# **2. One-Hot Encoding for x4**
df_nominal = df.copy()
df_nominal = pd.get_dummies(df_nominal, columns=["x4"], drop_first=True)  # One-hot encode x4

# Display the transformed datasets
print("Ordinal Encoding:\n", df_ordinal.head())
print("One-Hot Encoding:\n", df_nominal.head())

# Save the datasets
df_ordinal.to_csv("data_ordinal.csv", index=False)
df_nominal.to_csv("data_nominal.csv", index=False)
