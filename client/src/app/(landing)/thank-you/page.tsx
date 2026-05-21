"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function ThankYouPage() {
  return (
    <div className={styles.page}>
      <div className={styles.bg} />

      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" stroke="#e5b96a" strokeWidth="1.5" />
            <path
              d="M7 12.5l3.5 3.5L17 9"
              stroke="#e5b96a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className={styles.eyebrow}>Invent Elevator</p>
        <h1 className={styles.heading}>Thank You!</h1>
        <p className={styles.body}>
          Your enquiry has been received. Our team will review your details
          and get back to you within <strong>24 hours</strong>.
        </p>

        <div className={styles.divider} />

        <div className={styles.contact}>
          <p className={styles.contactLabel}>Need to reach us sooner?</p>
          <div className={styles.contactLinks}>
            <a href="tel:+971585723553" className={styles.contactBtn}>
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.8 19.8 0 01.0 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14v2.92z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              +971 58 572 3553
            </a>
            <a href="mailto:info@inventelevator.com" className={styles.contactBtn}>
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="22,6 12,13 2,6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              info@inventelevator.com
            </a>
          </div>
        </div>

        <Link href="/" className={styles.homeBtn}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
