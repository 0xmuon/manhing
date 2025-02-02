import axios from 'axios';
import { MangaResponse } from '@/types/manga';

const BASE_URL = 'https://api.jikan.moe/v4';

export const getMangaList = async () => {
  try {
    const response = await axios.get<MangaResponse>(`${BASE_URL}/manga?limit=24&order_by=popularity`);
    return response;
  } catch (error) {
    console.error('Error fetching manga:', error);
    throw error;
  }
}; 