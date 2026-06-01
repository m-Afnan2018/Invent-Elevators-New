"use client";
import styles from "./PeopleSection.module.css";

const topLogos = [
  { src: "/images/logos/logo-2.png",  alt: "Partner logo" },
  { src: "/images/logos/logo-3.png",  alt: "Partner logo" },
  { src: "/images/logos/logo-4.png",  alt: "Partner logo" },
  { src: "/images/logos/logo-5.png",  alt: "Partner logo" },
  { src: "/images/logos/logo-6.png",  alt: "Partner logo" },
  { src: "/images/logos/logo-7.png",  alt: "Partner logo" },
  { src: "/images/logos/logo-9.png",  alt: "Partner logo" },
  { src: "/images/logos/logo-10.png", alt: "Partner logo" },
  { src: "/images/logos/logo-11.png", alt: "Partner logo" },
  { src: "/images/logos/logo-12.png", alt: "Partner logo" },
  { src: "/images/logos/logo-13.png", alt: "Partner logo" },
  { src: "/images/logos/logo-14.png", alt: "Partner logo" },
];

const bottomLogos = [
  { src: "/logos/logo-9.png",  alt: "Partner logo" },
  { src: "/logos/logo-10.png", alt: "Partner logo" },
  { src: "/logos/logo-11.png", alt: "Partner logo" },
  { src: "/logos/logo-12.png", alt: "Partner logo" },
  { src: "/logos/logo-13.png", alt: "Partner logo" },
  { src: "/logos/logo-14.png", alt: "Partner logo" },
  { src: "/logos/logo-2.png",  alt: "Partner logo" },
  { src: "/logos/logo-3.png",  alt: "Partner logo" },
  { src: "/logos/logo-4.png",  alt: "Partner logo" },
  { src: "/logos/logo-5.png",  alt: "Partner logo" },
  { src: "/logos/logo-6.png",  alt: "Partner logo" },
  { src: "/logos/logo-7.png",  alt: "Partner logo" },
];

function MarqueeRow({ logos, direction }) {
  const repeated = [...logos, ...logos, ...logos];
  return (
    <div className={styles.rowWrapper}>
      <div className={`${styles.track} ${direction === "left" ? styles.trackLeft : styles.trackRight}`}>
        {repeated.map((logo, i) => (
          <div key={i} className={styles.logoCard}>
            <img src={logo.src} alt={logo.alt} className={styles.logoImg} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PeopleSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Left: text */}
        <div className={styles.textCol}>
          <p className={styles.eyebrow}>Crafted by Architects &amp; Developers</p>
          <h2 className={styles.heading}>Trusted by UAE&apos;s Leading Developers</h2>
          <p className={`${styles.body} para`}>
            Invent Elevator collaborates closely with architects, interior designers,
            builders, and developers to create seamless luxury-grade elevator
            experiences tailored for modern UAE projects.
          </p>
        </div>

        {/* Right: marquee */}
        <div className={styles.marqueeCol}>
          <MarqueeRow logos={topLogos} direction="left" />
          <MarqueeRow logos={bottomLogos} direction="right" />
        </div>

      </div>
    </section>
  );
}
