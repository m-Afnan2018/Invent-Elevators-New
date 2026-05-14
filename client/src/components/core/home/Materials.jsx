"use client";

import Image from "next/image";
import styles from "./Materials.module.css";

const MATERIALS = [
  {
    id: "Panoramic",
    name: "Panoramic Glass",
    image: "/series/aero-slim.png",
    content: "Creates openness, elegance, and a modern architectural statement.",
  },
  {
    id: "Gold",
    name: "Gold & Metallic Finishes",
    image: "/images/materials/gold.jpeg",
    content: "Adds a refined luxury touch with premium detailing and sophistication.",
  },
  {
    id: "Stainless",
    name: "Stainless Steel",
    image: "/images/materials/steel.jpeg",
    content: "Minimal, durable, and contemporary finishes engineered for modern spaces.",
  },
  {
    id: "Wood",
    name: "Wood Textures",
    image: "/images/materials/wood.jpeg",
    content: "Warm and elegant textures that blend seamlessly with luxury interiors.",
  },
];

export default function Materials() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.head}>
          <p className={styles.eyebrow}>Craftsmanship</p>
          <h2 className={`${styles.title} headings`}>Luxury Materials and Refined Finishes</h2>
          <p className={styles.subtitle}>
            Crafted with premium materials and elegant detailing, every Invent Elevator is designed to complement sophisticated interiors and modern architecture. From sleek panoramic glass and rich wood textures to brushed stainless steel and champagne gold accents, each finish is carefully selected to deliver a timeless luxury experience.
          </p>
        </div>

        <div className={styles.grid}>
          {MATERIALS.map((mat) => (
            <div key={mat.id} className={styles.card}>
              <Image
                src={mat.image}
                alt={mat.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={styles.img}
              />

              {/* Dark gradient always visible at bottom */}
              <div className={styles.gradientBase} />

              {/* Name overlay — fades out on hover */}
              <div className={styles.nameWrap}>
                <span className={styles.name}>{mat.name}</span>
                <span className={styles.content}>{mat.content}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
