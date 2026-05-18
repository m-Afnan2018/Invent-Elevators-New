"use client";

import { useState } from "react";
import styles from "./FeatureSection.module.css";

const FEATURES_DEFAULT = [
  {
    label: "Silent and smooth operation",
    imageSrc: "/images/features/silent-1.png",
    imageAlt: "Silent and smooth elevator operation",
    subheading:
      "Designed for modern villas. \nEngineered for everyday comfort.",
    description:
      "We specialize in lift solutions for private villas and premium residences across the UAE.",
  },
  {
    label: "Space-optimized designs",
    imageSrc: "/images/features/space.png",
    imageAlt: "Space-optimized elevator design",
    subheading: "Fits where others\nsimply cannot.",
    description:
      "Engineered to work within tight floor-plan constraints without compromising on comfort or aesthetics.",
  },
  {
    label: "Custom cabin finishes",
    imageSrc: "/images/features/custom.png",
    imageAlt: "Custom elevator cabin finishes",
    subheading: "Your style,\nperfectly reflected.",
    description:
      "Choose from a wide palette of woods, metals, mirrors, and glass to create a cabin that complements your interior.",
  },
  {
    label: "Minimal structural modification",
    imageSrc: "/images/features/minimal.png",
    imageAlt: "Minimal structural modification",
    subheading: "Install with\nzero disruption.",
    description:
      "Our systems are designed to slot into existing structures with minimal civil work, saving time and cost.",
  },
  {
    label: "Seamless integration with interiors",
    imageSrc: "/images/features/seamless.png",
    imageAlt: "Elevator seamlessly integrated with home interiors",
    subheading: "Blends in,\nstands out.",
    description:
      "Each lift is designed as an architectural element that enhances your home rather than interrupting it.",
  },
  {
    label: "No pit / minimal civil work options",
    imageSrc: "/images/features/no-pit.png",
    imageAlt: "No pit elevator option",
    subheading: "Designed for modern villas.\nEngineered for everyday comfort.",
    description:
      "We specialize in lift solutions for private villas and premium residences across the UAE.",
  },
  {
    label: "German / Italian components",
    imageSrc: "/images/features/german.png",
    imageAlt: "German and Italian elevator components",
    subheading: "European precision,\ndelivered to your door.",
    description:
      "Every drive, rail, and control panel is sourced from certified European manufacturers for lasting reliability.",
  },
  {
    label: "Fast Installation",
    imageSrc: "/images/features/installation.png",
    imageAlt: "Fast elevator installation",
    subheading: "Smooth and efficient\ninstallation process.",
    description:
      "Our streamlined installation process ensures your home lift is installed with precision, quality, and minimal disruption.",
  },
];

interface Feature {
  label: string;
  imageSrc: string;
  imageAlt: string;
  subheading: string;
  description: string;
}

interface FeaturesSectionProps {
  data?: {
    heading?: string;
    features?: Feature[];
  };
}

export default function FeaturesSection({ data }: FeaturesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const heading = data?.heading ?? "Our Home Lifts Feature";
  const features = data?.features ?? FEATURES_DEFAULT;

  const active = features[activeIndex];

  return (
    <section id="features" className={styles.wrapper}>
      {/* Section heading */}
      <div className={styles.headingRow}>
        <span className={styles.line} />
        <h2 className={styles.heading}>{heading}</h2>
        <span className={styles.line} />
      </div>

      {/* ── DESKTOP layout ── */}
      <div className={styles.inner}>
        {/* LEFT — Image */}
        <div className={styles.imageBox}>
          <img
            key={activeIndex}
            src={active.imageSrc}
            alt={active.imageAlt}
            className={styles.image}
          />
        </div>

        {/* RIGHT — Text + feature list */}
        <div className={styles.content}>
          <div className={styles.textBlock} key={activeIndex}>
            <h3 className={styles.subheading}>
              {active.subheading.split("\n").map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h3>
            <p className={styles.description}>{active.description}</p>
          </div>

          <ul className={styles.featureList}>
            {features.map((feature, index) => (
              <li
                key={index}
                className={`${styles.featureItem} ${
                  activeIndex === index ? styles.active : ""
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <span className={styles.chevron}>‹</span>
                <span className={styles.featureText}>{feature.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── MOBILE layout — accordion style ── */}
      <ul className={styles.mobileList}>
        {features.map((feature, index) => (
          <li key={index} className={styles.mobileItem}>
            {/* Tab row */}
            <button
              className={`${styles.mobileTab} ${
                activeIndex === index ? styles.mobileTabActive : ""
              }`}
              onClick={() => setActiveIndex(index === activeIndex ? -1 : index)}
            >
              <span className={styles.chevron}>‹</span>
              <span className={styles.featureText}>{feature.label}</span>
            </button>

            {/* Expandable content below the tab */}
            {activeIndex === index && (
              <div className={styles.mobileExpanded} key={index}>
                <img
                  src={feature.imageSrc}
                  alt={feature.imageAlt}
                  className={styles.mobileImage}
                />
                <div className={styles.mobileTextBlock}>
                  <h3 className={styles.subheading}>
                    {feature.subheading.split("\n").map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </h3>
                  <p className={styles.description}>{feature.description}</p>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
