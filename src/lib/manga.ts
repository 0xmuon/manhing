import { Manga } from '@/types/manga'; // Assuming you have a Manga type defined

export const fetchManga = async () => {
  try {
    const response = await fetch('API_URL'); // Replace with your API URL
    const data = await response.json();

    // Assuming data is an array of manga objects
    const categorizedManga: { [key: string]: Manga[] } = {};

    data.forEach((manga: Manga) => {
      // Categorize by genre
      manga.genres.forEach((genre: string) => {
        if (!categorizedManga[genre]) {
          categorizedManga[genre] = [];
        }
        categorizedManga[genre].push(manga);
      });
    });

    // Sort each genre by popularity (assuming you have a popularity field)
    for (const genre in categorizedManga) {
      categorizedManga[genre].sort((a, b) => b.popularity - a.popularity);
    }

    return categorizedManga;
  } catch (error) {
    console.error('Error fetching manga:', error);
    return {};
  }
}; 