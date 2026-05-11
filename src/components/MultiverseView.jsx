import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function MultiverseView() {
  const multi = useSelector((s) => s.characterEvolution.multiTimelines);
  const frame = useSelector((s) => s.timeline.currentFrame);

  if (!multi.length) return null;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl text-cyan-400">
        🌌 Multiverse Timelines
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {multi.map((world, i) => {
          const node =
            world.timeline[frame] || world.timeline[0];

          if (!node) return null;

          return (
            <motion.div
              key={i}
              className="bg-gray-900 p-4 rounded border border-purple-500"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-sm text-cyan-400">
                {world.label}
              </h3>

              <p className="font-bold">{node.animeTitle}</p>
              <p className="text-xs text-gray-400">
                {node.role}
              </p>

              <p className="text-sm mt-2">
                ⚡ {node.powerLevel}
              </p>

              {node.mutation && (
                <p className="text-xs text-pink-400">
                  🧬 {node.mutation}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}