"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";
import { getCategories } from "@/services/categories.service";
import { getProducts } from "@/services/products.service";
import { getProjects } from "@/services/projects.service";
import { getBlogs } from "@/services/blogs.service";
import { extractCollection } from "@/lib/apiResponse";
import Series from "@/components/core/home/Series";
import { GlobalMarkets } from "@/components/core/home/GlobalMarkets";
import TypesGrid from "@/components/core/home/TypesGrid";
import Projects from "@/components/core/home/Projects";
import Testimonials from "@/components/core/home/Testimonials";
import FAQ from "@/components/core/home/FAQ";
import Global from "@/components/core/home/Global";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80";

const HERO_IMAGES = [
  "/hero/hero-1.jpg",
  "/hero/hero-2.jpg",
  "/hero/hero-3.jpg",
];

const FALLBACK_CATEGORIES = [
  {
    _id: "home-lifts",
    __fallback: true,
    name: "Home Lifts",
    description: "Luxury mobility for modern living",
    image: "/lifts/home.png",
  },
  {
    _id: "passenger-lifts",
    __fallback: true,
    name: "Passenger Lifts",
    description: "Engineered for high-performance movement",
    image: "/lifts/passenger.png",
  },
  {
    _id: "car-lifts",
    __fallback: true,
    name: "Car Lifts",
    description: "Precision lifting for vehicle transportation",
    image: "/lifts/car.png",
  },
  {
    _id: "dumbwaiters",
    __fallback: true,
    name: "Dumbwaiters",
    description: "Compact efficiency for seamless service",
    image: "/lifts/dumbwaiter.png",
  },
  {
    _id: "chair-lifts",
    __fallback: true,
    name: "Chair Lifts",
    description: "Safe & comfortable accessibility",
    image: "/lifts/chair.png",
  },
  {
    _id: "pod-lifts",
    __fallback: true,
    name: "Pod Lifts",
    description: "Architectural elegance in motion",
    image: "/lifts/pod.png",
  },
];

const FALLBACK_PRODUCTS = [
  {
    _id: "home-lift",
    name: "Home Lift",
    description: "Space-efficient design with silent, smooth operation and advanced safety mechanisms.",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "passenger-lift",
    name: "Passenger Lift",
    description: "Energy-efficient drive systems with intelligent control panels and high load capacity.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "car-lift",
    name: "Car Lift",
    description: "Heavy-duty structural design with smooth start & stop technology.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "dumbwaiter",
    name: "Dumbwaiter",
    description: "Space-saving compact design with smooth, quiet operation.",
    image: "https://images.unsplash.com/photo-1581091215367-59ab6dcef5f0?auto=format&fit=crop&w=900&q=80",
  },
];

const FALLBACK_PROJECTS = [
  {
    _id: "p1", __fallback: true,
    title: "Luxury Villa Complex", location: "Dubai, UAE",
    description: "4 custom home lifts installed across premium residential villas.",
  },
  {
    _id: "p2", __fallback: true,
    title: "Corporate Office Tower", location: "Abu Dhabi, UAE",
    description: "High-speed passenger elevators with destination control system.",
  },
  {
    _id: "p3", __fallback: true,
    title: "Hospitality & Restaurant Chain", location: "Sharjah, UAE",
    description: "Dumbwaiter systems for seamless kitchen-to-floor service.",
  },
  {
    _id: "p4", __fallback: true,
    title: "Luxury Villa Complex", location: "Dubai, UAE",
    description: "4 custom home lifts installed across premium residential villas.",
  },
  {
    _id: "p5", __fallback: true,
    title: "Corporate Office Tower", location: "Abu Dhabi, UAE",
    description: "High-speed passenger elevators with destination control system.",
  },
  {
    _id: "p6", __fallback: true,
    title: "Hospitality & Restaurant Chain", location: "Sharjah, UAE",
    description: "Dumbwaiter systems for seamless kitchen-to-floor service.",
  },
];

const FALLBACK_BLOGS = [
  { _id: "b1", title: "How to Choose the Right Elevator for Your Home", excerpt: "A practical guide for homeowners and architects across the UAE." },
  { _id: "b2", title: "5 Maintenance Habits That Extend Elevator Life", excerpt: "Reduce downtime with proactive, data-driven service planning." },
  { _id: "b3", title: "Elevator Safety Features Every Client Should Know", excerpt: "From ARD to emergency communication systems — what matters most." },
];

const WHY_FEATURES = [
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "500+ Design Variations",
    desc: "Fully customisable cabins, finishes, and drive systems to match any architectural vision.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "10+ Years Expertise",
    desc: "A decade of engineering excellence delivering safe, reliable vertical mobility solutions.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    title: "International Safety Standards",
    desc: "Every installation complies with international safety certifications and local regulations.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Residential & Commercial",
    desc: "From private villas to commercial towers — we deliver precision across every project type.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Energy Efficient",
    desc: "Eco-friendly drive systems designed for low power consumption and reduced operating costs.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "15+ Trusted Partners",
    desc: "A vetted global supply chain ensuring quality components and long-term reliability.",
  },
];

const MARQUEE_ITEMS = [
  "NON-PROPRIETARY", "100% CUSTOMISABLE", "ECO-FRIENDLY", "COMPACT DESIGN",
  "SAFETY CERTIFIED", "ENGINEERED IN UAE", "10+ YEARS EXPERTISE", "100+ PROJECTS",
];

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [heroIdx, setHeroIdx] = useState(0);
  const heroTimer = useRef(null);
  const parallaxRef = useRef(null);

  useEffect(() => {
    heroTimer.current = setInterval(() => setHeroIdx((i) => (i + 1) % HERO_IMAGES.length), 6000);
    return () => clearInterval(heroTimer.current);
  }, []);

  useEffect(() => {
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        if (parallaxRef.current) {
          parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
        }
        rafId = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [categoryRes, productRes, projectRes, blogRes] = await Promise.all([
          getCategories(),
          getProducts(),
          getProjects(),
          getBlogs(),
        ]);
        setCategories(extractCollection(categoryRes, ["categories"]));
        setProducts(extractCollection(productRes));
        setProjects(extractCollection(projectRes));
        setBlogs(extractCollection(blogRes));
      } catch (_e) { }
    };
    loadHomeData();
  }, []);

  const activeCategories = useMemo(() => {
    const valid = categories.filter((c) => c?._id && c?.name && c?.isActive !== false).slice(0, 6);
    return valid.length ? valid : FALLBACK_CATEGORIES;
  }, [categories]);

  const featuredProducts = useMemo(() => {
    const valid = products.filter((p) => p?._id && p?.name);
    const featured = valid.filter((p) => p.isFeatured);
    const list = (featured.length ? featured : valid).slice(0, 4);
    return list.length ? list : FALLBACK_PRODUCTS;
  }, [products]);

  const featuredProjects = useMemo(() => {
    const valid = projects.filter((p) => p?._id && p?.title).slice(0, 6);
    return valid.length ? valid : FALLBACK_PROJECTS;
  }, [projects]);

  const latestBlogs = useMemo(() => {
    const valid = blogs.filter((b) => b?._id && b?.title).slice(0, 3);
    return valid.length ? valid : FALLBACK_BLOGS;
  }, [blogs]);

  const stats = [
    { value: "100+", label: "Projects Delivered" },
    { value: "500+", label: "Design Variations" },
    { value: "10+", label: "Years of Expertise" },
    { value: "4.8★", label: "Google Rating" },
  ];

  return (
    <main className={styles.page}>

      {/* ── Hero ── */}
      <section className={`${styles.hero} ${styles.heroSection}`}>
        <div ref={parallaxRef} className={styles.heroBgWrap}>
          {HERO_IMAGES.map((src, i) => (
            <div key={src} className={`${styles.heroBg} ${i === heroIdx ? styles.heroBgActive : ""}`}>
              <Image src={src} alt="Invent Elevator" fill sizes="100vw" className={styles.heroBgImg} priority={i === 0} />
            </div>
          ))}
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroH1}>
              Premium Elevator Systems<br />
              <span className={styles.heroAccent}>Designed for Modern Architecture</span>
            </h1>
          </div>
        </div>
        <div className={styles.miniContainer}>
          <p>Glazing specialists</p>
          <p>We design and install bespoke glass systems for ambitious architectural projects. Every pane reflects our commitment to clarity, quality, and collaboration.
          </p>
        </div>
        {/* Scroll indicator */}
        <div className={styles.scrollHint}>
          <div className={styles.scrollDot} />
        </div>
      </section>

      {/* ── Marquee Strip ── */}
      {/* <div className={styles.marqueeWrap} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className={styles.marqueeItem}>
              <span className={styles.marqueeDot} />
              {item}
            </span>
          ))}
        </div>
      </div>* /}

      {/* ── Categories ── */}
      <section className={styles.section} style={{ padding: 0 }}>
        <Series activeCategories={activeCategories} />
      </section>


      <TypesGrid series={[
        { _id: "1", name: "Heritage", subtitle: "European/Japanese", url: '/series/heritage.png' },
        { _id: "2", name: "Horizon", subtitle: "European/Japanese", url: '/series/horizon.png' },
        { _id: "3", name: "Orbit", subtitle: "European/Japanese", url: '/series/orbit.png' },
        { _id: "4", name: "Aero/Slim", subtitle: "European/Japanese", url: '/series/aero-slim.png' },
        { _id: "5", name: "Atelier", subtitle: "European/Japanese", url: '/series/atelier.png' },
      ]} />


      <Global />
      {/* <GlobalMarkets /> */}

      {/* ── Projects ── */}
      <Projects featuredProjects={featuredProjects} />

      {/* Testimonials */}
      <Testimonials testimonials={[
        {
          name: "Rajesh Mehta",
          role: "Director, Mehta Constructions",
          quote: "Invent Elevators transformed our residential project. The installation was seamless, and the after-sales support has been exceptional. Highly recommended for any high-rise development.",
          image: "/testimonials/user-1.webp",
        },
        {
          name: "Priya Sharma",
          role: "Facility Manager, Oberoi Realty",
          quote: "We've installed over 12 units across our commercial properties. The build quality and modern aesthetics perfectly complement our premium spaces. Zero downtime in two years.",
          image: "/testimonials/user-2.webp",
        },
        {
          name: "Arjun Nair",
          role: "Principal Architect, Nair & Associates",
          quote: "As an architect, I value both form and function. Invent Elevators delivers on both fronts — their customization options are unmatched and the engineering is world-class.",
          image: "/testimonials/user-3.webp",
        },
        {
          name: "Sunita Agarwal",
          role: "CEO, Agarwal Group Hospitality",
          quote: "Our hotel guests frequently compliment the lifts. Smooth, quiet, and elegant — exactly what a five-star property demands. Invent Elevators exceeded every expectation.",
          image: "/testimonials/user-4.webp",
        },
      ]} />

      <FAQ faqs={[
        {
          q: "What types of elevators does Invent Elevators offer?",
          a: "We offer a complete range of lift solutions including Home Lifts, Passenger Lifts, Car Lifts, and Dumbwaiters. Each product is customizable to suit residential, commercial, and industrial requirements."
        },
        {
          q: "How long does the installation process take?",
          a: "Installation typically takes 3–7 days depending on the lift type and site conditions. Our team conducts a thorough site assessment beforehand to ensure a smooth and timely installation with minimal disruption."
        },
        {
          q: "Do you provide after-sales service and maintenance?",
          a: "Yes. We offer comprehensive Annual Maintenance Contracts (AMC) covering routine inspections, preventive maintenance, and emergency breakdown support. Our technicians are available 365 days a year."
        },
        {
          q: "Are your elevators compliant with Indian safety standards?",
          a: "Absolutely. All our lifts are designed and installed in compliance with the National Building Code of India (NBC) and relevant BIS standards, ensuring complete safety for all users."
        },
        {
          q: "Can the lift design be customized to match my interiors?",
          a: "Yes. We offer extensive customization options including cabin finishes, flooring, lighting, door styles, and control panels — allowing the lift to seamlessly blend with your home or building's aesthetics."
        },
        {
          q: "What is the typical lifespan of an Invent Elevator?",
          a: "With proper maintenance, our elevators are built to last 20–25 years. We use high-grade components and industry-leading technology to ensure long-term reliability and performance."
        },
      ]} />

      {/* ── Blog ── */}
      {/* <section className={`${styles.section} ${styles.blogSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <div>
              <p className={styles.sectionEyebrow}>Insights</p>
              <h2 className={styles.sectionTitle}>Latest from Our Blog</h2>
            </div>
            <Link href="/blogs" className={styles.viewAll}>Read More →</Link>
          </div>
          <div className={styles.blogsGrid}>
            {latestBlogs.map((blog) => (
              <Link
                key={blog._id}
                href={blog.slug ? `/blog/${blog.slug}` : blog.__fallback ? "/blogs" : `/blog/${blog._id}`}
                className={styles.blogCard}
              >
                {(blog.coverImage || blog.image) && (
                  <div className={styles.blogImgWrap}>
                    <Image
                      src={blog.coverImage || blog.image}
                      alt={blog.title}
                      fill
                      sizes="(max-width:640px) 100vw, 33vw"
                      className={styles.blogImg}
                    />
                  </div>
                )}
                <div className={styles.blogBody}>
                  {blog.category && <span className={styles.blogTag}>{blog.category}</span>}
                  <h3 className={styles.blogTitle}>{blog.title}</h3>
                  <p className={styles.blogExcerpt}>
                    {blog.excerpt || blog.shortDescription || "Latest updates from our engineering and installation team."}
                  </p>
                  <span className={styles.blogReadMore}>Read article →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

    </main>
  );
}
