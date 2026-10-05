"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setMeal } from "../store/plannerSlice";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const slots = ["Breakfast", "Lunch", "Dinner"];

export default function AddToPlan({ meal }) {
  const dispatch = useDispatch();
  const [day, setDay] = useState("Monday");
  const [slot, setSlot] = useState("Dinner");
  const [done, setDone] = useState(false);

  function add() {
    dispatch(setMeal({ day, slot, meal }));
    setDone(true);
    setTimeout(() => setDone(false), 1500);
  }

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <select value={day} onChange={(e) => setDay(e.target.value)} className="rounded border bg-black p-2">
        {days.map((d) => <option key={d}>{d}</option>)}
      </select>
      <select value={slot} onChange={(e) => setSlot(e.target.value)} className="rounded border bg-black p-2">
        {slots.map((s) => <option key={s}>{s}</option>)}
      </select>
      <button onClick={add} className="rounded border px-4 py-2">
        {done ? "Added ✓" : "Add to plan"}
      </button>
    </div>
  );
}