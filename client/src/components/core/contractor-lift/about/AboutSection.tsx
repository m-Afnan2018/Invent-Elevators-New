"use client";

import styles from "./AboutSection.module.css";

const ABOUT_DEFAULT = {
  heading: "About Invent",
  description:
    "Welcome to Invent, where modern design meets smart living. We create stylish and reliable home lifts with advanced technology for smooth and comfortable movement in your home.",
  buttonText: "Get a free quote",
  buttonHref: "/quote",
  imageSrc: "/images/about-1.png",
  imageAlt: "Invent Elevator interior showcase",
};

interface AboutData {
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  imageSrc?: string;
  imageAlt?: string;
}

interface AboutSectionProps {
  data?: AboutData;
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

export default function AboutSection({ data }: AboutSectionProps) {
  const about = {
    ...ABOUT_DEFAULT,
    ...data,
  };

  return (
    <section id="about" className={styles.wrapper}>
      <div className={styles.inner}>
        {/* LEFT — Image */}
        <div className={styles.imageBox}>
          <img
            src={about.imageSrc}
            alt={about.imageAlt}
            className={styles.image}
          />
        </div>

        {/* RIGHT — Content */}
        <div className={styles.content}>
          <h2 className={styles.heading}>{about.heading}</h2>
          <p className={styles.description}>{about.description}</p>

          {/* <a href={about.buttonHref} className={styles.ctaBtn}>
                        <span className={styles.ctaText}>{about.buttonText}</span>
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
            <span className={styles.ctaText}>{about.buttonText}</span>

            {/* <span className={styles.ctaArrow}>↗</span> */}
            <span className={styles.arrowCircle}>
                <ArrowIcon />
              </span>
          </a>
        </div>
      </div>
    </section>
  );
}
