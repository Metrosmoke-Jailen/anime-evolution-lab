import { useSelector } from "react-redux";

export default function CharacterResults() {
  const { characterResults, status, error } = useSelector(
    (state) => state.characterEvolution
  );

  if (status === "loading") {
    return <p className="p-4">⏳ Simulating evolution timeline...</p>;
  }

  if (status === "error") {
    return <p className="p-4 text-red-400">❌ Timeline corrupted</p>;
  }

  if (!characterResults.length) {
    return <p className="p-4 text-gray-400">🌑 No evolution data available</p>;
  }

  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
      {characterResults.map((char) => (
        <div
          key={char.mal_id}
          className="bg-gray-900 p-3 rounded cursor-pointer hover:scale-105 transition"
        >
          <img
            src={char.images.jpg.image_url}
            alt={char.name}
            className="w-full h-40 object-cover rounded"
          />
          <p className="mt-2 text-sm">{char.name}</p>
        </div>
      ))}
    </div>
  );
}