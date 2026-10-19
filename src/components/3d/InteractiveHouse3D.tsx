import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import * as THREE from 'three';
import { RotateCcw, Play, Pause, Compass, Monitor, Server, Rocket, Eye } from 'lucide-react';
import { FuturisticHouseModel } from './FuturisticHouseModel';
import { soundFX } from '../../utils/soundEffects';

type ViewpointKey = 'overview' | 'desk' | 'server' | 'rooftop';

interface ViewpointConfig {
  key: ViewpointKey;
  label: string;
  icon: React.ElementType;
  position: [number, number, number];
  target: [number, number, number];
}

const VIEWPOINTS: ViewpointConfig[] = [
  {
    key: 'overview',
    label: 'Overview',
    icon: Compass,
    position: [7.5, 5.5, 8.5],
    target: [0, 1.2, 0],
  },
  {
    key: 'desk',
    label: 'Workspace',
    icon: Monitor,
    position: [2.6, 2.2, 4.0],
    target: [-0.4, 1.2, -0.2],
  },
  {
    key: 'server',
    label: 'Compute Rack',
    icon: Server,
    position: [-4.2, 2.4, 3.8],
    target: [-1.4, 1.2, -0.6],
  },
  {
    key: 'rooftop',
    label: 'Rooftop Lab',
    icon: Rocket,
    position: [0.8, 7.2, 5.2],
    target: [0.3, 3.0, 0],
  },
];

// Inner camera transition controller component
const CameraRig: React.FC<{
  currentView: ViewpointKey;
  controlsRef: React.RefObject<OrbitControlsType | null>;
  isAutoRotate: boolean;
}> = ({ currentView, controlsRef, isAutoRotate }) => {
  const targetConfig = VIEWPOINTS.find((v) => v.key === currentView) || VIEWPOINTS[0];
  const targetPos = React.useMemo(() => new THREE.Vector3(...targetConfig.position), [targetConfig]);
  const targetLookAt = React.useMemo(() => new THREE.Vector3(...targetConfig.target), [targetConfig]);

  useFrame(({ camera }) => {
    if (!controlsRef.current) return;

    if (!isAutoRotate) {
      // Smoothly interpolate camera position toward the selected viewpoint
      camera.position.lerp(targetPos, 0.05);
      controlsRef.current.target.lerp(targetLookAt, 0.05);
      controlsRef.current.update();
    }
  });

  return null;
};

interface InteractiveHouse3DProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const InteractiveHouse3D: React.FC<InteractiveHouse3DProps> = ({ onNavigateSection }) => {
  const [currentView, setCurrentView] = useState<ViewpointKey>('overview');
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [hasWebGL] = useState<boolean>(true);
  const controlsRef = useRef<OrbitControlsType>(null);

  const handleSelectView = (view: ViewpointKey) => {
    soundFX.playCameraSwitch();
    setCurrentView(view);
    setIsAutoRotate(false);
  };

  const handleResetCamera = () => {
    soundFX.playCameraSwitch();
    setCurrentView('overview');
    setIsAutoRotate(true);
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const toggleAutoRotate = () => {
    soundFX.playClick();
    setIsAutoRotate((prev) => !prev);
  };

  const handleHotspotClick = (sectionId: string) => {
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!hasWebGL) {
    return (
      <div className="w-full h-full min-h-[460px] rounded-2xl bg-[#0d1017] border border-white/10 flex items-center justify-center p-8 text-center">
        <div>
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 mx-auto flex items-center justify-center mb-4">
            <Compass className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="font-heading text-lg font-bold text-white mb-2">3D Architectural Sanctuary</h3>
          <p className="text-sm text-zinc-400 max-w-sm mx-auto">
            WebGL is not supported or hardware acceleration is disabled. Enjoy the interactive portfolio content below!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#0b0e14] via-[#08090d] to-[#06070a] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.7)] group">
      {/* 3D Canvas Scene */}
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <PerspectiveCamera makeDefault position={[7.5, 5.5, 8.5]} fov={42} />

        {/* Ambient & Directional Architectural Lights */}
        <ambientLight intensity={0.65} color="#cbd5e1" />
        <directionalLight
          position={[10, 15, 10]}
          intensity={1.8}
          color="#f8fafc"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={25}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
        />
        {/* Soft Cyan Fill Light */}
        <pointLight position={[-6, 4, 6]} intensity={1.5} color="#00f0ff" distance={15} />
        {/* Soft Violet Back Light */}
        <pointLight position={[6, 3, -6]} intensity={1.2} color="#a855f7" distance={15} />

        <Suspense fallback={null}>
          <FuturisticHouseModel
            onSelectHotspot={handleHotspotClick}
            activeHotspot={activeHotspot}
            setActiveHotspot={setActiveHotspot}
          />
        </Suspense>

        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.06}
          autoRotate={isAutoRotate}
          autoRotateSpeed={0.8}
          minDistance={5}
          maxDistance={14}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.05}
          target={[0, 1.2, 0]}
        />

        <CameraRig
          currentView={currentView}
          controlsRef={controlsRef}
          isAutoRotate={isAutoRotate}
        />
      </Canvas>

      {/* Floating Viewpoint Selector HUD (Top Left) */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#08090d]/85 backdrop-blur-xl border border-white/10 shadow-xl">
        {VIEWPOINTS.map((view) => {
          const Icon = view.icon;
          const isActive = currentView === view.key;
          return (
            <button
              key={view.key}
              type="button"
              onClick={() => handleSelectView(view.key)}
              onMouseEnter={() => soundFX.playHover()}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{view.label}</span>
            </button>
          );
        })}
      </div>

      {/* Camera Utility Controls (Top Right) */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 p-1.5 rounded-xl bg-[#08090d]/85 backdrop-blur-xl border border-white/10 shadow-xl">
        {/* Toggle Auto-Rotation */}
        <button
          type="button"
          onClick={toggleAutoRotate}
          onMouseEnter={() => soundFX.playHover()}
          title={isAutoRotate ? 'Tạm dừng xoay tự động' : 'Bật xoay tự động'}
          aria-label={isAutoRotate ? 'Pause auto-rotation' : 'Play auto-rotation'}
          className={`p-2 rounded-lg text-xs transition-all border ${
            isAutoRotate
              ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
              : 'text-zinc-400 hover:text-white border-transparent hover:bg-white/5'
          }`}
        >
          {isAutoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        {/* Reset View Button */}
        <button
          type="button"
          onClick={handleResetCamera}
          onMouseEnter={() => soundFX.playHover()}
          title="Reset góc nhìn mặc định"
          aria-label="Reset default view"
          className="p-2 rounded-lg text-xs text-zinc-400 hover:text-white border border-transparent hover:bg-white/5 transition-all flex items-center gap-1"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline font-mono text-[11px]">RESET</span>
        </button>
      </div>

      {/* Bottom Floating Interaction Guide */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div className="px-4 py-2 rounded-full bg-[#08090d]/85 backdrop-blur-md border border-white/10 shadow-lg flex items-center gap-2.5 text-[11px] font-mono text-zinc-400">
          <Eye className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>DRAG TO ROTATE 360° · PINCH/SCROLL TO ZOOM · CLICK PINS TO EXPLORE</span>
        </div>
      </div>
    </div>
  );
};
