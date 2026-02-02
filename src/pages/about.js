import styles from './about.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function About() {
  return (
    <section className={styles['about-t-race']}>
      {/* HERO SECTION */}
      <div className={styles['hero-section']}>
        <div className={styles['hero-content']}>
          <h1>The Ultimate Arena to Master Your Keyboard</h1>
        </div>
        <div className={styles['hero-illustration']}>
          {/* Placeholder for the complex glowing keyboard illustration */}
          <Image
            src="/hero-keyboard.png"
            alt="neon keyboard"
            className={styles.keyboardImg}
            width={540}
            height={300}
            style={{ height: 'auto' }}
            priority
          />
        </div>
      </div>

      {/* MISSION & FEATURES SECTION */}
      <div className={styles['mission-features-container']}>
        <h2>Our Mission & Why T-Race</h2>
        <div className={styles['features-grid']}>
          {/* Feature Card 1: SPEED BOOST */}
          <div className={styles['feature-card']}>
            <div className={styles['card-icon gradient-border']}>
              {/* Icon/Illustration for Speed Boost */}
              <span role="img" aria-label="Speed">
                ⚡
              </span>
            </div>
            <h3>Speed Boost</h3>
            <p>Track your WPM progress and watch your typing speed soar to new heights.</p>
          </div>

          {/* Feature Card 2: GLOBAL COMPETITION */}
          <div className={styles['feature-card']}>
            <div className={styles['card-icon gradient-border']}>
              {/* Icon/Illustration for Global Competition */}
              <span role="img" aria-label="Globe">
                🌎
              </span>
            </div>
            <h3>Global Competition</h3>
            <p>Compete with typists worldwide and earn your place on the global leaderboard.</p>
          </div>

          {/* Feature Card 3: PRACTICE MODE */}
          <div className={styles['feature-card']}>
            <div className={styles['card-icon gradient-border']}>
              {/* Icon/Illustration for Practice Mode */}
              <span role="img" aria-label="Practice">
                ✍️
              </span>
            </div>
            <h3>Practice Mode</h3>
            <p>Improve your typing accuracy with our advanced real-time feedback system.</p>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS & TECH STACK SECTION */}
      <div className={styles['process-tech-container']}>
        {/* HOW IT WORKS (REPLACING JOURNEY) */}
        <div className={styles['how-it-works']}>
          <h2>How It Works</h2>
          <div className={styles['steps-container']}>
            <div className={styles['step']}>
              <span className={styles['step-icon gradient-text']}>1.</span>
              <h4 className={styles['step-title']}>Join a Race</h4>
              <p>Jump into a public room or create your own private challenge.</p>
            </div>
            <div className={styles['step']}>
              <span className={styles['step-icon gradient-text']}>2.</span>
              <h4 className={styles['step-title']}>Type to Win</h4>
              <p>Test your speed and accuracy against typists worldwide.</p>
            </div>
            <div className={styles['step']}>
              <span className={styles['step-icon gradient-text']}>3.</span>
              <h4 className={styles['step-title']}>Improve & Compete</h4>
              <p>Track your progress, climb the leaderboards, and master your keyboard.</p>
            </div>
          </div>
        </div>

        {/* TECH STACK SECTION */}
        <div className={styles['tech-stack']}>
          <h2>Technology Behind the Scenes</h2>
          <div className={styles['tech-groups-container']}>
            {/* Group 1: Frontend */}
            <div className={styles['tech-group']}>
              <h4 className={styles['gradient-text']}>Frontend</h4>
              <div className={styles['logos-grid']}>
                <span className={styles['tech-logo']}>Next.js</span>
                <span className={styles['tech-logo']}>React</span>
                <span className={styles['tech-logo']}>Tailwind CSS</span>
              </div>
            </div>

            {/* Group 2: Database & Auth */}
            <div className={styles['tech-group']}>
              <h4 className={styles['gradient-text']}>Database & Auth</h4>
              <div className={styles['logos-grid']}>
                <span className={styles['tech-logo']}>MongoDB Atlas</span>
                <span className={styles['tech-logo']}>Mongoose</span>
                <span className={styles['tech-logo']}>Firebase Auth</span>
              </div>
            </div>

            {/* Group 3: Deployment */}
            <div className={styles['tech-group']}>
              <h4 className={styles['gradient-text']}>Deployment</h4>
              <div className={styles['logos-grid']}>
                <span className={styles['tech-logo']}>Vercel</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FINAL CTA SECTION */}
      <div className={styles['cta-section']}>
        <h2>Ready to Race?</h2>
        <Link href="/race" passHref legacyBehavior>
          <a className={styles['cta-button']}>Start Your First Race Now! 🚀</a>
        </Link>
      </div>
    </section>
  );
}
