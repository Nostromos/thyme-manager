"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecipesList } from "@/components/RecipesList"
import { CalendarView } from "@/components/CalendarView"
import { MealPrep } from "@/components/MealPrep"
import { BookOpen, Calendar, ChefHat } from "lucide-react"

export default function RecipeManager() {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: "One-Pot Miso-Turmeric Salmon and Coconut Rice",
      numServings: 4,
      ingredients:
        `2cups white jasmine rice
        1(15-ounce) can full-fat coconut milk
        Salt and pepper
        4scallions, light white and green parts thinly sliced
        2tablespoons white miso paste
        2tablespoons soy sauce
        1tablespoon olive oil
        1teaspoon ground turmeric
        1½pounds skinless salmon fillets, cut into 2- to 3-inch pieces 
        5packed cups/5 ounces baby spinach
        1lime, quartered 
        Cilantro leaves (optional), for garnish`,
      instructions:
        "In a large Dutch oven or other large heavy pot with a tight- fitting lid, combine the rice, coconut milk and 2 cups of water; season with 1 teaspoon salt.Bring to a boil, covered, over high. Meanwhile, in a medium bowl, combine the scallions with the miso, soy sauce, olive oil, turmeric and a few grinds of pepper to form a chunky paste. Add the salmon; toss to coat., When the rice starts to boil, reduce the heat to medium-low, adjusting it as needed to maintain a simmer. Stir to make sure nothing is sticking on the bottom. Layer the spinach on top of the rice. Squeeze 2 lime quarters over the spinach. Nestle the salmon pieces on top in an even layer, scraping in any scallions remaining in the bowl. Cover and cook until the salmon is just cooked through, breaking apart the thickest piece to check, 12 to 16 minutes. Squeeze the remaining lime quarters over the salmon. Top with cilantro, if using. Scoop into bowls or plates to serve."
    }
  ])

  const [scheduledDays, setScheduledDays] = useState([])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Simple Recipe Manager</h1>
          <p className="text-muted-foreground">Organize your recipes, plan your meals, and prep like a pro</p>
        </div>

        <Tabs defaultValue="recipes" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recipes" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Recipes
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="mealprep" className="flex items-center gap-2">
              <ChefHat className="w-4 h-4" />
              Meal Prep
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recipes" className="mt-6">
            <RecipesList recipes={recipes} setRecipes={setRecipes} />
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <CalendarView recipes={recipes} scheduledDays={scheduledDays} setScheduledDays={setScheduledDays} />
          </TabsContent>

          <TabsContent value="mealprep" className="mt-6">
            <MealPrep recipes={recipes} scheduledDays={scheduledDays} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
