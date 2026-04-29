import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../features/selectedCharacter/selectedCharacterSlice";
import { fetchCharacters } from "../features/characterEvolution/characterEvolutionSlice";
import { useEffect } from "react";

export default function CharacterSearchBar() {
  const dispatch = useDispatch();
  const query = useSelector((s) => s.selectedCharacter.query);

  useEffect(() => {
    const t = setTimeout(() => {
      if (query.trim()) dispatch(fetchCharacters(query));
    }, 500);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <div className="p-4">
      <input
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
        placeholder="Search character..."
        className="w-full p-3 bg-gray-800 rounded"
      />
    </div>
  );
}