"use client";

import styles from "./ContactForm.module.css";

interface ContactFormProps {
  data?: {
    formAction?: string;
    whatsappNumber?: string;
  };
}

export default function ContactForm({
  data,
}: ContactFormProps) {
  const formAction =
    data?.formAction ??
    "https://formsubmit.co/info@inventelevator.com";

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>

        {/* LEFT CONTENT */}
        <div className={styles.imageSide}>

          <span className={styles.leftSubtitle}>
            INVENT ELEVATOR
          </span>

          <h2 className={styles.leftTitle}>
  Smart Commercial Lift Solutions for Modern Buildings
</h2>

<ul className={styles.featureList}>

  <li className={styles.featureItem}>
  Premium commercial lifts for offices & malls
  </li>

  <li className={styles.featureItem}>
    High-performance systems built for heavy daily use
  </li>

  <li className={styles.featureItem}>
    Modern designs tailored for commercial spaces
  </li>

</ul>


         

        </div>

        {/* RIGHT FORM */}
        <div
          className={styles.formSide}
          style={{
            background: "#1d1d1d"
          }}
        >
          <form
            className={styles.form}
            action={formAction}
            method="POST"
          >
            <input
              type="hidden"
              name="_captcha"
              value="false"
            />

            <input
              type="hidden"
              name="_subject"
              value="New Hero Form Submission"
            />

            <input
              type="hidden"
              name="_template"
              value="table"
            />

            <input
              type="text"
              name="_honey"
              style={{ display: "none" }}
            />

            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              required
              className={styles.input}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              required
              className={styles.input}
            />

<select
  name="service"
  required
  className={styles.select}
>
  <option value="">
    Select Service
  </option>

  <option value="Corporate Offices">
    Corporate Offices
  </option>

  <option value="Hotels & Resorts">
    Hotels & Resorts
  </option>

  <option value="Shopping Malls">
    Shopping Malls
  </option>

  <option value="Hospitals">
    Hospitals
  </option>

  <option value="Warehouses">
    Warehouses
  </option>

  <option value="Residential Towers">
    Residential Towers
  </option>
</select>

            <button
              type="submit"
              className={styles.submitBtn}
            >
              Submit
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}