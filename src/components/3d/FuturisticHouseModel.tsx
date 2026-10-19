import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { soundFX } from '../../utils/soundEffects';

interface FuturisticHouseModelProps {
  onSelectHotspot: (sectionId: string) => void;
  activeHotspot: string | null;
  setActiveHotspot: (id: string | null) => void;
}

export const FuturisticHouseModel: React.FC<FuturisticHouseModelProps> = ({
  onSelectHotspot,
  activeHotspot,
  setActiveHotspot,
}) => {
  const haloRef = useRef<THREE.Mesh>(null);
  const satelliteRef = useRef<THREE.Group>(null);
  const serverLed1Ref = useRef<THREE.MeshBasicMaterial>(null);
  const serverLed2Ref = useRef<THREE.MeshBasicMaterial>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Animation frame loop for dynamic 3D elements
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Rotate floating gyro ring
    if (haloRef.current) {
      haloRef.current.rotation.x = Math.sin(t * 0.8) * 0.2;
      haloRef.current.rotation.y = t * 0.6;
      haloRef.current.position.y = 4.2 + Math.sin(t * 1.5) * 0.12;
    }

    // Gentle satellite dish oscillation
    if (satelliteRef.current) {
      satelliteRef.current.rotation.y = Math.sin(t * 0.4) * 0.3;
    }

    // Blink server LEDs
    if (serverLed1Ref.current) {
      serverLed1Ref.current.color.set(Math.sin(t * 8) > 0 ? '#00f0ff' : '#05303d');
    }
    if (serverLed2Ref.current) {
      serverLed2Ref.current.color.set(Math.cos(t * 6) > 0 ? '#22c55e' : '#052912');
    }

    // Floating cyber dust
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.05;
    }
  });

  // Generate cyber dust particle positions
  const particleGeo = React.useMemo(() => {
    const count = 40;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = Math.random() * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <group position={[0, -0.6, 0]}>
      {/* ============================================================== */}
      {/* 1. BASE FOUNDATION & CYBER GRID PLATFORM */}
      {/* ============================================================== */}
      {/* Main Ground Slab */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[7, 0.4, 7]} />
        <meshStandardMaterial color="#0c0e14" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Cyber Grid Border Glow */}
      <mesh position={[0, -0.01, 0]}>
        <boxGeometry args={[7.2, 0.02, 7.2]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Elevated Architectural Pedestal */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <boxGeometry args={[5.8, 0.2, 5.8]} />
        <meshStandardMaterial color="#161922" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Emissive Guide Light Strips on Foundation */}
      <mesh position={[0, 0.21, 2.8]}>
        <boxGeometry args={[4, 0.02, 0.08]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      <mesh position={[-2.8, 0.21, 0]}>
        <boxGeometry args={[0.08, 0.02, 4]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>

      {/* ============================================================== */}
      {/* 2. GROUND FLOOR: ARCHITECTURAL WALLS & STRUCTURE */}
      {/* ============================================================== */}
      {/* Back Solid Architectural Wall */}
      <mesh position={[0, 1.2, -1.8]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 2.0, 0.3]} />
        <meshStandardMaterial color="#1c202b" metalness={0.2} roughness={0.5} />
      </mesh>

      {/* Left Wall with Server Notch */}
      <mesh position={[-2.05, 1.2, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 2.0, 3.5]} />
        <meshStandardMaterial color="#181b24" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Right Architectural Pillar & Wall */}
      <mesh position={[2.05, 1.2, -0.6]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 2.0, 2.7]} />
        <meshStandardMaterial color="#181b24" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Front Architectural Frame */}
      <mesh position={[1.5, 1.2, 1.35]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 2.0, 0.2]} />
        <meshStandardMaterial color="#141720" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* High-Tech Panoramic Glass Facade */}
      <mesh position={[-0.5, 1.2, 1.35]}>
        <boxGeometry args={[2.6, 1.9, 0.05]} />
        <meshPhysicalMaterial
          color="#00f0ff"
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
          transmission={0.8}
          ior={1.4}
        />
      </mesh>

      {/* Glass Frame Accent Lines */}
      <mesh position={[-0.5, 2.15, 1.36]}>
        <boxGeometry args={[2.6, 0.06, 0.06]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      <mesh position={[-0.5, 0.25, 1.36]}>
        <boxGeometry args={[2.6, 0.06, 0.06]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Cyber Entrance Door */}
      <group position={[1.5, 0.9, 1.45]}>
        <mesh>
          <boxGeometry args={[0.85, 1.4, 0.06]} />
          <meshStandardMaterial color="#0f1118" metalness={0.7} roughness={0.2} />
        </mesh>
        {/* Door Glowing Handle & Keypad */}
        <mesh position={[0.3, 0, 0.04]}>
          <boxGeometry args={[0.04, 0.4, 0.03]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[-0.15, 0.3, 0.04]}>
          <boxGeometry args={[0.15, 0.2, 0.02]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 3. INTERIOR WORKSPACE: DESK, MONITORS, CHAIR, SERVER RACK */}
      {/* ============================================================== */}
      {/* Developer Desk */}
      <group position={[-0.4, 0.2, -0.3]}>
        {/* Desk Top */}
        <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.06, 1.0]} />
          <meshStandardMaterial color="#2d3748" roughness={0.4} metalness={0.2} />
        </mesh>
        {/* Desk Legs */}
        <mesh position={[-0.9, 0.35, -0.4]} castShadow>
          <boxGeometry args={[0.06, 0.7, 0.06]} />
          <meshStandardMaterial color="#0f1117" metalness={0.8} />
        </mesh>
        <mesh position={[0.9, 0.35, -0.4]} castShadow>
          <boxGeometry args={[0.06, 0.7, 0.06]} />
          <meshStandardMaterial color="#0f1117" metalness={0.8} />
        </mesh>
        <mesh position={[-0.9, 0.35, 0.4]} castShadow>
          <boxGeometry args={[0.06, 0.7, 0.06]} />
          <meshStandardMaterial color="#0f1117" metalness={0.8} />
        </mesh>
        <mesh position={[0.9, 0.35, 0.4]} castShadow>
          <boxGeometry args={[0.06, 0.7, 0.06]} />
          <meshStandardMaterial color="#0f1117" metalness={0.8} />
        </mesh>

        {/* Triple Curved Monitor Setup */}
        {/* Main Center Monitor */}
        <mesh position={[0, 1.1, -0.3]} castShadow>
          <boxGeometry args={[0.85, 0.48, 0.03]} />
          <meshStandardMaterial color="#08090d" metalness={0.8} />
        </mesh>
        {/* Center Screen Glowing Display */}
        <mesh position={[0, 1.1, -0.28]}>
          <planeGeometry args={[0.81, 0.44]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>

        {/* Left Angled Monitor */}
        <group position={[-0.6, 1.1, -0.24]} rotation={[0, 0.35, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.55, 0.45, 0.03]} />
            <meshStandardMaterial color="#08090d" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[0.51, 0.41]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>

        {/* Right Angled Monitor */}
        <group position={[0.6, 1.1, -0.24]} rotation={[0, -0.35, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.55, 0.45, 0.03]} />
            <meshStandardMaterial color="#08090d" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[0.51, 0.41]} />
            <meshBasicMaterial color="#a855f7" />
          </mesh>
        </group>

        {/* Monitor Desk Mount Stand */}
        <mesh position={[0, 0.85, -0.35]}>
          <cylinderGeometry args={[0.03, 0.03, 0.25, 8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>

        {/* Mechanical Keyboard with Backlight */}
        <mesh position={[0, 0.74, 0.05]} rotation={[-0.05, 0, 0]}>
          <boxGeometry args={[0.42, 0.02, 0.16]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.75, 0.05]}>
          <boxGeometry args={[0.4, 0.01, 0.14]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        {/* Mouse & Mousepad */}
        <mesh position={[0.32, 0.735, 0.05]}>
          <boxGeometry args={[0.2, 0.005, 0.22]} />
          <meshStandardMaterial color="#0b0f19" />
        </mesh>
        <mesh position={[0.32, 0.75, 0.05]}>
          <boxGeometry args={[0.07, 0.02, 0.1]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.5} />
        </mesh>

        {/* Cozy Coffee Mug with "VKU" vibe */}
        <mesh position={[-0.45, 0.78, 0.15]}>
          <cylinderGeometry args={[0.05, 0.04, 0.1, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </mesh>

        {/* Desk Ambient Lamp with Local PointLight */}
        <group position={[-0.7, 0.73, -0.2]}>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
            <meshStandardMaterial color="#475569" metalness={0.8} />
          </mesh>
          <mesh position={[0.1, 0.4, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <coneGeometry args={[0.08, 0.12, 16]} />
            <meshStandardMaterial color="#38bdf8" />
          </mesh>
          <pointLight color="#38bdf8" intensity={1.8} distance={2.5} decay={2} position={[0.12, 0.35, 0]} />
        </group>

        {/* Developer Ergonomic Chair */}
        <group position={[0, 0.2, 0.65]} rotation={[0, Math.PI, 0]}>
          {/* Seat Cushion */}
          <mesh position={[0, 0.35, 0]} castShadow>
            <boxGeometry args={[0.45, 0.08, 0.45]} />
            <meshStandardMaterial color="#1e293b" roughness={0.6} />
          </mesh>
          {/* High Ergonomic Backrest */}
          <mesh position={[0, 0.65, -0.2]} rotation={[0.08, 0, 0]} castShadow>
            <boxGeometry args={[0.4, 0.55, 0.06]} />
            <meshStandardMaterial color="#0f172a" roughness={0.6} />
          </mesh>
          {/* Headrest */}
          <mesh position={[0, 0.96, -0.23]}>
            <boxGeometry args={[0.26, 0.12, 0.05]} />
            <meshStandardMaterial color="#00f0ff" roughness={0.5} />
          </mesh>
          {/* Center Piston Base */}
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.35, 8]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} />
          </mesh>
          {/* 5-Star Wheel Base */}
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.04, 5]} />
            <meshStandardMaterial color="#0f172a" metalness={0.7} />
          </mesh>
        </group>
      </group>

      {/* Cyber Server Rack Tower */}
      <group position={[-1.6, 0.2, -0.8]}>
        <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.55, 1.7, 0.65]} />
          <meshStandardMaterial color="#090b10" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Server Blades with Slots */}
        {[0.3, 0.6, 0.9, 1.2, 1.5].map((y, idx) => (
          <group key={idx} position={[0.28, y, 0]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.02, 0.18, 0.55]} />
              <meshStandardMaterial color="#171d2b" />
            </mesh>
          </group>
        ))}
        {/* Pulsing Status LED Arrays */}
        <mesh position={[0.29, 1.3, -0.15]}>
          <boxGeometry args={[0.01, 0.04, 0.04]} />
          <meshBasicMaterial ref={serverLed1Ref} color="#00f0ff" />
        </mesh>
        <mesh position={[0.29, 1.1, -0.15]}>
          <boxGeometry args={[0.01, 0.04, 0.04]} />
          <meshBasicMaterial ref={serverLed2Ref} color="#22c55e" />
        </mesh>
        <mesh position={[0.29, 0.8, -0.15]}>
          <boxGeometry args={[0.01, 0.04, 0.04]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 4. SECOND FLOOR: CANTILEVERED UPPER STUDIO & BALCONY */}
      {/* ============================================================== */}
      {/* Cantilevered Mezzanine Slab */}
      <mesh position={[0.3, 2.3, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 0.25, 4.4]} />
        <meshStandardMaterial color="#161924" metalness={0.4} roughness={0.4} />
      </mesh>

      {/* Glowing Slab Perimeter Trim */}
      <mesh position={[0.3, 2.2, 0.2]}>
        <boxGeometry args={[4.45, 0.05, 4.45]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
      </mesh>

      {/* Upper Studio Cube */}
      <group position={[0.6, 3.2, -0.2]}>
        {/* Back Wall */}
        <mesh position={[0, 0, -1.5]} castShadow>
          <boxGeometry args={[3.2, 1.6, 0.2]} />
          <meshStandardMaterial color="#1b202c" metalness={0.3} roughness={0.4} />
        </mesh>
        {/* Right Wall */}
        <mesh position={[1.5, 0, 0]} castShadow>
          <boxGeometry args={[0.2, 1.6, 2.8]} />
          <meshStandardMaterial color="#181d28" metalness={0.3} roughness={0.4} />
        </mesh>
        {/* Upper Panoramic Window Glass */}
        <mesh position={[-0.2, 0, 1.3]}>
          <boxGeometry args={[2.6, 1.5, 0.05]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            transparent
            opacity={0.35}
            roughness={0.1}
            transmission={0.85}
          />
        </mesh>
        {/* Louver Blades / Modern Architecture Sunshades */}
        {[-0.5, -0.1, 0.3, 0.7].map((offset, i) => (
          <mesh key={i} position={[-1.6, offset, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.08, 0.04, 2.6]} />
            <meshStandardMaterial color="#00f0ff" metalness={0.8} />
          </mesh>
        ))}
      </group>

      {/* Upper Observatory Balcony Glass Railing */}
      <mesh position={[-1.3, 2.65, 0.8]}>
        <boxGeometry args={[0.05, 0.5, 2.6]} />
        <meshPhysicalMaterial color="#00f0ff" transparent opacity={0.4} />
      </mesh>
      <mesh position={[-0.5, 2.65, 2.1]}>
        <boxGeometry args={[1.6, 0.5, 0.05]} />
        <meshPhysicalMaterial color="#00f0ff" transparent opacity={0.4} />
      </mesh>
      {/* Handrail Trim */}
      <mesh position={[-1.3, 2.92, 0.8]}>
        <boxGeometry args={[0.08, 0.04, 2.6]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* ============================================================== */}
      {/* 5. ROOFTOP & HIGH-TECH ACCENTS */}
      {/* ============================================================== */}
      {/* Rooftop Slab */}
      <mesh position={[0.6, 4.05, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 0.15, 3.2]} />
        <meshStandardMaterial color="#11131c" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Slanted Solar / Quantum Power Panels */}
      <group position={[1.2, 4.3, -0.3]} rotation={[0.2, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.4, 0.05, 1.2]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Solar Cell Grid */}
        <mesh position={[0, 0.03, 0]}>
          <planeGeometry args={[1.35, 1.15]} />
          <meshBasicMaterial color="#1e3a8a" wireframe />
        </mesh>
      </group>

      {/* Satellite Dish Antenna */}
      <group ref={satelliteRef} position={[-0.4, 4.25, -0.6]}>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
          <meshStandardMaterial color="#475569" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.35, 0]} rotation={[0.6, 0, 0]}>
          <sphereGeometry args={[0.28, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2.2]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.7} roughness={0.2} side={THREE.DoubleSide} />
        </mesh>
        {/* Receiver LNB */}
        <mesh position={[0, 0.45, 0.12]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      </group>

      {/* High-Tech Antenna Spire with Flashing Warning Light */}
      <group position={[1.8, 4.15, -1.4]}>
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.015, 0.04, 1.4, 8]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} />
        </mesh>
        <mesh position={[0, 1.42, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>

      {/* Floating Gyroscopic Holographic Halo Ring */}
      <mesh ref={haloRef} position={[0, 4.2, 0]}>
        <torusGeometry args={[0.9, 0.03, 16, 64]} />
        <meshBasicMaterial color="#00f0ff" wireframe />
      </mesh>

      {/* Floating Ambient Cyber Dust */}
      <points ref={particlesRef} geometry={particleGeo}>
        <pointsMaterial size={0.06} color="#00f0ff" transparent opacity={0.6} />
      </points>

      {/* ============================================================== */}
      {/* 6. INTERACTIVE 3D HOTSPOTS WITH DREI HTML LABELS */}
      {/* ============================================================== */}

      {/* Hotspot 1: Studio Workspace -> Links to About */}
      <group position={[-0.4, 1.7, 0.3]}>
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
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        {/* Pulse Ring */}
        <mesh scale={[1.8, 1.8, 1.8]}>
          <ringGeometry args={[0.12, 0.16, 24]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>

        <Html position={[0, 0.35, 0]} center distanceFactor={8} zIndexRange={[100, 0]}>
          <div
            onClick={() => {
              soundFX.playClick();
              onSelectHotspot('about');
            }}
            className={`cursor-pointer transition-all duration-200 select-none ${
              activeHotspot === 'about' ? 'scale-110' : 'scale-100 opacity-90 hover:opacity-100'
            }`}
          >
            <div className="px-2.5 py-1 rounded-full bg-[#08090d]/90 border border-cyan-400/60 shadow-[0_0_15px_rgba(0,240,255,0.4)] backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-300">
                STUDIO WORKSPACE
              </span>
            </div>
            {activeHotspot === 'about' && (
              <div className="mt-1 text-[10px] font-sans text-white/90 bg-black/80 px-2 py-0.5 rounded border border-white/20 whitespace-nowrap text-center">
                Click to explore About Me
              </div>
            )}
          </div>
        </Html>
      </group>

      {/* Hotspot 2: Compute Core / Server -> Links to Tech Stack */}
      <group position={[-1.7, 1.8, -0.6]}>
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
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
        <mesh scale={[1.8, 1.8, 1.8]}>
          <ringGeometry args={[0.12, 0.16, 24]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>

        <Html position={[0, 0.35, 0]} center distanceFactor={8} zIndexRange={[100, 0]}>
          <div
            onClick={() => {
              soundFX.playClick();
              onSelectHotspot('tech-stack');
            }}
            className={`cursor-pointer transition-all duration-200 select-none ${
              activeHotspot === 'tech-stack' ? 'scale-110' : 'scale-100 opacity-90 hover:opacity-100'
            }`}
          >
            <div className="px-2.5 py-1 rounded-full bg-[#08090d]/90 border border-emerald-400/60 shadow-[0_0_15px_rgba(34,197,94,0.4)] backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-mono font-bold tracking-wider text-emerald-300">
                COMPUTE & STACK
              </span>
            </div>
            {activeHotspot === 'tech-stack' && (
              <div className="mt-1 text-[10px] font-sans text-white/90 bg-black/80 px-2 py-0.5 rounded border border-white/20 whitespace-nowrap text-center">
                Click to explore Tech Stack
              </div>
            )}
          </div>
        </Html>
      </group>

      {/* Hotspot 3: Upper Lab / Projects -> Links to Projects */}
      <group position={[0.7, 3.8, 0.6]}>
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
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>
        <mesh scale={[1.8, 1.8, 1.8]}>
          <ringGeometry args={[0.12, 0.16, 24]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>

        <Html position={[0, 0.35, 0]} center distanceFactor={8} zIndexRange={[100, 0]}>
          <div
            onClick={() => {
              soundFX.playClick();
              onSelectHotspot('projects');
            }}
            className={`cursor-pointer transition-all duration-200 select-none ${
              activeHotspot === 'projects' ? 'scale-110' : 'scale-100 opacity-90 hover:opacity-100'
            }`}
          >
            <div className="px-2.5 py-1 rounded-full bg-[#08090d]/90 border border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.4)] backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span className="text-[11px] font-mono font-bold tracking-wider text-purple-300">
                FLAGSHIP PROJECTS
              </span>
            </div>
            {activeHotspot === 'projects' && (
              <div className="mt-1 text-[10px] font-sans text-white/90 bg-black/80 px-2 py-0.5 rounded border border-white/20 whitespace-nowrap text-center">
                Click to explore 3 Flagship Projects
              </div>
            )}
          </div>
        </Html>
      </group>
    </group>
  );
};
