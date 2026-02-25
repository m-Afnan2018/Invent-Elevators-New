"use client";
import styles from "./EngineeredSection.module.css";

const features = [
  {
    id: 1,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3v22M3 14h22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="8" y="8" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    title: "Strong Engineering Foundation",
    description:
      "We are built on advanced lift engineering principles, ensuring every system delivers stability, durability, and smooth vertical mobility.",
  },
  {
    id: 2,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M6 22V10a2 2 0 012-2h12a2 2 0 012 2v12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path d="M11 22v-6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 22h22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Innovative Lift Solutions",
    description:
      "Invent Elevator focuses on compact, screw-driven and hydraulic technologies designed for efficient installation and optimal space utilization.",
  },
  {
    id: 3,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14 9v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Proven Industry Expertise",
    description:
      "With years of hands-on experience in elevator design and installation, we continue to refine our systems to meet evolving architectural demands.",
  },
  {
    id: 4,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M5 14c0-1.5 1-2.5 2.5-2.5S10 13 10 14s-1 2.5-2.5 2.5S5 15.5 5 14z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M18 14c0-1.5 1-2.5 2.5-2.5S23 13 23 14s-1 2.5-2.5 2.5S18 15.5 18 14z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path d="M10 14h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M14 5v4M14 19v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Reliable Customer Support",
    description:
      "From consultation to installation and after-sales service, our team ensures consistent support and professional assistance at every stage.",
  },
];

export default function EngineeredSection() {
  return (
    <section className={styles.section}>
      {/* Background texture */}
      <div className={styles.bgAccent} />

      <div className={styles.container}>
        {/* Left: sticky content */}
        <div className={styles.left}>
          <p className={styles.eyebrow}>Our Strengths</p>
          <h2 className={styles.heading}>
            Invent Elevator –{" "}
            <em className={styles.headingEm}>Engineered for Modern Living</em>
          </h2>
          <div className={styles.divider} />
          <p className={styles.body}>
            The journey of Invent Elevator began with a simple vision — to deliver
            smart, space-efficient, and reliable lift solutions for modern buildings.
            Today, we continue to grow as a forward-thinking elevator company while
            staying committed to engineering precision, safety standards, and customer
            satisfaction.
          </p>
          <a href="#products" className={styles.cta}>
            View Our Products
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Right: feature cards */}
        <div className={styles.right}>
          {features.map((f, i) => (
            <div key={f.id} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={styles.cardIcon}>{f.icon}</div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{f.title}</h3>
                <p className={styles.cardDesc}>{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
