import SpotifyWebApi from 'spotify-web-api-js';
import { SPOTIFY_CONFIG } from '@/config/spotify';

const spotifyApi = new SpotifyWebApi();

export const initializeSpotify = async (token: string) => {
  try {
    spotifyApi.setAccessToken(token);
    // Test the token by making a simple API call
    await spotifyApi.getMe();
    return true;
  } catch (error) {
    console.error('Error initializing Spotify:', error);
    return false;
  }
};

export const searchTracks = async (query: string) => {
  if (!query) return [];
  
  try {
    const response = await spotifyApi.searchTracks(query, { limit: 10 });
    return response.tracks?.items.map(track => ({
      id: track.id,
      name: track.name,
      uri: track.uri,
      artists: track.artists,
      albumImage: track.album.images[0]?.url
    })) || [];
  } catch (error) {
    console.error('Error searching tracks:', error);
    return [];
  }
};

export const playTrack = async (uri: string) => {
  try {
    // Get available devices first
    const devices = await spotifyApi.getMyDevices();
    if (!devices.devices.length) {
      throw new Error('No active Spotify devices found');
    }

    // Play on the first active device
    await spotifyApi.play({
      uris: [uri],
      device_id: devices.devices[0].id
    });
    return true;
  } catch (error) {
    console.error('Error playing track:', error);
    return false;
  }
};

export const pauseTrack = async () => {
  try {
    await spotifyApi.pause();
    return true;
  } catch (error) {
    console.error('Error pausing track:', error);
    return false;
  }
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(
          SPOTIFY_CONFIG.clientId + ':' + SPOTIFY_CONFIG.clientSecret
        ).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    const data = await response.json();
    if (data.access_token) {
      localStorage.setItem('spotify_access_token', data.access_token);
      localStorage.setItem('spotify_token_expiry', String(Date.now() + data.expires_in * 1000));
      spotifyApi.setAccessToken(data.access_token);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return false;
  }
};

export default spotifyApi; 