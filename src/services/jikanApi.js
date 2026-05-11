import axios from "axios";

const BASE_URL = "https://api.jikan.moe/v4";

export const searchCharacters = async (query) => {
  const res = await axios.get(`${BASE_URL}/characters`, {
    params: { q: query, limit: 12 },
  });
  return res.data.data;
};

export const getCharacterAnime = async (id) => {
  const res = await fetch(`https://api.jikan.moe/v4/characters/${id}/anime`);
  const data = await res.json();

  return data.data || []; 
};