"use client";
import styles from "./OurProducts.module.css";
import Link from "next/link";

const products = [
  {
    id: 1,
    tag: "Freight & Cargo Elevators",
    title: "Hydraulic Cargo Lift",
    desc: "Heavy-duty vertical lifting solution designed for warehouses, factories, and industrial facilities. Built for high load capacity, smooth operation, and long-term durability.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=700&q=80",
    href: "/products/hydraulic-cargo-lift",
  },
  {
    id: 2,
    tag: "Passengers Elevators",
    title: "Hydraulic Cargo Lift",
    desc: "Heavy-duty vertical lifting solution designed for warehouses, factories, and industrial facilities. Built for high load capacity, smooth operation, and long-term durability.",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=700&q=80",
    href: "/products/passenger-elevators",
  },
  {
    id: 3,
    tag: "Passengers Elevators",
    title: "Hydraulic Cargo Lift",
    desc: "Heavy-duty vertical lifting solution designed for warehouses, factories, and industrial facilities. Built for high load capacity, smooth operation, and long-term durability.",
    image:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=700&q=80",
    href: "/products/home-lifts",
  },
  {
    id: 4,
    tag: "Passengers Elevators",
    title: "Hydraulic Cargo Lift",
    desc: "Heavy-duty vertical lifting solution designed for warehouses, factories, and industrial facilities. Built for high load capacity, smooth operation, and long-term durability.",
    image:
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=700&q=80",
    href: "/products/scissor-lifts",
  },
];

export default function OurProducts() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── Section Header ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>Our Products</span>
            <h2 className={styles.heading}>
              Precision-Built <em>Lift Solutions</em>
            </h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.headerDesc}>
              From residential home lifts to heavy-duty industrial cargo
              elevators, every Invent Elevator product is engineered to the
              highest standards of safety, performance, and reliability.
            </p>
            <Link href="/products" className={styles.viewAllBtn}>
              View all products
              <span className={styles.btnArrow}>→</span>
            </Link>
          </div>
        </div>

        {/* ── Products Grid ── */}
        <div className={styles.grid}>
          {products.map((product, i) => (
            <div
              key={product.id}
              className={styles.card}
              style={{ "--delay": `${i * 0.09}s` }}
            >
              {/* Image */}
              <div className={styles.cardImageWrapper}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.cardImage}
                />
                {/* Tag pill */}
                <span className={styles.cardTag}>{product.tag}</span>
              </div>

              {/* Body */}
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{product.title}</h3>
                <p className={styles.cardDesc}>{product.desc}</p>

                <Link href={product.href} className={styles.cardCta}>
                  <span>View Product</span>
                  <span className={styles.ctaIconWrap}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 7H13M13 7L7 1M13 7L7 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </div>

              {/* Bottom accent bar */}
              <div className={styles.cardBar} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
