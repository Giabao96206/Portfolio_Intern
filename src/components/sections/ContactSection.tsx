import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { portfolioData } from '../../data/portfolioData';
import {
  Mail,
  Copy,
  Check,
  Send,
  Clock,
  Sparkles,
  ArrowUpRight,
  Globe2,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';
import { soundFX } from '../../utils/soundEffects';

export const ContactSection: React.FC = () => {
  const { personal } = portfolioData;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Vietnam timezone UTC+7
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat('vi-VN', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    soundFX.playClick();
    navigator.clipboard.writeText(personal.emailPlaceholder);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playClick();
    if (!formState.name || !formState.email || !formState.message) return;

    // Simulate submission
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-cyan-500/10 via-purple-600/5 to-transparent rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="06"
          badge="Get in Touch"
          title="GOT AN IDEA? LET’S BUILD IT."
          description="I'm always interested in exploring ideas, building products and learning something new. Sẵn sàng kết nối để cùng thảo luận về công nghệ, đồ án và các cơ hội phát triển."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Connect & Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Email Card with 1-Click Copy */}
            <div className="p-6 rounded-3xl glass-panel-glow border border-cyan-400/30">
              <span className="text-xs font-mono uppercase text-cyan-400 block mb-2">
                DIRECT INBOX
              </span>
              <div className="flex items-center justify-between gap-3 mb-4">
                <a
                  href={`mailto:${personal.emailPlaceholder}`}
                  className="font-mono text-sm sm:text-base text-white hover:text-cyan-300 transition-colors truncate"
                >
                  {personal.emailPlaceholder}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  onMouseEnter={() => soundFX.playHover()}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 transition-colors cursor-pointer shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-zinc-400">
                Email placeholder sẵn sàng thay thế bằng địa chỉ email thực tế của bạn.
              </p>
            </div>

            {/* Social Placeholder Links */}
            <div className="p-6 rounded-3xl glass-panel border border-white/10">
              <span className="text-xs font-mono uppercase text-zinc-400 block mb-4">
                SOCIALS & CODE REPOSITORIES
              </span>
              <div className="space-y-3">
                <a
                  href={personal.githubPlaceholder}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => soundFX.playHover()}
                  className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 flex items-center justify-between text-xs font-mono text-zinc-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <GithubIcon className="w-4 h-4 text-cyan-400" />
                    <span>GitHub Profile</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={personal.linkedinPlaceholder}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => soundFX.playHover()}
                  className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 flex items-center justify-between text-xs font-mono text-zinc-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <LinkedinIcon className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn Profile</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={`mailto:${personal.emailPlaceholder}`}
                  onMouseEnter={() => soundFX.playHover()}
                  className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 flex items-center justify-between text-xs font-mono text-zinc-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-purple-400" />
                    <span>Email Direct</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Timezone & Location Card */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-cyan-400" />
                <span>VIETNAM (UTC+7)</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>{currentTime || '12:00:00'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Message Transmission Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/10 relative">
              <h3 className="font-heading text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Gửi lời nhắn hoặc ý tưởng hợp tác</span>
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                Để lại thông tin và nội dung bạn muốn trao đổi, tôi sẽ phản hồi trong thời gian sớm nhất!
              </p>

              {isSent ? (
                <div className="py-12 text-center space-y-3 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading text-lg font-bold text-white">
                    Tin nhắn đã được gửi thành công!
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi sớm nhất có thể.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                        Your Name / Tên bạn
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                      Message / Nội dung trao đổi
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hãy chia sẻ về dự án, ý tưởng công nghệ hoặc lời chào kết nối..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    onMouseEnter={() => soundFX.playHover()}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-black font-semibold text-xs font-mono uppercase tracking-wider hover:opacity-95 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-black" />
                    <span>TRANSMIT MESSAGE // GỬI TIN NHẮN</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
