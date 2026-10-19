import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from './components/common/Navbar';
import { CustomCursor } from './components/common/CustomCursor';
import { QuickNavDock } from './components/common/QuickNavDock';
import { Footer } from './components/common/Footer';

import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { TechStackSection } from './components/sections/TechStackSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { JapaneseSection } from './components/sections/JapaneseSection';
import { ContactSection } from './components/sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Scroll progress and active section tracker
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? Math.min(1, Math.max(0, currentScroll / totalScroll)) : 0;
      setScrollProgress(progress);

      // Detect active section
      const sectionIds = ['hero', 'about', 'tech-stack', 'projects', 'achievements', 'japanese', 'contact'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const navigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -40, duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#08090d] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Custom Precision Cursor */}
      <CustomCursor />

      {/* Floating HUD Side Navigation */}
      <QuickNavDock
        activeSection={activeSection}
        onNavigateSection={navigateToSection}
        scrollProgress={scrollProgress}
      />

      {/* Top Glassmorphic Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Flow */}
      <main className="relative z-10">
        <HeroSection onNavigateSection={navigateToSection} />
        <AboutSection />
        <TechStackSection />
        <ProjectsSection />
        <AchievementsSection />
        <JapaneseSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
