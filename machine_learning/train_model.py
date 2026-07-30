import pandas as pd
import joblib
import os

from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score


# ==========================
# LOAD DATASET
# ==========================

df = pd.read_csv(
    "dataset/workout_recommendation_dataset.csv"
)


# ==========================
# CREATE ENCODERS
# ==========================

gender_encoder = LabelEncoder()
level_encoder = LabelEncoder()
goal_encoder = LabelEncoder()
plan_encoder = LabelEncoder()


# ==========================
# GOAL LABELS
# ==========================

# Bulk is now available in the dataset and should be learned by the model.
# No normalization is required.

# ==========================
# ENCODE DATA
# ==========================

df["gender"] = gender_encoder.fit_transform(
    df["gender"]
)

df["fitness_level"] = level_encoder.fit_transform(
    df["fitness_level"]
)

df["goal"] = goal_encoder.fit_transform(
    df["goal"]
)

df["workout_plan"] = plan_encoder.fit_transform(
    df["workout_plan"]
)


# ==========================
# FEATURES AND TARGET
# ==========================

X = df[
    [
        "age",
        "gender",
        "bmi",
        "fitness_level",
        "goal"
    ]
]

y = df["workout_plan"]


# ==========================
# TRAIN TEST SPLIT
# ==========================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# ==========================
# TRAIN MODEL
# ==========================

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)


model.fit(
    X_train,
    y_train
)


# ==========================
# MODEL TESTING
# ==========================

y_pred = model.predict(
    X_test
)


accuracy = accuracy_score(
    y_test,
    y_pred
)


print(
    "Accuracy:",
    accuracy
)


# ==========================
# CREATE MODELS FOLDER
# ==========================

os.makedirs(
    "models",
    exist_ok=True
)


# ==========================
# SAVE MODEL + ENCODERS
# ==========================

joblib.dump(
    model,
    "models/workout_model.pkl"
)


joblib.dump(
    gender_encoder,
    "models/gender_encoder.pkl"
)


joblib.dump(
    level_encoder,
    "models/level_encoder.pkl"
)


joblib.dump(
    goal_encoder,
    "models/goal_encoder.pkl"
)


joblib.dump(
    plan_encoder,
    "models/plan_encoder.pkl"
)


print(
    "Model Saved Successfully"
)


# ==========================
# SHOW SUPPORTED VALUES
# ==========================

print(
    "Goals:",
    goal_encoder.classes_
)

print(
    "Fitness Levels:",
    level_encoder.classes_
)

print(
    "Workout Plans:",
    plan_encoder.classes_
)