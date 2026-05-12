"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
    { label: "Home",       href: "/" },
    { label: "Categories", href: "/categories" },
    { label: "Products",   href: "/products" },
    { label: "Projects",   href: "/projects" },
    { label: "Insights",   href: "/blogs" },
    { label: "About",      href: "/about" },
    { label: "Contact",    href: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (href) =>
        href === "/" ? pathname === "/" : pathname?.startsWith(href);

    /* Page label shown inside the pill */
    const pageLabel = useMemo(() => {
        const match = [...NAV_LINKS].reverse().find((l) => isActive(l.href));
        return (match?.label ?? "Invent").toUpperCase();
    }, [pathname]);

    /* Lock body scroll when menu is open */
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    /* Close on Escape */
    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape") setIsOpen(false); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const open  = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
        <>
            {/* ── Top bar ─────────────────────────────── */}
            <header className={styles.topBar}>
                <div/>
                <Link href="/" className={styles.topLogo}>

                <Image width={100} height={100} src='/logo-invent-png-without-bg-1.png' alt="Invent Elevators" style={{height: '70px', objectFit: 'cover', width: 'auto', filter: 'brightness(0) invert(1)'}}/>
                </Link>
                <Link href="/contact" className={styles.topQuote}>↳ GET A QUOTE</Link>
            </header>

            {/* ── Backdrop overlay ─────────────────────── */}
            <div
                className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ""}`}
                aria-hidden="true"
                onClick={close}
            />

            {/* ── Menu panel (slides up from bottom, text rises inside) ── */}
            <div
                className={`${styles.menuPanel} ${isOpen ? styles.menuPanelOpen : ""}`}
                aria-hidden={!isOpen}
                role="dialog"
                aria-label="Site menu"
            >
                <span className={styles.menuEyebrow}>MENU</span>

                {/* Primary nav links — each rises with staggered delay via --i */}
                <nav className={styles.primaryNav}>
                    {NAV_LINKS.map((link, i) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${styles.primaryLink} ${isActive(link.href) ? styles.primaryLinkActive : ""}`}
                            style={{ "--i": i }}
                            tabIndex={isOpen ? 0 : -1}
                            onClick={close}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Footer info grid */}
                <div className={styles.menuInfo}>
                    <div className={styles.infoCol}>
                        <a
                            href="tel:+971585723553"
                            className={styles.infoLink}
                            tabIndex={isOpen ? 0 : -1}
                        >
                            +971 58 572 3553
                        </a>
                        <a
                            href="mailto:info@inventelevator.com"
                            className={styles.infoLink}
                            tabIndex={isOpen ? 0 : -1}
                        >
                            info@inventelevator.com
                        </a>
                    </div>
                    <div className={styles.infoCol}>
                        <Link href="/about"    className={styles.infoLink} tabIndex={isOpen ? 0 : -1} onClick={close}>About Us</Link>
                        <Link href="/projects" className={styles.infoLink} tabIndex={isOpen ? 0 : -1} onClick={close}>Our Projects</Link>
                        <Link href="/blogs"    className={styles.infoLink} tabIndex={isOpen ? 0 : -1} onClick={close}>Latest Insights</Link>
                    </div>
                </div>

                {/* CTA */}
                <Link href="/contact" className={styles.ctaBtn} tabIndex={isOpen ? 0 : -1} onClick={close}>
                    ↳ GET A QUOTE
                </Link>
            </div>

            {/* ── Bottom pill ──────────────────────────── */}
            <div className={styles.pillWrapper}>
                {/* Closed-state pill */}
                <nav
                    className={`${styles.pill} ${isOpen ? styles.pillHidden : ""}`}
                    aria-label="Main navigation"
                >
                    <Link href="/" className={styles.pillLogo} aria-label="Homepage">
                        <Image
                            src="/logo-white.png"
                            alt="Invent Elevator"
                            width={28}
                            height={28}
                            priority
                            style={{ width: "auto", height: "32px", objectFit: "contain" }}
                        />
                    </Link>

                    <span className={styles.pillLabel} 
                        onClick={open}>{pageLabel}</span>

                    <button
                        className={styles.pillHamburger}
                        aria-label="Open menu"
                        aria-expanded={isOpen}
                        onClick={open}
                    >
                        <span className={styles.hbar} />
                        <span className={styles.hbar} />
                    </button>
                </nav>

                {/* Open-state — × close button */}
                <button
                    className={`${styles.closePill} ${isOpen ? styles.closePillVisible : ""}`}
                    aria-label="Close menu"
                    onClick={close}
                >
                    ✕
                </button>
            </div>
        </>
    );
}
