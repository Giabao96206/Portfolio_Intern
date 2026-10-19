import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { portfolioData } from '../../data/portfolioData';
import type { SkillItem } from '../../data/portfolioData';
import {
  Coffee,
  FileCode2,
  Code2,
  Atom,
  Smartphone,
  Server,
  Layers,
  Box,
  Cpu,
  Sparkles,
  Terminal,
  Check,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { soundFX } from '../../utils/soundEffects';

// Icon mapping helper
const iconMap: Record<string, React.ElementType> = {
  Coffee,
  FileCode2,
  Code2,
  Atom,
  Smartphone,
  Server,
  Layers,
  Box,
  Cpu,
  Sparkles,
};

type CategoryFilter = 'all' | 'languages' | 'frontend_mobile' | 'backend' | 'exploring';

export const TechStackSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const filterTabs: { key: CategoryFilter; label: string; count: number }[] = [
    { key: 'all', label: 'All Stack', count: portfolioData.skills.length },
    {
      key: 'languages',
      label: 'Languages',
      count: portfolioData.skills.filter((s) => s.category === 'languages').length,
    },
    {
      key: 'frontend_mobile',
      label: 'Frontend & Mobile',
      count: portfolioData.skills.filter((s) => s.category === 'frontend_mobile').length,
    },
    {
      key: 'backend',
      label: 'Backend',
      count: portfolioData.skills.filter((s) => s.category === 'backend').length,
    },
    {
      key: 'exploring',
      label: 'Interests & Exploring',
      count: portfolioData.skills.filter((s) => s.category === 'exploring').length,
    },
  ];

  const filteredSkills = portfolioData.skills.filter((skill) => {
    if (activeCategory === 'all') return true;
    return skill.category === activeCategory;
  });

  const handleTabClick = (category: CategoryFilter) => {
    soundFX.playClick();
    setActiveCategory(category);
  };

  const handleSkillCardClick = (skill: SkillItem) => {
    soundFX.playClick();
    setSelectedSkill(skill);
  };

  const handleCopyCode = (code: string) => {
    soundFX.playClick();
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="tech-stack" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="02"
          badge="Ecosystem & Tools"
          title="The Tech Universe"
          description="Hệ sinh thái công nghệ được phân nhóm khoa học từ ngôn ngữ cốt lõi, công nghệ web & di động, kiến trúc backend đến các lĩnh vực đang tích cực tìm tòi khám phá."
        />

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-white/10">
          {filterTabs.map((tab) => {
            const isActive = activeCategory === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleTabClick(tab.key)}
                onMouseEnter={() => soundFX.playHover()}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    isActive ? 'bg-cyan-400/30 text-white' : 'bg-white/5 text-zinc-500'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredSkills.map((skill) => {
            const IconComponent = iconMap[skill.iconName] || Code2;
            const isExploring = skill.category === 'exploring';

            return (
              <div
                key={skill.name}
                onClick={() => handleSkillCardClick(skill)}
                onMouseEnter={() => soundFX.playHover()}
                className={`relative rounded-2xl p-5 bg-white/[0.02] border transition-all duration-300 cursor-pointer group hover:-translate-y-1.5 flex flex-col justify-between ${
                  isExploring
                    ? 'border-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)]'
                    : 'border-white/[0.08] hover:border-cyan-400/50 hover:shadow-[0_10px_30px_rgba(0,240,255,0.12)]'
                }`}
              >
                {/* Top Row: Icon & Category Badge */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${skill.color}15`,
                        border: `1px solid ${skill.color}35`,
                      }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: skill.color }} />
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        isExploring
                          ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                          : 'bg-white/5 text-zinc-400 border-white/10'
                      }`}
                    >
                      {skill.badge}
                    </span>
                  </div>

                  {/* Skill Name */}
                  <h4 className="font-heading text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {skill.name}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {skill.description}
                  </p>
                </div>

                {/* Bottom Row: Detail tags & interactive prompt */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>{isExploring ? 'Exploring Area' : 'Core Technology'}</span>
                  <span className="text-cyan-400 group-hover:underline flex items-center gap-1">
                    Details
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Skill Modal / Detail Drawer */}
        {selectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-xl rounded-2xl glass-panel-glow p-6 sm:p-8 border border-white/20 shadow-2xl">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedSkill(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${selectedSkill.color}20`,
                    border: `1px solid ${selectedSkill.color}50`,
                  }}
                >
                  {React.createElement(iconMap[selectedSkill.iconName] || Code2, {
                    className: 'w-7 h-7',
                    style: { color: selectedSkill.color },
                  })}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-2xl font-bold text-white">
                      {selectedSkill.name}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      {selectedSkill.badge}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 uppercase">
                    Category: {selectedSkill.category.replace('_', ' & ')}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-300 leading-relaxed mb-5">
                {selectedSkill.description}
              </p>

              {/* Key Competencies / Topics */}
              {selectedSkill.details && (
                <div className="mb-5">
                  <h4 className="text-xs font-mono uppercase text-zinc-400 mb-2.5">
                    // KEY COMPETENCIES & CONCEPTS
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedSkill.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-zinc-300 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Code Sample */}
              {selectedSkill.codeSample && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      SYNTAX & IMPLEMENTATION PATTERN
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(selectedSkill.codeSample!)}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Snippet</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-[#090b10] border border-white/10 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
                    <code>{selectedSkill.codeSample}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
