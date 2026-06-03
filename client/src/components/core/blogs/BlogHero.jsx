"use client";

import { useState } from "react";
import PageHero from "@/components/common/PageHero/PageHero";
import styles from "./BlogHero.module.css";

export default function BlogHero({ totalPosts = 0, onSearch, banner = null }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query.trim());
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (!e.target.value.trim()) onSearch?.("");
  };

  return (
    <PageHero
      image={banner?.image}
      fallbackImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&q=80"
      eyebrow={`Journal & Insights${totalPosts > 0 ? ` · ${totalPosts} articles` : ""}`}
      title="The Invent Elevator Blog"
      description="Engineering insights, installation guides, industry news and vertical mobility trends — straight from our team of experts."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
    >
      {/* Search bar — rendered inside the hero inner block */}
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M12.5 12.5l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search articles, topics or tags…"
            value={query}
            onChange={handleChange}
            aria-label="Search blog"
          />
          {query && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => { setQuery(""); onSearch?.(""); }}
              aria-label="Clear search"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          )}
          <button type="submit" className={styles.searchBtn}>Search</button>
        </div>
      </form>

      <div className={styles.tagsRow}>
        <span className={styles.tagsLabel}>Popular:</span>
        {["Hydraulic Lifts", "Home Elevators", "Installation", "Safety Standards", "Industry News"].map((tag) => (
          <button
            key={tag}
            className={styles.tagChip}
            onClick={() => { setQuery(tag); onSearch?.(tag); }}
          >
            {tag}
          </button>
        ))}
      </div>
    </PageHero>
  );
}

/* ── OLD BlogHero (commented out — kept for reference) ──
import Image from "next/image";
import Link from "next/link";

export default function BlogHeroOld({ totalPosts = 0, onSearch, banner = null }) {
  // Background: banner?.image || unsplash fallback
  // Overlays: overlayTop + overlayBottom
  // Breadcrumb: Home > Blog
  // Eyebrow dot + "Journal & Insights" + article count chip
  // H1: "The Invent Elevator Blog"
  // Subheading paragraph
  // Search form with clear button
  // Popular tags row
  // Scroll indicator bottom-right
  // See git history for full original implementation
}
── END OLD BlogHero ── */
