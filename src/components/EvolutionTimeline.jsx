import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function EvolutionTimeline() {
  const { evolutionTimeline } = useSelector((s) => s.characterEvolution);
  const frame = useSelector((s) => s.timeline.currentFrame);

  return (
    <div className="flex flex-col items-center space-y-10 p-8">
      {evolutionTimeline.map((node, i) => (
        <motion.div
          key={`${node.id}-${i}`}
          animate={{
            x: i % 2 === 0 ? -40 : 40,
            scale: i === frame ? 1.2 : 1,
            opacity: i <= frame ? 1 : 0.3,
          }}
          className="relative"
        >
          <div className="bg-gray-900 p-4 rounded-xl border border-purple-500">
            <h3>{node.animeTitle}</h3>
            <p>{node.year}</p>
            <p>{node.role}</p>
            <p>⚡ {node.powerLevel}</p>

            {node.mutation && (
              <p className="text-red-400 text-xs">
                ⚠ {node.mutation}
              </p>
            )}
          </div>

          {i === frame && (
            <div className="absolute inset-0 blur-xl bg-purple-500 opacity-30 rounded-xl" />
          )}
        </motion.div>
      ))}
    </div>
  );
}