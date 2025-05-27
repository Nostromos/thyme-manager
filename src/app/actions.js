"use server"

import OpenAI from "openai" // nextjs automatically imports env variables

const client = new OpenAI();

export async function generateMealPrepPlan(recipes, days) {
  // days []{day: date, recipeNames: []string}
  // recipes

  // const recipeList = recipes.map((recipe) => `Name: ${recipe.name} \n Ingredients: ${recipe.ingredients} \n Directions: ${recipe.instructions}`.join("\n"))

  try {
    const response = await client.responses.create({
      model: "gpt-4.1",
      input: `Write a meal prep plan using the recipes that I share below.
      I want to prepare these meals on Sunday and plan to cook them on the days
      that I have shared for each recipe:

      Recipes: ${JSON.stringify(recipes)}
      Days: ${JSON.stringify(days)}

      Please return the response using HTML formatting
      `
    });

    return { success: true, plan: response.output_text }
  } catch (error) {
    return { success: false, plan: response.error.message }
  }
}
