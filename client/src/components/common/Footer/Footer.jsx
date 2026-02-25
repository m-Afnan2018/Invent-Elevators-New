"use client";
import styles from "./Footer.module.css";
import Link from "next/link";

const footerLinks = {
  "Our Category": [
    { label: "Passengers Elevators", href: "/products/passenger-elevators" },
    { label: "Home Lift",            href: "/products/home-lifts" },
    { label: "Freight & Cargo",      href: "/products/freight-cargo" },
    { label: "Car Lifts",            href: "/products/car-lifts" },
    { label: "Industrial Lifts",     href: "/products/industrial-lifts" },
    { label: "Escalators & Travelators", href: "/products/escalators" },
  ],
  "Company": [
    { label: "About Invent Lift Group", href: "/about" },
    { label: "Contact us",              href: "/contact" },
    { label: "Become a distributor",    href: "/distributor" },
    { label: "Our Products",            href: "/products" },
    { label: "Blog",                    href: "/blog" },
  ],
};

const socials = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>

      {/* ── Top band ── */}
      <div className={styles.topBand}>
        <div className={styles.topInner}>
          <div className={styles.topLeft}>
            <p className={styles.topTagline}>Our experts are here to help</p>
            <a href="mailto:info@inventelevator.com" className={styles.topEmail}>
              info@inventelevator.com
            </a>
          </div>
          <div className={styles.topRight}>
            <Link href="/contact" className={styles.topCta}>
              Request a consultation →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main footer ── */}
      <div className={styles.main}>
        <div className={styles.mainInner}>

          {/* Brand column */}
          <div className={styles.brandCol}>
            {/* Logo */}
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>▲</span>
              <span className={styles.logoText}>
                Invent<strong>Elevator</strong>
              </span>
            </Link>

            <p className={styles.brandDesc}>
              Elevating homes and businesses with precision-engineered lift
              solutions since 1947. Smart, sustainable, and Scandinavian.
            </p>

            {/* Language + Login */}
            <div className={styles.utilRow}>
              <span className={styles.langBadge}>🌐 English (Global)</span>
              <Link href="/login" className={styles.loginLink}>Login</Link>
            </div>

            {/* Socials */}
            <div className={styles.socials}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className={styles.socialBtn}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className={styles.linkCol}>
              <h4 className={styles.colHeading}>{heading}</h4>
              <ul className={styles.linkList}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className={styles.linkCol}>
            <h4 className={styles.colHeading}>Get in Touch</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="mailto:info@inventelevator.com" className={styles.footerLink}>
                  info@inventelevator.com
                </a>
              </li>
              <li>
                <a href="tel:+4600000000" className={styles.footerLink}>
                  +46 00 000 000
                </a>
              </li>
            </ul>

            {/* Cookie settings selector */}
            <div className={styles.cookieWrap}>
              <h4 className={styles.colHeading} style={{ marginTop: "1.5rem" }}>
                Preferences
              </h4>
              <button className={styles.cookieBtn}>
                🍪 Cookie settings
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>© 2026 Cibes Lift. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <Link href="/privacy-policy" className={styles.legalLink}>Privacy Policy</Link>
            <span className={styles.dot}>·</span>
            <Link href="/terms" className={styles.legalLink}>Terms of use</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
