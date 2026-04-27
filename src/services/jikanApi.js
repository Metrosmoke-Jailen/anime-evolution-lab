import axios from "axios";

const BASE_URL = "https://api.jikan.moe/v4";

export const searchCharacters = async (query) => {
  const response = await axios.get(`${BASE_URL}/characters`, {
    params: { q: query, limit: 10 },
  });
  return response.data.data;
};

export const getCharacterAnime = async (id) => {
  const response = await axios.get(`${BASE_URL}/characters/${id}/anime`);
  return response.data.data;
};