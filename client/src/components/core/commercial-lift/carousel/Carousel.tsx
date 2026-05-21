"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import styles from "./Carousel.module.css";

// import { CAROUSEL, CURRENT_THEME } from "@/utils/constants";

const Carousel = ({ data }: { data: any }) => {
    const REELS = data.REELS;
    return (
        <section className={styles.section}>
            <h2 className={styles.heading}>
                Designed <span className={styles.accent}>Spaces</span> for Refined
                <br />
                Stays
            </h2>

            <div className={styles.swiperSection}>

                <button className={`${styles.navBtn} ${styles.navPrev}`} id="prevButton">
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
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                </button>

                <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    initialSlide={2}
                    coverflowEffect={{
                        rotate: 15,
                        stretch: -25,
                        depth: 120,
                        modifier: 1.2,
                        slideShadows: true,
                    }}
                    loop={true}
                    navigation={{
                        prevEl: "#prevButton",
                        nextEl: "#nextButton",
                    }}

                    modules={[EffectCoverflow, Navigation]}
                    className={styles.swiper}
                >
                    {REELS.map((reel: any) => (
                        <SwiperSlide key={reel.id} className={styles.slide}>
                            <div className={styles.slideInner}>
                                <video
                                    src={reel.videoUrl}
                                    poster={reel.poster}
                                    loop
                                    muted
                                    playsInline
                                    className={styles.video}
                                // onMouseOver={(e) => e.currentTarget.play()}
                                // onMouseOut={(e) => {
                                //     e.currentTarget.pause();
                                //     e.currentTarget.currentTime = 0;
                                // }}
                                />
                                <div className={styles.slideOverlay}></div>
                                <div className={styles.igIcon}>
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
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                    </svg>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button className={`${styles.navBtn} ${styles.navNext}`} id="nextButton">
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
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default Carousel;