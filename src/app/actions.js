"use server";

import OpenAI from "openai"; // nextjs automatically imports env variables
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const client = new OpenAI();

export async function generateMealPrepPlan(recipes, days) {
  // days []{day: date, recipeNames: []string}
  // recipes

  // const recipeList = recipes.map((recipe) => `Name: ${recipe.name} \n Ingredients: ${recipe.ingredients} \n Directions: ${recipe.instructions}`.join("\n"))

  const recipeInstruction = z.object({
    recipeName: z.string(),
    instructions: z.string(),
  });

  const dailyInstruction = z.object({
    date: z.string(),
    recipeInstructions: z.array(recipeInstruction),
  });

  const mealPrepInstructions = z.object({
    sundayPrepList: z.array(z.string()),
    dailyInstructions: z.array(dailyInstruction),
  });

  try {
    // client.responses.parse and client.responses.create both seem to work for some reason??? to look into
    const response = await client.responses.parse({
      model: "chatgpt-4o-latest",
      input: [
        {
          role: "system",
          content: `You are a personalized chef. 
            Guide the user through meal prep instructions in the format given. 
            Include all the prep instructions for Sunday in one section and day by day cooking instructions.`,
        },
        {
          role: "user",
          content: `Write a meal prep plan using the recipes that I share below.
          I want to prepare these meals on Sunday and plan to cook them on the days
          that I have shared for each recipe:
          Recipes: ${JSON.stringify(recipes)}
          Days: ${JSON.stringify(days)}`,
        },
      ],
      text: {
        format: zodTextFormat(mealPrepInstructions, "meal_prep_instructions"),
      },
    });

    return { success: true, plan: response.output_text };
  } catch (error) {
    return { success: false, plan: error };
  }
}
