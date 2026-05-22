import styles from "./ProjectBrandCta.module.css";

export default function ProjectBrandCta() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.logoWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Invent Elevator"
            className={styles.logo}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        </div>
        <p className={styles.tagline}>
          Decades of combined experience, shaping homes defined by{" "}
          <em>quality</em>, <em>innovation</em> and long-term value.
        </p>
      </div>
    </section>
  );
}
