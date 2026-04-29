import { useDispatch, useSelector } from "react-redux";
import {
  togglePlay,
  nextFrame,
  prevFrame,
  setFrame,
} from "../features/timeline/timelineSlice";
import {
  toggleAlternateMode,
  loadSaved,
} from "../features/characterEvolution/characterEvolutionSlice";

export default function TimelineControls() {
  const dispatch = useDispatch();
  const { currentFrame, isPlaying } = useSelector((s) => s.timeline);
  const length = useSelector((s) => s.characterEvolution.evolutionTimeline.length);

  const timeline = useSelector((s) => s.characterEvolution.evolutionTimeline);

  const save = () => {
    localStorage.setItem("evolutionBuild", JSON.stringify(timeline));
  };

  return (
    <div className="p-4 space-y-2">
      <div className="flex gap-2">
        <button onClick={() => dispatch(prevFrame())}>⏪</button>
        <button onClick={() => dispatch(togglePlay())}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={() => dispatch(nextFrame())}>⏩</button>
      </div>

      <input
        type="range"
        min="0"
        max={Math.max(0, length - 1)}
        value={currentFrame}
        onChange={(e) => dispatch(setFrame(Number(e.target.value)))}
        className="w-full"
      />

      <div className="flex gap-2">
        <button onClick={() => dispatch(toggleAlternateMode())}>
          🧠 What If
        </button>
        <button onClick={save}>💾 Save</button>
        <button onClick={() => dispatch(loadSaved())}>📂 Load</button>
      </div>
    </div>
  );
}