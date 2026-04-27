import { useDispatch, useSelector } from "react-redux";
import { setGrowthIntensity } from "../features/characterEvolution/characterEvolutionSlice";

export default function GrowthSlider() {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.characterEvolution.growthIntensity);

  return (
    <div className="p-4">
      <label className="block mb-2">Growth Intensity: {value}</label>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => dispatch(setGrowthIntensity(Number(e.target.value)))}
        className="w-full"
      />
    </div>
  );
}