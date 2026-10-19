import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { portfolioData } from '../../data/portfolioData';
import { GraduationCap, MapPin, Sparkles, BookOpen, Cpu, Languages, CheckCircle2 } from 'lucide-react';
import { soundFX } from '../../utils/soundEffects';

export const AboutSection: React.FC = () => {
  const { personal } = portfolioData;
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const milestones = [
    {
      period: "Nền tảng IT & Thuật toán",
      title: "Core Computer Science Foundations",
      desc: "Rèn luyện tư duy thuật toán, cấu trúc dữ liệu và lập trình hướng đối tượng với Java tại giảng đường VKU.",
      icon: GraduationCap,
      color: "#f59e0b"
    },
    {
      period: "Hệ sinh thái Web & Mobile",
      title: "Fullstack & Cross-Platform Engineering",
      desc: "Xây dựng các giải pháp ứng dụng đa nền tảng với TypeScript, React.js, Expo và kiến trúc module NestJS.",
      icon: Cpu,
      color: "#00f0ff"
    },
    {
      period: "Khám phá Phần cứng & IoT",
      title: "Hardware-Software Bridge",
      desc: "Mở rộng sang phần cứng nhúng với Raspberry Pi, chế tạo Robot để bàn tương tác giọng nói và xe Robocar.",
      icon: Sparkles,
      color: "#a855f7"
    },
    {
      period: "Mở rộng Ngôn ngữ Quốc tế",
      title: "Japanese Learning (JLPT N4)",
      desc: "Rèn luyện tính kỷ luật và trau dồi tiếng Nhật trình độ N4 để tiếp cận kiến thức và môi trường đa văn hóa.",
      icon: Languages,
      color: "#ec4899"
    }
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="// 01"
          badge="Story & Identity"
          title="About The Developer"
          description="Khám phá hành trình học tập, tư duy kỹ thuật và niềm đam mê xây dựng các sản phẩm số của một sinh viên Công nghệ thông tin VKU."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive 3D Perspective Profile Card */}
          <div className="lg:col-span-5">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative rounded-2xl p-6 glass-panel border border-white/10 shadow-2xl group"
            >
              {/* Card Cyber Accent Frame */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

              {/* Portrait Photo Placeholder with Scanline Effect */}
              <div className="relative aspect-[4/4.5] rounded-xl overflow-hidden bg-gradient-to-tr from-slate-900 to-slate-800 border border-white/10 mb-6">
                <img
                  src={personal.avatarPlaceholder}
                  alt={personal.name}
                  className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                {/* Cyber Scanline Overlay */}
                <div className="absolute inset-0 scanline pointer-events-none opacity-40" />

                {/* Status Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#22c55e]" />
                    <span className="text-xs font-mono text-zinc-300">VKU 3RD YEAR STUDENT</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                    ACTIVE DEV
                  </span>
                </div>
              </div>

              {/* Quick Bio Info Tags */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-zinc-500">UNIVERSITY</span>
                  <span className="text-zinc-200 text-right font-sans font-medium text-xs max-w-[240px]">
                    {personal.universityShort} (VKU)
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-zinc-500">ACADEMIC YEAR</span>
                  <span className="text-cyan-400 font-semibold">{personal.yearOfStudy}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-zinc-500">JAPANESE LEVEL</span>
                  <span className="text-purple-400 font-semibold">{personal.japaneseLevel} (Studying)</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-zinc-500">LOCATION</span>
                  <span className="text-zinc-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{personal.location}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Storytelling & Journey Milestones */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Main Narrative Paragraphs */}
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 mb-8">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span>Khao khát kiến tạo qua từng dòng mã</span>
              </h3>
              <p className="text-base text-zinc-300 leading-relaxed mb-4">
                {personal.bioSummary}
              </p>
              <div className="space-y-3 text-sm text-zinc-400 leading-relaxed">
                {personal.aboutParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Focus Pillars */}
              <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-300">Tư duy lập trình có cấu trúc & kiến trúc module</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-300">Trải nghiệm người dùng mượt mà và tương tác có chiều sâu</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-300">Cầu nối thực tiễn giữa phần mềm và thiết bị nhúng IoT</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-300">Tinh thần tự học bền bỉ & rèn luyện ngoại ngữ JLPT N4</span>
                </div>
              </div>
            </div>

            {/* Journey Milestones Timeline */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                <span>// LEARNING & TECH EVOLUTION TIMELINE</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {milestones.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => soundFX.playHover()}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-cyan-400/40 hover:bg-white/[0.05] transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase">
                          {item.period}
                        </span>
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                          style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}35` }}
                        >
                          <Icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                        </div>
                      </div>
                      <h5 className="font-heading font-semibold text-sm text-white mb-1">
                        {item.title}
                      </h5>
                      <p className="text-xs text-zinc-400 leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
