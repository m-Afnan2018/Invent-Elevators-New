"use client";
import styles from "./SpiritSection.module.css";

const PILLARS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 10h20M10 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="18" r="3" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
      </svg>
    ),
    label: "Architectural\nHarmony",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3l2.4 5.2 5.6 0.5-4.1 3.9 1.1 5.6L14 15.5l-5 2.7 1.1-5.6L6 8.7l5.6-0.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    label: "Luxury\nAesthetics",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14 8v6l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Premium\nCraftsmanship",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4C9 4 5 8 5 13c0 3.5 2 6.5 5 8v3h8v-3c3-1.5 5-4.5 5-8 0-5-4-9-9-9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    label: "Personalised\nExperiences",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="11" y="4" width="6" height="20" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M6 10h5M17 10h5M6 18h5M17 18h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <rect x="13" y="11" width="2" height="6" rx="0.5" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    label: "Intelligent\nEngineering",
  },
];

export default function SpiritSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles.eyebrow}>Our Philosophy</p>
          <h2 className={styles.heading}>Designed Beyond Functionality</h2>
          <p className={styles.body}>
            At Invent Elevator, we believe elevators are more than mobility
            systems — they are an extension of architecture and lifestyle.
            Every elevator is thoughtfully designed to enhance interiors,
            elevate experiences, and integrate seamlessly into modern spaces.
          </p>
        </div>

        <div className={styles.pillars}>
          {PILLARS.map((p) => (
            <div key={p.label} className={styles.pillar}>
              <div className={styles.pillarIcon}>{p.icon}</div>
              <p className={styles.pillarLabel}>{p.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
