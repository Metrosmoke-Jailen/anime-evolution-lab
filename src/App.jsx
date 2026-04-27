import CharacterSearchBar from "./components/CharacterSearchBar";
import GrowthSlider from "./components/GrowthSlider";
import EvolutionTimeline from "./components/EvolutionTimeline";
import CharacterCardPreview from "./components/CharacterCardPreview";
import CharacterResults from "./components/CharacterResults";

export default function App() {
  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold p-4 text-neonCyan">
        🧬 Anime Evolution Lab
      </h1>

      <CharacterSearchBar />
      <GrowthSlider />
      <CharacterResults />
      <CharacterCardPreview />
      <EvolutionTimeline />
    </div>
  );
}