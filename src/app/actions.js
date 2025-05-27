"use server"

import OpenAI from "openai"

export async function generateMealPrepPlan(recipes, days) {
  try {
    const client = new OpenAI();

    const prompt = "TODO"

    const response = await client.responses.create({
      model: "gpt-3.5-turbo",
      input: prompt
    })
    
    return { success: true, plan: text }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
