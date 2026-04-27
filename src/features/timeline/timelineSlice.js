import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentFrame: 0,
  isPlaying: false,
};

const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    setFrame: (state, action) => {
      state.currentFrame = action.payload;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const { setFrame, togglePlay } = timelineSlice.actions;
export default timelineSlice.reducer;