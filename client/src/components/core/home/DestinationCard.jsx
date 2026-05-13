import styles from './DestinationCard.module.css';

// Replace `image` prop with your actual image path/URL
const DestinationCard = ({
    image = null,
    country = 'Dubai',
    flag = '🇦🇪',
    hotels = 2345,
    packages = 54,
    accentColor = '#7B2FBE', // purple tint for active card; pass any color
}) => {
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
                        {hotels.toLocaleString()} Hotels · {packages} Packages 
                    </p>
                </div>

                <button className={styles.cta}>
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
                </button>
            </div>
        </div>
    );
};

export default DestinationCard;