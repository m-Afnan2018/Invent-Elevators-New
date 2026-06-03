import PageHero from "@/components/common/PageHero/PageHero";

const ContactHero = ({ banner = null }) => (
  <PageHero
    image={banner?.image}
    fallbackImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80"
    eyebrow="Get In Touch"
    title={<>Let&apos;s Talk About<br />Your Lift Project</>}
    description="From early planning to post-installation support, our specialists are ready to guide you with reliable and premium mobility solutions."
    breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
  />
);

export default ContactHero;

/* ── OLD ContactHero (commented out — kept for reference) ──
import Image from "next/image";
import Link from "next/link";
import styles from "./ContactHero.module.css";

const ContactHeroOld = ({ banner = null }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.bgWrap}>
        <Image src={banner?.image || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80"} unoptimized={!!(banner?.image)} alt="Modern office building" fill priority sizes="100vw" className={styles.bgImg} />
      </div>
      <div className={styles.overlayTop} /><div className={styles.overlayBottom} />
      <nav className={styles.breadcrumb}><Link href="/" className={styles.bcLink}>Home</Link><svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={styles.bcChevron}><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg><span className={styles.bcActive}>Contact</span></nav>
      <div className={styles.content}>
        <div className={styles.eyebrow}><span className={styles.eyebrowDot} /><span>Get In Touch</span></div>
        <h1 className={styles.heading}>Let's Talk About<br />Your Lift Project</h1>
        <p className={styles.description}>From early planning to post-installation support, our specialists are ready to guide you with reliable and premium mobility solutions.</p>
      </div>
      <div className={styles.scrollWrap}><span className={styles.scrollLabel}>Scroll to explore</span><div className={styles.scrollTrack}><div className={styles.scrollThumb} /></div></div>
    </section>
  );
};
── END OLD ContactHero ── */
