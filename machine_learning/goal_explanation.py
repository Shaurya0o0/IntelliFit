import sys
import json

bmi = float(sys.argv[1])
fitness_level = sys.argv[2]
body_goal = sys.argv[3]

reason = ""

if body_goal == "Bulk":
    reason = (
        f"Your BMI is {bmi}. You are currently underweight. "
        "A calorie surplus is recommended to gain muscle and body weight."
    )

elif body_goal == "Lean Bulk":
    reason = (
        f"Your BMI is {bmi}. You are in a healthy weight range. "
        "A lean bulk will help you gain muscle while minimizing fat gain."
    )

elif body_goal == "Cut":
    reason = (
        f"Your BMI is {bmi}. You are above the ideal BMI range. "
        "A calorie deficit is recommended to reduce body fat while preserving muscle."
    )

elif body_goal == "Maintain":
    reason = (
        f"Your BMI is {bmi}. You are already in a healthy range. "
        "Maintaining your current weight while focusing on fitness is recommended."
    )

result = {
    "recommended_goal": body_goal,
    "reason": reason,
    "fitness_level": fitness_level
}

print(json.dumps(result))