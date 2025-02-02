import React, { useEffect, useState } from 'react';
import { fetchManga } from '@/lib/manga';

const MangaList = () => {
  const [mangaData, setMangaData] = useState<{ [key: string]: Manga[] }>({});

  useEffect(() => {
    const getMangaData = async () => {
      const data = await fetchManga();
      setMangaData(data);
    };

    getMangaData();
  }, []);

  return (
    <div>
      {Object.keys(mangaData).map((genre) => (
        <div key={genre}>
          <h2>{genre}</h2>
          <ul>
            {mangaData[genre].map((manga) => (
              <li key={manga.id}>{manga.title}</li> // Assuming manga has an id and title
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MangaList; 