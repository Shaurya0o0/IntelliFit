import sys
import json


weight = float(sys.argv[1])
body_goal = sys.argv[2]


if body_goal == "Bulk":

    calories = weight * 40
    protein = weight * 2.0
    carbs = weight * 5
    fats = weight * 1

elif body_goal == "Lean Bulk":

    calories = weight * 35
    protein = weight * 2.0
    carbs = weight * 4
    fats = weight * 0.8

elif body_goal == "Cut":

    calories = weight * 25
    protein = weight * 2.2
    carbs = weight * 2.5
    fats = weight * 0.7

else:

    calories = weight * 30
    protein = weight * 1.8
    carbs = weight * 3.5
    fats = weight * 0.8


meal_plans = {

    # Bulk
    "Bulk": {

    "breakfast": [
        "100g Oats",
        "300ml Milk",
        "2 Bananas",
        "3 tbsp Peanut Butter",
        "5 Whole Eggs"
    ],

    "mid_morning_snack": [
        "Peanut Butter Sandwich",
        "Apple"
    ],

    "lunch": [
        "250g Rice",
        "200g Chicken Breast",
        "Vegetables"
    ],

    "pre_workout": [
        "Banana",
        "Coffee"
    ],

    "post_workout": [
        "Whey Protein",
        "2 Bananas"
    ],

    "dinner": [
        "4 Rotis",
        "200g Paneer",
        "Vegetables"
    ],

    "before_bed": [
        "Milk",
        "Handful of Nuts"
    ]
},
    
    # Lean Bulk
    "Lean Bulk": {

    "breakfast": [
        "80g Oats",
        "250ml Milk",
        "1 Banana",
        "2 tbsp Peanut Butter",
        "3 Whole Eggs"
    ],

    "mid_morning_snack": [
        "200g Greek Yogurt",
        "15g Almonds"
    ],

    "lunch": [
        "150g Cooked Rice",
        "150g Chicken Breast",
        "100g Mixed Vegetables",
        "Salad"
    ],

    "pre_workout": [
        "1 Banana",
        "Black Coffee"
    ],

    "post_workout": [
        "1 Scoop Whey Protein",
        "2 Brown Bread Slices"
    ],

    "dinner": [
        "3 Rotis",
        "150g Paneer",
        "Vegetables"
    ],

    "before_bed": [
        "250ml Milk"
    ]
},

    # Cut

    "Cut": {

    "breakfast": [
        "60g Oats",
        "6 Egg Whites",
        "Apple"
    ],

    "mid_morning_snack": [
        "Green Tea",
        "10 Almonds"
    ],

    "lunch": [
        "150g Chicken Breast",
        "Large Salad"
    ],

    "pre_workout": [
        "Black Coffee"
    ],

    "post_workout": [
        "1 Scoop Whey Protein"
    ],

    "dinner": [
        "150g Paneer",
        "Vegetables"
    ],

    "before_bed": [
        "Greek Yogurt"
    ]
},

    # Maintain
    
    "Maintain": {

    "breakfast": [
        "70g Oats",
        "250ml Milk",
        "2 Eggs"
    ],

    "mid_morning_snack": [
        "Fruit"
    ],

    "lunch": [
        "150g Rice",
        "150g Chicken",
        "Vegetables"
    ],

    "pre_workout": [
        "Banana"
    ],

    "post_workout": [
        "Whey Protein"
    ],

    "dinner": [
        "2 Rotis",
        "150g Paneer",
        "Vegetables"
    ]
}

}


result = {
    "calories": round(calories),
    "protein": round(protein),
    "carbs": round(carbs),
    "fats": round(fats),
    "meals": meal_plans[body_goal]
}


print(json.dumps(result))