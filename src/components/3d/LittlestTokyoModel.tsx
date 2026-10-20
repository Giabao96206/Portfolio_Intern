import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations, Html } from '@react-three/drei';
import * as THREE from 'three';
import { soundFX } from '../../utils/soundEffects';

interface LittlestTokyoModelProps {
  onSelectHotspot: (sectionId: string) => void;
  activeHotspot: string | null;
  setActiveHotspot: (id: string | null) => void;
}

export const LittlestTokyoModel: React.FC<LittlestTokyoModelProps> = ({
  onSelectHotspot,
  activeHotspot,
  setActiveHotspot,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/models/LittlestTokyo.glb');
  const { actions, names } = useAnimations(animations, groupRef);

  useEffect(() => {
    // Automatically play all animations (train, moving cars, lights)
    if (names.length > 0) {
      names.forEach((name) => {
        actions[name]?.reset().fadeIn(0.5).play();
      });
    }
  }, [actions, names]);

  return (
    <group ref={groupRef} position={[0, -2.3, 0]} scale={[0.0075, 0.0075, 0.0075]}>
      {/* The pre-made elaborate 3D diorama */}
      <primitive object={scene} castShadow receiveShadow />

      {/* ============================================================== */}
      {/* INTERACTIVE 3D HOTSPOTS OVER KEY CITY NODES */}
      {/* ============================================================== */}

      {/* Hotspot 1: Studio / Residence -> Links to About */}
      <group position={[120, 320, 80]}>
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            soundFX.playClick();
            onSelectHotspot('about');
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            soundFX.playHover();
            setActiveHotspot('about');
          }}
          onPointerOut={() => setActiveHotspot(null)}
        >
          <sphereGeometry args={[18, 16, 16]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh scale={[1.8, 1.8, 1.8]}>
          <ringGeometry args={[18, 24, 24]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>

        <Html position={[0, 45, 0]} center distanceFactor={1100} zIndexRange={[100, 0]}>
          <div
            onClick={() => {
              soundFX.playClick();
              onSelectHotspot('about');
            }}
            className={`cursor-pointer transition-all duration-200 select-none ${
              activeHotspot === 'about' ? 'scale-110' : 'scale-100 opacity-90 hover:opacity-100'
            }`}
          >
            <div className="px-3 py-1.5 rounded-full bg-[#08090d]/90 border border-cyan-400/60 shadow-[0_0_15px_rgba(0,240,255,0.4)] backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono font-bold tracking-wider text-cyan-300">
                STUDIO WORKSPACE
              </span>
            </div>
            {activeHotspot === 'about' && (
              <div className="mt-1 text-[11px] font-sans text-white/90 bg-black/80 px-2 py-0.5 rounded border border-white/20 whitespace-nowrap text-center">
                Click to explore About Me
              </div>
            )}
          </div>
        </Html>
      </group>

      {/* Hotspot 2: Rail & Compute Infrastructure -> Links to Tech Stack */}
      <group position={[-160, 240, -60]}>
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            soundFX.playClick();
            onSelectHotspot('tech-stack');
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            soundFX.playHover();
            setActiveHotspot('tech-stack');
          }}
          onPointerOut={() => setActiveHotspot(null)}
        >
          <sphereGeometry args={[18, 16, 16]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
        <mesh scale={[1.8, 1.8, 1.8]}>
          <ringGeometry args={[18, 24, 24]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>

        <Html position={[0, 45, 0]} center distanceFactor={1100} zIndexRange={[100, 0]}>
          <div
            onClick={() => {
              soundFX.playClick();
              onSelectHotspot('tech-stack');
            }}
            className={`cursor-pointer transition-all duration-200 select-none ${
              activeHotspot === 'tech-stack' ? 'scale-110' : 'scale-100 opacity-90 hover:opacity-100'
            }`}
          >
            <div className="px-3 py-1.5 rounded-full bg-[#08090d]/90 border border-emerald-400/60 shadow-[0_0_15px_rgba(34,197,94,0.4)] backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono font-bold tracking-wider text-emerald-300">
                COMPUTE & STACK
              </span>
            </div>
            {activeHotspot === 'tech-stack' && (
              <div className="mt-1 text-[11px] font-sans text-white/90 bg-black/80 px-2 py-0.5 rounded border border-white/20 whitespace-nowrap text-center">
                Click to explore Tech Stack
              </div>
            )}
          </div>
        </Html>
      </group>

      {/* Hotspot 3: Rooftop & Tower -> Links to Projects */}
      <group position={[30, 480, -40]}>
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            soundFX.playClick();
            onSelectHotspot('projects');
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            soundFX.playHover();
            setActiveHotspot('projects');
          }}
          onPointerOut={() => setActiveHotspot(null)}
        >
          <sphereGeometry args={[18, 16, 16]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>
        <mesh scale={[1.8, 1.8, 1.8]}>
          <ringGeometry args={[18, 24, 24]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>

        <Html position={[0, 45, 0]} center distanceFactor={1100} zIndexRange={[100, 0]}>
          <div
            onClick={() => {
              soundFX.playClick();
              onSelectHotspot('projects');
            }}
            className={`cursor-pointer transition-all duration-200 select-none ${
              activeHotspot === 'projects' ? 'scale-110' : 'scale-100 opacity-90 hover:opacity-100'
            }`}
          >
            <div className="px-3 py-1.5 rounded-full bg-[#08090d]/90 border border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.4)] backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span className="text-xs font-mono font-bold tracking-wider text-purple-300">
                FLAGSHIP PROJECTS
              </span>
            </div>
            {activeHotspot === 'projects' && (
              <div className="mt-1 text-[11px] font-sans text-white/90 bg-black/80 px-2 py-0.5 rounded border border-white/20 whitespace-nowrap text-center">
                Click to explore Flagship Projects
              </div>
            )}
          </div>
        </Html>
      </group>
    </group>
  );
};

useGLTF.preload('/models/LittlestTokyo.glb');
