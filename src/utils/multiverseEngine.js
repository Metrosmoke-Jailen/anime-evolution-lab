import { generateEvolutionTimeline } from "./evolutionEngine";

export const generateMultiverse = (
  anime,
  baseIntensity,
  alternateMode
) => {
  const variants = [0, 25, 50, 75, 100];

  return variants.map((alt) => ({
    label: `Alt ${alt}`,
    intensity: alt,
    timeline: generateEvolutionTimeline(
      anime,
      baseIntensity,
      alternateMode,
      alt
    ),
  }));
};