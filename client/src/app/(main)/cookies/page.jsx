"use client";
import useBanner from '@/hooks/useBanner';
import styles from '../legal.module.css';

export default function CookiesPage() {
  const banner = useBanner('cookies');
  return (
    <div className={styles.page}>
      <div
        className={styles.hero}
        style={{ backgroundImage: banner?.image ? `url(${banner.image})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {banner?.image && <div style={{ position:'absolute',inset:0,background:'rgba(0,0,0,0.6)',zIndex:0 }} />}
        <div className={styles.heroInner} style={{ position:'relative',zIndex:1 }}>
          <p className={styles.eyebrow}>Legal</p>
          <h1 className={styles.heroTitle}>Cookies Policy</h1>
          <p className={styles.heroMeta}>Last updated: June 2026</p>
        </div>
      </div>
      <div className={styles.content}>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>What Are Cookies</h2>
          <p className={styles.para}>Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences, understand how you use the site, and improve your experience over time.</p>
        </div>

        <div className={styles.divider} />

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>How We Use Cookies</h2>
          <p className={styles.para}>Invent Elevator uses cookies to:</p>
          <ul className={styles.list}>
            <li>Keep you logged in to the admin panel and maintain your session securely.</li>
            <li>Understand how visitors navigate our website using anonymous analytics data.</li>
            <li>Remember your preferences such as language and display settings.</li>
            <li>Measure the effectiveness of our content and pages.</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Types of Cookies We Use</h2>
          <ul className={styles.list}>
            <li><strong>Essential cookies</strong> — required for the website to function. These cannot be disabled.</li>
            <li><strong>Analytics cookies</strong> — help us understand traffic and usage patterns. Data is aggregated and anonymous.</li>
            <li><strong>Preference cookies</strong> — remember settings you have selected to personalise your experience.</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Third-Party Cookies</h2>
          <p className={styles.para}>We may use third-party services such as analytics providers that place their own cookies on your device. These are governed by the respective third-party privacy policies. We do not share identifiable data with advertisers.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Managing Cookies</h2>
          <p className={styles.para}>You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. Note that disabling essential cookies may affect parts of our website.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Questions</h2>
          <div className={styles.contactBox}>
            <p><strong>Invent Elevator LLC</strong></p>
            <p>Email: <a href="mailto:info@inventelevator.com">info@inventelevator.com</a></p>
            <p>Phone: +971-58-5723553</p>
          </div>
        </div>

      </div>
    </div>
  );
}
