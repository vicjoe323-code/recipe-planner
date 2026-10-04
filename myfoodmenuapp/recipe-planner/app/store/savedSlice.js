import { createSlice } from "@reduxjs/toolkit";

const savedSlice = createSlice ({
    name: "saved",
    initialState: [],
    reducers:{
        toggleSaved(state, action){
            const i = state.findIndex((r) =>
            r.idMeal === action.payload.idMeal);
            if (i>= 0) state.splice(i, 1);
            else state.push(action.payload);
        },
    },
});

export const {togglrSaved}=
savedSlice.actions;
export default savedSlice.reducer;