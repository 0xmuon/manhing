import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.section}>
          <h3>About Manhning</h3>
          <p>Your favorite manga and manhwa reading platform with background music.</p>
        </div>

        <div className={styles.section}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/popular">Popular</a></li>
            <li><a href="/latest">Latest</a></li>
            <li><a href="/genres">Genres</a></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Connect</h3>
          <ul>
            <li><a href="/discord">Discord</a></li>
            <li><a href="/twitter">Twitter</a></li>
            <li><a href="/facebook">Facebook</a></li>
            <li><a href="/instagram">Instagram</a></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Legal</h3>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/dmca">DMCA</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
      </div>
      
      <div className={styles.bottom}>
        <p>&copy; 2025 Manhning. No rights reserved.</p>
      </div>
    </footer>
  );
} 