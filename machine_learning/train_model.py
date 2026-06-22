import pandas as pd
import joblib

from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load dataset
df = pd.read_csv("dataset/workout_recommendation_dataset.csv")


# Create encoders
gender_encoder = LabelEncoder()
level_encoder = LabelEncoder()
goal_encoder = LabelEncoder()
plan_encoder = LabelEncoder()

# Encode categorical columns
df["gender"] = gender_encoder.fit_transform(df["gender"])
df["fitness_level"] = level_encoder.fit_transform(df["fitness_level"])
df["goal"] = goal_encoder.fit_transform(df["goal"])
df["workout_plan"] = plan_encoder.fit_transform(df["workout_plan"])

# Features and Target
X = df[["age", "gender", "bmi", "fitness_level", "goal"]]
y = df["workout_plan"]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42
)

# Train model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

# Test accuracy
y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print("Accuracy:", accuracy)

# Save model
joblib.dump(model, "workout_model.pkl")

# Save encoders
joblib.dump(gender_encoder, "gender_encoder.pkl")
joblib.dump(level_encoder, "level_encoder.pkl")
joblib.dump(goal_encoder, "goal_encoder.pkl")
joblib.dump(plan_encoder, "plan_encoder.pkl")

print("Model Saved Successfully")