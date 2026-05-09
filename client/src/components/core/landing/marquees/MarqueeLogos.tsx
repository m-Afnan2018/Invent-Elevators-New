import styles from "./MarqueeLogos.module.css";

// Top row logos (left to right direction → animate left)
const topLogos = [
  { src: "/logos/l1.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l2.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l3.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l4.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l5.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l6.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l7.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l8.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l9.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l10.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l11.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l12.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l13.png", alt: "Distinguished Real Estate" },

];

// Bottom row logos (right to left → animate right)
const bottomLogos = [
  { src: "/logos/l1.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l2.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l3.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l4.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l5.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l6.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l7.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l8.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l9.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l10.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l11.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l12.png", alt: "Distinguished Real Estate" },
  { src: "/logos/l13.png", alt: "Distinguished Real Estate" },
];

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
        className={`${styles.track} ${direction === "left" ? styles.trackLeft : styles.trackRight
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
      <LogoRow logos={bottomLogos} direction="right" />
    </section>
  );
}
