"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Forme() {
  const ext = useRef();
  const int = useRef();

  useFrame((_, delta) => {
    ext.current.rotation.x += delta * 0.12;
    ext.current.rotation.y += delta * 0.18;
    int.current.rotation.x -= delta * 0.08;
    int.current.rotation.y -= delta * 0.1;
  });

  return (
    <>
      {/* Icosahedron extérieur — wireframe émeraude */}
      <mesh ref={ext}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial
          color="#10b981"
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Sphère intérieure — noyau solide sombre */}
      <mesh ref={int}>
        <icosahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.6}
          roughness={0.3}
          emissive="#0d9488"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Halo glow */}
      <pointLight position={[0, 0, 0]} color="#10b981" intensity={1.2} />
    </>
  );
}

export default function IcosahedreStrategique() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 4, 4]} color="#6ee7b7" intensity={1.5} />
      <pointLight position={[-4, -2, -4]} color="#3b82f6" intensity={0.8} />
      <Forme />
    </Canvas>
  );
}
