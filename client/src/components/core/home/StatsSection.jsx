"use client";
import styles from "./StatsSection.module.css";

const stats = [
  { value: "100+", label: "Projects" },
  { value: "500+", label: "Designs" },
  { value: "400+", label: "Happy Clients" },
  { value: "10+",  label: "Countries" },
  { value: "15+",  label: "Suppliers" },
];

export default function StatsSection() {
  return (
    <section className={styles.section}>
      {/* Background architectural image */}
      <div className={styles.bg} />
      <div className={styles.overlay} />

      <div className={styles.container}>
        {/* Label */}
        <p className={styles.eyebrow}>OUR METRICS</p>
        <h2 className={styles.heading}>What Makes Us Credible</h2>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Stats row */}
        <div className={styles.statsRow}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={styles.statItem}
              style={{ "--delay": `${i * 0.1}s` }}
            >
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
