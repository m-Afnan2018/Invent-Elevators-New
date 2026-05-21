"use client";

import Image from "next/image";
import styles from "./SafetySection.module.css";

const CARDS = [
  {
    tag: "Residential",
    title: "Home & Villa Elevators",
    description:
      "Luxury and compact lift systems for premium residential projects.",
    imageSrc: "/contractor/images/safety/home.png",
    imageAlt: "Home and villa elevators",
  },
  {
    tag: "Commercial",
    title: "Commercial Elevators",
    description:
      "Modern vertical mobility solutions for offices, retail spaces, and commercial buildings.",
    imageSrc: "/contractor/images/safety/car.png",
    imageAlt: "Commercial elevators",
  },
  {
    tag: "Panoramic",
    title: "Panoramic Glass Elevators",
    description:
      "Architectural glass lifts designed for high-end modern spaces.",
    imageSrc: "/contractor/images/safety/panoramic.png",
    imageAlt: "Panoramic glass elevators",
  },
  {
    tag: "Cargo",
    title: "Cargo & Service Elevators",
    description:
      "Reliable systems engineered for operational efficiency.",
    imageSrc: "/contractor/images/safety/cargo.png",
    imageAlt: "Cargo and service elevators",
  },
];

const scrollToContact = () => {
  document
    .getElementById("contact-banner")
    ?.scrollIntoView({ behavior: "smooth" });
};

export default function SafetySection() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>

        {/* Top Row */}
        <div className={styles.topRow}>
          <h2 className={styles.heading}>Our Solutions</h2>
        </div>

        {/* Cards */}
        <div className={styles.grid}>
          {CARDS.map((card) => (
            <div key={card.title} className={styles.card}>

              {/* Image */}
              <div className={styles.iconWrap}>
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw,
                         (max-width: 1024px) 50vw,
                         25vw"
                  className={styles.cardImage}
                />
              </div>

              {/* Content */}
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>
                  {card.title}
                </h3>

                <p className={styles.cardDesc}>
                  {card.description}
                </p>
              </div>

              {/* Button */}
              <button
  className={styles.cardBtn}
  onClick={scrollToContact}
>
  <svg
    className={styles.phoneIcon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.78.59 2.62a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.46-1.11a2 2 0 0 1 2.11-.45c.84.27 1.72.47 2.62.59A2 2 0 0 1 22 16.92z" />
  </svg>

  Let&apos;s Talk
</button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}