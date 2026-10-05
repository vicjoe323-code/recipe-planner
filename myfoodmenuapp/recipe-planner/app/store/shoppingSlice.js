import { createSlice } from "@reduxjs/toolkit";

const shoppingSlice = createSlice({
  name: "shopping",
  initialState: [],
  reducers: {
    toggleChecked(state, action) {
      const i = state.indexOf(action.payload);
      if (i >= 0) state.splice(i, 1);
      else state.push(action.payload);
    },
  },
});

export const { toggleChecked } = shoppingSlice.actions;
export default shoppingSlice.reducer;