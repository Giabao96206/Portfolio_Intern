import React from 'react';
import { soundFX } from '../../utils/soundEffects';

interface QuickNavDockProps {
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
  scrollProgress: number;
}

export const QuickNavDock: React.FC<QuickNavDockProps> = ({
  activeSection,
  onNavigateSection,
  scrollProgress,
}) => {
  const sections = [
    { id: 'hero', label: '00 // HERO' },
    { id: 'about', label: '01 // ABOUT' },
    { id: 'tech-stack', label: '02 // STACK' },
    { id: 'projects', label: '03 // PROJECTS' },
    { id: 'achievements', label: '04 // ACTIVITIES' },
    { id: 'japanese', label: '05 // JAPANESE' },
    { id: 'contact', label: '06 // CONTACT' },
  ];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3 select-none">
      {/* Scroll Progress Bar Track */}
      <div className="relative w-1 h-32 rounded-full bg-white/10 overflow-hidden mb-2 mr-1">
        <div
          className="w-full bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full transition-all duration-150"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Section Quick Jump Dots with Slide-out Labels */}
      {sections.map((sec) => {
        const isActive = activeSection === sec.id;

        return (
          <button
            key={sec.id}
            type="button"
            onClick={() => {
              soundFX.playClick();
              onNavigateSection(sec.id);
            }}
            onMouseEnter={() => soundFX.playHover()}
            className="group flex items-center gap-3 cursor-pointer py-1"
          >
            {/* Slide-out Label */}
            <span
              className={`font-mono text-[10px] tracking-wider uppercase transition-all duration-200 ${
                isActive
                  ? 'text-cyan-300 opacity-100 translate-x-0'
                  : 'text-zinc-500 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {sec.label}
            </span>

            {/* Indicator Dot */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-2.5 h-6 bg-cyan-400 shadow-[0_0_12px_#00f0ff]'
                  : 'w-1.5 h-1.5 bg-white/20 group-hover:bg-white/60 group-hover:scale-150'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};
