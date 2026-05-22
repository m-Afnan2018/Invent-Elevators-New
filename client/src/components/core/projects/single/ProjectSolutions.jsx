import styles from "./ProjectSolutions.module.css";

const STATS = [
  { value: "3",  label: "Floors" },
  { value: "500kg",  label: "Capacity" },
  { value: "15 Days",   label: "Completion Time" },
  { value: "Aero", label: "Design Finished Type" },
];

export default function ProjectSolutions({ description }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.top}>
          <h2 className={styles.heading}>Solutions We Provide</h2>
          <p className={styles.text}>
            {description ||
              "Invent Elevator delivers end-to-end lift solutions — from precision engineering and bespoke cabin design to seamless installation, ongoing maintenance, and after-sales support across the UAE."}
          </p>
        </div>

        <div className={styles.statsGrid}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.statCard}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
