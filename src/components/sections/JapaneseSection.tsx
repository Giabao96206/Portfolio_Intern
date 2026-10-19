import React, { useState } from "react";
import { SectionHeader } from "../common/SectionHeader";
import { portfolioData } from "../../data/portfolioData";
import { Languages, Sparkles, BookOpen, RotateCw } from "lucide-react";
import { soundFX } from "../../utils/soundEffects";

export const JapaneseSection: React.FC = () => {
  const { japaneseLearning } = portfolioData;
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (kanji: string) => {
    soundFX.playClick();
    setFlippedCards((prev) => ({
      ...prev,
      [kanji]: !prev[kanji],
    }));
  };

  return (
    <section id="japanese" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Japanese Watermark Glyph */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[180px] sm:text-[240px] font-black text-white/[0.015] select-none pointer-events-none font-sans">
        日本語
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="05"
          badge="Linguistic Journey"
          title="Japanese · JLPT N4"
          description="Hành trình học tiếng Nhật kiên trì mở rộng góc nhìn văn hóa, kỷ luật bản thân và chuẩn bị hành trang hội nhập công nghệ quốc tế."
        />

        {/* Current Level Status Hero Card */}
        <div className="mb-12 rounded-3xl p-6 sm:p-8 glass-panel-glow border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0">
              <span className="font-heading font-black text-2xl text-purple-300">
                N4
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-purple-400 font-semibold tracking-wider uppercase">
                  {japaneseLearning.target} · STATUS
                </span>
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#c084fc]" />
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                {japaneseLearning.statusText}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                {japaneseLearning.statusSubtext} —{" "}
                {japaneseLearning.description}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 font-mono text-xs text-purple-300 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>DAILY PROGRESSION IN ACTION</span>
          </div>
        </div>

        {/* Interactive Japanese Vocabulary & Mindset Cards */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>CLICK CARDS TO FLIP: MINDSET & KEY VOCABULARY</span>
            </h4>
            <span className="text-[11px] font-mono text-zinc-500">
              Tap to reveal meaning & sentence
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {japaneseLearning.vocabularyCards.map((card) => {
              const isFlipped = !!flippedCards[card.kanji];

              return (
                <div
                  key={card.kanji}
                  onClick={() => toggleFlip(card.kanji)}
                  onMouseEnter={() => soundFX.playHover()}
                  className="h-64 cursor-pointer perspective-1000 group"
                >
                  <div
                    className={`relative w-full h-full rounded-2xl transition-transform duration-500 transform-style-preserve-3d border ${
                      isFlipped
                        ? "rotate-y-180 border-cyan-400/50 bg-[#0f1422]"
                        : "border-white/10 bg-white/[0.02] hover:border-purple-400/50"
                    }`}
                    style={{
                      transform: isFlipped
                        ? "rotateY(180deg)"
                        : "rotateY(0deg)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Front Side */}
                    <div
                      className="absolute inset-0 p-6 flex flex-col justify-between backface-hidden"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/5 text-purple-300 border border-white/10">
                          {card.category}
                        </span>
                        <RotateCw className="w-3.5 h-3.5 text-zinc-500 group-hover:rotate-180 transition-transform duration-500" />
                      </div>

                      <div className="text-center my-auto">
                        <div className="font-heading text-5xl font-extrabold text-white mb-2 tracking-wide">
                          {card.kanji}
                        </div>
                        <div className="text-sm font-sans text-purple-300 font-medium">
                          {card.kana}
                        </div>
                        <div className="text-xs font-mono text-zinc-500 mt-1">
                          {card.romaji}
                        </div>
                      </div>

                      <div className="text-center text-[10px] font-mono text-zinc-500 pt-3 border-t border-white/5">
                        Click to flip
                      </div>
                    </div>

                    {/* Back Side */}
                    <div
                      className="absolute inset-0 p-6 flex flex-col justify-between backface-hidden rotate-y-180"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-bold text-cyan-400">
                            {card.kanji}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400">
                            {card.romaji}
                          </span>
                        </div>

                        <div className="mb-3">
                          <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                            Meaning (VI / EN):
                          </span>
                          <div className="text-xs font-semibold text-white mt-0.5">
                            {card.meaningVi}
                          </div>
                          <div className="text-[11px] text-zinc-400">
                            {card.meaningEn}
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                            Example:
                          </span>
                          <p className="text-[11px] text-cyan-200 mt-0.5 font-sans leading-tight">
                            {card.exampleSentence}
                          </p>
                          <p className="text-[10px] text-zinc-400 italic mt-0.5">
                            {card.exampleTranslation}
                          </p>
                        </div>
                      </div>

                      <div className="text-center text-[10px] font-mono text-cyan-400 pt-2 border-t border-white/10">
                        Click to flip back
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestone Progression Tracker */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 mb-14">
          <h4 className="font-heading text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Languages className="w-5 h-5 text-purple-400" />
            <span>Kế hoạch & Lộ trình học tập tiếng Nhật</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {japaneseLearning.milestones.map((ms, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-heading font-bold text-base text-white">
                    {ms.level}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      idx === 1
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                        : "bg-white/5 text-zinc-400 border border-white/10"
                    }`}
                  >
                    {ms.status}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {ms.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* KYOTO, JAPAN — INTERACTIVE 3D CULTURAL EXPLORATION */}
        {/* ============================================================== */}
        <div className="rounded-3xl glass-panel-glow border border-purple-500/30 overflow-hidden shadow-2xl relative">
          {/* Header Banner */}
          <div className="p-6 sm:p-8 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-purple-950/40 via-transparent to-cyan-950/20">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#c084fc]" />
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                  3D SPATIAL EXPLORATION · PAGODA ARCHITECTURE
                </span>
              </div>

              <h4 className="font-heading text-xl sm:text-2xl font-bold text-white">
                Khám phá Cấu trúc Chùa Tháp 3D
              </h4>

              <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl">
                Trải nghiệm mô hình không gian 3D tái hiện cấu trúc kiến trúc
                chùa tháp — khám phá hình khối, đường nét và vẻ đẹp kiến trúc
                thông qua công nghệ dựng hình 3D tương tác.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono">
                INTERACTIVE 3D SCENE
              </span>
            </div>
          </div>

          {/* Sketchfab 3D Embed Iframe */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[420px] sm:min-h-[500px] lg:min-h-[560px] bg-[#050608]">
            <iframe
              title="Pagoda Structure Scene"
              src="https://sketchfab.com/models/abe6b579971742b6a35465e21951d616/embed"
              className="absolute inset-0 w-full h-full border-0"
              allow="autoplay; fullscreen; xr-spatial-tracking; web-share"
              allowFullScreen
            />
          </div>

          {/* Model Attribution Bar */}
          <div className="px-6 py-3.5 bg-[#090b10] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-zinc-500">MODEL:</span>

              <a
                href="https://sketchfab.com/3d-models/pagoda-structure-scene-abe6b579971742b6a35465e21951d616"
                target="_blank"
                rel="nofollow noreferrer"
                className="text-cyan-400 hover:underline font-medium"
              >
                Pagoda Structure Scene
              </a>

              <span className="text-zinc-600">by</span>

              <a
                href="https://sketchfab.com/Nicholas01"
                target="_blank"
                rel="nofollow noreferrer"
                className="text-purple-300 hover:underline"
              >
                Nicholas-3D
              </a>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-zinc-500">
              <span>DRAG TO ROTATE · SCROLL TO ZOOM</span>
              <span>·</span>

              <a
                href="https://sketchfab.com"
                target="_blank"
                rel="nofollow noreferrer"
                className="text-zinc-400 hover:text-white"
              >
                View on Sketchfab
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
