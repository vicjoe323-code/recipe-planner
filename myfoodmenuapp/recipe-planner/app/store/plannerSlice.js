import { createSlice } from "@reduxjs/toolkit";

const plannerSlice = createSlice({
  name: "planner",
  initialState: {},
  reducers: {
    setMeal(state, action) {
      const { day, slot, meal } = action.payload;
      state[`${day}-${slot}`] = meal;
    },
    clearMeal(state, action) {
      delete state[action.payload];
    },
  },
});

export const { setMeal, clearMeal } = plannerSlice.actions;
export default plannerSlice.reducer;