import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const mealApi = createApi ({
    reducerPath: mealApi,
    baseQuery: fetchBaseQuery({
        baseUrl: "https://www.themealdb.com/api/json/v1/1",
    }),
    endpoints: (builder) => ({
        searchMeals: builder.query({
            query: (name) => `search.php?s = ${name}
            `,
             transformResponse: (res) => res.meals 
             || [],
        }),
        getMeal: builder.query({
          query: (id) => `lookup.php?i=${id}`,
          transformResponse: (res) => 
            (res.meals ? res.meals [0] : null),    
        }),
    }),
});

export const { useSearchMealsQuery, useGetMealQuery} = mealApi;