import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentFrame: 0,
  isPlaying: false,
  speed: 1,
};

const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    setFrame: (state, action) => {
      state.currentFrame = action.payload;
    },
    nextFrame: (state) => {
      state.currentFrame += 1;
    },
    prevFrame: (state) => {
      state.currentFrame = Math.max(0, state.currentFrame - 1);
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setSpeed: (state, action) => {
      state.speed = action.payload;
    },
    resetTimeline: () => initialState,
  },
});

export const {
  setFrame,
  nextFrame,
  prevFrame,
  togglePlay,
  setSpeed,
  resetTimeline,
} = timelineSlice.actions;

export default timelineSlice.reducer;