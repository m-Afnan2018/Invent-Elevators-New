"use client";

import styles from "./SolutionsSection.module.css";

const SOLUTIONS_DEFAULT = [
    {
        title: "Compact Home Lifts",
        description: "Our bespoke design service transforms your vision into timeless elegance.",
        imageSrc: "/images/solutions/compact-3.png",
        imageAlt: "Compact Home Lifts",
        href: "/solutions/compact",
    },
    {
        title: "Elderly & Accessibility Lifts",
        description: "Our meticulous fit-out service delivers flawless execution, bringing designs to life with unrivalled craftsmanship.",
        imageSrc: "/images/solutions/accessibility-3.png",
        imageAlt: "Elderly & Accessibility Lifts",
        href: "/solutions/accessibility",
    },
    {
        title: "Duplex & Villa Lifts",
        description: "Our bespoke design service transforms your vision into timeless elegance.",
        imageSrc: "/images/solutions/duplex-3.png",
        imageAlt: "Duplex & Villa Lifts",
        href: "/solutions/duplex",
    },
    {
        title: "Luxury Glass Lifts",
        description: "Our meticulous fit-out service delivers flawless execution, bringing designs to life with unrivalled craftsmanship.",
        imageSrc: "/images/solutions/glass-3.png",
        imageAlt: "Luxury Glass Lifts",
        href: "/solutions/glass",
    },
];

interface SolutionItem {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    href: string;
}

interface SolutionsSectionProps {
    data?: {
        heading?: string;
        solutions?: SolutionItem[];
    };
}

export default function SolutionsSection({ data }: SolutionsSectionProps) {
    const heading   = data?.heading   ?? "Home lift Solutions";
    const solutions = data?.solutions ?? SOLUTIONS_DEFAULT;

    return (
        <section id="solutions" className={styles.wrapper}>

            {/* Heading row — left-aligned with line on the right */}
            <div className={styles.headingRow}>
                <h2 className={styles.heading}>{heading}</h2>
                <span className={styles.line} />
            </div>

            {/* 2×2 grid */}
            <div className={styles.grid}>
                {solutions.map((item) => (
                    <a key={item.title} href={item.href} className={styles.card}>
                        <div className={styles.imageBox}>
                            <img
                                src={item.imageSrc}
                                alt={item.imageAlt}
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.cardBody}>
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                            <p className={styles.cardDesc}>{item.description}</p>
                        </div>
                    </a>
                ))}
            </div>

        </section>
    );
}