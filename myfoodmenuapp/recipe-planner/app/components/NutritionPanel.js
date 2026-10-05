"use client";
import { useState } from "react";
import { useSearchFoodQuery } from "../store/mealApi";

function show(n) {
  return n === undefined || n === null ? "-" : Math.round(n * 10) / 10;
}

export default function NutritionPanel({ meal }) {
  const names = [];
  for (let i = 1; i <= 20; i++) {
    const n = meal[`strIngredient${i}`];
    if (n && n.trim()) names.push(n.trim());
  }

  const [choice, setChoice] = useState(names[0] || "");
  const [term, setTerm] = useState("");
  const { data, isFetching, isError } = useSearchFoodQuery(term, {
    skip: !term,
  });

  return (
    <div className="mb-6 rounded border p-3">
      <h2 className="mb-2 text-xl font-semibold">Nutrition lookup</h2>

      <div className="mb-3 flex flex-wrap gap-2">
        <select
          value={choice}
          onChange={(e) => setChoice(e.target.value)}
          className="rounded border bg-black p-2"
        >
          {names.map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
        <button
          onClick={() => setTerm(choice)}
          className="rounded border px-4 py-2"
        >
          Look up
        </button>
      </div>

      {isFetching && <div className="h-16 animate-pulse rounded bg-gray-300" />}
      {isError && <p>Could not load nutrition. Try again.</p>}
      {data && data.length === 0 && !isFetching && <p>No products found.</p>}

      {data &&
        !isFetching &&
        data.map((p, i) => (
          <div key={i} className="mb-2 border-t pt-2 text-sm">
            <p className="font-semibold">
              {p.product_name || "Unnamed product"}
              {p.brands ? ` (${p.brands})` : ""}
            </p>
            <p>
              Per 100g: {show(p.nutriments?.["energy-kcal_100g"])} kcal, protein{" "}
              {show(p.nutriments?.proteins_100g)}g, carbs{" "}
              {show(p.nutriments?.carbohydrates_100g)}g, fat{" "}
              {show(p.nutriments?.fat_100g)}g
            </p>
          </div>
        ))}
    </div>
  );
}