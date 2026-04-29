import axios from "axios";

const BASE_URL = "https://api.jikan.moe/v4";

export const searchCharacters = async (query) => {
  const res = await axios.get(`${BASE_URL}/characters`, {
    params: { q: query, limit: 12 },
  });
  return res.data.data;
};

export const getCharacterAnime = async (id) => {
  const res = await axios.get(`${BASE_URL}/characters/${id}/anime`);
  return res.data.data;
};