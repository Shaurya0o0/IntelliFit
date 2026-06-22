import sys
import json


def predict_body_goal(bmi, fitness_level):

    if bmi < 18.5:
        return "Bulk"

    elif bmi < 23:

        if fitness_level == "Advanced":
            return "Maintain"

        return "Lean Bulk"

    elif bmi < 27:

        if fitness_level == "Beginner":
            return "Recomp"

        return "Cut"

    else:
        return "Cut"


bmi = float(sys.argv[1])
fitness_level = sys.argv[2]

goal = predict_body_goal(
    bmi,
    fitness_level
)

print(
    json.dumps({
        "body_goal": goal
    })
)