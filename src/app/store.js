import { configureStore } from "@reduxjs/toolkit";
import characterEvolutionReducer from "../features/characterEvolution/characterEvolutionSlice";
import selectedCharacterReducer from "../features/selectedCharacter/selectedCharacterSlice";
import timelineReducer from "../features/timeline/timelineSlice";

export const store = configureStore({
  reducer: {
    characterEvolution: characterEvolutionReducer,
    selectedCharacter: selectedCharacterReducer,
    timeline: timelineReducer,
  },
});