import joblib


goal_encoder = joblib.load(
    "models/goal_encoder.pkl"
)


print("Supported Goals:")
print(goal_encoder.classes_)