"use client";
import styles from "./GlobalPresenceSection.module.css";

const CITIES = [
  {
    name: "Dubai",
    icon: (
      <svg viewBox="0 0 120 80" fill="none" width="120" height="80">
        <line x1="0" y1="72" x2="120" y2="72" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <rect x="8" y="40" width="10" height="32" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.5" />
        <rect x="22" y="28" width="12" height="44" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.6" />
        <polygon points="45,8 47,30 49,35 51,35 53,30 55,8 50,4" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.85" />
        <rect x="46" y="35" width="8" height="37" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.75" />
        <rect x="60" y="22" width="14" height="50" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.6" />
        <rect x="78" y="32" width="10" height="40" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.5" />
        <rect x="92" y="44" width="8" height="28" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
        <rect x="104" y="50" width="8" height="22" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
      </svg>
    ),
  },
  {
    name: "Sharjah",
    icon: (
      <svg viewBox="0 0 120 80" fill="none" width="120" height="80">
        <line x1="0" y1="72" x2="120" y2="72" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <rect x="6" y="46" width="10" height="26" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
        <rect x="20" y="38" width="12" height="34" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.5" />
        <ellipse cx="50" cy="36" rx="12" ry="10" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.7" />
        <rect x="44" y="36" width="12" height="36" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
        <line x1="50" y1="26" x2="50" y2="20" stroke="currentColor" strokeWidth="1.2" opacity="0.65" />
        <rect x="62" y="30" width="14" height="42" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.6" />
        <rect x="80" y="40" width="10" height="32" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.5" />
        <rect x="94" y="50" width="8" height="22" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
        <rect x="106" y="55" width="8" height="17" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.35" />
      </svg>
    ),
  },
  {
    name: "Abu Dhabi",
    icon: (
      <svg viewBox="0 0 120 80" fill="none" width="120" height="80">
        <line x1="0" y1="72" x2="120" y2="72" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <rect x="6" y="50" width="8" height="22" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
        <rect x="18" y="38" width="10" height="34" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.5" />
        <rect x="30" y="18" width="10" height="54" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.7" />
        <rect x="44" y="22" width="10" height="50" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.75" />
        <rect x="58" y="14" width="10" height="58" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.8" />
        <rect x="72" y="20" width="10" height="52" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.7" />
        <rect x="86" y="42" width="10" height="30" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.5" />
        <rect x="100" y="52" width="8" height="20" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4" />
        <path d="M30 18 Q35 10 40 18" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
        <path d="M58 14 Q63 6 68 14" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
      </svg>
    ),
  },
];

export default function GlobalPresenceSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Serving Across UAE</p>

        <div className={styles.citiesRow}>
          {CITIES.map((city) => (
            <div key={city.name} className={styles.cityCard}>
              <div className={styles.cityIllustration}>{city.icon}</div>
              <p className={styles.cityName}>{city.name}</p>
            </div>
          ))}

          <div className={styles.descCol}>
            <p className={styles.descText}>
              We proudly provide premium elevator solutions across the UAE,
              delivering luxury vertical mobility experiences for villas,
              residences, commercial spaces, and architectural projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
