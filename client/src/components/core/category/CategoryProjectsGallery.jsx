"use client";
import { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/services/projects.service";
import styles from "./CategoryProjectsGallery.module.css";

const SPEED = 0.6;

const FALLBACK = [
  { title: "Palm Jumeirah Villa",       image: "/projects/palm-jumeirah.png", _id: "f1" },
  { title: "ADNOC Headquarters",        image: "/projects/adnoc.png",         _id: "f2" },
  { title: "City Centre Sharjah",       image: "/projects/city-centre.png",   _id: "f3" },
  { title: "Downtown Dubai Residences", image: "/projects/downtown.png",      _id: "f4" },
  { title: "Yas Island Resort",         image: "/projects/yas-island.png",    _id: "f5" },
];

export default function CategoryProjectsGallery({ categoryName = "" }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects()
      .then(data => {
        const list = Array.isArray(data) ? data : [];
        const filtered = list.filter(p =>
          p?.title &&
          (p.featuredImage || p.galleryImages?.[0] || p.image) &&
          (!categoryName || p.category?.toLowerCase() === categoryName.toLowerCase())
        );
        setProjects(filtered.length >= 2 ? filtered : []);
      })
      .catch(() => {});
  }, [categoryName]);

  const gallery = useMemo(() => (projects.length >= 2 ? projects : FALLBACK), [projects]);
  const doubled = useMemo(() => [...gallery, ...gallery], [gallery]);

  const trackRef        = useRef(null);
  const scrollXRef      = useRef(0);
  const rafRef          = useRef(null);
  const pausedRef       = useRef(false);
  const draggingRef     = useRef(false);
  const dragStartX      = useRef(0);
  const dragStartScroll = useRef(0);
  const [grabbing, setGrabbing] = useState(false);

  const applyX = (x) => {
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${x}px)`;
  };

  const halfWidth = () => (trackRef.current ? trackRef.current.scrollWidth / 2 : 0);

  const wrapX = (x) => {
    const half = halfWidth();
    if (!half) return x;
    return ((x % half) + half) % half;
  };

  useEffect(() => {
    const step = () => {
      if (!pausedRef.current && !draggingRef.current) {
        scrollXRef.current += SPEED;
        const half = halfWidth();
        if (half > 0 && scrollXRef.current >= half) scrollXRef.current -= half;
        applyX(scrollXRef.current);
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onEnter     = () => { pausedRef.current = true; };
  const onLeave     = () => { pausedRef.current = false; if (draggingRef.current) { draggingRef.current = false; setGrabbing(false); } };
  const onMouseDown = (e) => { draggingRef.current = true; dragStartX.current = e.clientX; dragStartScroll.current = scrollXRef.current; setGrabbing(true); e.preventDefault(); };
  const onMouseMove = (e) => { if (!draggingRef.current) return; scrollXRef.current = wrapX(dragStartScroll.current + (dragStartX.current - e.clientX)); applyX(scrollXRef.current); };
  const onMouseUp   = () => { draggingRef.current = false; setGrabbing(false); };
  const onTouchStart = (e) => { draggingRef.current = true; dragStartX.current = e.touches[0].clientX; dragStartScroll.current = scrollXRef.current; };
  const onTouchMove  = (e) => { if (!draggingRef.current) return; scrollXRef.current = wrapX(dragStartScroll.current + (dragStartX.current - e.touches[0].clientX)); applyX(scrollXRef.current); };
  const onTouchEnd   = () => { draggingRef.current = false; };

  return (
    <section className={styles.section}>
      <div
        className={styles.viewport}
        style={{ cursor: grabbing ? "grabbing" : "grab" }}
        onMouseEnter={onEnter} onMouseLeave={onLeave}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
      >
        <div className={styles.track} ref={trackRef}>
          {doubled.map((p, i) => {
            const imgSrc = p.featuredImage || p.galleryImages?.[0] || p.image;
            const isFallback = p._id?.toString().startsWith("f");
            const href = isFallback ? "/projects" : `/projects/${p.slug || p._id}`;
            return (
              <Link
                key={i}
                href={href}
                className={styles.card}
                onClick={(e) => { if (draggingRef.current) e.preventDefault(); }}
                draggable="false"
              >
                <div className={styles.imageWrap}>
                  <Image
                    src={imgSrc}
                    alt={p.title || "Project"}
                    fill
                    sizes="(max-width:768px) 80vw, 40vw"
                    className={styles.image}
                    draggable="false"
                  />
                  <div className={styles.hoverOverlay}>
                    <div className={styles.cardInfo}>
                      <span className={styles.cardTitle}>{p.title}</span>
                      {p.location && <span className={styles.cardLocation}>{p.location}</span>}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
