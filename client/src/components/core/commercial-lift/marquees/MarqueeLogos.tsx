import styles from "./MarqueeLogos.module.css";

const topLogos = [
  { src: "/commercial/logos/logo-2.png",  alt: "Logo 2" },
  { src: "/commercial/logos/logo-3.png",  alt: "Logo 3" },
  { src: "/commercial/logos/logo-4.png",  alt: "Logo 4" },
  { src: "/commercial/logos/logo-5.png",  alt: "Logo 5" },
  { src: "/commercial/logos/logo-6.png",  alt: "Logo 6" },
  { src: "/commercial/logos/logo-7.png",  alt: "Logo 7" },
  { src: "/commercial/logos/logo-9.png",  alt: "Logo 9" },
  { src: "/commercial/logos/logo-10.png", alt: "Logo 10" },
  { src: "/commercial/logos/logo-11.png", alt: "Logo 11" },
  { src: "/commercial/logos/logo-12.png", alt: "Logo 12" },
  { src: "/commercial/logos/logo-13.png", alt: "Logo 13" },
  { src: "/commercial/logos/logo-14.png", alt: "Logo 14" },
];

interface LogoRowProps {
  logos: { src: string; alt: string }[];
  direction: "left" | "right";
}

function LogoRow({ logos, direction }: LogoRowProps) {
  const repeated = [...logos, ...logos, ...logos];

  return (
    <div className={styles.rowWrapper}>
      <div
        className={`${styles.track} ${
          direction === "left" ? styles.trackLeft : styles.trackRight
        }`}
      >
        {repeated.map((logo, i) => (
          <div className={styles.logoCard} key={`${logo.alt}-${i}`}>
            <img src={logo.src} alt={logo.alt} className={styles.logoImg} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeLogos() {
  return (
    <section className={styles.section}>

      {/* Heading */}
      <div className={styles.headingRow}>
        <span className={styles.line} />
        <h2 className={styles.heading}>Our Partners</h2>
        <span className={styles.line} />
      </div>

      <LogoRow logos={topLogos} direction="left" />
    </section>
  );
}