import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  selectedAnime: null,
  selectedCharacter: null,
};

const selectedCharacterSlice = createSlice({
  name: "selectedCharacter",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setSelectedAnime: (state, action) => {
      state.selectedAnime = action.payload;
    },
    setSelectedCharacter: (state, action) => {
      state.selectedCharacter = action.payload;
    },
    resetSelection: () => initialState,
  },
});

export const {
  setQuery,
  setSelectedAnime,
  setSelectedCharacter,
  resetSelection,
} = selectedCharacterSlice.actions;

export default selectedCharacterSlice.reducer;