"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"

export function RecipesList({ recipes, setRecipes }) {
  const [showForm, setShowForm] = useState(false)
  const [newRecipe, setNewRecipe] = useState({ name: "", description: "", ingredients: "", instructions: "" })

  const addRecipe = () => {
    if (newRecipe.name.trim()) {
      setRecipes([...recipes, { ...newRecipe, id: Date.now() }])
      setNewRecipe({ name: "", description: "", ingredients: "", instructions: "" })
      setShowForm(false)
    }
  }

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Recipes</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Recipe
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Recipe</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Recipe name"
              value={newRecipe.name}
              onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
            />
            <Input
              placeholder="Short description"
              value={newRecipe.description}
              onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
            />
            <Textarea
              placeholder="Ingredients (one per line)"
              value={newRecipe.ingredients}
              onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
            />
            <Textarea
              placeholder="Instructions"
              value={newRecipe.instructions}
              onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
            />
            <div className="flex gap-2">
              <Button onClick={addRecipe}>Add Recipe</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <Card key={recipe.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{recipe.name}</CardTitle>
                  <CardDescription>{recipe.description}</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => deleteRecipe(recipe.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <h4 className="font-semibold text-sm">Ingredients:</h4>
                  <p className="text-sm text-muted-foreground">{recipe.ingredients}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Instructions:</h4>
                  <p className="text-sm text-muted-foreground">{recipe.instructions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {recipes.length === 0 && !showForm && (
        <div className="text-center py-8 text-muted-foreground">
          No recipes yet. Add your first recipe to get started!
        </div>
      )}
    </div>
  )
}
