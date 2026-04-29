import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchCharacters, getCharacterAnime } from "../../services/jikanApi";
import { generateEvolutionTimeline } from "../../utils/evolutionEngine";

export const fetchCharacters = createAsyncThunk(
  "evolution/search",
  async (query, thunkAPI) => {
    try {
      return await searchCharacters(query);
    } catch {
      return thunkAPI.rejectWithValue("Search failed");
    }
  }
);

export const buildEvolution = createAsyncThunk(
  "evolution/build",
  async ({ characterId, intensity, alternate }, thunkAPI) => {
    try {
      const anime = await getCharacterAnime(characterId);
      return generateEvolutionTimeline(anime, intensity, alternate);
    } catch {
      return thunkAPI.rejectWithValue("Evolution failed");
    }
  }
);

const slice = createSlice({
  name: "characterEvolution",
  initialState: {
    characterResults: [],
    evolutionTimeline: [],
    status: "idle",
    error: null,
    growthIntensity: 50,
    alternateMode: false,
  },
  reducers: {
    setGrowthIntensity: (s, a) => {
      s.growthIntensity = a.payload;
    },
    toggleAlternateMode: (s) => {
      s.alternateMode = !s.alternateMode;
    },
    loadSaved: (s) => {
      const saved = JSON.parse(localStorage.getItem("evolutionBuild"));
      if (saved) s.evolutionTimeline = saved;
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchCharacters.pending, (s) => {
      s.status = "loading";
    })
      .addCase(fetchCharacters.fulfilled, (s, a) => {
        s.status = "success";
        s.characterResults = a.payload;
      })
      .addCase(fetchCharacters.rejected, (s) => {
        s.status = "error";
      })
      .addCase(buildEvolution.pending, (s) => {
        s.status = "loading";
      })
      .addCase(buildEvolution.fulfilled, (s, a) => {
        s.status = "success";
        s.evolutionTimeline = a.payload;
      })
      .addCase(buildEvolution.rejected, (s) => {
        s.status = "error";
      });
  },
});

export const {
  setGrowthIntensity,
  toggleAlternateMode,
  loadSaved,
} = slice.actions;

export default slice.reducer;