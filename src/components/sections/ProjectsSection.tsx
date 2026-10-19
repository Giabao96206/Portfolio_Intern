import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { portfolioData } from '../../data/portfolioData';
import type { ProjectItem } from '../../data/portfolioData';
import {
  Film,
  UtensilsCrossed,
  Bot,
  ArrowRight,
  Terminal,
  Send,
  Smartphone,
  Store,
  Bike,
  Activity,
  Cpu,
} from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import { soundFX } from '../../utils/soundEffects';

export const ProjectsSection: React.FC = () => {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeEcosystemTab, setActiveEcosystemTab] = useState<number>(0);

  // Terminal simulator state for Raspberry Pi Robot
  const [robotTerminalInput, setRobotTerminalInput] = useState('');
  const [robotChatHistory, setRobotChatHistory] = useState<{ sender: 'user' | 'robot'; text: string }[]>([
    { sender: 'robot', text: 'Kon' + 'nichiwa! Tôi là Raspberry Pi Conversational Robot. Bạn có thể hỏi tôi bất kỳ điều gì!' },
  ]);

  const handleSendRobotMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!robotTerminalInput.trim()) return;

    soundFX.playClick();
    const userMsg = robotTerminalInput.trim();
    const newHistory = [...robotChatHistory, { sender: 'user' as const, text: userMsg }];
    setRobotTerminalInput('');
    setRobotChatHistory(newHistory);

    // Simulated robot intelligent response
    setTimeout(() => {
      let reply = 'Tín hiệu đã nhận qua GPIO & Audio Engine! Tôi đang tiếp tục học tập và giao tiếp với bạn.';
      const lower = userMsg.toLowerCase();
      if (lower.includes('chào') || lower.includes('hello') || lower.includes('hi')) {
        reply = 'Xin chào! Rất vui được gặp bạn tại portfolio của sinh viên VKU.';
      } else if (lower.includes('pi') || lower.includes('hardware') || lower.includes('phần cứng')) {
        reply = 'Tôi vận hành trên vi xử lý Raspberry Pi 4, tích hợp USB mic và loa ngoài qua cổng audio 3.5mm.';
      } else if (lower.includes('vku') || lower.includes('học')) {
        reply = 'Tôi được phát triển bởi sinh viên năm 3 chuyên ngành IT tại trường VKU Đà Nẵng!';
      } else if (lower.includes('joke') || lower.includes('hài') || lower.includes('vui')) {
        reply = 'Tại sao lập trình viên thích bóng tối? Vì bugs bị thu hút bởi ánh sáng! 😄';
      }

      setRobotChatHistory((prev) => [...prev, { sender: 'robot', text: reply }]);
      soundFX.playHover();
    }, 400);
  };

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[600px] h-[500px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="// 03"
          badge="Product Showcase"
          title="Flagship Systems"
          description="Các dự án được nghiên cứu và hiện thực hóa với tư duy sản phẩm hoàn chỉnh: từ nền tảng web media, hệ sinh thái giao đồ ăn đa nền tảng đến robot thông minh tương tác giọng nói."
        />

        {/* ============================================================== */}
        {/* PROJECT 01: MOVIE DISCOVERY PLATFORM */}
        {/* ============================================================== */}
        <div className="mb-20 rounded-3xl glass-panel border border-white/10 overflow-hidden group hover:border-cyan-400/40 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Content */}
            <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                    <Film className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    {projects[0].category}
                  </span>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
                  {projects[0].title}
                </h3>
                <h4 className="text-sm font-sans text-zinc-400 mb-4">
                  {projects[0].subtitle}
                </h4>

                <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                  {projects[0].description}
                </p>

                {/* Feature Highlights */}
                <div className="space-y-2 mb-6">
                  {projects[0].features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {projects[0].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedProject(projects[0]);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-semibold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Project Deep Dive</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={projects[0].githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 flex items-center gap-2 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>

            {/* Right Visual: Film Browser Mockup UI */}
            <div className="lg:col-span-6 bg-[#0a0d14] p-6 sm:p-8 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-white/10 relative overflow-hidden">
              <div className="w-full max-w-lg rounded-2xl bg-[#0e121b] border border-white/10 overflow-hidden shadow-2xl">
                {/* Browser Top Bar */}
                <div className="px-4 py-3 bg-[#131722] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-black/40 text-[10px] font-mono text-zinc-400 border border-white/5">
                    https://movie-discovery.platform/explore
                  </div>
                  <div className="w-4" />
                </div>

                {/* Simulated Movie UI */}
                <div className="p-4 space-y-4">
                  {/* Hero Banner Mockup */}
                  <div className="relative h-36 rounded-xl overflow-hidden bg-gradient-to-r from-blue-900/60 via-purple-900/40 to-black p-4 flex flex-col justify-end">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-500 text-black font-bold w-max mb-1">
                      FEATURED PREMIERE
                    </span>
                    <h5 className="font-heading font-bold text-white text-base">
                      Interstellar: Beyond Horizons
                    </h5>
                    <p className="text-[11px] text-zinc-300 line-clamp-1">
                      A cinematic journey through time, dimensions and human connection.
                    </p>
                  </div>

                  {/* Movie Cards Row Mockup */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { title: 'Cyber Pulse', rating: '9.4', genre: 'Sci-Fi' },
                      { title: 'VKU Chronicle', rating: '9.1', genre: 'Documentary' },
                      { title: 'Neon Shadows', rating: '8.8', genre: 'Thriller' },
                    ].map((movie, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg p-2.5 bg-white/[0.03] border border-white/5 flex flex-col justify-between"
                      >
                        <div className="h-16 rounded bg-slate-800/80 mb-2 flex items-center justify-center">
                          <Film className="w-5 h-5 text-cyan-400/60" />
                        </div>
                        <div>
                          <div className="text-[11px] font-semibold text-white truncate">
                            {movie.title}
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-1">
                            <span>{movie.genre}</span>
                            <span className="text-amber-400 font-bold">★ {movie.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PROJECT 02: FOOD DELIVERY & RESTAURANT SYSTEM */}
        {/* ============================================================== */}
        <div className="mb-20 rounded-3xl glass-panel border border-white/10 overflow-hidden group hover:border-amber-400/40 transition-all duration-300">
          <div className="p-8 sm:p-10 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                  {projects[1].category}
                </span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
                {projects[1].title}
              </h3>
              <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
                {projects[1].description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setSelectedProject(projects[1]);
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-black font-semibold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Full System Architecture</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={projects[1].githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 flex items-center gap-2 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Interactive Ecosystem Visual Tabs */}
          <div className="p-8 sm:p-10 bg-[#090b10]">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  // 3 INTERCONNECTED APPS:
                </span>
              </div>

              {/* Sub-app Switcher Tabs */}
              <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                {[
                  { label: 'Customer App', icon: Smartphone },
                  { label: 'Restaurant System', icon: Store },
                  { label: 'Driver App', icon: Bike },
                ].map((tab, idx) => {
                  const Icon = tab.icon;
                  const isActive = activeEcosystemTab === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        setActiveEcosystemTab(idx);
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
                        isActive
                          ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ecosystem Active Sub-app Details */}
            {projects[1].ecosystemComponents && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5">
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-[11px] font-mono text-amber-400 uppercase">
                      {projects[1].ecosystemComponents[activeEcosystemTab].role}
                    </span>
                    <h4 className="font-heading text-xl font-bold text-white mt-1 mb-3">
                      {projects[1].ecosystemComponents[activeEcosystemTab].name}
                    </h4>
                    <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                      {projects[1].ecosystemComponents[activeEcosystemTab].description}
                    </p>

                    <div className="space-y-2 mb-4">
                      {projects[1].ecosystemComponents[activeEcosystemTab].features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                      {projects[1].ecosystemComponents[activeEcosystemTab].tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Animated WebSocket Data Flow Diagram */}
                <div className="lg:col-span-7">
                  <div className="p-6 rounded-2xl bg-black/60 border border-white/10 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                        <span className="text-xs font-mono text-zinc-300 uppercase">
                          REAL-TIME ORDER DISPATCH ENGINE
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        WEBSOCKET ACTIVE
                      </span>
                    </div>

                    {/* Node Visual Diagram */}
                    <div className="grid grid-cols-3 gap-4 text-center my-4">
                      <div className="p-4 rounded-xl bg-white/[0.04] border border-cyan-500/30">
                        <Smartphone className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                        <div className="text-xs font-bold text-white">Customer App</div>
                        <div className="text-[10px] text-zinc-400">Order Placed</div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.04] border border-amber-500/30 relative">
                        <Store className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                        <div className="text-xs font-bold text-white">Restaurant Hub</div>
                        <div className="text-[10px] text-zinc-400">Food Prep & Dispatch</div>
                        <div className="hidden sm:block absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-purple-500 text-black font-mono font-bold text-[9px]">
                          NestJS Server
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.04] border border-emerald-500/30">
                        <Bike className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                        <div className="text-xs font-bold text-white">Driver App</div>
                        <div className="text-[10px] text-zinc-400">GPS Routing & Delivery</div>
                      </div>
                    </div>

                    <div className="text-center font-mono text-[11px] text-zinc-400 pt-3 border-t border-white/5">
                      ⇄ State Sync: [Customer Cart] → [NestJS WebSocket Gateway] → [Kitchen Screen] → [Driver Route]
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* PROJECT 03: RASPBERRY PI CONVERSATIONAL ROBOT */}
        {/* ============================================================== */}
        <div className="rounded-3xl glass-panel border border-white/10 overflow-hidden group hover:border-purple-400/40 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Content */}
            <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                    {projects[2].category}
                  </span>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
                  {projects[2].title}
                </h3>
                <h4 className="text-sm font-sans text-zinc-400 mb-4">
                  {projects[2].subtitle}
                </h4>

                <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                  {projects[2].description}
                </p>

                {/* Hardware Highlights */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {projects[2].hardwareSpecs?.map((hw, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[11px] font-mono font-bold text-purple-400">
                        {hw.component}
                      </div>
                      <div className="text-[10px] text-zinc-400">{hw.purpose}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {projects[2].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedProject(projects[2]);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-purple-500 text-white font-semibold text-xs uppercase tracking-wider hover:bg-purple-400 transition-colors flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                >
                  <span>Hardware & Logic Specs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={projects[2].githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 flex items-center gap-2 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Right Interactive Simulator: Live Robot Terminal */}
            <div className="lg:col-span-6 bg-[#080a10] p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2 font-mono text-xs text-purple-300">
                    <Terminal className="w-4 h-4 text-purple-400" />
                    <span>RASPBERRY_PI_TERMINAL://DIALOGUE_CONSOLE</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">
                    ONLINE (TEST CONSOLE)
                  </span>
                </div>

                {/* Simulated Chat Dialogue Window */}
                <div className="h-64 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                  {robotChatHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${item.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <span className="text-[10px] font-mono text-zinc-500 mb-1">
                        {item.sender === 'user' ? 'USER_INPUT' : 'ROBOT_PI_NODE'}
                      </span>
                      <div
                        className={`max-w-[85%] px-3.5 py-2 rounded-xl text-xs font-mono leading-relaxed ${
                          item.sender === 'user'
                            ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40'
                            : 'bg-purple-900/30 text-purple-200 border border-purple-500/30'
                        }`}
                      >
                        {item.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Input Box */}
              <form onSubmit={handleSendRobotMessage} className="mt-4 pt-3 border-t border-white/10 flex gap-2">
                <input
                  type="text"
                  value={robotTerminalInput}
                  onChange={(e) => setRobotTerminalInput(e.target.value)}
                  placeholder="Gõ thử câu hỏi (VD: 'chào bạn', 'kể chuyện cười', 'phần cứng là gì?')..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white text-xs font-mono transition-colors flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Project Deep-Dive Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl glass-panel-glow p-6 sm:p-8 border border-white/20 shadow-2xl">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>

              <span className="text-xs font-mono text-cyan-400 uppercase">
                {selectedProject.category}
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1 mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              {/* Architecture Overview */}
              <div className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <h4 className="text-xs font-mono uppercase text-cyan-400 mb-2 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  KIẾN TRÚC & GIẢI PHÁP KỸ THUẬT
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {selectedProject.architectureOverview}
                </p>
              </div>

              {/* Full Features Breakdown */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase text-zinc-400 mb-3">
                  // CHI TIẾT TÍNH NĂNG ĐÃ THỰC HIỆN
                </h4>
                <div className="space-y-2">
                  {selectedProject.features.map((feat, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-zinc-300 flex items-start gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used */}
              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase text-zinc-400 mb-2">
                  // TECHNOLOGIES & TOOLS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs font-mono flex items-center gap-2"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
