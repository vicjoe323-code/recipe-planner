"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchMealsQuery } from "./store/mealApi";
import Filters from "./components/Filters";

export default function Home(){
  const [text, setText] =
  useState ("chicken");
  const [search, setSearch]= useState("chicken");

  useEffect (() => {
    const t = setTimeout (() =>
    setSearch(text), 400);
    return () => clearTimeout(t);
  }, [text]);

  const { data, isLoading, isError} = useSearchMealsQuery(search);

  return(
    <main className="mx-auto max-w-5xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Recipe Planner</h1>
      <Link href="/planner" className="mb-4 inline-block underline">
  Weekly planner →
</Link>
<Link href="/shopping-list" className="mb-4 ml-4 inline-block underline">
  Shopping list →
</Link>
      <input
      value ={text}
      onChange ={(e) =>
        setText(e.target.value)}
        placeholder="Search recipes..."
        className="mb-6 w-full rounded border p-2"
        />
        <Filters />

        {isLoading && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[...Array(8)].map((_, i) =>(
              <div key={i} className="h-48 animate pulse rounded bg-gray-300"/>
            ))}
          </div>
        )}

        {isError && <p> Something went wrong. Try again.</p>}
        {data && data.length === 0 && <p> No recipes found </p>}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {data?.map((m) =>(
            <Link
            key ={m.idMeal}
            href = {`/recipe/${m.idMeal}`}
            className="rounded border p-2"
            >
              <img
              src ={m.strMealThumb}
              alt ={m.strMeal} className="rounded"/>
              <p className="mt-2 font-semibold">{m.strMeal}</p>
            </Link>
          ))}
        </div>
    </main>
  );
}