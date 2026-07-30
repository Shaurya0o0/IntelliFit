import sys
import json

from meal_templates import MEAL_TEMPLATES
from portion_calculator import (
    calculate_meal_targets,
    generate_portions
)

# ==========================================================
# Activity Multipliers
# ==========================================================

ACTIVITY_LEVELS = {
    "beginner": 1.375,
    "intermediate": 1.55,
    "advanced": 1.725
}


# ==========================================================
# Calculate BMR
# Mifflin-St Jeor Equation
# ==========================================================

def calculate_bmr(weight, height, age, gender):

    gender = gender.lower()

    if gender == "male":
        return (
            (10 * weight)
            + (6.25 * height)
            - (5 * age)
            + 5
        )

    return (
        (10 * weight)
        + (6.25 * height)
        - (5 * age)
        - 161
    )


# ==========================================================
# Calculate TDEE
# ==========================================================

def calculate_tdee(bmr, activity_level):

    multiplier = ACTIVITY_LEVELS.get(
        activity_level.lower(),
        1.55
    )

    return round(bmr * multiplier)


# ==========================================================
# Adjust Calories According To Goal
# ==========================================================

def adjust_calories(tdee, goal):

    goal = goal.lower()

    if goal == "bulk":
        return tdee + 400

    elif goal == "lean bulk":
        return tdee + 200

    elif goal == "cut":
        return tdee - 500

    return tdee


# ==========================================================
# Calculate Daily Macros
# ==========================================================

def calculate_macros(calories, weight, goal):

    goal = goal.lower()

    if goal == "cut":
        protein = round(weight * 2.2)

    elif goal == "bulk":
        protein = round(weight * 1.8)

    else:
        protein = round(weight * 2.0)

    fats = round(weight * 0.8)

    protein_calories = protein * 4

    fat_calories = fats * 9

    carb_calories = calories - protein_calories - fat_calories

    carbs = round(carb_calories / 4)

    return {

        "calories": calories,

        "protein": protein,

        "carbs": carbs,

        "fats": fats
    }


# ==========================================================
# Generate Complete Diet Plan
# ==========================================================

def generate_diet_plan(user):

    diet = user["diet"].title()

    goal = user["goal"].title()

    activity = user["activityLevel"].lower()

    try:

        template = MEAL_TEMPLATES[diet][goal]

    except KeyError:

        raise ValueError(
            f"Meal template not found for {diet} -> {goal}"
        )

    # --------------------------------------------------

    bmr = calculate_bmr(

        user["weight"],

        user["height"],

        user["age"],

        user["gender"]
    )

    tdee = calculate_tdee(

        bmr,

        activity
    )

    calories = adjust_calories(

        tdee,

        goal
    )

    # --------------------------------------------------

    macros = calculate_macros(

        calories,

        user["weight"],

        goal
    )

    # --------------------------------------------------

    meal_targets = calculate_meal_targets(

        macros["calories"],

        macros["protein"],

        macros["carbs"],

        macros["fats"]
    )

    # --------------------------------------------------

    meals = {}

    for meal_name, foods in template.items():

        meals[meal_name] = generate_portions(

            foods,

            meal_targets[meal_name]
        )

    # --------------------------------------------------

    return {

        "success": True,

        "goal": goal,

        "diet_type": diet,

        "bmr": round(bmr),

        "tdee": round(tdee),

        "daily_macros": macros,

        "meals": meals
    }


# ==========================================================
# Entry Point (Called From Node.js)
# ==========================================================

if __name__ == "__main__":

    try:

        if len(sys.argv) != 8:

            raise Exception(
                "Expected arguments: age gender height weight activityLevel goal diet"
            )

        user = {

            "age": int(sys.argv[1]),

            "gender": sys.argv[2],

            "height": float(sys.argv[3]),

            "weight": float(sys.argv[4]),

            "activityLevel": sys.argv[5],

            "goal": sys.argv[6],

            "diet": sys.argv[7]

        }

        result = generate_diet_plan(user)

        print(json.dumps(result))

    except Exception as e:

        print(json.dumps({

            "success": False,

            "error": str(e)

        }))

        sys.exit(1)