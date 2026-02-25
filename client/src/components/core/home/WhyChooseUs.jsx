"use client";
import Image from "next/image";
import styles from "./WhyChooseUs.module.css";
import Link from "next/link";

const features = [
  {
    icon: "⬡",
    title: "Compact design",
    desc: "Maximum passenger space with a minimal footprint.",
  },
  {
    icon: "⚡",
    title: "Quick installation",
    desc: "Installed efficiently with minimal site disruption.",
  },
  {
    icon: "🌿",
    title: "Energy efficient",
    desc: "Low power consumption with optimized performance.",
  },
  {
    icon: "🔗",
    title: "Flexible integration",
    desc: "Easily adapts to residential and commercial spaces.",
  },
  {
    icon: "🔇",
    title: "Smooth operation",
    desc: "Silent and vibration-free ride experience.",
  },
  {
    icon: "🔄",
    title: "Future-ready upgrade",
    desc: "Designed for easy modernization and system updates.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── TOP BANNER: Why Choose ── */}
        <div className={styles.whyBanner}>
          <div className={styles.whyLeft}>
            <span className={styles.eyebrow}>Why Choose Invent Elevator?</span>
            <p className={styles.whyText}>
              Did you know that Invent Elevator systems are designed for faster
              installation compared to conventional elevator structures? Our
              smart engineering approach reduces structural modifications and
              ensures a smoother, more efficient setup process. From compact
              residential lifts to heavy-duty cargo systems, we focus on safety,
              reliability, and long-term performance. Every solution is built to
              optimize space, minimize maintenance, and enhance user comfort.
            </p>
            <Link href="/products" className={styles.exploreBtn}>
              Explore our platform lifts
              <span className={styles.btnArrow}>→</span>
            </Link>
          </div>

          {/* Elevator diagram image */}
          <div className={styles.whyRight}>
            <div className={styles.diagramWrapper}>
              <Image
                width={100}
                height={100}
                src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=700&q=80"
                alt="Elevator diagram"
                className={styles.diagramImg}
              />
              {/* Floating badge */}
              <div className={styles.diagramBadge}>
                <span className={styles.badgeIcon}>✓</span>
                <span className={styles.badgeText}>
                  Faster<br />Installation
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM: Innovative lift solutions + feature grid ── */}
        <div className={styles.innovSection}>
          <div className={styles.innovLeft}>
            <span className={styles.eyebrow}>Innovative lift solutions</span>
            <h2 className={styles.innovHeading}>
              Lifts Engineered <br />with <em>Precision</em>
            </h2>
            <p className={styles.innovText}>
              Invent Elevator began with a commitment to delivering advanced and
              space-efficient vertical mobility solutions. Over the years, we
              have grown into a trusted elevator solutions provider serving
              residential, commercial, and industrial sectors. Our core remains
              rooted in engineering excellence, strict quality standards, and
              customer-focused innovation.
            </p>
            <Link href="/about" className={styles.learnBtn}>
              Learn more
              <span className={styles.btnArrow}>→</span>
            </Link>
          </div>

          {/* Feature grid */}
          <div className={styles.innovRight}>
            <div className={styles.featuresGrid}>
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className={styles.featureCard}
                  style={{ "--delay": `${i * 0.07}s` }}
                >
                  <div className={styles.featureIcon}>{f.icon}</div>
                  <div>
                    <h4 className={styles.featureTitle}>{f.title}</h4>
                    <p className={styles.featureDesc}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}