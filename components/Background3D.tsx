"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Particles({ count, interactive }: { count: number; interactive: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Points spread inside a sphere shell for depth
      const r = 3 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    pts.rotation.y += delta * 0.05;
    pts.rotation.x += delta * 0.015;
    if (interactive) {
      // Ease the whole field toward the pointer for a parallax feel
      pts.position.x += (state.pointer.x * 0.8 - pts.position.x) * 0.04;
      pts.position.y += (state.pointer.y * 0.5 - pts.position.y) * 0.04;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#7dd3fc"
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}

function Core({ interactive }: { interactive: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.25;
    g.rotation.x += delta * 0.12;
    if (interactive) {
      g.rotation.y += state.pointer.x * delta * 0.6;
      g.rotation.x += -state.pointer.y * delta * 0.6;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={1.2}>
      <group ref={group} position={[2.2, 0, -1]}>
        <mesh>
          <icosahedronGeometry args={[1.7, 1]} />
          <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.55} />
        </mesh>
        <mesh scale={0.95}>
          <icosahedronGeometry args={[1.7, 0]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.35} />
        </mesh>
        <mesh>
          <octahedronGeometry args={[0.55, 0]} />
          <meshBasicMaterial color="#3b82f6" />
        </mesh>
        <mesh rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[2.5, 0.012, 8, 120]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} />
        </mesh>
      </group>
    </Float>
  );
}

/** Default export so it can be lazy-loaded with next/dynamic. */
export default function Background3D({ lite = false }: { lite?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60 }}
      dpr={lite ? 1 : [1, 1.75]}
      gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      <Particles count={lite ? 350 : 1400} interactive={!lite} />
      <Core interactive={!lite} />
    </Canvas>
  );
}
