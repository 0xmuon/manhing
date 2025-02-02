'use client';

import { useState, useEffect } from 'react';
import spotifyApi, { searchTracks, initializeSpotify, playTrack, pauseTrack, refreshAccessToken } from '@/lib/spotify';
import styles from './Navbar.module.css';
import { SPOTIFY_AUTH_URL } from '@/config/spotify';

interface Track {
  id: string;
  name: string;
  uri: string;
  artists: { name: string }[];
  albumImage?: string;
}

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem('spotify_access_token');
    if (token) {
      initializeSpotify(token).then((success) => {
        setIsAuthenticated(success);
        if (!success) {
          // If initialization fails, clear tokens
          handleLogout();
        }
      });
    }
  }, []);

  // Handle search
  useEffect(() => {
    if (!isAuthenticated) return;

    const searchSpotify = async () => {
      if (!searchQuery) {
        setTracks([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchTracks(searchQuery);
        setTracks(results);
        setError(null);
      } catch (err) {
        setError('Failed to search tracks');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchSpotify, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, isAuthenticated]);

  const handlePlay = async () => {
    if (!selectedTrack) return;

    try {
      const success = await playTrack(selectedTrack);
      if (success) {
        setIsPlaying(true);
        setError(null);
      } else {
        throw new Error('Failed to play track');
      }
    } catch (err) {
      setError('Failed to play track. Make sure Spotify is open and active.');
      console.error(err);
    }
  };

  const handlePause = async () => {
    try {
      const success = await pauseTrack();
      if (success) {
        setIsPlaying(false);
        setError(null);
      } else {
        throw new Error('Failed to pause track');
      }
    } catch (err) {
      setError('Failed to pause track');
      console.error(err);
    }
  };

  const handleLogin = () => {
    window.location.href = SPOTIFY_AUTH_URL;
  };

  const handleLogout = () => {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_token_expiry');
    setIsAuthenticated(false);
    setTracks([]);
    setSelectedTrack('');
    setIsPlaying(false);
    setError(null);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Manhing</div>
      
      <div className={styles.controls}>
        {!isAuthenticated ? (
          <button onClick={handleLogin} className={styles.loginButton}>
            Connect Spotify
          </button>
        ) : (
          <>
            <div className={styles.musicControls}>
              <div className={styles.searchContainer}>
                <input
                  type="text"
                  placeholder="Search songs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
                {isLoading && <div className={styles.spinner} />}
              </div>
              
              <select 
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value)}
                className={styles.songSelect}
              >
                <option value="">Select a song</option>
                {tracks.map((track) => (
                  <option key={track.id} value={track.uri}>
                    {track.name} - {track.artists[0].name}
                  </option>
                ))}
              </select>
              
              <button 
                onClick={isPlaying ? handlePause : handlePlay}
                className={styles.playButton}
                disabled={!selectedTrack}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
            </div>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Disconnect
            </button>
          </>
        )}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </nav>
  );
} 