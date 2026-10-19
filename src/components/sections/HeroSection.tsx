import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Sparkles, Terminal, Code2, Globe2 } from 'lucide-react';
import { InteractiveHouse3D } from '../3d/InteractiveHouse3D';
import { portfolioData } from '../../data/portfolioData';
import { soundFX } from '../../utils/soundEffects';

interface HeroSectionProps {
  onNavigateSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateSection }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const modelWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(badgesRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
      })
        .from(
          headlineRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 1,
          },
          '-=0.5'
        )
        .from(
          subtitleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.9,
          },
          '-=0.6'
        )
        .from(
          ctaRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.6'
        )
        .from(
          modelWrapperRef.current,
          {
            scale: 0.94,
            opacity: 0,
            duration: 1.2,
            ease: 'power2.out',
          },
          '-=0.8'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const { personal } = portfolioData;

  const scrollTo = (id: string) => {
    soundFX.playClick();
    onNavigateSection(id);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex flex-col justify-center overflow-hidden"
    >
      {/* Background Cyber Glow & Radial Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[400px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Cyber Grid Texture Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Badges & Academic Identity */}
        <div ref={badgesRef} className="flex flex-wrap items-center gap-3 mb-6">
          <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>{personal.tagline}</span>
          </div>

          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs font-mono flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-zinc-400" />
            <span>{personal.universityShort} · {personal.location}</span>
          </div>

          <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
            <span>{personal.japaneseLevel} (Learning)</span>
          </div>
        </div>

        {/* Main Editorial Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col">
            <h1
              ref={headlineRef}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-[1.08] mb-6"
            >
              BUILDING <br />
              <span className="text-gradient-cyan">IDEAS INTO</span> <br />
              REALITY.
            </h1>

            {/* Subheadline & Bio Summary */}
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg text-zinc-300 font-sans leading-relaxed mb-8 max-w-xl"
            >
              {personal.heroSubheadline}
            </p>

            {/* CTA Action Buttons */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-3.5 mb-8">
              <button
                type="button"
                onClick={() => scrollTo('about')}
                onMouseEnter={() => soundFX.playHover()}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all flex items-center gap-2 group"
              >
                <Sparkles className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
                <span>Explore My World</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo('projects')}
                onMouseEnter={() => soundFX.playHover()}
                className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>View Projects</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo('contact')}
                onMouseEnter={() => soundFX.playHover()}
                className="px-5 py-3.5 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:border-cyan-400/40 text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Quick Metrics Ticker */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 font-mono">
              <div>
                <span className="block text-xl font-bold text-white font-heading">3rd Year</span>
                <span className="text-[11px] text-zinc-400">VKU IT Student</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-cyan-400 font-heading">3 Systems</span>
                <span className="text-[11px] text-zinc-400">Flagship Projects</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-purple-400 font-heading">N4 Level</span>
                <span className="text-[11px] text-zinc-400">Japanese Learner</span>
              </div>
            </div>
          </div>

          {/* 3D Interactive House Canvas (Right Side / Center Showcase) */}
          <div ref={modelWrapperRef} className="lg:col-span-7 w-full">
            <InteractiveHouse3D onNavigateSection={onNavigateSection} />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex items-center justify-center">
          <button
            type="button"
            onClick={() => scrollTo('about')}
            onMouseEnter={() => soundFX.playHover()}
            className="flex flex-col items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors group cursor-pointer"
            aria-label="Scroll to discover more"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest">
              SCROLL TO EXPLORE
            </span>
            <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center p-1 group-hover:border-cyan-400/50">
              <div className="w-1.5 h-2 bg-cyan-400 rounded-full animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
