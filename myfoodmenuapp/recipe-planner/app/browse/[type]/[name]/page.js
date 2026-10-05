"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useFilterMealsQuery } from "../../../store/mealApi";

const labels = { c: "Category", a: "Cuisine", i: "Ingredient" };

export default function BrowsePage() {
  const { type, name } = useParams();
  const value = decodeURIComponent(name);
  const [count, setCount] = useState(20);
  const { data, isLoading, isError } = useFilterMealsQuery({ type, value });

  return (
    <main className="mx-auto max-w-5xl p-4">
      <Link href="/" className="underline">← Back</Link>
      <h1 className="my-4 text-2xl font-bold">
        {labels[type]}: {value}
      </h1>

      {isLoading && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded bg-gray-300" />
          ))}
        </div>
      )}

      {isError && <p>Something went wrong. Try again.</p>}
      {data && data.length === 0 && <p>No recipes found.</p>}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {data?.slice(0, count).map((m) => (
          <Link
            key={m.idMeal}
            href={`/recipe/${m.idMeal}`}
            className="rounded border p-2"
          >
            <img
              src={m.strMealThumb}
              alt={m.strMeal}
              referrerPolicy="no-referrer"
              className="rounded"
            />
            <p className="mt-2 font-semibold">{m.strMeal}</p>
          </Link>
        ))}
      </div>

      {data && count < data.length && (
        <button
          onClick={() => setCount(count + 20)}
          className="mt-6 rounded border px-4 py-2"
        >
          Show more
        </button>
      )}
    </main>
  );
}