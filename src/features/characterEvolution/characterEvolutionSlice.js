import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchCharacters, getCharacterAnime } from "../../services/jikanApi";
import { generateEvolutionTimeline } from "../../utils/evolutionEngine";
import { generateFutureBranches } from "../../utils/predictionEngine";

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

export const buildPredictions = createAsyncThunk(
  "evolution/predict",
  async ({ timeline, intensity }, thunkAPI) => {
    try {
      return generateFutureBranches(timeline, intensity);
    } catch {
      return thunkAPI.rejectWithValue("Prediction failed");
    }
  }
);

const slice = createSlice({
  name: "characterEvolution",
  initialState: {
  characterResults: [],
  evolutionTimeline: [],
  futureBranches: [],
  selectedFuture: null,
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
    selectFuture: (s, a) => {
      s.selectedFuture = a.payload;
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
      })
      .addCase(buildPredictions.fulfilled, (s, a) => {
        s.futureBranches = a.payload;
      });
  },
});

export const {
  setGrowthIntensity,
  toggleAlternateMode,
  loadSaved,
  selectFuture,
} = slice.actions;

export default slice.reducer;