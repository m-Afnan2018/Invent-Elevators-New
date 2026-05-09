import HeroBanner from "@/components/core/landing/hero/HeroBanner"
import MarqueeLogos from "@/components/core/landing/marquees/MarqueeLogos"
import ScrollingText from "@/components/core/landing/scrollingtext/ScrollingText"
import Predefine from "@/components/core/landing/predefine/predefine"
import LiftTypeSlider from "@/components/core/landing/slider/Lifttypeslider"
import HeroSection from "@/components/core/landing/life/Herosection"
import DesignedSpacesHero from "@/components/core/landing/designed/DesignedSpacesHero"
import TestimonialsSection from "@/components/core/landing/testimonial/Testimonialssection"
import FaqContact from "@/components/core/landing/faqcontact/FaqContact"


export default function HomeLift (){
    return <>
        <HeroBanner/>
        <MarqueeLogos/>
        <ScrollingText/>
        <Predefine/>
        <LiftTypeSlider/>
        <HeroSection/>
        <DesignedSpacesHero/>
        <TestimonialsSection/>
        <FaqContact/>
    </>
}