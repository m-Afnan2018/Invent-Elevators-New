import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectHero.module.css";

export default function ProjectHero({ title, location, category, image }) {
  return (
    <section className={styles.hero}>
      <div className={styles.bgWrap}>
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className={styles.bgImg}
        />
      </div>
      <div className={styles.overlay} />

      <div className={styles.inner}>
        <nav className={styles.breadcrumb}>
          <Link href="/" className={styles.bcLink}>Home</Link>
          <span className={styles.bcSep}>/</span>
          <Link href="/projects" className={styles.bcLink}>Projects</Link>
          <span className={styles.bcSep}>/</span>
          <span className={styles.bcActive}>{title}</span>
        </nav>

        <div className={styles.textBlock}>
          {category && <span className={styles.eyebrow}>{category}</span>}
          <h1 className={styles.heading}>{title}</h1>
          <p className={styles.sub}>{location}</p>
        </div>
      </div>
    </section>
  );
}
