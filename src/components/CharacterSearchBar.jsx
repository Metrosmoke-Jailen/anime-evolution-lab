import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../features/selectedCharacter/selectedCharacterSlice";

export default function CharacterSearchBar() {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.selectedCharacter.query);

  return (
    <div className="p-4">
      <input
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
        placeholder="Search character..."
        className="w-full p-3 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-neonCyan"
      />
    </div>
  );
}