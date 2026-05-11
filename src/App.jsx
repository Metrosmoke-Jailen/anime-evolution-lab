import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextFrame } from "./features/timeline/timelineSlice";
import CharacterSearchBar from "./components/CharacterSearchBar";
import CharacterResults from "./components/CharacterResults";
import GrowthSlider from "./components/GrowthSlider";
import EvolutionTimeline from "./components/EvolutionTimeline";
import CharacterCardPreview from "./components/CharacterCardPreview";
import TimelineControls from "./components/TimelineControls";
import FutureBranches from "./components/FutureBranches";
import AlternateSlider from "./components/AlternateSlider"
import MultiverseView from "./components/MultiverseView";

export default function App() {
  const dispatch = useDispatch();
  const { isPlaying, speed } = useSelector((s) => s.timeline);
  const length = useSelector((s) => s.characterEvolution.evolutionTimeline.length);

  useEffect(() => {
    if (!isPlaying || length === 0) return;

    const interval = setInterval(() => {
      dispatch(nextFrame());
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed, length]);

  return (
    <div className="min-h-screen bg-black text-white">
      <h1 className="text-3xl p-4">🧬 Anime Evolution Lab</h1>

      <CharacterSearchBar />
      <GrowthSlider />
      <AlternateSlider />
      <CharacterResults />
      <TimelineControls />
      <CharacterCardPreview />
      <FutureBranches />
      <MultiverseView />
      <EvolutionTimeline />
    </div>
  );
}