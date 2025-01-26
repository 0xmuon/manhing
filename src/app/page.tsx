'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

interface Manga {
  _id: string;
  title: string;
  coverImage: string;
  description: string;
}

export default function Home() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/manga');
        if (!response.ok) {
          throw new Error('Failed to fetch mangas');
        }
        const data = await response.json();
        setMangas(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
        console.error('Error fetching mangas:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMangas();
  }, []);

  if (loading) return <div className={styles.message}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <main className={styles.main}>
      <h1>Manhning</h1>
      <div className={styles.grid}>
        {mangas.length > 0 ? (
          mangas.map((manga) => (
            <Link href={`/manga/${manga._id}`} key={manga._id} className={styles.card}>
              <img src={manga.coverImage} alt={manga.title} />
              <h2>{manga.title}</h2>
              <p>{manga.description}</p>
            </Link>
          ))
        ) : (
          <div className={styles.message}>No manga available</div>
        )}
      </div>
    </main>
  );
} 