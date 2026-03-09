"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";
import { getCategories } from "@/services/categories.service";
import { getProducts } from "@/services/products.service";
import { getProjects } from "@/services/projects.service";
import { getBlogs } from "@/services/blogs.service";

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%2306192f'/%3E%3Cstop offset='1' stop-color='%23154369'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='1200' height='800'/%3E%3Ctext x='50%25' y='50%25' fill='%23dca55a' font-size='46' font-family='Arial' text-anchor='middle' dominant-baseline='middle'%3EInvent Elevator%3C/text%3E%3C/svg%3E";

const toArray = (value) => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.items)) return value.items;
  return [];
};

const processSteps = [
  "Consultation & Site Audit",
  "Design, Engineering & Compliance",
  "Installation & Quality Testing",
  "Lifecycle AMC & Priority Support",
];

const differentiators = [
  "Code-compliant safety systems and quality checks.",
  "Custom cabin finishes and compact shaft planning.",
  "Dedicated after-sales maintenance and rapid support.",
];

const trustStatements = [
  "Trusted by premium residential and commercial developers.",
  "Structured project management from inquiry to handover.",
  "Faster response times with dedicated service engineers.",
  "Quality-first supply and installation standards.",
];


const partnerHighlights = [
  "Residential Towers",
  "Hospitals",
  "Hotels",
  "Industrial Facilities",
  "Retail Complexes",
];

const faqItems = [
  {
    q: "Do admin updates reflect on the frontend automatically?",
    a: "Yes. Categories, products, projects, and blogs shown here are fetched from backend services, so admin CRUD updates are reflected on public pages.",
  },
  {
    q: "Can you support both residential and commercial installations?",
    a: "Absolutely. We provide home lifts, passenger systems, cargo applications, and custom mobility solutions based on building requirements.",
  },
  {
    q: "Do you provide maintenance after installation?",
    a: "Yes. We offer ongoing preventive maintenance and responsive support plans to keep your elevator running safely and smoothly.",
  },
];

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loadHomeData = async () => {
      const [categoryRes, productRes, projectRes, blogRes] = await Promise.allSettled([
        getCategories(),
        getProducts(),
        getProjects(),
        getBlogs(),
      ]);

      setCategories(categoryRes.status === "fulfilled" ? toArray(categoryRes.value) : []);
      setProducts(productRes.status === "fulfilled" ? toArray(productRes.value) : []);
      setProjects(projectRes.status === "fulfilled" ? toArray(projectRes.value) : []);
      setBlogs(blogRes.status === "fulfilled" ? toArray(blogRes.value) : []);
    };

    loadHomeData();
  }, []);

  const activeCategories = useMemo(
    () =>
      categories
        .filter((category) => category?._id && category?.name)
        .filter((category) => category?.isActive !== false && category?.status !== "inactive")
        .slice(0, 6),
    [categories]
  );

  const featuredProducts = useMemo(
    () => products.filter((product) => product?._id && product?.name).slice(0, 4),
    [products]
  );

  const featuredProjects = useMemo(
    () => projects.filter((project) => project?._id && project?.title).slice(0, 3),
    [projects]
  );

  const latestBlogs = useMemo(
    () => blogs.filter((blog) => blog?._id && blog?.title).slice(0, 3),
    [blogs]
  );

  const liveMetrics = [
    { label: "Active Categories", value: activeCategories.length || categories.length },
    { label: "Products in Catalog", value: products.length },
    { label: "Projects Delivered", value: projects.length },
    { label: "Published Insights", value: blogs.length },
  ];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.container}>
          <p className={styles.eyebrow}>Invent Elevator · Complete Vertical Mobility</p>
          <h1>Beautiful, Reliable Elevators for Contemporary Spaces</h1>
          <p>
            More premium design, more confidence in performance. Every item shown below
            is connected with your admin/backend CRUD so updates reflect directly on the
            frontend experience.
          </p>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.primaryBtn}>Request Consultation</Link>
            <Link href="/products" className={styles.secondaryBtn}>Explore Product Range</Link>
          </div>

          <div className={styles.metricsGrid}>
            {liveMetrics.map((metric) => (
              <div key={metric.label} className={styles.metricCard}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}><h2>Product Categories</h2><Link href="/categories">View All</Link></div>
          <div className={styles.gridThree}>
            {(activeCategories.length ? activeCategories : [{ _id: "all", name: "All Categories" }]).map((category) => (
              <Link key={category._id} href={category._id === "all" ? "/categories" : `/categories/${category._id}`} className={styles.categoryCard}>
                <div className={styles.cardMedia}><Image src={category.image || FALLBACK_IMAGE} alt={category.name} fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.cardImage} /></div>
                <div className={styles.cardBody}><h3>{category.name}</h3><span>Discover solutions →</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.lightSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}><h2>Why Clients Choose Invent</h2><Link href="/about">Know Us Better</Link></div>
          <div className={styles.whyGrid}>
            {differentiators.map((text) => (
              <article key={text} className={styles.whyCard}><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}><h2>Featured Products</h2><Link href="/products">All Products</Link></div>
          <div className={styles.gridFour}>
            {(featuredProducts.length ? featuredProducts : [{ _id: "all-products", name: "Explore Full Product Catalog" }]).map((product) => (
              <Link key={product._id} href={product._id === "all-products" ? "/products" : `/products/${product._id}`} className={styles.productCard}>
                <div className={styles.productImageWrap}><Image src={product.image || FALLBACK_IMAGE} alt={product.name} fill sizes="(max-width: 768px) 100vw, 25vw" className={styles.cardImage} /></div>
                <div><h3>{product.name}</h3><p>{product.description || "Precision engineered for reliability and comfort."}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.trustSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}><h2>Service Excellence Promise</h2><Link href="/contact">Request Site Visit</Link></div>
          <div className={styles.trustGrid}>
            {trustStatements.map((item) => (
              <article key={item} className={styles.trustCard}><p>{item}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.lightSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}><h2>Our Professional Process</h2><Link href="/contact">Start Your Project</Link></div>
          <div className={styles.processGrid}>
            {processSteps.map((step, idx) => (
              <article key={step} className={styles.processCard}><span>0{idx + 1}</span><h3>{step}</h3></article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}><h2>Projects Delivered</h2><Link href="/projects">See All Projects</Link></div>
          <div className={styles.gridThree}>
            {(featuredProjects.length ? featuredProjects : [{ _id: "fallback-project", title: "See Our Complete Project Portfolio" }]).map((project) => (
              <Link key={project._id} href="/projects" className={styles.projectCard}><h3>{project.title}</h3><p>{project.location || project.description || "Custom-installed for demanding spaces."}</p></Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.lightSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}><h2>Insights & Blogs</h2><Link href="/blogs">Read More</Link></div>
          <div className={styles.gridThree}>
            {(latestBlogs.length ? latestBlogs : [{ _id: "fallback-blog", title: "Read Latest Elevator Insights" }]).map((blog) => (
              <Link key={blog._id} href="/blogs" className={styles.blogCard}><h3>{blog.title}</h3><p>{blog.excerpt || blog.shortDescription || "Latest updates from our engineering and installation team."}</p></Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.lightSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}><h2>Sectors We Serve</h2><Link href="/projects">View Work</Link></div>
          <div className={styles.partnerStrip}>
            {partnerHighlights.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}><h2>Frequently Asked Questions</h2><Link href="/contact">Need More Help?</Link></div>
          <div className={styles.faqGrid}>
            {faqItems.map((item) => (
              <article key={item.q} className={styles.faqItem}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.ctaSection}`}>
        <div className={styles.container}>
          <h2>Let&apos;s Elevate Your Next Project</h2>
          <p>Our specialists will recommend the right lift architecture, finish, and support model for your building.</p>
          <Link href="/contact" className={styles.primaryBtn}>Book Free Consultation</Link>
        </div>
      </section>
      <div className={styles.mobileQuickBar}>
        <Link href="/contact">Get Quote</Link>
        <a href="tel:+4600000000">Call Expert</a>
      </div>
    </main>
  );
}
