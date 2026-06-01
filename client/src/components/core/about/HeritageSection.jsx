"use client";
import Image from "next/image";
import styles from "./HeritageSection.module.css";
import TextAlign from "@tiptap/extension-text-align";

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2l2.5 5 5.5 0.5-4 4 1 5.5L11 13l-5 2.5 1-5.5-4-4 5.5-0.5z" stroke="#b0742e" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
    title: "Luxury Design",
    desc: "Elegant solutions that complement modern architecture",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="16" height="16" rx="2" stroke="#b0742e" strokeWidth="1.6" />
        <path d="M7 11h8M11 7v8" stroke="#b0742e" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    title: "Bespoke Approach",
    desc: "Customised elevators tailored to your lifestyle and spaces",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8.5" stroke="#b0742e" strokeWidth="1.6" />
        <path d="M11 7v4l3 2" stroke="#b0742e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Advanced Technology",
    desc: "Intelligent systems designed for smooth, safe and reliable performance",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 19V8l8-5 8 5v11" stroke="#b0742e" strokeWidth="1.6" strokeLinejoin="round" />
        <rect x="8" y="13" width="6" height="6" rx="1" stroke="#b0742e" strokeWidth="1.5" />
      </svg>
    ),
    title: "End-to-End Support",
    desc: "From concept to installation and beyond, we are with you",
  },
];

export default function HeritageSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageCol}>
          <div className={styles.imageWrapper}>
            <Image
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85&fit=crop"
              alt="Luxury elevator installation"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.contentCol}>
          <p className={styles.eyebrow}>About Invent Elevator</p>
          <h2 className='headings {styles.heading}' style={{textAlign:'left'}}>Designed Beyond Functionality</h2>
          <p className={`${styles.body} para`}>
            At Invent Elevator, we believe elevators are more than mobility systems — they are an extension of architecture and lifestyle. Every elevator is thoughtfully designed to enhance interiors, elevate experiences, and integrate seamlessly into modern spaces.

          </p>
          <p className={`${styles.body} para`}>
            We combine advanced engineering with refined aesthetics to create
            elevator experiences that seamlessly blend functionality, elegance,
            and innovation.
          </p>

          <div className={styles.featureGrid}>
            {FEATURES.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <p className={styles.featureTitle}>{f.title}</p>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
