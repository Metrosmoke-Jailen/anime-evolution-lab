import { useDispatch, useSelector } from "react-redux";
import { selectFuture } from "../features/characterEvolution/characterEvolutionSlice";
import { motion } from "framer-motion";

export default function FutureBranches() {
  const dispatch = useDispatch();
  const branches = useSelector((s) => s.characterEvolution.futureBranches);
  const selected = useSelector((s) => s.characterEvolution.selectedFuture);

  if (!branches.length) return null;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl text-cyan-400">🔮 Predicted Futures</h2>

      {branches.map((b) => {
        const isActive = selected?.id === b.id;

        return (
          <motion.div
            key={b.id}
            onClick={() => dispatch(selectFuture(b))}
            whileHover={{ scale: 1.05 }}
            className={`p-4 rounded border cursor-pointer ${
              isActive
                ? "border-cyan-400 bg-gray-800"
                : "border-purple-500 bg-gray-900"
            }`}
          >
            <h3 className="font-bold">{b.label}</h3>
            <p className="text-sm text-gray-400">{b.description}</p>

            <p className="text-sm mt-2">
              ⚡ Projected Power: {Math.round(b.projectedPower)}
            </p>

            <p className="text-xs text-cyan-400">
              Probability: {Math.round(b.probability * 100)}%
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}