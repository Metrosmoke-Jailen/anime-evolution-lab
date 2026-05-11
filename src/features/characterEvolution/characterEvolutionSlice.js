import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchCharacters, getCharacterAnime } from "../../services/jikanApi";
import { generateEvolutionTimeline } from "../../utils/evolutionEngine";
import { generateFutureBranches } from "../../utils/predictionEngine";
import { generateMultiverse } from "../../utils/multiverseEngine";

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
  async ({ characterId, intensity, alternate, alternateIntensity }, thunkAPI) => {
    try {
      const anime = await getCharacterAnime(characterId);
      return generateEvolutionTimeline(anime, intensity, alternate, alternateIntensity);
    } catch (err) {
      console.error("🔥 buildEvolution error:", err);
      return thunkAPI.rejectWithValue(err.message || "Evolution failed");
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

export const buildMultiverse = createAsyncThunk(
  "evolution/multiverse",
  async ({ characterId, intensity, alternate }, thunkAPI) => {
    try {
      const anime = await getCharacterAnime(characterId);

      return generateMultiverse(anime, intensity, alternate);
    } catch (err) {
      console.error("Multiverse error:", err);
      return thunkAPI.rejectWithValue("Multiverse failed");
    }
  }
);

const slice = createSlice({
  name: "characterEvolution",
  initialState: {
  characterResults: [],
  evolutionTimeline: [],
  multiTimelines: [], 
  futureBranches: [],
  branchHistory: [],
  selectedFuture: null,
  status: "idle",
  error: null,
  growthIntensity: 50,
  alternateMode: false,
  alternateIntensity: 0, 
  },
  reducers: {
    setGrowthIntensity: (s, a) => {
      s.growthIntensity = a.payload;
    },
    toggleAlternateMode: (s) => {
      s.alternateMode = !s.alternateMode;
    },
    setAlternateIntensity: (s, a) => {
      s.alternateIntensity = a.payload;
    },
    loadSaved: (s) => {
      const saved = JSON.parse(localStorage.getItem("evolutionBuild"));
      if (saved) s.evolutionTimeline = saved;
    },
    selectFuture: (s, a) => {
      s.selectedFuture = a.payload;
    },
    applyFutureToTimeline: (state, action) => {
      const future = action.payload;
      if (!future || !state.evolutionTimeline.length) return;

      const last = state.evolutionTimeline[state.evolutionTimeline.length - 1];

      const newNode = {
        id: `future-${Date.now()}`,
        animeTitle: `Future: ${future.label}`,
        year: "Future",
        role: "Predicted Arc",
        powerLevel: Math.round(future.projectedPower),
        mutation: "Fate Chosen",
      };

      state.evolutionTimeline.push(newNode);
      state.branchHistory.push(future);
    },
    setMultiTimelines: (s, a) => {
      s.multiTimelines = a.payload;
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
      })
      .addCase(buildMultiverse.fulfilled, (s, a) => {
        s.multiTimelines = a.payload;
      });
  },
});

export const {
  setGrowthIntensity,
  setAlternateIntensity,
  toggleAlternateMode,
  loadSaved,
  selectFuture,
  applyFutureToTimeline,
  setMultiTimelines,
} = slice.actions;

export default slice.reducer;