# Recipe and Meal Planner

A recipe app where you can search recipes, save your favourites, plan meals for the week, and get a shopping list.

## Features
- Search by ingredient
- Nutrition lookup using Open Food Facts
- Print-friendly shopping list
- Search recipes by name (with 400ms debounce)
- Browse by category and cuisine
- Recipe page with ingredients, instructions and YouTube video
- Save recipes (kept after refresh)
- Weekly planner: Monday to Sunday, breakfast, lunch and dinner
- Shopping list built from planned meals, with checkboxes
- Skeleton loaders, error and empty states

## Tech
- Next.js (App Router)
- Redux Toolkit and RTK Query
- redux-persist
- Tailwind CSS

## API
- [Open Food Facts](https://openfoodfacts.github.io/openfoodfacts-server/api/)
- [TheMealDB](https://www.themealdb.com/api.php) (no key needed)

## Run locally
1. Clone the repo
2. Open the `recipe-planner` folder
3. Run `npm install`
4. Run `npm run dev`
5. Open http://localhost:3000

## Links
https://vercel.com/i-vic/recipe-planner
Add your Vercel link here after deploying.