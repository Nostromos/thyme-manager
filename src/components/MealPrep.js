"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ChefHat } from "lucide-react"
import { generateMealPrepPlan } from "../app/actions"

export function MealPrep({ recipes, scheduledDays }) {
  const [mealPlan, setMealPlan] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePlan = async () => {
    setIsGenerating(true)
    try {
      const result = await generateMealPrepPlan(recipes, scheduledDays)
      if (result.success) {
        setMealPlan(result.plan)
      } else {
        setMealPlan(`Error generating meal plan: ${result.error}`)
      }
    } catch (error) {
      setMealPlan(`Error: ${error.message}`)
    }
    setIsGenerating(false)
  }

  const hasScheduledMeals = scheduledDays.length > 0 && recipes.length > 0

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Meal Prep Planner</h2>
        <Button onClick={generatePlan} disabled={!hasScheduledMeals || isGenerating}>
          {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ChefHat className="w-4 h-4 mr-2" />}
          Generate Meal Prep Plan
        </Button>
      </div>

      {!hasScheduledMeals && (
        <Card>
          <CardContent className="p-6 text-center">
            <ChefHat className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Ready to meal prep?</h3>
            <p className="text-muted-foreground mb-4">
              Add some recipes and schedule them on your calendar first, then come back here to generate your
              personalized meal prep plan!
            </p>
            <div className="text-sm text-muted-foreground">
              <p>
                You have {recipes.length} recipes and {scheduledDays.length} scheduled days
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {hasScheduledMeals && (
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Scheduled Meals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {scheduledDays.map((day, index) => (
                  <div key={index} className="border-l-2 border-primary pl-3">
                    <div className="font-semibold">{new Date(day.date).toLocaleDateString()}</div>
                    <div className="text-sm text-muted-foreground">{day.recipes.join(", ")}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Recipes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {recipes.map((recipe) => (
                  <div key={recipe.id} className="text-sm">
                    <span className="font-medium">{recipe.name}</span>
                    {recipe.description && <span className="text-muted-foreground"> - {recipe.description}</span>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {mealPlan && (
        <Card>
          <CardHeader>
            <CardTitle>Your AI-Generated Meal Prep Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap text-sm">{mealPlan}</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
