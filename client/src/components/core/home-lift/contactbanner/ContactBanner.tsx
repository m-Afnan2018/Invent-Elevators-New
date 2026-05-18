"use client";

import styles from "./ContactBanner.module.css";

interface ContactBannerProps {
    data?: {
        heading?: string;
        subheading?: string;
        imageSrc?: string;
        whatsappNumber?: string;
        formAction?: string;
    };
}

export default function ContactBanner({ data }: ContactBannerProps) {
    const heading        = data?.heading        ?? "Planning a lift installation in the UAE?";
    const subheading     = data?.subheading     ?? "We'll recommend the best lift for your home within 24 hours";
    const imageSrc       = data?.imageSrc       ?? "/images/contact-bg-1.jpg";
    const whatsappNumber = data?.whatsappNumber ?? "971500000000";
    const formAction     = data?.formAction     ?? "https://formsubmit.co/info@inventelevator.com";

    const handleWhatsApp = () => {
        window.open(`https://wa.me/${whatsappNumber}`, "_blank");
    };

    return (
        <section  id="contact-banner" className={styles.wrapper}>

            {/* Background image + overlay */}
            <img src={imageSrc} alt="" className={styles.bgImage} aria-hidden="true" />
            <div className={styles.overlay} />

            {/* Content */}
            <div className={styles.inner}>
                <h2 className={styles.heading}>{heading}</h2>
                <p className={styles.subheading}>{subheading}</p>

                {/* Glass form card */}
                <div className={styles.formCard}>
                    <form
                        className={styles.form}
                        action={formAction}
                        method="POST"
                    >
                        {/* Hidden fields */}
                        <input type="hidden" name="_captcha"      value="false" />
                        <input type="hidden" name="_subject"      value="New Contact Form Submission" />
                        <input type="hidden" name="_template"     value="table" />
                        <input type="text"   name="_honey"        style={{ display: "none" }} />
                        <input type="hidden" name="_autoresponse" value="Thanks! We'll contact you soon." />

                        {/* Full-width name */}
                        <div className={styles.row}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name *"
                                required
                                className={styles.input}
                            />
                        </div>

                        {/* Two-col: mobile + email */}
                        <div className={`${styles.row} ${styles.rowTwo}`}>
                            <input
                                type="tel"
                                name="mobile"
                                placeholder="Your Mobile No. *"
                                required
                                className={styles.input}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address *"
                                required
                                className={styles.input}
                            />
                        </div>

                        {/* Two-col: submit + whatsapp */}
                        <div className={`${styles.row} ${styles.rowTwo}`}>
                            <button type="submit" className={styles.submitBtn}>
                                GET A FREE QUOTE
                            </button>
                            {/* <button
                                type="button"
                                className={styles.whatsappBtn}
                                onClick={handleWhatsApp}
                            >
                                <svg
                                    className={styles.waIcon}
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                CONTACT NOW
                            </button> */}
                        </div>
                    </form>
                </div>
            </div>

        </section>
    );
}