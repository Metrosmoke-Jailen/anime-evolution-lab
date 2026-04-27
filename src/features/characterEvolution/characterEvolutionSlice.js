import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchCharacters } from "../../services/jikanApi";

export const fetchCharacters = createAsyncThunk(
  "characterEvolution/fetchCharacters",
  async (query, thunkAPI) => {
    try {
      return await searchCharacters(query);
    } catch {
      return thunkAPI.rejectWithValue("API failed");
    }
  }
);

const initialState = {
  baseCharacter: null,
  characterResults: [],
  status: "idle",
  error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = "success";
        state.characterResults = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { setGrowthIntensity } = characterEvolutionSlice.actions;
export default characterEvolutionSlice.reducer;