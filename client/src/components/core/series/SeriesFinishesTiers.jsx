import styles from "./SeriesFinishesTiers.module.css";

function Check() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className={styles.checkIcon}>
      <path d="M2 6.5l3 3 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SeriesFinishesTiers({ finishes, tiers }) {
  return (
    <section className={styles.section}>
      {/* ── Left: Premium Finishes ── */}
      <div className={styles.finishesPanel}>
        <p className={styles.panelEyebrow}>Premium Finishes</p>
        <h2 className={styles.panelHeading}>Curated to Perfection</h2>
        <div className={styles.swatchGrid}>
          {finishes.map((f) => (
            <div key={f.name} className={styles.swatchItem}>
              <div className={styles.swatch} style={{ background: f.color }} />
              <span className={styles.swatchName}>{f.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: Technology Packages ── */}
      <div className={styles.tiersPanel}>
        <p className={styles.panelEyebrow}>Technology Packages</p>
        <h2 className={styles.panelHeading}>Essential & Elite</h2>
        <div className={styles.tierCards}>
          {tiers.map((t, i) => (
            <div key={t.name} className={`${styles.tierCard} ${i === 1 ? styles.tierCardDark : ""}`}>
              <div className={styles.tierHead}>
                <span className={styles.tierName}>{t.name}</span>
                <span className={styles.tierSub}>{t.subtitle}</span>
              </div>
              <ul className={styles.tierList}>
                {t.bullets.map((b) => (
                  <li key={b} className={styles.tierItem}>
                    <Check />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
