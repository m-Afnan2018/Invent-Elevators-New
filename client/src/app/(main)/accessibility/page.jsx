"use client";
import useBanner from '@/hooks/useBanner';
import styles from '../legal.module.css';

export default function AccessibilityPage() {
  const banner = useBanner('accessibility');
  return (
    <div className={styles.page}>
      <div
        className={styles.hero}
        style={{ backgroundImage: banner?.image ? `url(${banner.image})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {banner?.image && <div style={{ position:'absolute',inset:0,background:'rgba(0,0,0,0.6)',zIndex:0 }} />}
        <div className={styles.heroInner} style={{ position:'relative',zIndex:1 }}>
          <p className={styles.eyebrow}>Legal</p>
          <h1 className={styles.heroTitle}>Accessibility Statement</h1>
          <p className={styles.heroMeta}>Last updated: June 2026</p>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Commitment</h2>
          <p className={styles.para}>Invent Elevator is committed to ensuring our website is accessible to everyone, including people with disabilities. We continuously work to improve the accessibility of our digital content and comply with recognised accessibility standards.</p>
        </div>
        <div className={styles.divider} />
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Standards We Follow</h2>
          <p className={styles.para}>We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines explain how to make web content more accessible to people with a wide range of disabilities, including visual, auditory, motor, and cognitive impairments.</p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Accessibility Features</h2>
          <ul className={styles.list}>
            <li>Meaningful alt text on all images to support screen readers.</li>
            <li>Sufficient colour contrast throughout the website for legibility.</li>
            <li>Keyboard-navigable interface — all interactive elements are accessible without a mouse.</li>
            <li>Responsive design that adapts to different screen sizes and zoom levels.</li>
            <li>Semantic HTML structure to support assistive technologies.</li>
          </ul>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Known Limitations</h2>
          <p className={styles.para}>While we strive for full accessibility, some third-party content or embedded media may not fully meet all guidelines. We are actively working to identify and resolve these gaps.</p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Feedback & Support</h2>
          <p className={styles.para}>If you experience any difficulty accessing content on our website, or if you have suggestions for improving accessibility, please contact us. We take all feedback seriously and aim to respond within 5 business days.</p>
          <div className={styles.contactBox}>
            <p><strong>Invent Elevator LLC</strong></p>
            <p>Email: <a href="mailto:info@inventelevator.com">info@inventelevator.com</a></p>
            <p>Phone: +971-58-5723553</p>
            <p>Dubai, UAE</p>
          </div>
        </div>
      </div>
    </div>
  );
}
