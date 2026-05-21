"use client";

import { useState } from "react";
import styles from "./FeatureSection.module.css";

const FEATURES_DEFAULT = [
    {
        label: "Silent & smooth performance",
        imageSrc: "/images/features/silent-1.jpeg",
        imageAlt: "Silent commercial elevator operation",
        subheading: "Built for busy spaces.\nEngineered for smooth performance.",
        description: "Designed for offices, malls, hotels, and commercial buildings across the UAE.",
    },
    {
        label: "Space-efficient designs",
        imageSrc: "/images/features/space.jpeg",
        imageAlt: "Space-efficient commercial lift",
        subheading: "Maximum efficiency.\nMinimal space usage.",
        description: "Optimized lift systems designed to fit modern commercial floor plans with ease.",
    },
    {
        label: "Premium cabin interiors",
        imageSrc: "/images/features/interior.jpeg",
        imageAlt: "Premium commercial lift interiors",
        subheading: "Modern interiors,\ncrafted to impress.",
        description: "Elegant cabin finishes designed to match premium commercial environments.",
    },
    {
        label: "Minimal structural work",
        imageSrc: "/images/features/minimal.jpeg",
        imageAlt: "Minimal structural modification",
        subheading: "Fast installation.\nMinimal disruption.",
        description: "Efficient installation systems that reduce civil work and downtime for businesses.",
    },
    {
        label: "Seamless architectural integration",
        imageSrc: "/images/features/seamless.jpeg",
        imageAlt: "Commercial lift integrated with interiors",
        subheading: "Designed to blend\nwith modern architecture.",
        description: "Commercial lifts that enhance the aesthetics of offices, malls, and public spaces.",
    },
    {
        label: "Flexible installation options",
        imageSrc: "/images/features/no-pit.jpeg",
        imageAlt: "Flexible commercial lift installation",
        subheading: "Adaptable solutions\nfor every building.",
        description: "Available with low-pit and space-saving configurations for commercial projects.",
    },
    {
        label: "German / Italian technology",
        imageSrc: "/images/features/german.jpeg",
        imageAlt: "European commercial lift components",
        subheading: "European engineering.\nTrusted worldwide.",
        description: "Premium components sourced from certified German and Italian manufacturers.",
    },
    {
        label: "Quick project delivery",
        imageSrc: "/images/features/installation.jpeg",
        imageAlt: "Fast commercial lift installation",
        subheading: "Delivered fast.\nBuilt to last.",
        description: "Streamlined execution ensures timely installation for commercial developments.",
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

    const heading  = data?.heading  ?? "Our Commercial Lifts Features";
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
                                className={`${styles.featureItem} ${activeIndex === index ? styles.active : ""}`}
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
                            className={`${styles.mobileTab} ${activeIndex === index ? styles.mobileTabActive : ""}`}
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