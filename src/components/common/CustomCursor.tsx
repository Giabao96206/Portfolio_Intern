import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over an interactive element
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('[data-cursor="pointer"]') ||
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    // Smooth trailing loop
    let animationFrameId: number;
    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.22,
        y: prev.y + (pos.y - prev.y) * 0.22,
      }));
      animationFrameId = requestAnimationFrame(updateTrailing);
    };
    animationFrameId = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pos.x, pos.y, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Central Sharp Dot */}
      <div
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isClicked ? '4px' : '6px',
          height: isClicked ? '4px' : '6px',
          backgroundColor: '#00f0ff',
          boxShadow: '0 0 10px #00f0ff',
        }}
      />

      {/* Smooth Trailing Glow Ring */}
      <div
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,background-color,border-color] duration-200"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHovered ? '48px' : isClicked ? '24px' : '32px',
          height: isHovered ? '48px' : isClicked ? '24px' : '32px',
          border: isHovered ? '1.5px solid rgba(0, 240, 255, 0.8)' : '1px solid rgba(255, 255, 255, 0.25)',
          backgroundColor: isHovered ? 'rgba(0, 240, 255, 0.08)' : 'transparent',
          boxShadow: isHovered ? '0 0 20px rgba(0, 240, 255, 0.3)' : 'none',
        }}
      />
    </>
  );
};
