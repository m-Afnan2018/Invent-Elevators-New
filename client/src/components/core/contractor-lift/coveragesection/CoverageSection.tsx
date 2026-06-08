"use client";

import Image from "next/image";
import styles from "./CoverageSection.module.css";

const LOCATIONS = [
  {
    city: "Dubai",
    image: "/contractor/images/cover/dubai.jpeg",
  },
  {
    city: "Sharjah",
    image: "/contractor/images/cover/sharjah2.jpeg",
  },
  {
    city: "Abu Dhabi",
    image: "/contractor/images/cover/abu-dhabi.jpeg",
  },
];

export default function CoverageSection() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>

        <h2 className={styles.heading}>
          SERVING CONTRACTORS ACROSS UAE
        </h2>

        <div className={styles.grid}>
          {LOCATIONS.map((item) => (
            <div key={item.city} className={styles.card}>

              <div className={styles.imageWrap}>
                <Image
                  src={item.image}
                  alt={item.city}
                  fill
                  className={styles.image}
                />

                <div className={styles.overlay}>
                  <div className={styles.location}>
                  <svg
  className={styles.pin}
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
>
  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
</svg>
                    <span>{item.city}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}