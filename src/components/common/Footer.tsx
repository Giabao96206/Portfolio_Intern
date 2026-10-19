import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { soundFX } from '../../utils/soundEffects';

export const Footer: React.FC = () => {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    soundFX.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-white/10 bg-[#06070a] text-zinc-400 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <div className="font-heading font-bold text-white text-sm tracking-wider">
                VKU CREATIVE DEVELOPER
              </div>
              <div className="text-[11px] font-mono text-zinc-500">
                {personal.universityShort} · {personal.yearOfStudy} · 2026
              </div>
            </div>
          </div>

          {/* Tech stack badge */}
          <div className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
            <span>BUILT WITH</span>
            <span className="text-cyan-400">REACT 19</span>
            <span>·</span>
            <span className="text-purple-400">THREE.JS</span>
            <span>·</span>
            <span className="text-emerald-400">GSAP</span>
            <span>·</span>
            <span className="text-amber-400">TAILWIND</span>
          </div>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            onMouseEnter={() => soundFX.playHover()}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer group"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-cyan-400" />
          </button>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} {personal.displayName} · All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with passion for interactive 3D digital experiences</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
