"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./CraftedAroundYourHome.module.css";

const DEFAULT_TIERS = [
  {
    tag: "Select",
    title: "Minimalist\nSophistication",
    features: [
      "Silver stainless steel cabin",
      "Standard LED ceiling lighting",
      "Ergonomic handrail",
      "Push-button controls",
    ],
    image: "/images/c1.png",
  },
  {
    tag: "Signature",
    title: "Elevated\nLuxury",
    features: [
      "Glass entrance doors",
      "Ambient mood lighting",
      "Full-height mirrors",
      "Designer panel finishes",
    ],
    image: "/images/c2.png",
  },
  {
    tag: "Bespoke",
    title: "Uniquely\nYours",
    features: [
      "Fully custom materials",
      "Architectural lighting design",
      "Bespoke detailing",
      "Touchscreen controls",
    ],
    image: "/images/c3.png",
  },
];

export default function CraftedAroundYourHome({ cabinStyles }) {
  const tiers = cabinStyles
    ? cabinStyles.map((c) => ({
        tag: c.name,
        title: c.label,
        features: c.desc ? [c.desc] : [],
        image: c.image,
      }))
    : DEFAULT_TIERS;

  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <p className={styles.eyebrow}>Design Level</p>
        <h2 className={styles.heading}>Crafted Around Your Space</h2>
      </div>

      <div className={styles.grid}>
        {tiers.map((tier) => (
          <div key={tier.tag} className={styles.card}>
            {/* Left: text */}
            <div className={styles.content}>
              <h3 className={styles.tag}>
                {tier.title.split("\n").map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              <span className={styles.title}>{tier.tag}</span>
              </h3>
              <ul className={styles.features}>
                {tier.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Link href="/contact" className={styles.cta}>
                Enquire About {tier.tag}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 2.5L10.5 6 7 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
            {/* Right: image */}
            <div className={styles.imgWrap}>
              <Image
                src={tier.image}
                alt={tier.tag}
                fill
                sizes="(max-width:960px) 100vw, 33vw"
                className={styles.img}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
