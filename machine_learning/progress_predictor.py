import sys
import json

weight = float(sys.argv[1])
body_goal = sys.argv[2]

if body_goal == "Bulk":
    monthly_change = 2.0

elif body_goal == "Lean Bulk":
    monthly_change = 1.5

elif body_goal == "Cut":
    monthly_change = -3.0

else:
    monthly_change = 0


result = {
    "current_weight": weight,
    "predicted_weight_30_days":
        round(weight + monthly_change, 1),

    "predicted_weight_60_days":
        round(weight + (monthly_change * 2), 1),

    "predicted_weight_90_days":
        round(weight + (monthly_change * 3), 1)
}

print(json.dumps(result))