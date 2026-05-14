"use client";

import styles from "./ProcessSteps.module.css";

const STEPS_DEFAULT = [
    {
        number: "01",
        title: "Booking",
        description: "Schedule a free consultation with our team at your convenience. We'll confirm your appointment within 24 hours.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
        ),
    },
    {
        number: "02",
        title: "Site Visit",
        description: "Our expert visits your property to assess the space, structural layout, and best placement for your elevator.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
    },
    {
        number: "03",
        title: "Requirements Analysis",
        description: "We study your specific needs — number of floors, load capacity, accessibility requirements, and aesthetic preferences.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        ),
    },
    {
        number: "04",
        title: "Custom Design",
        description: "Our designers craft a lift tailored to your home's architecture — cabin finish, door style, lighting, and flooring.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
        ),
    },
    {
        number: "05",
        title: "Installation",
        description: "Our certified engineers install your elevator with minimal disruption. Up and running within 30 days, fully tested and handed over.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
    },
];

interface Step {
    number: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}

interface ProcessStepsProps {
    data?: {
        heading?: string;
        subheading?: string;
        steps?: Step[];
    };
}

export default function ProcessSteps({ data }: ProcessStepsProps) {
    const heading    = data?.heading    ?? "How It Works";
    const subheading = data?.subheading ?? "A seamless end-to-end process designed to deliver luxury, precision, and peace of mind at every stage.";
    const steps      = data?.steps      ?? STEPS_DEFAULT;

    return (
        <section className={styles.wrapper}>

            {/* Heading */}
            <div className={`${styles.headingBlock} headings`}>
                <h2 className={styles.heading}>{heading}</h2>
                <p className={styles.subheading}>{subheading}</p>
            </div>

            {/* Steps */}
            <div className={styles.steps}>
                {steps.map((step, index) => (
                    <div key={step.number} className={styles.step}>

                        {/* Connector line */}
                        {index < steps.length - 1 && (
                            <div className={styles.connector} />
                        )}

                        {/* Icon circle */}
                        <div className={styles.iconWrap}>
                            <span className={styles.icon}>{step.icon}</span>
                        </div>

                        {/* Text */}
                        <div className={styles.textWrap}>
                            <span className={styles.number}>{step.number}</span>
                            <h3 className={styles.title}>{step.title}</h3>
                            <p className={styles.description}>{step.description}</p>
                        </div>

                    </div>
                ))}
            </div>

        </section>
    );
}