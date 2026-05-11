import { useDispatch, useSelector } from "react-redux";
import {
  setAlternateIntensity,
  buildEvolution,
  buildPredictions,
} from "../features/characterEvolution/characterEvolutionSlice";

export default function AlternateSlider() {
  const dispatch = useDispatch();

  const {
    alternateIntensity,
    growthIntensity,
    alternateMode,
  } = useSelector((s) => s.characterEvolution);

  const selectedCharacter = useSelector(
    (s) => s.selectedCharacter.selectedCharacter
  );

  const handleChange = async (value) => {
    dispatch(setAlternateIntensity(value));

    if (!selectedCharacter) return;

    const result = await dispatch(
      buildEvolution({
        characterId: selectedCharacter.mal_id,
        intensity: growthIntensity,
        alternate: alternateMode,
        alternateIntensity: value,
      })
    );

    if (result.meta.requestStatus === "fulfilled") {
      dispatch(
        buildPredictions({
          timeline: result.payload,
          intensity: growthIntensity,
        })
      );
    }
  };

  return (
    <div className="p-4">
      <p className="text-sm mb-2">
        🧠 What If Intensity: {alternateIntensity}
      </p>

      <input
        type="range"
        min="0"
        max="100"
        value={alternateIntensity}
        onChange={(e) => handleChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}