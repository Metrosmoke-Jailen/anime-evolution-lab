const inferRole = (index, total) => {
  if (index === 0) return "Origin Arc";
  if (index === total - 1) return "Final Form Arc";
  if (index < total / 2) return "Growth Arc";
  return "Peak Arc";
};

const maybeMutate = (power) => {
  const roll = Math.random();
  if (roll > 0.85) {
    return {
      mutated: true,
      newPower: Math.min(100, power + 25),
      label: "Mutation Surge",
    };
  }
  return { mutated: false, newPower: power };
};

export const generateEvolutionTimeline = (
  animeList,
  intensity = 50,
  alternate = false
) => {
  if (!animeList?.length) return [];

  const sorted = [...animeList].sort(
    (a, b) => (a.anime.year || 0) - (b.anime.year || 0)
  );

  return sorted.map((entry, index) => {
    let base = 20 + index * 15;
    let scale = intensity / 50;

    let power = base * scale;

    if (alternate) {
      power += Math.random() * 30;
    }

    const mutation = maybeMutate(power);

    return {
      id: entry.mal_id,
      animeTitle: entry.anime.title,
      year: entry.anime.year || "Unknown",
      role: inferRole(index, sorted.length),
      powerLevel: Math.min(100, Math.round(mutation.newPower)),
      mutation: mutation.mutated ? mutation.label : null,
    };
  });
};