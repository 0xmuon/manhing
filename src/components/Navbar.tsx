'use client';

import { useState } from 'react';
import ReactPlayer from 'react-player';
import styles from './Navbar.module.css';

const songs = [
  { title: 'Lofi Beat 1', url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk' },
  { title: 'Lofi Beat 2', url: 'https://www.youtube.com/watch?v=rUxyKA_-grg' },
  { title: 'Anime OST', url: 'https://www.youtube.com/watch?v=VxBnr5J7IYs' },
];

export default function Navbar() {
  const [selectedSong, setSelectedSong] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Manhning</div>
      
      <div className={styles.controls}>
        <div className={styles.musicControls}>
          <select 
            value={selectedSong}
            onChange={(e) => {
              setSelectedSong(e.target.value);
              setIsPlaying(true);
            }}
            className={styles.songSelect}
          >
            <option value="">Select a song</option>
            {songs.map((song) => (
              <option key={song.url} value={song.url}>
                {song.title}
              </option>
            ))}
          </select>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className={styles.playButton}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
        </div>

        <button className={styles.authButton}>
          Sign In with Google
        </button>

        {selectedSong && (
          <div className={styles.playerWrapper}>
            <ReactPlayer
              url={selectedSong}
              playing={isPlaying}
              height="0"
              width="0"
              controls={false}
              loop={true}
            />
          </div>
        )}
      </div>
    </nav>
  );
} 