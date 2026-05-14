import DestinationCard from './DestinationCard';
import styles from './Global.module.css'

export default function Global() {
    return <>
        <h2 className={`headings ${styles.heading}`}>UAE Markets We Serve</h2>
        <div className={styles.allDetails}>
            <DestinationCard country="Dubai" flag="" home={1991} car={42} accentColor="#1a5276" image="https://images.unsplash.com/photo-1546412414-e1885259563a" />
            <DestinationCard country="Abu Dhabi" flag="" home={1345} car={24} accentColor="#1e8449" image="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f" />
            <DestinationCard country="Sharjah" flag="" home={2345} car={54} accentColor="#7B2FBE" image="https://plus.unsplash.com/premium_photo-1697730012360-d49e7ca1a776" />
        </div>
    </>
}