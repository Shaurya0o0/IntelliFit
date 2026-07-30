import pandas as pd


file = "dataset/workout_recommendation_dataset.csv"


df = pd.read_csv(file)


df["goal"] = df["goal"].replace({
    "Fat Loss": "Cut",
    "Muscle Gain": "Lean Bulk",
    "Endurance": "Maintain"
})


df.to_csv(
    "dataset/workout_recommendation_dataset.csv",
    index=False
)


print(df["goal"].unique())