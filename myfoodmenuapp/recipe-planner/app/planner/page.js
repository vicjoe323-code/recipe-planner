"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearMeal } from "../store/plannerSlice";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const slots = ["Breakfast", "Lunch", "Dinner"];

export default function PlannerPage() {
  const dispatch = useDispatch();
  const planner = useSelector((state) => state.planner);

  return (
    <main className="mx-auto max-w-5xl p-4">
      <Link href="/" className="underline">← Back</Link>
      <h1 className="my-4 text-2xl font-bold">Weekly Planner</h1>

      <div className="grid gap-4 md:grid-cols-7">
        {days.map((day) => (
          <div key={day} className="rounded border p-2">
            <h2 className="mb-2 font-semibold">{day}</h2>
            {slots.map((slot) => {
              const key = `${day}-${slot}`;
              const meal = planner[key];
              return (
                <div key={slot} className="mb-3">
                  <p className="text-sm text-gray-400">{slot}</p>
                  {meal ? (
                    <div>
                      <Link href={`/recipe/${meal.idMeal}`} className="text-sm underline">
                        {meal.strMeal}
                      </Link>
                      <button
                        onClick={() => dispatch(clearMeal(key))}
                        className="ml-2 text-sm text-red-400"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm">—</p>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </main>
  );
}