import Link from 'next/link';
import styles from './DestinationCard.module.css';

const COUNTRY_ANCHORS = {
  dubai:       'dubai',
  'abu dhabi': 'abu-dhabi',
  sharjah:     'sharjah',
};

const DestinationCard = ({
    image = null,
    country = 'Dubai',
    flag = '🇦🇪',
    home = 2345,
    car = 54,
    accentColor = '#7B2FBE',
}) => {
    const anchor = COUNTRY_ANCHORS[country.toLowerCase()] || country.toLowerCase().replace(/\s+/g, '-');
    const href = `/area-we-serve#${anchor}`;

    return (
        <div
            className={styles.card}
            style={{ '--accent': accentColor }}
        >
            {/* Background image layer */}
            <div className={styles.imageLayer}>
                {image ? (
                    <img src={image} alt={country} className={styles.image} />
                ) : (
                    <div className={styles.imagePlaceholder} />
                )}
            </div>

            {/* Gradient overlay */}
            <div className={styles.overlay} />

            {/* Content */}
            <div className={styles.content}>
                <div className={styles.meta}>
                    <h2 className={styles.country}>
                        {country} <span className={styles.flag}>{flag}</span>
                    </h2>
                    <p className={styles.stats}>
                        {home.toLocaleString()} Home Lift · {car} Car Lift
                    </p>
                </div>

                <Link href={href} className={styles.cta}>
                    <span>Explore Now</span>
                    <svg
                        className={styles.arrow}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default DestinationCard;
