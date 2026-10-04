"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useGetMealQuery } from "../../store/mealApi";
import { toggleSaved } from "../../store/savedSlice";

export default function RecipePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const saved = useSelector((state) => state.saved);
  const { data: meal, isLoading, isError } = useGetMealQuery(id);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-3xl p-4">
        <div className="h-64 animate-pulse rounded bg-gray-300" />
      </main>
    );
  }

  if (isError || !meal) {
    return (
      <main className="mx-auto max-w-3xl p-4">
        <p>Recipe not found.</p>
        <Link href="/" className="underline">Go back</Link>
      </main>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const amount = meal[`strMeasure${i}`];
    if (name && name.trim()) ingredients.push(`${amount} ${name}`.trim());
  }

  const isSaved = saved.some((r) => r.idMeal === meal.idMeal);
  const video = meal.strYoutube
    ? meal.strYoutube.replace("watch?v=", "embed/")
    : null;

  return (
    <main className="mx-auto max-w-3xl p-4">
      <Link href="/" className="underline">← Back</Link>
      <h1 className="my-4 text-2xl font-bold">{meal.strMeal}</h1>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        referrerPolicy="no-referrer"
        className="mb-4 w-full max-w-md rounded"
      />

      <button
        onClick={() => dispatch(toggleSaved(meal))}
        className="mb-6 rounded border px-4 py-2"
      >
        {isSaved ? "★ Saved" : "☆ Save recipe"}
      </button>

      <h2 className="mb-2 text-xl font-semibold">Ingredients</h2>
      <ul className="mb-6 list-disc pl-6">
        {ingredients.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2 className="mb-2 text-xl font-semibold">Instructions</h2>
      <p className="mb-6 whitespace-pre-line">{meal.strInstructions}</p>

      {video && (
        <iframe
          src={video}
          className="h-64 w-full rounded md:h-96"
          allowFullScreen
        />
      )}
    </main>
  );
}