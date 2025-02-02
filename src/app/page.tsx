'use client';

import { useEffect, useState } from 'react';
import { Manga } from '@/types/manga';
import { getMangaList } from '@/services/mangaService';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Container,
  Box,
  CircularProgress
} from '@mui/material';

export default function Home() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        setLoading(true);
        const response = await getMangaList();
        setMangas(response.data.data);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to load manga list');
      } finally {
        setLoading(false);
      }
    };

    fetchMangas();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="calc(100vh - 200px)">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="calc(100vh - 200px)">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Popular Manga
      </Typography>
      <Grid container spacing={3}>
        {mangas.map((manga) => (
          <Grid item key={manga.mal_id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="300"
                image={manga.images.jpg.image_url}
                alt={manga.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2" noWrap>
                  {manga.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Chapters: {manga.chapters || 'Ongoing'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Score: {manga.score || 'N/A'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 