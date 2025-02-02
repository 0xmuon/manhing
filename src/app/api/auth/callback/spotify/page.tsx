'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function SpotifyCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const response = await fetch('/api/auth/callback/spotify' + window.location.search);
        const data = await response.json();
        
        if (data.access_token) {
          // Store tokens in localStorage
          localStorage.setItem('spotify_access_token', data.access_token);
          localStorage.setItem('spotify_refresh_token', data.refresh_token);
          localStorage.setItem('spotify_token_expiry', String(Date.now() + data.expires_in * 1000));
          
          // Redirect back to home or desired page
          router.push('/'); // Change this to the desired route
        } else {
          throw new Error('No access token received');
        }
      } catch (error) {
        console.error('Error handling callback:', error);
      }
    };

    handleCallback();
  }, [router]);

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      minHeight="100vh"
      gap={2}
    >
      <CircularProgress />
      <Typography>Connecting to Spotify...</Typography>
    </Box>
  );
} 