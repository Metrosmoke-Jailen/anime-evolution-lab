import { useDispatch, useSelector } from "react-redux";
import {
  selectFuture,
  applyFutureToTimeline,
} from "../features/characterEvolution/characterEvolutionSlice";
import { setFrame } from "../features/timeline/timelineSlice";
import { motion } from "framer-motion";

export default function FutureBranches() {
  const dispatch = useDispatch();
  const branches = useSelector((s) => s.characterEvolution.futureBranches);
  const timeline = useSelector((s) => s.characterEvolution.evolutionTimeline);

  if (!branches.length) return null;

  const handleApply = (branch) => {
    dispatch(selectFuture(branch));
    dispatch(applyFutureToTimeline(branch));

    // jump to the new end of timeline
    setTimeout(() => {
      dispatch(setFrame(timeline.length));
    }, 50);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl text-cyan-400">🔮 Choose a Future</h2>

      {branches.map((b) => (
        <motion.div
          key={b.id}
          whileHover={{ scale: 1.05 }}
          onClick={() => handleApply(b)}
          className="p-4 rounded border border-purple-500 bg-gray-900 cursor-pointer"
        >
          <h3 className="font-bold">{b.label}</h3>
          <p className="text-sm text-gray-400">{b.description}</p>

          <p className="text-sm mt-2">
            ⚡ Power: {Math.round(b.projectedPower)}
          </p>

          <p className="text-xs text-cyan-400">
            {Math.round(b.probability * 100)}% chance
          </p>
        </motion.div>
      ))}
    </div>
  );
}