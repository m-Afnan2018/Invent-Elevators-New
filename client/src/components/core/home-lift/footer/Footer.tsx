"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const InstagramIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LocationPinIcon = () => (
  <svg
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.00009 0C3.59009 0 9.41395e-05 3.59 9.41395e-05 8C-0.0299059 14.44 7.12009 19.6 7.42009 19.82C7.59009 19.94 7.80009 20.01 8.00009 20.01C8.20009 20.01 8.41009 19.95 8.58009 19.82C8.88009 19.6 16.0301 14.45 16.0001 8C16.0001 3.59 12.4101 0 8.00009 0ZM8.00009 12C5.79009 12 4.00009 10.21 4.00009 8C4.00009 5.79 5.79009 4 8.00009 4C10.2101 4 12.0001 5.79 12.0001 8C12.0001 10.21 10.2101 12 8.00009 12Z"
      fill="#BDA57F"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function Footer() {
  const locations = [
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Fujairah",
    "Ras Ai Khaimah",
    "Dubai",
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.bgImage}>
        <Image
          src="/images/footer-bg.jpg"
          alt="Footer background"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          quality={85}
        />
      </div>

      <div className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              <Image
                src="/logo-2.png"
                alt="Invent Elevator"
                width={170}
                height={65}
                style={{ objectFit: "contain", objectPosition: "left" }}
              />
            </div>

            <p className={styles.tagline}>
              Well-Designed Spaces That Combine Comfort, Elegance, And A
              Peaceful Setting
            </p>

            <Link
              href="#"
              className={styles.quoteBtn}
              onClick={(e) => {
                e.preventDefault();

                document.getElementById("contact-banner")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              <span className={styles.quoteBtnText}>Get a Free Quote</span>

              <span className={styles.arrowCircle}>
                <ArrowIcon />
              </span>
            </Link>
          </div>

          {/* Locations Column */}
          <div className={styles.locationsCol}>
            <ul className={styles.locationList}>
              {locations.map((city) => (
                <li key={city} className={styles.locationItem}>
                  <span className={styles.pinIcon}>
                    <LocationPinIcon />
                  </span>

                  <span className={styles.cityName}>{city}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className={styles.contactCol}>
            <h3 className={styles.contactTitle}>Contact Us</h3>

            <a href="tel:+971585723553" className={styles.phone}>
              +971-58-5723553 
            </a>

            <a
  href="mailto:info@inventelevator.com"
  className={styles.email}
>
  info@inventelevator.com
</a>

            <div className={styles.socialRow}>
              <span className={styles.socialIcon} aria-label="Instagram">
                <InstagramIcon />
              </span>

              <span className={styles.socialIcon} aria-label="X">
                <XIcon />
              </span>

              <span className={styles.socialIcon} aria-label="Facebook">
                <FacebookIcon />
              </span>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            Copyright © 2026 Invent. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
