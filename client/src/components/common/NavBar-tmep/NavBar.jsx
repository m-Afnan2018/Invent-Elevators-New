"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./NavBar.module.css";

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <rect width="28" height="28" rx="4" fill="white" fillOpacity="0.15" />
                            <path d="M8 20V8l5 4 5-4v12" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className={styles.logoText}>Invent Elevator</span>
                </Link>

                {/* Desktop Nav Links */}
                <ul className={styles.navLinks}>
                    <li><Link href="/" className={styles.navLink}>Home</Link></li>
                    <li><Link href="/products" className={styles.navLink}>Our products</Link></li>
                    <li><Link href="/blogs" className={styles.navLink}>Blogs</Link></li>
                    <li><Link href="/about" className={`${styles.navLink} ${styles.active}`}>About us</Link></li>
                    <li><Link href="/contact" className={styles.navLink}>Contact</Link></li>
                </ul>

                {/* CTA Button */}
                <Link href="/contact" className={styles.ctaButton}>
                    Contact us
                </Link>

                {/* Mobile Hamburger */}
                <button
                    className={styles.hamburger}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`${styles.bar} ${menuOpen ? styles.bar1Open : ""}`} />
                    <span className={`${styles.bar} ${menuOpen ? styles.bar2Open : ""}`} />
                    <span className={`${styles.bar} ${menuOpen ? styles.bar3Open : ""}`} />
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
                <ul className={styles.mobileNavLinks}>
                    <li><Link href="/" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Home</Link></li>
                    <li><Link href="/products" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Our products</Link></li>
                    <li><Link href="/blogs" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Blogs</Link></li>
                    <li><Link href="/about" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>About us</Link></li>
                    <li><Link href="/contact" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Contact</Link></li>
                    <li>
                        <Link href="/contact" className={styles.mobileCtaButton} onClick={() => setMenuOpen(false)}>
                            Contact us
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}