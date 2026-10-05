"use client";
import Link from "next/link";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleChecked } from "../store/shoppingSlice";

export default function ShoppingListPage() {
  const dispatch = useDispatch();
  const planner = useSelector((state) => state.planner);
  const checked = useSelector((state) => state.shopping);

  const items = useMemo(() => {
    const map = {};
    Object.values(planner).forEach((meal) => {
      for (let i = 1; i <= 20; i++) {
        const name = meal[`strIngredient${i}`];
        const amount = meal[`strMeasure${i}`];
        if (!name || !name.trim()) continue;
        const key = name.trim().toLowerCase();
        if (!map[key]) map[key] = [];
        if (amount && amount.trim()) map[key].push(amount.trim());
      }
    });
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  }, [planner]);

  return (
    <main className="mx-auto max-w-3xl p-4">
      <Link href="/" className="underline print:hidden">← Back</Link>
      <h1 className="my-4 text-2xl font-bold">Shopping List</h1>

      {items.length === 0 && (
        <p>Nothing here yet. Add meals to your planner first.</p>
      )}

      {items.length > 0 && (
        <button
          onClick={() => window.print()}
          className="mb-4 rounded border px-4 py-2 print:hidden"
        >
          🖨️ Print list
        </button>
      )}

      <ul>
        {items.map(([name, amounts]) => (
          <li key={name} className="mb-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={checked.includes(name)}
                onChange={() => dispatch(toggleChecked(name))}
              />
              <span className={checked.includes(name) ? "line-through opacity-50" : ""}>
                {name} {amounts.length > 0 && `(${amounts.join(" + ")})`}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </main>
  );
}