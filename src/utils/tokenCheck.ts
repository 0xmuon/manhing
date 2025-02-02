import { refreshSpotifyToken } from './tokenRefresh';

export const checkAndRefreshToken = async () => {
  const token = localStorage.getItem('spotify_access_token');
  const refreshToken = localStorage.getItem('spotify_refresh_token');
  const tokenExpiry = localStorage.getItem('spotify_token_expiry');

  if (!token || !refreshToken) {
    return null;
  }

  // Check if token is expired or will expire in the next minute
  if (tokenExpiry && Date.now() > (parseInt(tokenExpiry) - 60000)) {
    return await refreshSpotifyToken(refreshToken);
  }

  return token;
}; 