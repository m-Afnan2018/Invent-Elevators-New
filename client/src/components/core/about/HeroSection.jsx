import PageHero from "@/components/common/PageHero/PageHero";

export default function HeroSection({ banner = null }) {
  return (
    <PageHero
      image={banner?.image}
      fallbackImage="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1800&q=85&fit=crop"
      eyebrow="Luxury Vertical Mobility"
      title={<>Elevating Luxury Living<br />Across UAE</>}
      description="Invent Elevator is a UAE-based luxury elevator company specialising in premium home lifts, commercial elevators, and bespoke vertical mobility solutions designed for modern villas, architectural spaces, and sophisticated interiors."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
    />
  );
}

/* ── OLD HeroSection (commented out — kept for reference) ──
import Image from "next/image";
import Link from "next/link";
import styles from "./HeroSection.module.css";

export default function HeroSectionOld({ banner = null }) {
  return (
    <section className={styles.hero}>
      <div className={styles.bgWrap}><Image fill sizes="100vw" src={banner?.image || "https://..."} unoptimized={!!(banner?.image)} alt="Luxury elevator interior" priority className={styles.bgImg} /></div>
      <div className={styles.overlayTop} /><div className={styles.overlayBottom} />
      <nav className={styles.breadcrumb}>...</nav>
      <div className={styles.content}>
        <div className={styles.eyebrow}>...</div>
        <h1 className={styles.heading}>Elevating Luxury Living<br />Across UAE</h1>
        <p className={styles.description}>...</p>
        <div className={styles.actions}><Link href="/series" className={styles.btnPrimary}>Explore Series</Link><Link href="/contact" className={styles.btnSecondary}>Book Consultation</Link></div>
      </div>
      <div className={styles.scrollWrap}>...</div>
    </section>
  );
}
── END OLD HeroSection ── */
