import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  baseCharacter: null,
  evolutionTimeline: [],
  status: "idle",
  growthIntensity: 50,
};

const characterEvolutionSlice = createSlice({
  name: "characterEvolution",
  initialState,
  reducers: {
    setGrowthIntensity: (state, action) => {
      state.growthIntensity = action.payload;
    },
  },
});

export const { setGrowthIntensity } = characterEvolutionSlice.actions;
export default characterEvolutionSlice.reducer;