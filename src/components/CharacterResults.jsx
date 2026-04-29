import { useDispatch, useSelector } from "react-redux";
import {
  buildEvolution,
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

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {characterResults.map((c) => (
        <div
          key={c.mal_id}
          onClick={() => {
            dispatch(setSelectedCharacter(c));
            dispatch(
              buildEvolution({
                characterId: c.mal_id,
                intensity: growthIntensity,
                alternate: alternateMode,
              })
            );
          }}
          className="bg-gray-900 p-3 rounded cursor-pointer hover:scale-105"
        >
          <img src={c.images.jpg.image_url} className="h-40 w-full object-cover rounded" />
          <p>{c.name}</p>
        </div>
      ))}
    </div>
  );
}