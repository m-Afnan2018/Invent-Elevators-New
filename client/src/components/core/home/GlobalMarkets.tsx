import Image from 'next/image'
import styles from './GlobalMarkets.module.css'
import mapImage from '@/assets/images/home/dubai-map.svg'

export function GlobalMarkets() {
    const regions = [
        { name: 'Abu Dhabi', color: 'green' },
        { name: 'Dubai', color: 'black' },
        { name: 'Sharjah', color: 'green' },
    ]

    return (
        <section className={styles.GlobalMarkets}>

            {/* Markets Section */}
            <div className={styles.marketsSection}>
                <div className={styles.contentWrapper}>
                    <div className={styles.textContent}>
                        <h2>UAE Markets<br />We Serve</h2>
                        <p className={styles.description}>
                           We provide premium home lifts, villa elevators, and commercial elevator solutions across key regions of the UAE, delivering modern vertical mobility systems with a focus on luxury, safety, and architectural excellence.
                        </p>

                        <div className={styles.regionsList}>
                            {regions.map((region, index) => (
                                <span
                                    key={index}
                                    className={`${styles.region} ${region.color === 'green' ? styles.green : styles.black}`}
                                >
                                    {region.name}
                                </span>
                            ))}
                        </div>

                        <p className={styles.footerText}>
                            Our regional presence allows us to understand local architectural requirements, installation standards, and customer expectations while delivering consistent quality, innovative design, and reliable elevator solutions across every project.
                        </p>
                    </div>

                    <div className={styles.mapContainer}>
                        <Image
                            src={mapImage}
                            width={500}
                            height={500}
                            alt="Global Markets Map"
                            className={styles.mapImage}
                        />
                        <div className={styles.marker} data-location="abu-dhabi">
                            <span className={styles.pin}></span>
                            <span className={styles.label}>Abu Dhabi</span>
                        </div>
                        <div className={styles.marker} data-location="dubai">
                            <span className={styles.pin}></span>
                            <span className={styles.label}>Dubai</span>
                        </div>
                        <div className={styles.marker} data-location="sharjah">
                            <span className={styles.pin}></span>
                            <span className={styles.label}>Sharjah</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}