import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  baseCharacter: null,
  evolutionTimeline: [],
  status: "idle", // idle | loading | success | error
  error: null,
  growthIntensity: 50,
};

const characterEvolutionSlice = createSlice({
  name: "characterEvolution",
  initialState,
  reducers: {
    setBaseCharacter: (state, action) => {
      state.baseCharacter = action.payload;
    },
    setEvolutionTimeline: (state, action) => {
      state.evolutionTimeline = action.payload;
      state.status = "success";
    },
    setLoading: (state) => {
      state.status = "loading";
    },
    setError: (state, action) => {
      state.status = "error";
      state.error = action.payload;
    },
    setGrowthIntensity: (state, action) => {
      state.growthIntensity = action.payload;
    },
    resetEvolution: () => initialState,
  },
});

export const {
  setBaseCharacter,
  setEvolutionTimeline,
  setLoading,
  setError,
  setGrowthIntensity,
  resetEvolution,
} = characterEvolutionSlice.actions;

export default characterEvolutionSlice.reducer;