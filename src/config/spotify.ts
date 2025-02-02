export const SPOTIFY_CONFIG = {
  clientId: '802b25ad8c8445beb4f1dfbc3f37d93e',
  clientSecret: 'c30cccf9ad584549af7242cd79c04f36',
  redirectUri: 'http://localhost:3000/api/auth/callback/spotify',
  scopes: [
    'user-read-playback-state',
    'user-modify-playback-state',
    'streaming',
    'user-read-email',
    'user-read-private'
  ].join(' ')
};

export const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CONFIG.clientId}&response_type=code&redirect_uri=${encodeURIComponent(SPOTIFY_CONFIG.redirectUri)}&scope=${encodeURIComponent(SPOTIFY_CONFIG.scopes)}`; 