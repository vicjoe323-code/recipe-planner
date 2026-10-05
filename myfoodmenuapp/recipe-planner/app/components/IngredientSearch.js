"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function IngredientSearch() {
  const [value, setValue] = useState("");
  const router = useRouter();

  function go() {
    const v = value.trim().replace(/ /g, "_");
    if (v) router.push(`/browse/i/${encodeURIComponent(v)}`);
  }

  return (
    <div className="mb-6 flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && go()}
        placeholder="Search by ingredient (e.g. salmon)"
        className="w-full rounded border p-2"
      />
      <button onClick={go} className="rounded border px-4 py-2">
        Go
      </button>
    </div>
  );
}