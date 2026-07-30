# food_database.py

FOODS = {

    # ==========================================================
    # Protein Sources
    # ==========================================================

    "Chicken Breast": {
        "base_quantity": 100,
        "min_quantity": 100,
        "max_quantity": 250,
        "portion_step": 50,

        "calories": 165,
        "protein": 31,
        "carbs": 0,
        "fats": 3.6
    },

    "Paneer": {
        "base_quantity": 100,
        "min_quantity": 100,
        "max_quantity": 250,
        "portion_step": 50,

        "calories": 265,
        "protein": 18,
        "carbs": 3,
        "fats": 20
    },

    "Egg": {
        "base_quantity": 1,
        "min_quantity": 2,
        "max_quantity": 6,
        "portion_step": 1,

        "calories": 72,
        "protein": 6,
        "carbs": 0.6,
        "fats": 5
    },

    "Greek Yogurt": {
        "base_quantity": 150,
        "min_quantity": 150,
        "max_quantity": 300,
        "portion_step": 50,

        "calories": 89,
        "protein": 10,
        "carbs": 3.6,
        "fats": 0.4
    },

    "Whey Protein": {
        "base_quantity": 30,
        "min_quantity": 30,
        "max_quantity": 60,
        "portion_step": 30,

        "calories": 120,
        "protein": 24,
        "carbs": 3,
        "fats": 1
    },

    # ==========================================================
    # Carbohydrates
    # ==========================================================

    "Rice": {
        "base_quantity": 100,
        "min_quantity": 100,
        "max_quantity": 300,
        "portion_step": 50,

        "calories": 130,
        "protein": 2.7,
        "carbs": 28,
        "fats": 0.3
    },

    "Oats": {
        "base_quantity": 40,
        "min_quantity": 40,
        "max_quantity": 120,
        "portion_step": 20,

        "calories": 150,
        "protein": 5,
        "carbs": 27,
        "fats": 3
    },

    "Roti": {
        "base_quantity": 1,
        "min_quantity": 2,
        "max_quantity": 4,
        "portion_step": 1,

        "calories": 100,
        "protein": 3,
        "carbs": 20,
        "fats": 1
    },

    "Banana": {
        "base_quantity": 1,
        "min_quantity": 1,
        "max_quantity": 2,
        "portion_step": 1,

        "calories": 105,
        "protein": 1.3,
        "carbs": 27,
        "fats": 0.3
    },

    "Fruit": {
        "base_quantity": 150,
        "min_quantity": 150,
        "max_quantity": 300,
        "portion_step": 50,

        "calories": 80,
        "protein": 1,
        "carbs": 20,
        "fats": 0.2
    },

    # ==========================================================
    # Dairy
    # ==========================================================

    "Milk": {
        "base_quantity": 250,
        "min_quantity": 250,
        "max_quantity": 500,
        "portion_step": 100,

        "calories": 150,
        "protein": 8,
        "carbs": 12,
        "fats": 8
    },

    # ==========================================================
    # Healthy Fats
    # ==========================================================

    "Peanut Butter": {
        "base_quantity": 15,
        "min_quantity": 15,
        "max_quantity": 30,
        "portion_step": 15,

        "calories": 90,
        "protein": 4,
        "carbs": 3,
        "fats": 8
    },

    "Almonds": {
        "base_quantity": 15,
        "min_quantity": 15,
        "max_quantity": 30,
        "portion_step": 15,

        "calories": 87,
        "protein": 3,
        "carbs": 3,
        "fats": 7.5
    },

    # ==========================================================
    # Vegetables
    # ==========================================================

    "Vegetables": {
        "base_quantity": 100,
        "min_quantity": 100,
        "max_quantity": 200,
        "portion_step": 50,

        "calories": 35,
        "protein": 2,
        "carbs": 7,
        "fats": 0.3
    },

    # ==========================================================
    # Drinks
    # ==========================================================

    "Black Coffee": {
        "base_quantity": 1,
        "min_quantity": 1,
        "max_quantity": 1,
        "portion_step": 0,

        "calories": 2,
        "protein": 0,
        "carbs": 0,
        "fats": 0
    }

}