"use client";
import useBanner from '@/hooks/useBanner';
import PageHero from "@/components/common/PageHero/PageHero";
import styles from '../legal.module.css';

export default function TermsPage() {
  const banner = useBanner('terms');
  return (
    <div className={styles.page}>
      <PageHero
        image={banner?.image}
        fallbackImage="/projects/downtown.png"
        eyebrow="Legal"
        title="Terms of Service"
        description="Last updated: June 2026"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
      />

      {/* ── OLD hero (commented out — kept for reference) ──
      <div className={styles.hero} style={{ backgroundImage: banner?.image ? `url(${banner.image})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {banner?.image && <div style={{ position:'absolute',inset:0,background:'rgba(0,0,0,0.6)',zIndex:0 }} />}
        <div className={styles.heroInner} style={{ position:'relative',zIndex:1 }}>
          <p className={styles.eyebrow}>Legal</p><h1 className={styles.heroTitle}>Terms of Service</h1><p className={styles.heroMeta}>Last updated: June 2026</p>
        </div>
      </div>
      ── END OLD hero ── */}
      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Agreement to Terms</h2>
          <p className={styles.para}>By accessing or using the Invent Elevator website and services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our website or services.</p>
        </div>
        <div className={styles.divider} />
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Services</h2>
          <p className={styles.para}>Invent Elevator LLC provides design, supply, installation, and maintenance of elevator systems for residential and commercial properties across the UAE. All services are subject to separate project agreements and quotations provided in writing.</p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Quotations and Orders</h2>
          <ul className={styles.list}>
            <li>All quotations are valid for 30 days from the date of issue unless otherwise stated.</li>
            <li>A confirmed order requires a signed agreement and deposit as specified in your quotation.</li>
            <li>Prices are subject to change based on material costs, site conditions, and scope changes.</li>
            <li>Lead times are estimates only and do not constitute a guaranteed delivery date.</li>
          </ul>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Intellectual Property</h2>
          <p className={styles.para}>All content on this website — including text, images, designs, logos, and technical documentation — is the property of Invent Elevator LLC and protected under UAE intellectual property law. Reproduction without written permission is prohibited.</p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Limitation of Liability</h2>
          <p className={styles.para}>To the extent permitted by UAE law, Invent Elevator shall not be liable for any indirect or consequential damages. Our total liability for any claim shall not exceed the value of the specific service to which it relates.</p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Governing Law</h2>
          <p className={styles.para}>These terms are governed by the laws of the United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.</p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact Us</h2>
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
