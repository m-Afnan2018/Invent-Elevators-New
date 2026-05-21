"use client";

import { useState, useEffect } from "react";
import styles from "./NotificationBar.module.css";

const MESSAGES_DEFAULT = [
    "🛡️ 2 Year Warranty on all installations",
    "⚡ Fast Delivery across the UAE",
    "🔧 Fast Installation — quick and hassle-free setup",
];

interface NotificationBarProps {
    messages?: string[];
}

export default function NotificationBar({
    messages = MESSAGES_DEFAULT,
}: NotificationBarProps) {
    const [index, setIndex]       = useState(0);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimating(true);

            setTimeout(() => {
                setIndex((prev) => (prev + 1) % messages.length);
                setAnimating(false);
            }, 350);
        }, 3000);

        return () => clearInterval(interval);
    }, [messages.length]);

    return (
        <div className={styles.bar}>
            <div className={styles.messageWrapper}>
                <p
                    className={`${styles.message} ${
                        animating ? styles.exit : styles.enter
                    }`}
                >
                    {messages[index]}
                </p>
            </div>

            {/* Dots */}
            {/* <div className={styles.dots}>
                {messages.map((_, i) => (
                    <span
                        key={i}
                        className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                    />
                ))}
            </div> */}
        </div>
    );
}