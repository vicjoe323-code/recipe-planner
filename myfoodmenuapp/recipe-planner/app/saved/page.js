"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleSaved } from "../store/savedSlice";

export default function SavedPage() {
  const dispatch = useDispatch();
  const saved = useSelector((state) => state.saved);

  return (
    <main className="mx-auto max-w-5xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Saved Recipes</h1>

      {saved.length === 0 && <p>No saved recipes yet.</p>}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {saved.map((m) => (
          <div key={m.idMeal} className="rounded border p-2">
            <Link href={`/recipe/${m.idMeal}`}>
              <img
                src={m.strMealThumb}
                alt={m.strMeal}
                referrerPolicy="no-referrer"
                className="rounded"
              />
              <p className="mt-2 font-semibold">{m.strMeal}</p>
            </Link>
            <button
              onClick={() => dispatch(toggleSaved(m))}
              className="mt-2 text-sm text-red-400"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}