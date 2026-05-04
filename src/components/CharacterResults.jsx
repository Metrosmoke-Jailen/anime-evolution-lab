import { useDispatch, useSelector } from "react-redux";
import {
  buildEvolution,
  buildPredictions,
} from "../features/characterEvolution/characterEvolutionSlice";
import { setSelectedCharacter } from "../features/selectedCharacter/selectedCharacterSlice";

export default function CharacterResults() {
  const dispatch = useDispatch();
  const { characterResults, status, growthIntensity, alternateMode } =
    useSelector((s) => s.characterEvolution);

  if (status === "loading") return <p className="p-4">⏳ Loading...</p>;
  if (status === "error") return <p className="p-4 text-red-400">❌ Error</p>;
  if (!characterResults.length)
    return <p className="p-4 text-gray-400">No results</p>;

  const handleClick = async (c) => {
    dispatch(setSelectedCharacter(c));

    try {
      // 🧬 Step 1: Build evolution
      const resultAction = await dispatch(
        buildEvolution({
          characterId: c.mal_id,
          intensity: growthIntensity,
          alternate: alternateMode,
        })
      );

      // 🔮 Step 2: Extract timeline from result
      if (buildEvolution.fulfilled.match(resultAction)) {
        const timeline = resultAction.payload;

        // 🔮 Step 3: Generate predictions
        dispatch(
          buildPredictions({
            timeline,
            intensity: growthIntensity,
          })
        );
      }
    } catch (err) {
      console.error("Evolution + Prediction failed:", err);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {characterResults.map((c) => (
        <div
          key={c.mal_id}
          onClick={() => handleClick(c)}
          className="bg-gray-900 p-3 rounded cursor-pointer hover:scale-105 transition"
        >
          <img
            src={c.images?.jpg?.image_url || ""}
            alt={c.name}
            className="h-40 w-full object-cover rounded"
          />
          <p className="mt-2">{c.name}</p>
        </div>
      ))}
    </div>
  );
}