'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReactPlayer from 'react-player';
import styles from './page.module.css';

interface Chapter {
  chapterNumber: number;
  pages: string[];
  title: string;
}

interface Manga {
  title: string;
  chapters: Chapter[];
  bgMusic: string;
}

export default function MangaReader() {
  const params = useParams();
  const [manga, setManga] = useState<Manga | null>(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchManga = async () => {
      const response = await fetch(`/api/manga/${params.id}`);
      const data = await response.json();
      setManga(data);
    };
    fetchManga();
  }, [params.id]);

  if (!manga) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1>{manga.title}</h1>
      
      {manga.bgMusic && (
        <div className={styles.musicPlayer}>
          <ReactPlayer
            url={manga.bgMusic}
            playing
            loop
            controls
            height="50px"
            width="300px"
          />
        </div>
      )}

      <div className={styles.reader}>
        <img
          src={manga.chapters[currentChapter].pages[currentPage]}
          alt={`Page ${currentPage + 1}`}
          onClick={() => {
            if (currentPage < manga.chapters[currentChapter].pages.length - 1) {
              setCurrentPage(currentPage + 1);
            } else if (currentChapter < manga.chapters.length - 1) {
              setCurrentChapter(currentChapter + 1);
              setCurrentPage(0);
            }
          }}
        />
      </div>

      <div className={styles.controls}>
        <button
          onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
        >
          Previous Page
        </button>
        <button
          onClick={() => {
            if (currentPage < manga.chapters[currentChapter].pages.length - 1) {
              setCurrentPage(currentPage + 1);
            } else if (currentChapter < manga.chapters.length - 1) {
              setCurrentChapter(currentChapter + 1);
              setCurrentPage(0);
            }
          }}
        >
          Next Page
        </button>
      </div>
    </div>
  );
} 