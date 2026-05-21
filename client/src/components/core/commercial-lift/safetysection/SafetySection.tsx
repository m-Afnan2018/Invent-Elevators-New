"use client";

import Image from "next/image";
import styles from "./SafetySection.module.css";

const CARDS = [
  {
    tag: "Emergency",
    title: "Emergency Systems",
    description:
      "Automatic rescue devices, backup power, and alarm systems ensure passenger safety during any power interruption.",
    imageSrc: "/commercial/images/safety/emergency.svg",
    imageAlt: "Emergency systems icon",
  },
  {
    tag: "Controls",
    title: "Smart Controls",
    description:
      "Intuitive touchscreen panels, destination dispatch, and remote diagnostics for seamless and intelligent operation.",
    imageSrc: "/commercial/images/safety/smart-controls.svg",
    imageAlt: "Smart controls icon",
  },
  {
    tag: "Standards",
    title: "Compliance Standards",
    description:
      "Fully certified to EN81, Dubai Municipality, and international safety codes with regular third-party audits.",
    imageSrc: "/commercial/images/safety/compliance.svg",
    imageAlt: "Compliance standards icon",
  },
  {
    tag: "Backup",
    title: "Backup Systems",
    description:
      "Redundant hydraulics, UPS battery backup, and fail-safe braking mechanisms guarantee uninterrupted service.",
    imageSrc: "/commercial/images/safety/backup.svg",
    imageAlt: "Backup systems icon",
  },
];

export default function SafetySection() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {/* Label */}
        {/* <div className={styles.label}>
          <span className={styles.labelLine} />
          Safety &amp; Technology
        </div> */}

        {/* Top row */}
        <div className={styles.topRow}>
          <h2 className={styles.heading}>
            Advanced Safety &amp; Smart Technology
          </h2>
          <p className={styles.description}>
            Invent Elevator combines innovative engineering with modern safety
            systems to ensure reliable and secure vertical mobility for
            commercial spaces.
          </p>
        </div>

        {/* Cards */}
        <div className={styles.grid}>
          {CARDS.map((card) => (
            <div key={card.tag} className={styles.card}>
              <div className={styles.iconWrap}>
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  width={40}
                  height={40}
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.description}</p>
              </div>
              <span className={styles.cardTag}>{card.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}