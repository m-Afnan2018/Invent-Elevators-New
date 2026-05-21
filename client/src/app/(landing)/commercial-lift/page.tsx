import styles from "./page.module.css";
import MarqueeLogos from "@/components/core/commercial-lift/marquees/MarqueeLogos";
import ScrollingText from "@/components/core/commercial-lift/scrollingtext/ScrollingText";
import Predefine from "@/components/core/commercial-lift/predefine/predefine";
import Slider from "@/components/core/commercial-lift/slider/Lifttypeslider";
import HSection from "@/components/core/commercial-lift/life/Herosection";
import Testimonial from "@/components/core/commercial-lift/testimonial/Testimonialssection";
import FaqContact from "@/components/core/commercial-lift/faqcontact/FaqContact";
import Designed from "@/components/core/commercial-lift/designed/DesignedSpacesHero";
import Carousel from "@/components/core/commercial-lift/carousel/Carousel";
import HeroBanner from "@/components/core/commercial-lift/hero/HeroBanner";
import Navbar from "@/components/core/commercial-lift/navbar/Navbar";
import Footer from "@/components/core/commercial-lift/footer/Footer";
import { LandingType, HERO_TEXTS, SCROLLING_TEXT, PREDEFINE, CAROUSEL, LIFT_DATA, LIFE_HERO_SECTION, DESIGNED_SPACES_HERO, TESTIMONIAL } from "@/utils/constants";
import StatsSection from "@/components/core/commercial-lift/statssection/Statssection";
import AboutSection from "@/components/core/commercial-lift/about/AboutSection";
import SeriesSection from "@/components/core/commercial-lift/series/SeriesSection";
import FeaturesSection from "@/components/core/commercial-lift/features/FeatureSection";
import CtaBanner from "@/components/core/commercial-lift/ctabanner/CtaBanner";
import SolutionsSection from "@/components/core/commercial-lift/solutions/SolutionsSection";
import ProjectsSection from "@/components/core/commercial-lift/projects/ProjectsSection";
import ContactBanner from "@/components/core/commercial-lift/contactbanner/ContactBanner";
import FloatingBtn from "@/components/core/commercial-lift/floatingbtn/FloatingBtn";
import ReviewSection from "@/components/core/commercial-lift/review/ReviewSection";
import MarqueeSection from "@/components/core/commercial-lift/citymarquee/MarqueeSection";
import NotificationBar from "@/components/core/commercial-lift/notificationbar/NotificationBar";
import ProcessSteps from "@/components/core/commercial-lift/processsteps/ProcessSteps";
import ContactForm from "@/components/core/commercial-lift/contactform/ContactForm";
import IndustriesSection from "@/components/core/commercial-lift/industriessection/IndustriesSection";
import SafetySection from "@/components/core/commercial-lift/safetysection/SafetySection";

export default function Home() {
  const current_theme: LandingType = "HOME";

  return (
    <div className={styles.page}>
      {/* <NotificationBar /> */}
      <Navbar />
      <HeroBanner data={HERO_TEXTS[current_theme]} />
      <ContactForm />
      <StatsSection />
      <MarqueeLogos />
            <ProjectsSection />
      {/* <AboutSection /> */}
      {/* <MarqueeSection /> */}
      <IndustriesSection />
      <SeriesSection />
      <FeaturesSection />
      <ProcessSteps />
      {/* <CtaBanner /> */}
      {/* <SolutionsSection /> */}
      <FloatingBtn />
      {/* <ScrollingText data={SCROLLING_TEXT[current_theme]} />
      <Predefine data={PREDEFINE[current_theme]} />
      <Carousel data={CAROUSEL[current_theme]} />
      <Slider data={LIFT_DATA[current_theme]} />
      <HSection data={LIFE_HERO_SECTION[current_theme]} />
      <Designed data={DESIGNED_SPACES_HERO[current_theme]} />
      <Testimonial data={TESTIMONIAL[current_theme]} /> 
      */}
      < SafetySection />
      <ReviewSection />
      <FaqContact />
      <ContactBanner />
      <Footer />
    </div>
  );
}
