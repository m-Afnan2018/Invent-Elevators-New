"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/services/projects.service";
import { extractCollection } from "@/lib/apiResponse";
import styles from "./page.module.css";
import MarqueeLogos from "@/components/core/projects/MarqueeLogos";
import TypesGrid from "@/components/core/series/TypesGrid";
import SeriesElevatorCard from "@/components/core/series/SeriesElevatorCard";
import ElevatorProductPage from "@/components/core/series/ElevatorProductPage";
import HeritageCard from "@/components/core/series/HeritageCard";
import HorizonCard from "@/components/core/series/HorizonCard";
import AeroSlimCard from "@/components/core/series/AeroSlimCard";
import OrbitCard from "@/components/core/series/OrbitCard";
import AtelierCard from "@/components/core/series/AtelierCard";

const FALLBACK_PROJECTS = [
  {
    _id: "luxury-villa-uae",
    __fallback: true,
    category: "Residential",
    title: "Luxury Villa Complex",
    description: "4 custom home lifts installed across premium residential villas with silent operation and bespoke cabin finishes.",
    location: "Dubai, UAE",
    image: "/projects/adnoc.png",
    galleryImages: [
      "/images/projects/_DSC5734.jpg",
      "/images/projects/_DSC5891.jpg",
      "/images/projects/_DSC6628.jpg",
    ],
  },
  {
    _id: "corporate-tower-uae",
    __fallback: true,
    category: "Commercial",
    title: "Corporate Office Tower",
    description: "High-speed passenger elevators with intelligent destination control and energy-efficient drive systems.",
    location: "Abu Dhabi, UAE",
    image: "/projects/al-majaz.png",
    galleryImages: [
      "/images/projects/_DSC5891.jpg",
      "/images/projects/_DSC5734.jpg",
    ],
  },
  {
    _id: "restaurant-chain-uae",
    __fallback: true,
    category: "Hospitality",
    title: "Hospitality & Restaurant Chain",
    description: "Dumbwaiter systems installed for seamless kitchen-to-floor service in a multi-floor dining establishment.",
    location: "Sharjah, UAE",
    image: "/projects/city-centre.png",
    galleryImages: [
      "/images/projects/_DSC5734.jpg",
      "/images/projects/_DSC5738.jpg",
      "/images/projects/_DSC5891.jpg",
    ],
  },
  {
    _id: "residential-complex",
    __fallback: true,
    category: "Residential",
    title: "Residential Complex",
    description: "Passenger lifts across a multi-tower residential development with centralised monitoring.",
    location: "Dubai, UAE",
    image: "/projects/downtown.png",
    galleryImages: [
      "/images/projects/_DSC5738.jpg",
      "/images/projects/_DSC5891.jpg",
    ],
  },
  {
    _id: "medical-facility",
    __fallback: true,
    category: "Healthcare",
    title: "Medical Facility",
    description: "Bed and stretcher elevator systems with emergency power backup for uninterrupted operations.",
    location: "UAE",
    image: "/projects/palm-jumeirah.png",
    galleryImages: [
      "/images/projects/_DSC5734.jpg",
      "/images/projects/_DSC5738.jpg",
      "/images/projects/_DSC5891.jpg",
    ],
  },
  {
    _id: "car-park-structure",
    __fallback: true,
    category: "Commercial",
    title: "Multi-Level Car Park",
    description: "Heavy-duty car lift systems engineered for high-frequency vehicle transportation in limited spaces.",
    location: "UAE",
    image: "/projects/yas-island.png",
    galleryImages: [
      "/images/projects/_DSC5738.jpg",
      "/images/projects/_DSC5891.jpg",
    ],
  },
];

const SLIDE_INTERVAL = 3000; // ms between image changes on hover

function getImages(project) {
  const seen = new Set();
  [
    project.image,
    project.featuredImage,
    ...(project.images || []),
    ...(project.galleryImages || []),
  ].forEach((src) => { if (src) seen.add(src); });
  return [...seen];
}

function ProjectCard({ project }) {
  const images = useMemo(() => getImages(project), [project]);
  const href = project.__fallback ? "/projects" : `/projects/${project._id}`;

  const [hovered, setHovered] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [baseSrc, setBaseSrc] = useState(images[0]);
  const [incoming, setIncoming] = useState(null); // { src, key } while wipe animates
  const idxRef = useRef(0);
  const timerRef = useRef(null);
  const settleRef = useRef(null);

  const advance = useCallback(() => {
    const next = (idxRef.current + 1) % images.length;
    idxRef.current = next;
    const nextSrc = images[next];
    setActiveIdx(next);
    setIncoming({ src: nextSrc, key: Date.now() });
    clearTimeout(settleRef.current);
    settleRef.current = setTimeout(() => {
      setBaseSrc(nextSrc);
      setIncoming(null);
    }, 560);
  }, [images]);

  useEffect(() => {
    if (hovered && images.length > 1) {
      timerRef.current = setInterval(advance, SLIDE_INTERVAL);
    } else {
      clearInterval(timerRef.current);
      if (!hovered) {
        clearTimeout(settleRef.current);
        idxRef.current = 0;
        setActiveIdx(0);
        setBaseSrc(images[0]);
        setIncoming(null);
      }
    }
    return () => {
      clearInterval(timerRef.current);
      clearTimeout(settleRef.current);
    };
  }, [hovered, advance, images]);

  return (
    <Link
      href={href}
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.cardImgWrap}>
        {/* Base layer — the settled image */}
        <Image
          src={baseSrc}
          alt={project.title}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          className={styles.cardImg}
        />

        {/* Incoming layer — wipes in from top over the base */}
        {incoming && (
          <Image
            key={incoming.key}
            src={incoming.src}
            alt=""
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            className={styles.cardImgIncoming}
          />
        )}

        {/* Story progress bars — visible only when hovering + multiple images */}
        {images.length > 1 && (
          <div className={styles.storyBars} style={{ opacity: hovered ? 1 : 0 }}>
            {images.map((_, i) => (
              <div key={i} className={styles.storyBar}>
                <div
                  key={i === activeIdx ? `a-${activeIdx}` : `d-${i}`}
                  className={`${styles.storyFill}${i < activeIdx ? ` ${styles.storyDone}` :
                    i === activeIdx && hovered ? ` ${styles.storyActive}` : ""
                    }`}
                />
              </div>
            ))}
          </div>
        )}

        <div className={styles.cardImgOverlay} />
        {project.location && (
          <span className={styles.locationBadge}>📍 {project.location}</span>
        )}
      </div>

      <div className={styles.cardBody}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <span className={styles.cardLink}>View Project</span>
        </div>

        <p className={styles.cardDesc}>
          {(project.description || "Custom vertical mobility solution.").slice(0, 120)}
          {(project.description || "").length > 120 ? "…" : ""}
        </p>
        {project.category && (
          <span className={styles.cardCategory}>{project.category}</span>
        )}
        {/* <span className={styles.cardLink}>View Project →</span> */}
      </div>
    </Link>
  );
}

export default function SeriesPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(extractCollection(response));
      } catch (_error) {
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
  }, []);

  const allProjects = useMemo(() => {
    const valid = projects.filter((p) => p?._id && p?.title);
    return valid.length ? valid : FALLBACK_PROJECTS;
  }, [projects]);

  const categories = useMemo(() => {
    const cats = allProjects.map((p) => p.category).filter(Boolean);
    return ["All", ...Array.from(new Set(cats))];
  }, [allProjects]);

  const showcaseProjects = useMemo(() => {
    if (activeCategory === "All") return allProjects;
    return allProjects.filter((p) => p.category === activeCategory);
  }, [allProjects, activeCategory]);

  return (
    <main className={styles.main}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        {/* Background image */}
        <div className={styles.heroBgWrap}>
          <Image
            src="/projects/adnoc.png"
            alt="Modern building projects"
            fill
            priority
            sizes="100vw"
            className={styles.heroBgImg}
          />
        </div>
        <div className={styles.heroOverlayTop} />
        <div className={styles.heroOverlayBottom} />

        {/* Breadcrumb */}
        <nav className={styles.heroBreadcrumb}>
          <Link href="/" className={styles.heroBcLink}>Home</Link>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={styles.heroBcChevron}>
            <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={styles.heroBcActive}>Series</span>
        </nav>

        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>Our Series</span>
          </div>
          <h1 className={styles.heroTitle}>Our Series</h1>
          <p className={styles.heroDesc}>
            Explore completed lift installations and success stories across residential
            villas, commercial towers, hospitality venues, and healthcare facilities
            across the UAE.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className={styles.heroScrollWrap}>
          <span className={styles.heroScrollLabel}>Scroll to explore</span>
          <div className={styles.heroScrollTrack}>
            <div className={styles.heroScrollThumb} />
          </div>
        </div>
      </section>

      <TypesGrid series={[
        { _id: "1", link: "heritage", name: "Heritage", subtitle: "Reinforced Concrete Shaft · Essential & Elite",  url: '/series/heritage.png' },
        { _id: "2", link: "horizon",  name: "Horizon",  subtitle: "MS Shaft · Glass Cabin Car",    url: '/series/horizon.png' },
        { _id: "3", link: "orbit",    name: "Orbit",    subtitle: "Round Shaft · Curvature Cabin", url: '/series/orbit.png' },
        { _id: "4", link: "aero",     name: "Aero",     subtitle: "No Pit · Slim Panoramic Lift",  url: '/series/aero-slim.png' },
      ]} />

      <div className={styles.seriesSection} id="heritage">
        <HeritageCard />
        <div className={styles.seriesBtnRow}>
          <Link href="/projects" className={styles.viewProjectsBtn}>View Projects</Link>
          <Link href="/series/heritage" className={styles.viewSeriesBtn}>Explore Series</Link>
        </div>
      </div>

      <div className={styles.seriesSection} id="horizon">
        <HorizonCard />
        <div className={styles.seriesBtnRow}>
          <Link href="/projects" className={styles.viewProjectsBtn}>View Projects</Link>
          <Link href="/series/horizon" className={styles.viewSeriesBtn}>Explore Series</Link>
        </div>
      </div>

      <div className={styles.seriesSection} id="orbit">
        <OrbitCard />
        <div className={styles.seriesBtnRow}>
          <Link href="/projects" className={styles.viewProjectsBtn}>View Projects</Link>
          <Link href="/series/orbit" className={styles.viewSeriesBtn}>Explore Series</Link>
        </div>
      </div>

      <div className={styles.seriesSection} id="aero">
        <AeroSlimCard />
        <div className={styles.seriesBtnRow}>
          <Link href="/projects" className={styles.viewProjectsBtn}>View Projects</Link>
          <Link href="/series/aero" className={styles.viewSeriesBtn}>Explore Series</Link>
        </div>
      </div>

      {/* <div className={styles.seriesSection} id="atelier">
        <AtelierCard />
        <Link href="/projects" className={styles.viewProjectsBtn}>View Projects</Link>
      </div> */}

      {/* <SeriesElevatorCard/>

      <ElevatorProductPage/> */}

      <MarqueeLogos />
    </main>
  );
}
