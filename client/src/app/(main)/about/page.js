import HeroSection from '@/components/core/about/HeroSection';
import HeritageSection from '@/components/core/about/HeritageSection';
import SpiritSection from '@/components/core/about/SpiritSection';
import GlobalPresenceSection from '@/components/core/about/GlobalPresenceSection';
import PeopleSection from '@/components/core/about/PeopleSection';
import styles from './page.module.css'
import PhilosophySection from '@/components/core/about/PhilosophySection';
import Materials from '@/components/core/home/Materials';
import ElyseValues from '../../../components/core/about/ElyseValues';

export default function About() {
    return (
        <div className={styles.page}>
            <HeroSection />
            <HeritageSection />
            {/* <PhilosophySection /> */}
            {/* <SpiritSection /> */}
            <ElyseValues />
            <GlobalPresenceSection />
            <Materials />
            <PeopleSection />
        </div>
    );
}
