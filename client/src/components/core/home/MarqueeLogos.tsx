import styles from "./MarqueeLogos.module.css";

// Top row logos (left to right direction → animate left)
const topLogos = [
  { src: "/images/logos/logo-2.png", alt: "Logo 2" },
  { src: "/images/logos/logo-3.png", alt: "Logo 3" },
  { src: "/images/logos/logo-4.png", alt: "Logo 4" },
  { src: "/images/logos/logo-5.png", alt: "Logo 5" },
  { src: "/images/logos/logo-6.png", alt: "Logo 6" },
  { src: "/images/logos/logo-7.png", alt: "Logo 7" },
  { src: "/images/logos/logo-9.png", alt: "Logo 9" },
  { src: "/images/logos/logo-10.png", alt: "Logo 10" },
  { src: "/images/logos/logo-11.png", alt: "Logo 11" },
  { src: "/images/logos/logo-12.png", alt: "Logo 12" },
  { src: "/images/logos/logo-13.png", alt: "Logo 13" },
  { src: "/images/logos/logo-14.png", alt: "Logo 14" },
];

// Bottom row logos (right to left → animate right)
// const bottomLogos = [
//   { src: "/logos/logo-9.png", alt: "Logo 9" },
//   { src: "/logos/logo-10.png", alt: "Logo 10" },
//   { src: "/logos/logo-11.png", alt: "Logo 11" },
//   { src: "/logos/logo-12.png", alt: "Logo 12" },
//   { src: "/logos/logo-13.png", alt: "Logo 13" },
//   { src: "/logos/logo-14.png", alt: "Logo 14" },
// ];

interface LogoRowProps {
  logos: { src: string; alt: string }[];
  direction: "left" | "right";
}

function LogoRow({ logos, direction }: LogoRowProps) {
  // Duplicate logos for seamless infinite scroll
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
      <LogoRow logos={topLogos} direction="left" />
      {/* <LogoRow logos={bottomLogos} direction="right" /> */}
    </section>
  );
}
