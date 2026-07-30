from food_database import FOODS

# ==========================================================
# Helper Functions
# ==========================================================

def get_food_macros(food_name, quantity):
    food = FOODS[food_name]

    factor = quantity / food["base_quantity"]

    return {
        "calories": round(food["calories"] * factor, 2),
        "protein": round(food["protein"] * factor, 2),
        "carbs": round(food["carbs"] * factor, 2),
        "fats": round(food["fats"] * factor, 2),
    }


def initialize_meal(food_list):
    meal = {}

    for food in food_list:
        meal[food] = FOODS[food]["min_quantity"]

    return meal


def calculate_meal_totals(meal):

    totals = {
        "calories": 0,
        "protein": 0,
        "carbs": 0,
        "fats": 0,
    }

    for food, quantity in meal.items():

        macros = get_food_macros(food, quantity)

        totals["calories"] += macros["calories"]
        totals["protein"] += macros["protein"]
        totals["carbs"] += macros["carbs"]
        totals["fats"] += macros["fats"]

    return totals


# ==========================================================
# Meal Distribution
# ==========================================================

MEAL_DISTRIBUTION = {
    "breakfast": 0.25,
    "mid_morning_snack": 0.10,
    "lunch": 0.30,
    "pre_workout": 0.05,
    "post_workout": 0.10,
    "dinner": 0.15,
    "before_bed": 0.05,
}


def calculate_meal_targets(calories, protein, carbs, fats):

    meal_targets = {}

    for meal, percent in MEAL_DISTRIBUTION.items():

        meal_targets[meal] = {
            "calories": round(calories * percent),
            "protein": round(protein * percent),
            "carbs": round(carbs * percent),
            "fats": round(fats * percent),
        }

    return meal_targets


# ==========================================================
# Optimization Helpers
# ==========================================================

def calculate_error(target, totals):
    """
    Lower score = better meal.
    """

    return (
        abs(target["protein"] - totals["protein"]) * 4
        + abs(target["carbs"] - totals["carbs"]) * 2
        + abs(target["fats"] - totals["fats"]) * 3
        + abs(target["calories"] - totals["calories"]) * 0.2
    )


def simulate_change(meal, food, change, target):

    candidate = meal.copy()

    new_qty = candidate[food] + change

    new_qty = max(
        FOODS[food]["min_quantity"],
        min(new_qty, FOODS[food]["max_quantity"]),
    )

    candidate[food] = new_qty

    totals = calculate_meal_totals(candidate)

    error = calculate_error(target, totals)

    return error, candidate


# ==========================================================
# Portion Generator
# ==========================================================

def generate_portions(meal_foods, target_macros):

    meal = initialize_meal(meal_foods)

    MAX_ITERATIONS = 100

    for _ in range(MAX_ITERATIONS):

        totals = calculate_meal_totals(meal)

        current_error = calculate_error(target_macros, totals)

        best_error = current_error
        best_meal = meal.copy()

        # Try changing every food
        for food in meal:

            step = FOODS[food]["portion_step"]

            # Increase
            if meal[food] < FOODS[food]["max_quantity"]:

                error, candidate = simulate_change(
                    meal,
                    food,
                    step,
                    target_macros,
                )

                if error < best_error:

                    best_error = error
                    best_meal = candidate

            # Decrease
            if meal[food] > FOODS[food]["min_quantity"]:

                error, candidate = simulate_change(
                    meal,
                    food,
                    -step,
                    target_macros,
                )

                if error < best_error:

                    best_error = error
                    best_meal = candidate

        # No improvement -> finished
        if best_error >= current_error:
            break

        meal = best_meal

    totals = calculate_meal_totals(meal)

    return {
        "foods": meal,
        "totals": totals,
        "target": target_macros,
    }