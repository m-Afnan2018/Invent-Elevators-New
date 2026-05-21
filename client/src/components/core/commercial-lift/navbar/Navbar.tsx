"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToContact = () => {
        document
            .getElementById("contact-banner")
            ?.scrollIntoView({ behavior: "smooth" });

        setIsMobileMenuOpen(false);
    };

    return (
        <div className={styles.headerWrapper}>
            <header
                className={`${styles.header} ${
                    isScrolled ? styles.scrolled : ""
                }`}
            >
                <nav className={styles.navbar}>
                    {/* Logo */}
                    <div className={styles.logoContainer}>
                        <Link href="/" className={styles.logoLink}>
                            <div className={styles.logoIcon}>
                                <img
                                    src="/logo-2.png"
                                    alt="invent elevator logo"
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop CTA */}
                    <div className={styles.actions}>
                        <button
                            className={styles.quoteBtn}
                            onClick={scrollToContact}
                        >
                            <span className={styles.phoneIcon}>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </span>
                            Get a free quote
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={styles.mobileMenuBtn}
                        onClick={() =>
                            setIsMobileMenuOpen(!isMobileMenuOpen)
                        }
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line
                                    x1="18"
                                    y1="6"
                                    x2="6"
                                    y2="18"
                                ></line>
                                <line
                                    x1="6"
                                    y1="6"
                                    x2="18"
                                    y2="18"
                                ></line>
                            </svg>
                        ) : (
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line
                                    x1="3"
                                    y1="12"
                                    x2="21"
                                    y2="12"
                                ></line>
                                <line
                                    x1="3"
                                    y1="6"
                                    x2="21"
                                    y2="6"
                                ></line>
                                <line
                                    x1="3"
                                    y1="18"
                                    x2="21"
                                    y2="18"
                                ></line>
                            </svg>
                        )}
                    </button>
                </nav>

                {/* Mobile Menu */}
                <div
                    className={`${styles.mobileMenu} ${
                        isMobileMenuOpen
                            ? styles.mobileMenuOpen
                            : ""
                    }`}
                >
                    {/* <button
                        className={styles.mobileQuoteBtn}
                        onClick={scrollToContact}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>

                        <span>Get a free quote</span>
                    </button> */}
                    <button
    className={styles.mobileQuoteBtn}
    onClick={scrollToContact}
>
    <div className={styles.iconCircle}>
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    </div>

    <span>Get a free quote</span>
</button>
                </div>
            </header>
        </div>
    );
};

export default Navbar;