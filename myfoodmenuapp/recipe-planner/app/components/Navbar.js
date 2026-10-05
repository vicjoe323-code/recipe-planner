import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-wrap gap-4 border-b p-4 print:hidden">
      <Link href="/" className="font-bold">Recipe Planner</Link>
      <Link href="/saved" className="underline">Saved</Link>
      <Link href="/planner" className="underline">Planner</Link>
      <Link href="/shopping-list" className="underline">Shopping list</Link>
    </nav>
  );
}