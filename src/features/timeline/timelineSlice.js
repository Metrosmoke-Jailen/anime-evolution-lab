import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "timeline",
  initialState: {
    currentFrame: 0,
    isPlaying: false,
    speed: 1,
  },
  reducers: {
    setFrame: (s, a) => {
      s.currentFrame = a.payload;
    },
    nextFrame: (s) => {
      s.currentFrame += 1;
    },
    prevFrame: (s) => {
      s.currentFrame = Math.max(0, s.currentFrame - 1);
    },
    togglePlay: (s) => {
      s.isPlaying = !s.isPlaying;
    },
    resetTimeline: (s) => {
      s.currentFrame = 0;
    },
  },
});

export const { setFrame, nextFrame, prevFrame, togglePlay, resetTimeline } = slice.actions;
export default slice.reducer;