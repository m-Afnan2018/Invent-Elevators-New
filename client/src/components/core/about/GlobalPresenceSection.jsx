"use client";
import styles from "./GlobalPresenceSection.module.css";

export default function GlobalPresenceSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left: Heading */}
        <div className={styles.left}>
          <h2 className={styles.heading}>
            A global lift company with local presence
          </h2>
        </div>

        {/* Right: Body text */}
        <div className={styles.right}>
          <p className={styles.body}>
            What began as a specialised vertical mobility firm has now grown into
            Invent Elevator — one of the leading manufacturers of space-efficient,
            ready-to-install lift solutions designed for modern residential and
            commercial environments. Much like global elevator pioneers, we combine
            advanced engineering with practical design to deliver vertical
            transportation systems that fit seamlessly into homes, offices, and
            public spaces.
          </p>
        </div>
      </div>

      {/* Full-width image below */}
      <div className={styles.imageWrapper}>
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1800&q=85&fit=crop"
          alt="Modern building lobby with elevator"
          className={styles.image}
        />
        <div className={styles.imageOverlay} />

        {/* Floating stat cards */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>25+</span>
            <span className={styles.statLabel}>Years of Experience</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>5000+</span>
            <span className={styles.statLabel}>Installations Worldwide</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>40+</span>
            <span className={styles.statLabel}>Countries Served</span>
          </div>
        </div>
      </div>
    </section>
  );
}
