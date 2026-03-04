"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const RAYON = 2;

function posVec(lat, lon, r = RAYON) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

const VILLES = [
  [48.856, 2.352],   // Paris
  [45.764, 4.836],   // Lyon
  [43.297, 5.370],   // Marseille
  [51.507, -0.128],  // London
  [52.520, 13.405],  // Berlin
  [40.417, -3.704],  // Madrid
  [50.850, 4.352],   // Bruxelles
  [47.377, 8.541],   // Zurich
  [43.610, 3.876],   // Montpellier
  [44.837, -0.579],  // Bordeaux
];

const CONNEXIONS = [[0, 1], [0, 3], [0, 4], [1, 2], [1, 8], [3, 6], [0, 9]];

function ArcLine({ a, b }) {
  const arc = useMemo(() => {
    const mid = a.clone().add(b).normalize().multiplyScalar(RAYON * 1.35);
    const points = new THREE.QuadraticBezierCurve3(a, mid, b).getPoints(50);
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.45,
    });
    return new THREE.Line(geo, mat);
  }, [a, b]);

  return <primitive object={arc} />;
}

function DataPoints({ positions }) {
  const glowsRef = useRef([]);

  useFrame(({ clock }) => {
    glowsRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const pulse = Math.sin(clock.elapsedTime * 1.5 + i * 1.1);
      mesh.scale.setScalar(1 + pulse * 0.4);
      mesh.material.opacity = 0.15 + pulse * 0.1;
    });
  });

  return (
    <>
      {positions.map((pos, i) => (
        <group key={i}>
          <mesh position={pos}>
            <sphereGeometry args={[0.032, 8, 8]} />
            <meshBasicMaterial color="#34d399" />
          </mesh>
          <mesh position={pos} ref={(el) => (glowsRef.current[i] = el)}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#34d399" transparent opacity={0.2} />
          </mesh>
        </group>
      ))}
    </>
  );
}

function Globe() {
  const positions = useMemo(
    () => VILLES.map(([lat, lon]) => posVec(lat, lon)),
    []
  );

  return (
    <group>
      {/* Sphère principale — bleu marine visible */}
      <mesh>
        <sphereGeometry args={[RAYON, 64, 64]} />
        <meshStandardMaterial
          color="#0f2d5a"
          roughness={0.75}
          metalness={0.2}
        />
      </mesh>

      {/* Grille lat/lon — plus visible */}
      <mesh>
        <sphereGeometry args={[RAYON + 0.005, 24, 14]} />
        <meshBasicMaterial
          color="#3b82f6"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Atmosphère — halo bleu sur les bords */}
      <mesh>
        <sphereGeometry args={[RAYON + 0.22, 32, 32]} />
        <meshBasicMaterial
          color="#1d4ed8"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      <DataPoints positions={positions} />

      {CONNEXIONS.map(([a, b], i) => (
        <ArcLine key={i} a={positions[a]} b={positions[b]} />
      ))}
    </group>
  );
}

export default function GlobeGIS() {
  return (
    <Canvas
      camera={{ position: [0, 0.8, 5.5], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Lumière ambiante douce */}
      <ambientLight intensity={0.35} />

      {/* Lumière directionnelle principale — crée l'ombrage qui donne le relief */}
      <directionalLight position={[5, 4, 5]} intensity={2.5} color="#7ec8ff" />

      {/* Rim light par derrière — définit le contour du globe */}
      <pointLight position={[-5, 0, -6]} intensity={1.2} color="#1e3a8a" />

      {/* Accent vert en bas */}
      <pointLight position={[0, -4, 3]} intensity={0.4} color="#10b981" />

      <Globe />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.7}
      />
    </Canvas>
  );
}
