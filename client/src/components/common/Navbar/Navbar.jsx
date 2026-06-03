"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
    { label: "Home",       href: "/" },
    { label: "Series",       href: "/series" },
    { label: "Categories", href: "/categories" },
    { label: "Areas We Serve", href: "/area-we-serve" },
    // { label: "Products",   href: "/products" },
    { label: "Projects",   href: "/projects" },
    // { label: "Blogs",   href: "/blogs" },
    // { label: "About",      href: "/about" },
    // { label: "FAQ",      href: "/faq" },
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

                <Image width={100} height={100} src='/logo-invent-png-without-bg-1.png' alt="Invent Elevators" style={{height: '70px', objectFit: 'cover', width: 'auto', filter: 'brightness(0) invert(1)', marginLeft: '1rem'}}/>
                </Link>
                <Link href="/contact" className={styles.topQuote}>↳ GET QUOTE</Link>
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
                        {/* <Link href="/projects" className={styles.infoLink} tabIndex={isOpen ? 0 : -1} onClick={close}>Our Projects</Link> */}
                        <Link href="/faq" className={styles.infoLink} tabIndex={isOpen ? 0 : -1} onClick={close}>FAQ</Link>
                        <Link href="/blogs"    className={styles.infoLink} tabIndex={isOpen ? 0 : -1} onClick={close}>Blogs</Link>
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

                    <a
                        href="https://wa.me/971585723553"
                        target="_blank"
                        rel="noreferrer"
                        className={styles.pillWhatsapp}
                        aria-label="Chat on WhatsApp"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                    </a>
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
