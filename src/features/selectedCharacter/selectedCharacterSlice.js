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
    setSelectedCharacter: (state, action) => {
      state.selectedCharacter = action.payload;
    },
  },
});

export const { setQuery, setSelectedCharacter } = selectedCharacterSlice.actions;
export default selectedCharacterSlice.reducer;