import styles from "./page.module.css";
import MarqueeLogos from "@/components/core/contractor-lift/marquees/MarqueeLogos";
import ScrollingText from "@/components/core/contractor-lift/scrollingtext/ScrollingText";
import Predefine from "@/components/core/contractor-lift/predefine/predefine";
import Slider from "@/components/core/contractor-lift/slider/Lifttypeslider";
import HSection from "@/components/core/contractor-lift/life/Herosection";
import Testimonial from "@/components/core/contractor-lift/testimonial/Testimonialssection";
import FaqContact from "@/components/core/contractor-lift/faqcontact/FaqContact";
import Designed from "@/components/core/contractor-lift/designed/DesignedSpacesHero";
import Carousel from "@/components/core/contractor-lift/carousel/Carousel";
import HeroBanner from "@/components/core/contractor-lift/hero/HeroBanner";
import Navbar from "@/components/core/contractor-lift/navbar/Navbar";
import Footer from "@/components/core/contractor-lift/footer/Footer";
import { LandingType, HERO_TEXTS, SCROLLING_TEXT, PREDEFINE, CAROUSEL, LIFT_DATA, LIFE_HERO_SECTION, DESIGNED_SPACES_HERO, TESTIMONIAL } from "@/utils/constants";
import StatsSection from "@/components/core/contractor-lift/statssection/Statssection";
import AboutSection from "@/components/core/contractor-lift/about/AboutSection";
import SeriesSection from "@/components/core/contractor-lift/series/SeriesSection";
import FeaturesSection from "@/components/core/contractor-lift/features/FeatureSection";
import CtaBanner from "@/components/core/contractor-lift/ctabanner/CtaBanner";
import SolutionsSection from "@/components/core/contractor-lift/solutions/SolutionsSection";
import ProjectsSection from "@/components/core/contractor-lift/projects/ProjectsSection";
import ContactBanner from "@/components/core/contractor-lift/contactbanner/ContactBanner";
import FloatingBtn from "@/components/core/contractor-lift/floatingbtn/FloatingBtn";
import ReviewSection from "@/components/core/contractor-lift/review/ReviewSection";
import MarqueeSection from "@/components/core/contractor-lift/citymarquee/MarqueeSection";
import NotificationBar from "@/components/core/contractor-lift/notificationbar/NotificationBar";
import ProcessSteps from "@/components/core/contractor-lift/processsteps/ProcessSteps";
import ContactForm from "@/components/core/contractor-lift/contactform/ContactForm";
import IndustriesSection from "@/components/core/contractor-lift/industriessection/IndustriesSection";
import SafetySection from "@/components/core/contractor-lift/safetysection/SafetySection";
import CoverageSection from "@/components/core/contractor-lift/coveragesection/CoverageSection";

export default function Home() {
  const current_theme: LandingType = "HOME";

  return (
    <div className={styles.page}>
      {/* <NotificationBar /> */}
      <Navbar />
      <HeroBanner data={HERO_TEXTS[current_theme]} />
      <ContactForm />
      <MarqueeLogos />
      <StatsSection />
      <ProjectsSection />
      {/* <AboutSection /> */}
      {/* <MarqueeSection /> */}
      <IndustriesSection />
      {/* <SeriesSection /> */}
      {/* <FeaturesSection /> */}
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
      < CoverageSection />
      <ReviewSection />
      <FaqContact />
      <ContactBanner />
      <Footer />
    </div>
  );
}
