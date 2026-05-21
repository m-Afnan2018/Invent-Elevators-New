"use client";

import styles from "./CtaBanner.module.css";

interface CtaBannerProps {
  data?: {
    text?: string;
    buttonText?: string;
    buttonHref?: string;
  };
}

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

export default function CtaBanner({ data }: CtaBannerProps) {
  const text =
    data?.text ??
    "We create elevated living experiences through intelligent home lift solutions, combining precision engineering, seamless mobility, and refined design for modern residences and luxury villas.";
  const buttonText = data?.buttonText ?? "Book Free Site Visit";
  const buttonHref = data?.buttonHref ?? "#contact-banner";

  return (
    <section className={styles.wrapper}>
      <div className={styles.inner}>
        <p className={styles.text}>{text}</p>

        {/* <a href={buttonHref} className={styles.ctaBtn}>
                    <span className={styles.ctaText}>{buttonText}</span>
                    <span className={styles.ctaArrow}>↗</span>
                </a> */}
        <a
          href="#"
          className={styles.ctaBtn}
          onClick={(e) => {
            e.preventDefault();

            document.getElementById("contact-banner")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          <span className={styles.ctaText}>{buttonText}</span>

          {/* <span className={styles.ctaArrow}>↗</span> */}
          <span className={styles.arrowCircle}>
                <ArrowIcon />
              </span>
        </a>
      </div>
    </section>
  );
}
