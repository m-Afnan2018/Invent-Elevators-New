import styles from "./page.module.css";
import MarqueeLogos from "@/components/core/home-lift/marquees/MarqueeLogos";
import ScrollingText from "@/components/core/home-lift/scrollingtext/ScrollingText";
import Predefine from "@/components/core/home-lift/predefine/predefine";
import Slider from "@/components/core/home-lift/slider/Lifttypeslider";
import HSection from "@/components/core/home-lift/life/Herosection";
import Testimonial from "@/components/core/home-lift/testimonial/Testimonialssection";
import FaqContact from "@/components/core/home-lift/faqcontact/FaqContact";
import Designed from "@/components/core/home-lift/designed/DesignedSpacesHero";
import Carousel from "@/components/core/home-lift/carousel/Carousel";
import HeroBanner from "@/components/core/home-lift/hero/HeroBanner";
import Navbar from "@/components/core/home-lift/navbar/Navbar";
import Footer from "@/components/core/home-lift/footer/Footer";
import { LandingType, HERO_TEXTS, SCROLLING_TEXT, PREDEFINE, CAROUSEL, LIFT_DATA, LIFE_HERO_SECTION, DESIGNED_SPACES_HERO, TESTIMONIAL } from "@/utils/constants";
import StatsSection from "@/components/core/home-lift/statssection/Statssection";
import AboutSection from "@/components/core/home-lift/about/AboutSection";
import SeriesSection from "@/components/core/home-lift/series/SeriesSection";
import FeaturesSection from "@/components/core/home-lift/features/FeatureSection";
import CtaBanner from "@/components/core/home-lift/ctabanner/CtaBanner";
import SolutionsSection from "@/components/core/home-lift/solutions/SolutionsSection";
import ProjectsSection from "@/components/core/home-lift/projects/ProjectsSection";
import ContactBanner from "@/components/core/home-lift/contactbanner/ContactBanner";
import FloatingBtn from "@/components/core/home-lift/floatingbtn/FloatingBtn";
import ReviewSection from "@/components/core/home-lift/review/ReviewSection";
import MarqueeSection from "@/components/core/home-lift/citymarquee/MarqueeSection";
import NotificationBar from "@/components/core/home-lift/notificationbar/NotificationBar";
import ProcessSteps from "@/components/core/home-lift/processsteps/ProcessSteps";
import ContactForm from "@/components/core/home-lift/contactform/ContactForm";

export default function Home() {
  const current_theme: LandingType = "HOME";

  return (
    <div className={styles.page}>
      {/* <NotificationBar /> */}
      <Navbar />
      <HeroBanner data={HERO_TEXTS[current_theme]} />
      <ContactForm />
      <StatsSection />
      <ProjectsSection />
      {/* <AboutSection /> */}
      {/* <MarqueeSection /> */}
      <MarqueeLogos />
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
      <ReviewSection />
      <FaqContact />
      <ContactBanner />
      <Footer />
    </div>
  );
}
