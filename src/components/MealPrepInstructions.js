"use client";

export default function MealPrepInstructions({ mealPlan }) {
  const { sundayPrepList, dailyInstructions } = JSON.parse(mealPlan);
  console.log("sundayPrep: ", sundayPrepList);
  return (
    <>
      <h1>Sunday Prep</h1>
      {sundayPrepList && sundayPrepList.map((step, i) => <p key={i}>{step}</p>)}

      <br />
      <br />

      <h1>Daily Instructions</h1>
      {dailyInstructions.map((instruction, i) => (
        <div key={i}>
          <h2>{instruction.date}</h2>
          {instruction.recipeInstructions.map((instr, j) => (
            <div key={j}>
              <h3>{instr.recipeName}</h3>
              <p>{instr.instructions}</p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
