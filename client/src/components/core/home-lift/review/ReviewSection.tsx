"use client";

import { useEffect, useRef } from "react";
import styles from "./ReviewSection.module.css";

const REVIEWS_DEFAULT = [
  {
    name: "Arjun Mehta",
    location: "Dubai Hills, UAE",
    rating: 5,
    review:
      "Invent Elevator transformed our villa completely. The installation was seamless, done within 30 days as promised.",
    initials: "AM",
    image: "/images/reviews/space.png",
  },
  {
    name: "Sarah Al Mansoori",
    location: "Palm Jumeirah, UAE",
    rating: 5,
    review:
      "Exceptional quality and professionalism. Our glass lift is now the centrepiece of our home.",
    initials: "SA",
    image: "/images/reviews/german.png",
  },
  {
    name: "Vikram Nair",
    location: "Jumeirah, UAE",
    rating: 5,
    review:
      "The team was incredibly thoughtful about accessibility needs. The operation is smooth and premium.",
    initials: "VN",
    image: "/images/reviews/installation.png",
  },
  {
    name: "Layla Hassan",
    location: "Abu Dhabi, UAE",
    rating: 5,
    review:
      "Very little structural work was needed. The lift blends beautifully into our duplex villa.",
    initials: "LH",
    image: "/images/reviews/interiors.png",
  },
  {
    name: "Omar Al Farsi",
    location: "Sharjah, UAE",
    rating: 5,
    review:
      "Top-notch German components, impeccable finishing, and outstanding service throughout.",
    initials: "OF",
    image: "/images/reviews/minimal.png",
  },
  {
    name: "Priya Sharma",
    location: "Mirdif, UAE",
    rating: 5,
    review:
      "The Heritage series is stunning and fits perfectly with our villa architecture.",
    initials: "PS",
    image: "/images/reviews/seamless.png",
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