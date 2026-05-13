import Link from 'next/link';
import styles from './Footer.module.css';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Top Logo Section */}
      <div className={styles.logoSection}>
        <div className={styles.logoPlaceholder}>
          <div className={styles.logoIcon}>
            <Image src={'/logo-invent-png-without-bg-1.png'} alt='logo' width={200} height={200}/>
          </div>
        </div>
      </div>

      {/* Tagline Section */}
      <div className={styles.taglineSection}>
        <p className={styles.tagline}>
          <span className={styles.taglineDark}>Decades of combined experience, shaping homes</span>
          <br />
          <span className={styles.taglineDark}>defined by</span>
          <span className={styles.taglineLight}> quality, intention, and long-term value.</span>
        </p>
      </div>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Bottom Grid */}
      <div className={styles.grid}>
        {/* Navigation */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Navigation</h4>
          <ul className={styles.linkList}>
            <li><Link href="/about" className={styles.link}>About Us</Link></li>
            <li><Link href="/services" className={styles.link}>Services</Link></li>
            <li><Link href="/projects" className={styles.link}>Projects</Link></li>
            <li><Link href="/services" className={styles.link}>Services</Link></li>
            <li><Link href="/vision" className={styles.link}>Vision</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Legal</h4>
          <ul className={styles.linkList}>
            <li><Link href="/privacy" className={styles.link}>Privacy Policy</Link></li>
            <li><Link href="/cookies" className={styles.link}>Cookies Policy</Link></li>
            <li><Link href="/terms" className={styles.link}>Terms of Service</Link></li>
            <li><Link href="/accessibility" className={styles.link}>Accessibility Statement</Link></li>
          </ul>
        </div>

        {/* Last Projects */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Last Projects</h4>
          <ul className={styles.linkList}>
            <li><span className={styles.link}>1000 89 St, Surfside</span></li>
            <li><span className={styles.link}>1710 S. Bayshore Drive</span></li>
            <li><span className={styles.link}>1716 S. Bayshore Drive</span></li>
            <li><span className={styles.link}>Normandy Shores</span></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Contact Us</h4>
          <ul className={styles.linkList}>
            <li><span className={styles.link}>+971-58-5723553</span></li>
            <li><span className={styles.link}>info@inventelevator.com</span></li>
            <li><span className={styles.link}>W-4, Behind Emirates Industrial City HQ,
Al Sajja Industrial Area, Sharjah, UAE</span></li>
          </ul>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialBtn} aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#7a7a72"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L.057 23.5l5.82-1.527A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.027-1.383l-.36-.214-3.733.979.996-3.648-.235-.374A9.795 9.795 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" fill="#7a7a72"/>
              </svg>
            </a>
            <a href="#" className={styles.socialBtn} aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="#7a7a72" strokeWidth="1.8"/>
                <circle cx="12" cy="12" r="4.5" stroke="#7a7a72" strokeWidth="1.8"/>
                <circle cx="17.5" cy="6.5" r="1" fill="#7a7a72"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>2026 Web design by Ganesyx</p>
      </div>
    </footer>
  );
}