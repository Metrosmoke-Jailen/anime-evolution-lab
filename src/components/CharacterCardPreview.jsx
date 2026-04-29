import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function CharacterCardPreview() {
  const timeline = useSelector((s) => s.characterEvolution.evolutionTimeline);
  const frame = useSelector((s) => s.timeline.currentFrame);
  const char = useSelector((s) => s.selectedCharacter.selectedCharacter);

  if (!char || !timeline.length) return null;

  const current = timeline[frame];

  return (
    <motion.div key={frame} className="p-4">
      <div className="bg-gray-900 p-4 rounded-xl border border-purple-500">
        <img src={char.images.jpg.image_url} className="h-48 w-full object-cover rounded" />
        <h2>{char.name}</h2>
        <p>{current.animeTitle}</p>
        <p>{current.role}</p>

        <div className="bg-gray-700 h-2 mt-2">
          <motion.div
            className="bg-cyan-400 h-2"
            animate={{ width: `${current.powerLevel}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}