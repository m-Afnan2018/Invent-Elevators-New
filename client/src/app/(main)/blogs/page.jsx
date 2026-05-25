"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import BlogHero from "@/components/core/blogs/BlogHero";
import BlogFeatured from "@/components/core/blogs/BlogFeatured";
import BlogSecondary from "@/components/core/blogs/BlogSecondary";
import BlogGrid, { MOCK_POSTS } from "@/components/core/blogs/BlogGrid";
import { getBlogs } from "@/services/blogs.service";
import { extractCollection } from "@/lib/apiResponse";

function Sidebar({ allTags, activeTags, onTagClick, sidebarSearch, onSidebarSearch }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sideWidget}>
        <h4 className={styles.widgetTitle}>Search</h4>
        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} width="15" height="15" viewBox="0 0 15 15" fill="none">
            <circle cx="6.5" cy="6.5" r="5" stroke="#aaa" strokeWidth="1.4" />
            <path d="M10.5 10.5L13.5 13.5" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search articles…"
            value={sidebarSearch}
            onChange={(e) => onSidebarSearch(e.target.value)}
            className={styles.searchInput}
          />
          {sidebarSearch && (
            <button className={styles.searchClear} onClick={() => onSidebarSearch("")}>×</button>
          )}
        </div>
      </div>

      <div className={styles.sideWidget}>
        <h4 className={styles.widgetTitle}>Tags</h4>
        <div className={styles.tagCloud}>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`${styles.cloudTag} ${activeTags.includes(tag) ? styles.cloudTagActive : ""}`}
              onClick={() => onTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [activeTags, setActiveTags] = useState([]);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await getBlogs();
        setPosts(extractCollection(response));
      } catch (_error) {
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadBlogs();
  }, []);

  const normalizedPosts = useMemo(
    () =>
      posts.map((post) => ({
        ...post,
        coverImage: post.coverImage || post.image || post.thumbnail,
        excerpt: post.excerpt || post.shortDescription || post.description,
        publishDate: post.publishDate || post.createdAt,
      })),
    [posts]
  );

  const allTags = useMemo(() => {
    const data = normalizedPosts.length > 0 ? normalizedPosts : MOCK_POSTS;
    return [...new Set(data.flatMap((p) => p.tags || []))];
  }, [normalizedPosts]);

  const handleTagClick = (tag) =>
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  return (
    <main className={styles.page}>
      <BlogHero totalPosts={normalizedPosts.length} onSearch={setSearchQuery} />

      {/* <section className={styles.introBand}>
        <div className={styles.introInner}>
          <div>
            <p className={styles.eyebrow}>Knowledge Center</p>
            <h2>Insights from Real Elevator Projects</h2>
            <p>
              Learn from practical installation stories, design best practices, and
              service tips that help your project stay safe, efficient, and future-ready.
            </p>
          </div>
          <Link href="/contact" className={styles.cta}>
            Talk to our experts
          </Link>
        </div>
      </section> */}

      <div className={styles.bodyLayout}>
        <div className={styles.bodyMain}>
          <BlogFeatured post={normalizedPosts[0]} />
          {/* <BlogSecondary posts={normalizedPosts.slice(1, 4)} /> */}
          <BlogGrid
            posts={normalizedPosts}
            isLoading={isLoading}
            searchQuery={searchQuery}
            sidebarSearch={sidebarSearch}
            activeTags={activeTags}
            onClearFilters={() => { setSidebarSearch(""); setActiveTags([]); }}
          />
        </div>
        <Sidebar
          allTags={allTags}
          activeTags={activeTags}
          onTagClick={handleTagClick}
          sidebarSearch={sidebarSearch}
          onSidebarSearch={(v) => setSidebarSearch(v)}
        />
      </div>
    </main>
  );
}
