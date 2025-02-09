import { Manga } from '@/types/manga'; 

export const fetchManga = async () => {
  try {
    const response = await fetch('API_URL');
    const data = await response.json();

    const categorizedManga: { [key: string]: Manga[] } = {};

    data.forEach((manga: Manga) => {
      
      manga.genres.forEach((genre: string) => {
        if (!categorizedManga[genre]) {
          categorizedManga[genre] = [];
        }
        categorizedManga[genre].push(manga);
      });
    });

    for (const genre in categorizedManga) {
      categorizedManga[genre].sort((a, b) => b.popularity - a.popularity);
    }

    return categorizedManga;
  } catch (error) {
    console.error('Error fetching manga:', error);
    return {};
  }
}; 