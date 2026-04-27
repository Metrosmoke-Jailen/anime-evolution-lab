import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../features/selectedCharacter/selectedCharacterSlice";
import { fetchCharacters } from "../features/characterEvolution/characterEvolutionSlice";

export default function CharacterSearchBar() {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.selectedCharacter.query);

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(fetchCharacters(query));
    }
  };

  return (
    <div className="p-4 flex gap-2">
      <input
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
        placeholder="Search character..."
        className="flex-1 p-3 rounded bg-gray-800 text-white"
      />

      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-neonPurple rounded"
      >
        Search
      </button>
    </div>
  );
}