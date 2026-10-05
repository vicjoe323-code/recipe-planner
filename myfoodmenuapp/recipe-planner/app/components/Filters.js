"use client";
import Link from "next/link";
import { useGetCategoriesQuery, useGetAreasQuery } from "../store/mealApi";

export default function Filters() {
  const { data: cats } = useGetCategoriesQuery();
  const { data: areas } = useGetAreasQuery();

  const uniqueCats = [...new Set(cats?.map((c) => c.strCategory))];
  const uniqueAreas = [...new Set(areas?.map((a) => a.strArea))];

  return (
    <div className="mb-6">
      <p className="mb-1 font-semibold">Categories</p>
      <div className="mb-3 flex flex-wrap gap-2">
        {uniqueCats.map((name, i) => (
          <Link
            key={`${name}-${i}`}
            href={`/browse/c/${name}`}
            className="rounded border px-3 py-1 text-sm"
          >
            {name}
          </Link>
        ))}
      </div>

      <p className="mb-1 font-semibold">Cuisines</p>
      <div className="flex flex-wrap gap-2">
        {uniqueAreas.map((name, i) => (
          <Link
            key={`${name}-${i}`}
            href={`/browse/a/${name}`}
            className="rounded border px-3 py-1 text-sm"
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
}