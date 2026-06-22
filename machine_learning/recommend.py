import os
import sys
import json
import joblib
import pandas as pd
from workout_templates import templates

# =====================================
# PATHS
# =====================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# =====================================
# LOAD MODEL
# =====================================

model = joblib.load(
    os.path.join(BASE_DIR, "models", "workout_model.pkl")
)

gender_encoder = joblib.load(
    os.path.join(BASE_DIR, "models", "gender_encoder.pkl")
)

level_encoder = joblib.load(
    os.path.join(BASE_DIR, "models", "level_encoder.pkl")
)

goal_encoder = joblib.load(
    os.path.join(BASE_DIR, "models", "goal_encoder.pkl")
)

plan_encoder = joblib.load(
    os.path.join(BASE_DIR, "models", "plan_encoder.pkl")
)

# =====================================
# INPUTS
# =====================================

age = int(sys.argv[1])
gender = sys.argv[2]
bmi = float(sys.argv[3])
fitness_level = sys.argv[4]
goal = sys.argv[5]

# =====================================
# ENCODE
# =====================================

gender_encoded = gender_encoder.transform([gender])[0]
level_encoded = level_encoder.transform([fitness_level])[0]
goal_encoded = goal_encoder.transform([goal])[0]

# =====================================
# CREATE INPUT
# =====================================

input_data = pd.DataFrame(
    [[
        age,
        gender_encoded,
        bmi,
        level_encoded,
        goal_encoded
    ]],
    columns=[
        "age",
        "gender",
        "bmi",
        "fitness_level",
        "goal"
    ]
)

# =====================================
# PREDICT
# =====================================

prediction = model.predict(input_data)

plan = plan_encoder.inverse_transform(prediction)[0]

workout_plan = templates.get(plan, {})

# =====================================
# RESPONSE
# =====================================

result = {
    "plan": plan,
    "schedule": workout_plan
}

print(json.dumps(result))