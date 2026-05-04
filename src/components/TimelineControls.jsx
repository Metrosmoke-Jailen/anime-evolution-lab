import { useDispatch, useSelector } from "react-redux";
import { togglePlay, nextFrame, prevFrame, setFrame } from "../features/timeline/timelineSlice";
import { toggleAlternateMode,loadSaved, buildPredictions, buildEvolution } from "../features/characterEvolution/characterEvolutionSlice";
export default function TimelineControls() {
  const dispatch = useDispatch();
  const { currentFrame, isPlaying } = useSelector((s) => s.timeline);
  const length = useSelector((s) => s.characterEvolution.evolutionTimeline.length);

  const timeline = useSelector(
    (s) => s.characterEvolution.evolutionTimeline
  );

  const save = () => {
    if (!timeline.length) return;

    localStorage.setItem("evolutionBuild", JSON.stringify(timeline));

    dispatch(buildPredictions({ timeline, intensity }));

    alert("🧬 Evolution saved!");
  };
  
  const intensity = useSelector(
    (s) => s.characterEvolution.growthIntensity
  );

  const triggerPrediction = () => {
    if (timeline.length > 0) {
      dispatch(buildPredictions({ timeline, intensity }));
    }
  };

  const selectedCharacter = useSelector(
    (s) => s.selectedCharacter.selectedCharacter
  );
  const alternateMode = useSelector(
    (s) => s.characterEvolution.alternateMode
  );

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
        <button
          onClick={() => {
            dispatch(toggleAlternateMode());

          if (selectedCharacter) {
            dispatch(
              buildEvolution({
                characterId: selectedCharacter.mal_id,
                intensity,
                alternate: !alternateMode, // flip it
              })
          ).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            dispatch(
              buildPredictions({
                timeline: res.payload,
                intensity,
              })
            );
          }
        });
      }
    }}
      >
          🧠 What If
        </button>
        
        <button onClick={() => {localStorage.setItem("evolutionBuild", JSON.stringify(timeline)); triggerPrediction(); }}>
          💾 Save
        </button>
        
        <button
          onClick={() => {
          dispatch(loadSaved());

          setTimeout(() => {
            const saved = JSON.parse(localStorage.getItem("evolutionBuild")) || [];

          if (saved.length > 0) {
            dispatch(setFrame(0)); // reset timeline position

            dispatch(
              buildPredictions({
                timeline: saved,
                intensity,
              })
            );
          }
            }, 100);
          }}
          >
          📂 Load
        </button>
      </div>
    </div>
  );
}