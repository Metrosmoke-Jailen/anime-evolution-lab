import CharacterSearchBar from "./components/CharacterSearchBar";

export default function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <h1 className="text-3xl p-4 font-bold">
        🧬 Anime Evolution Lab
      </h1>

      <CharacterSearchBar />
    </div>
  );
}