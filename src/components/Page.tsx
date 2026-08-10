import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollProgress from "./ui/ScrollProgress";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import HeroSection from "./sections/HeroSection";
import WorkSection from "./sections/WorkSection";
import CareerSection from "./sections/CareerSection";
import ContactSection from "./sections/ContactSection";

gsap.registerPlugin(ScrollTrigger);

type SectionId = "work" | "career" | "contact";
const SECTION_IDS: SectionId[] = ["work", "career", "contact"];

export default function Page() {
  const [active, setActive] = useState<SectionId | "">("");
  const { hash } = useLocation();

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

    const revealTweens = gsap.utils
      .toArray<HTMLElement>(".reveal")
      .map((el) =>
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
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
      document
        .getElementById(hash.slice(1))
        ?.scrollIntoView({ behavior: "smooth" });
    });
  }, [hash]);

  return (
    <>
      <ScrollProgress />
      <Header active={active} />
      <HeroSection />
      <WorkSection />
      <CareerSection />
      <ContactSection />
      <Footer />
    </>
  );
}
