import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Terminal } from 'lucide-react';
import { soundFX } from '../../utils/soundEffects';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(soundFX.isMuted);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Stack', href: '#tech-stack' },
    { label: 'Projects', href: '#projects' },
    { label: 'Activities', href: '#achievements' },
    { label: 'Japanese N4', href: '#japanese' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    soundFX.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    const muted = soundFX.toggleMute();
    setIsAudioMuted(muted);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#08090d]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/50'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          onMouseEnter={() => soundFX.playHover()}
          className="group flex items-center gap-3 text-white no-underline"
        >
          <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all duration-300">
            <Terminal className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-sm tracking-widest uppercase flex items-center gap-2">
              VKU DEV
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f0ff]" />
            </span>
            <span className="text-[10px] text-zinc-400 font-mono tracking-wider">
              CLASS OF 2026 · IT
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] backdrop-blur-md px-3 py-1.5 rounded-full border border-white/[0.08]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                onMouseEnter={() => soundFX.playHover()}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-400/10 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-cyan-400 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Controls & CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Audio FX Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            onMouseEnter={() => soundFX.playHover()}
            title={isAudioMuted ? 'Bật âm thanh hiệu ứng (Web Audio)' : 'Tắt âm thanh'}
            aria-label={isAudioMuted ? 'Enable sound effects' : 'Disable sound effects'}
            className={`p-2 rounded-lg border transition-all duration-200 flex items-center gap-1.5 text-xs font-mono ${
              !isAudioMuted
                ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {!isAudioMuted ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            <span className="text-[10px] uppercase font-semibold">{!isAudioMuted ? 'AUDIO ON' : 'MUTED'}</span>
          </button>

          {/* Contact CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            onMouseEnter={() => soundFX.playHover()}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold text-xs tracking-wider uppercase hover:opacity-95 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all flex items-center gap-1.5 group"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Menu & Sound Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleSound}
            aria-label="Toggle sound"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300"
          >
            {!isAudioMuted ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-zinc-400" />}
          </button>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0c12]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="py-2.5 px-3 rounded-lg text-sm font-medium text-zinc-300 hover:text-cyan-300 hover:bg-white/5 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500" />
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold text-center text-xs tracking-wider uppercase"
              >
                Let's Build Something
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
