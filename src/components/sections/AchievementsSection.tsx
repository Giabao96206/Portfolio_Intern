import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { portfolioData } from '../../data/portfolioData';
import { Trophy, ImagePlus, CheckCircle2 } from 'lucide-react';
import { soundFX } from '../../utils/soundEffects';

export const AchievementsSection: React.FC = () => {
  const { achievements } = portfolioData;

  return (
    <section id="achievements" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="04"
          badge="Activities & Challenges"
          title="Competitions & Journey"
          description="Quá trình tham gia các sân chơi công nghệ nhằm cọ xát thực tế, thử thách bản thân dưới áp lực thời gian và rèn luyện kỹ năng giải quyết vấn đề."
        />

        {/* Timeline Exhibition Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {achievements.map((item) => {
            return (
              <div
                key={item.id}
                onMouseEnter={() => soundFX.playHover()}
                className="relative rounded-3xl p-8 glass-panel border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Year Marker Badge (Large Typography) */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span
                      className="font-heading text-4xl sm:text-5xl font-extrabold"
                      style={{ color: item.badgeColor }}
                    >
                      {item.year}
                    </span>
                    <div className="h-8 w-[1px] bg-white/20" />
                    <div>
                      <span className="block text-xs font-mono text-zinc-400 uppercase">
                        {item.category}
                      </span>
                      <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-cyan-300">
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${item.badgeColor}15`,
                      border: `1px solid ${item.badgeColor}40`,
                    }}
                  >
                    <Trophy className="w-6 h-6" style={{ color: item.badgeColor }} />
                  </div>
                </div>

                {/* Competition Title */}
                <h3 className="font-heading text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2.5 mb-8">
                  {item.highlights.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: item.badgeColor }}
                      />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Placeholder Box for Event Photos / Memories */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-dashed border-white/15 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400">
                      <ImagePlus className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-zinc-300">
                        Photo & Certificate Slot
                      </div>
                      <div className="text-[11px] text-zinc-500">{item.note}</div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/5 text-zinc-400 border border-white/10">
                    Placeholder
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
