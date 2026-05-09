"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
    { name: "Company", href: "/company" },
    { 
        name: "Product & Services", 
        href: "/products",
        subLinks: [
            { name: "Home Elevators", href: "/products/home-elevators" },
            { name: "Commercial Elevators", href: "/products/commercial-elevators" },
            { name: "Modernization", href: "/services/modernization" },
            { name: "Maintenance", href: "/services/maintenance" }
        ]
    },
    { name: "Careers", href: "/careers" },
    { name: "Sustainability", href: "/sustainability" },
    { name: "News & Insights", href: "/news" }
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMobileDropdown = (name: string) => {
        if (openMobileDropdown === name) {
            setOpenMobileDropdown(null);
        } else {
            setOpenMobileDropdown(name);
        }
    };

    return (
        <div className={styles.headerWrapper}>
            <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
                <nav className={styles.navbar}>
                    <div className={styles.logoContainer}>
                        <Link href="/" className={styles.logoLink}>
                            <div className={styles.logoIcon}>
                                <img src="/logo.png" alt="invent elevator logo" />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <ul className={styles.navLinks}>
                        {NAV_LINKS.map((link) => (
                            <li key={link.name} className={link.subLinks ? styles.dropdown : ""}>
                                <Link href={link.href} className={styles.link}>
                                    {link.name}
                                    {link.subLinks && (
                                        <span className={styles.chevron}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="6 9 12 15 18 9"></polyline>
                                            </svg>
                                        </span>
                                    )}
                                </Link>
                                {link.subLinks && (
                                    <div className={styles.dropdownMenu}>
                                        {link.subLinks.map((subLink) => (
                                            <Link key={subLink.name} href={subLink.href} className={styles.dropdownItem}>
                                                {subLink.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Action Button */}
                    <div className={styles.actions}>
                        <Link href="/quote" className={styles.quoteBtn}>
                            <span className={styles.phoneIcon}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </span>
                            Get a free quote
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={styles.mobileMenuBtn}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        )}
                    </button>
                </nav>

                {/* Mobile Menu */}
                <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
                    <ul className={styles.mobileNavLinks}>
                        {NAV_LINKS.map((link) => (
                            <li key={link.name}>
                                {link.subLinks ? (
                                    <>
                                        <button 
                                            className={styles.mobileLink} 
                                            onClick={() => toggleMobileDropdown(link.name)}
                                        >
                                            {link.name}
                                            <span className={styles.chevron} style={{ transform: openMobileDropdown === link.name ? 'rotate(180deg)' : 'rotate(0)' }}>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                            </span>
                                        </button>
                                        <div className={`${styles.mobileSubLinksWrapper} ${openMobileDropdown === link.name ? styles.mobileSubLinksWrapperOpen : ""}`}>
                                            <div className={styles.mobileSubLinks}>
                                                {link.subLinks.map((subLink) => (
                                                    <Link 
                                                        key={subLink.name} 
                                                        href={subLink.href} 
                                                        className={styles.mobileSubLink}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {subLink.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Link 
                                        href={link.href} 
                                        className={styles.mobileLink} 
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                    <Link href="/quote" className={styles.mobileQuoteBtn} onClick={() => setIsMobileMenuOpen(false)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        Get a free quote
                    </Link>
                </div>
            </header>
        </div>
    );
};

export default Navbar;