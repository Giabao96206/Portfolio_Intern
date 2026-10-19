import React from 'react';

interface SectionHeaderProps {
  number: string;
  badge: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  badge,
  title,
  description,
  align = 'left',
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'}`}>
      {/* Category Badge & Index */}
      <div className={`flex items-center gap-3 mb-3 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="font-mono text-xs font-semibold text-cyan-400/80 tracking-widest uppercase">
          {number}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
        <span className="text-xs font-mono tracking-widest uppercase text-zinc-400 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
          {badge}
        </span>
      </div>

      {/* Main Title */}
      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase mb-4 leading-tight">
        {title}
      </h2>

      {/* Subtitle / Description */}
      <p className="text-sm sm:text-base md:text-lg text-zinc-400 font-sans leading-relaxed">
        {description}
      </p>

      {/* Subtle Divider Line */}
      <div className={`mt-6 h-[1px] bg-gradient-to-r from-cyan-500/40 via-white/10 to-transparent ${align === 'center' ? 'mx-auto w-48' : 'w-32'}`} />
    </div>
  );
};
