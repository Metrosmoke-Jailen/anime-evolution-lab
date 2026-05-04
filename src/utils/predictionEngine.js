// Generates possible future branches from the current timeline
export const generateFutureBranches = (timeline, intensity = 50) => {
  if (!timeline?.length) return [];

  const last = timeline[timeline.length - 1];
  const basePower = last.powerLevel;

  const branches = [
    {
      id: "future-hero",
      label: "Heroic Ascension",
      description: "Steady rise into a legendary protector",
      projectedPower: Math.min(100, basePower + intensity * 0.4),
      probability: 0.45,
    },
    {
      id: "future-fallen",
      label: "Fallen Arc",
      description: "Rapid growth with unstable consequences",
      projectedPower: Math.min(100, basePower + intensity * 0.8),
      probability: 0.3,
    },
    {
      id: "future-stagnant",
      label: "Stagnation Loop",
      description: "Growth slows, identity stabilizes",
      projectedPower: Math.min(100, basePower + intensity * 0.1),
      probability: 0.25,
    },
  ];

  return branches;
};

// Optional: pick one “fated” outcome
export const pickFate = (branches) => {
  const total = branches.reduce((sum, b) => sum + b.probability, 0);
  let rand = Math.random() * total;

  for (const b of branches) {
    if ((rand -= b.probability) <= 0) return b;
  }

  return branches[0];
};