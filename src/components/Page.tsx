import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import CustomCursor from "./ui/CustomCursor";
import Marquee from "./ui/Marquee";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import WorkSection from "./sections/WorkSection";
import CareerSection from "./sections/CareerSection";
import ContactSection from "./sections/ContactSection";
import { createLenis, destroyLenis, scrollToEl } from "../lib/lenis";
import { SECTION_IDS, type SectionId } from "../types/section";

const MARQUEE_ITEMS = [
  "Pixel-perfect polish",
  "Design-dev bridge",
  "Full screen ownership",
  "Detailed interactions",
  "Solid front-end",
  "Complete product experience",
];

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const [active, setActive] = useState<SectionId | "">("");
  const { hash } = useLocation();

  useEffect(() => {
    const lenis = createLenis();
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      destroyLenis();
    };
  }, []);

  useEffect(() => {
    const triggers = SECTION_IDS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActive(id),
        onEnterBack: () => setActive(id),
      });
    });

    const revealTweens = gsap.utils.toArray<HTMLElement>(".reveal").map((el) =>
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          fastScrollEnd: true,
        },
      })
    );

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t?.kill());
      revealTweens.forEach((t) => t.scrollTrigger?.kill());
    };
  }, []);

  useEffect(() => {
    if (!hash) return;
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      scrollToEl(hash);
    });
  }, [hash]);

  return (
    <>
      <CustomCursor />
      <Header active={active} />
      <main>
        <HeroSection />
        <Marquee items={MARQUEE_ITEMS} />
        <AboutSection />
        <CareerSection />
        <WorkSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
