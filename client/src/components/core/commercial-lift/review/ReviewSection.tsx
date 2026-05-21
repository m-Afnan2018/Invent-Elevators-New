"use client";

import { useEffect, useRef } from "react";
import styles from "./ReviewSection.module.css";

const REVIEWS_DEFAULT = [
  {
    name: "Ahmed Al Mansoori",
    location: "Business Bay, UAE",
    rating: 5,
    review:
      "Invent Elevator delivered a premium commercial lift solution for our office tower with exceptional finishing and smooth performance.",
    initials: "AM",
    image: "/commercial/images/reviews/space.jpeg",
  },
  {
    name: "Omar Al Falasi",
    location: "Downtown Dubai, UAE",
    rating: 5,
    review:
      "Professional execution from start to finish. The passenger lifts perfectly complement our commercial building interiors.",
    initials: "OF",
    image: "/commercial/images/reviews/passngr2.png",
  },
  {
    name: "Khalid Al Marri",
    location: "Dubai Marina, UAE",
    rating: 5,
    review:
      "The installation process was fast, organized, and caused minimal disruption to our operations.",
    initials: "KM",
    image: "/commercial/images/reviews/installation.jpeg",
  },
  {
    name: "Fatima Al Hashmi",
    location: "Abu Dhabi, UAE",
    rating: 5,
    review:
      "Excellent lift quality and reliable performance. Our visitors immediately notice the modern design and smooth ride.",
    initials: "FH",
    image: "/commercial/images/reviews/panoramic2.png",
  },
  {
    name: "Saeed Al Mazrouei",
    location: "Sharjah, UAE",
    rating: 5,
    review:
      "Highly impressed with the German components and overall build quality. The team handled everything professionally.",
    initials: "SM",
    image: "/commercial/images/reviews/minimal.jpeg",
  },
  {
    name: "Mariam Al Nuaimi",
    location: "Dubai Silicon Oasis, UAE",
    rating: 5,
    review:
      "A reliable partner for commercial lift projects. The final installation exceeded our expectations in both quality and aesthetics.",
    initials: "MN",
    image: "/commercial/images/reviews/seamless.jpeg",
  },
];

export default function ReviewsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const indexRef = useRef<number>(0);

  const isResetting = useRef<boolean>(false);

  const isDown = useRef(false);

  const startX = useRef(0);

  const scrollLeft = useRef(0);

  const duplicatedReviews = [
    ...REVIEWS_DEFAULT,
    ...REVIEWS_DEFAULT,
    ...REVIEWS_DEFAULT,
  ];

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const getCardWidth = () => {
      const firstCard = track.children[0] as HTMLElement;

      return firstCard
        ? firstCard.offsetWidth + 20
        : 0;
    };

    indexRef.current = REVIEWS_DEFAULT.length;

    track.scrollLeft =
      indexRef.current * getCardWidth();

    const interval = setInterval(() => {
      if (isResetting.current) return;

      indexRef.current += 1;

      const cardWidth = getCardWidth();

      track.scrollTo({
        left: indexRef.current * cardWidth,
        behavior: "smooth",
      });

      if (
        indexRef.current >=
        REVIEWS_DEFAULT.length * 2
      ) {
        isResetting.current = true;

        setTimeout(() => {
          track.style.scrollBehavior = "auto";

          indexRef.current =
            REVIEWS_DEFAULT.length;

          track.scrollLeft =
            indexRef.current * cardWidth;

          requestAnimationFrame(() => {
            track.style.scrollBehavior = "";

            isResetting.current = false;
          });
        }, 500);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const track = trackRef.current;

    if (!track) return;

    isDown.current = true;

    startX.current =
      e.pageX - track.offsetLeft;

    scrollLeft.current = track.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const track = trackRef.current;

    if (!isDown.current || !track) return;

    e.preventDefault();

    const x = e.pageX - track.offsetLeft;

    const walk =
      (x - startX.current) * 1.2;

    track.scrollLeft =
      scrollLeft.current - walk;
  };

  return (
    <section
      id="testimonials"
      className={styles.wrapper}
    >
      {/* Heading */}
      <div className={styles.headingBlock}>
        <h2 className={styles.heading}>
          What Our Clients Say
        </h2>

        <p className={styles.subheading}>
          Trusted by homeowners across the UAE
        </p>
      </div>

      {/* Reviews Track */}
      <div
        className={styles.track}
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {duplicatedReviews.map(
          (review, index) => (
            <div
              key={index}
              className={styles.card}
            >
              {/* LEFT IMAGE */}
              <div
                className={styles.imageSide}
              >
                <img
                  src={review.image}
                  alt={review.name}
                  className={
                    styles.reviewImage
                  }
                />
              </div>

              {/* RIGHT CONTENT */}
              <div
                className={
                  styles.contentSide
                }
              >
                {/* Stars */}
                <div className={styles.stars}>
                  {Array.from({
                    length: review.rating,
                  }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        styles.star
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Review */}
                <p
                  className={
                    styles.reviewText
                  }
                >
                  "{review.review}"
                </p>

                {/* Author */}
                <div
                  className={styles.author}
                >
                  <div
                    className={
                      styles.avatar
                    }
                  >
                    {review.initials}
                  </div>

                  <div
                    className={
                      styles.authorInfo
                    }
                  >
                    <span
                      className={
                        styles.authorName
                      }
                    >
                      {review.name}
                    </span>

                    <span
                      className={
                        styles.authorLocation
                      }
                    >
                      {review.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}