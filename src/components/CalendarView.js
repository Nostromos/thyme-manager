"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

export function CalendarView({ recipes, scheduledDays, setScheduledDays }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedRecipe, setSelectedRecipe] = useState("")

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const formatDate = (date) => {
    return date.toISOString().split("T")[0]
  }

  const getRecipesForDate = (date) => {
    const dateStr = formatDate(date)
    const dayData = scheduledDays.find((d) => d.date === dateStr)
    return dayData ? dayData.recipes : []
  }

  const addRecipeToDate = () => {
    if (!selectedDate || !selectedRecipe) return

    const dateStr = formatDate(selectedDate)
    const existingDay = scheduledDays.find((d) => d.date === dateStr)

    if (existingDay) {
      if (!existingDay.recipes.includes(selectedRecipe)) {
        existingDay.recipes.push(selectedRecipe)
        setScheduledDays([...scheduledDays])
      }
    } else {
      setScheduledDays([...scheduledDays, { date: dateStr, recipes: [selectedRecipe] }])
    }

    setSelectedRecipe("")
  }

  const removeRecipeFromDate = (date, recipeToRemove) => {
    const dateStr = formatDate(date)
    const dayData = scheduledDays.find((d) => d.date === dateStr)
    if (dayData) {
      dayData.recipes = dayData.recipes.filter((r) => r !== recipeToRemove)
      if (dayData.recipes.length === 0) {
        setScheduledDays(scheduledDays.filter((d) => d.date !== dateStr))
      } else {
        setScheduledDays([...scheduledDays])
      }
    }
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const days = getDaysInMonth(currentDate)
  const monthYear = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Recipe Calendar</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="font-semibold min-w-[150px] text-center">{monthYear}</span>
          <Button variant="outline" size="sm" onClick={() => navigateMonth(1)}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle>Add Recipe to {selectedDate.toLocaleDateString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Select value={selectedRecipe} onValueChange={setSelectedRecipe}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a recipe" />
                </SelectTrigger>
                <SelectContent>
                  {recipes.map((recipe) => (
                    <SelectItem key={recipe.id} value={recipe.name}>
                      {recipe.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={addRecipeToDate} disabled={!selectedRecipe}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-2 text-center font-semibold text-sm">
            {day}
          </div>
        ))}

        {days.map((day, index) => (
          <div key={index} className="min-h-[100px]">
            {day && (
              <Card
                className={`h-full cursor-pointer transition-colors ${selectedDate && formatDate(selectedDate) === formatDate(day)
                    ? "ring-2 ring-primary"
                    : "hover:bg-muted/50"
                  }`}
                onClick={() => setSelectedDate(day)}
              >
                <CardContent className="p-2">
                  <div className="font-semibold text-sm mb-1">{day.getDate()}</div>
                  <div className="space-y-1">
                    {getRecipesForDate(day).map((recipe, idx) => (
                      <div
                        key={idx}
                        className="text-xs bg-primary/10 rounded px-1 py-0.5 cursor-pointer hover:bg-primary/20"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeRecipeFromDate(day, recipe)
                        }}
                      >
                        {recipe}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>

      {recipes.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Add some recipes first to schedule them on your calendar!
        </div>
      )}
    </div>
  )
}
