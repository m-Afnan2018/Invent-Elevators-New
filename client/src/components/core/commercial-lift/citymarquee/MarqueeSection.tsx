"use client";

import styles from "./MarqueeSection.module.css";

const CITIES_DEFAULT = [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Fujairah",
    "Ras Al Khaimah",
    "Umm Al Quwain",
];

interface MarqueeSectionProps {
    data?: {
        cities?: string[];
        logoSrc?: string;
        logoAlt?: string;
    };
}

export default function MarqueeSection({ data }: MarqueeSectionProps) {
    const cities  = data?.cities  ?? CITIES_DEFAULT;
    const logoSrc = data?.logoSrc ?? "/logo-icon.png";
    const logoAlt = data?.logoAlt ?? "Invent Elevator";

    // Interleave: city, logo, city, logo ...
    const items: { type: "city" | "logo"; value: string }[] = [];
    cities.forEach((city) => {
        items.push({ type: "city",  value: city });
        items.push({ type: "logo",  value: logoSrc });
    });

    // Duplicate for seamless loop
    const track = [...items, ...items];

    return (
        <div className={styles.wrapper}>
            <div className={styles.marquee}>
                <div className={styles.track}>
                    {track.map((item, index) =>
                        item.type === "city" ? (
                            <span key={index} className={styles.cityItem}>
                                {/* <svg
                                    className={styles.pinIcon}
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
                                </svg> */}
                                {item.value}
                            </span>
                        ) : (
                            <span key={index} className={styles.logoItem}>
                                <img src={item.value} alt={logoAlt} className={styles.logo} />
                            </span>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}