'use client';

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  OrbitControls, 
  Float, 
  MeshDistortMaterial, 
  Wireframe, 
  Sphere, 
  Box,
  TorusKnot,
  MeshWobbleMaterial
} from "@react-three/drei";

const HologramCore = ({ type }: { type: string }) => {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    }
  });

  if (type.includes("DEX")) {
    return (
      <Sphere ref={meshRef} args={[1.5, 32, 32]}>
        <MeshDistortMaterial
          color="var(--primary)"
          speed={2}
          distort={0.3}
          wireframe
          opacity={0.5}
          transparent
        />
      </Sphere>
    );
  }

  if (type.includes("AI")) {
    return (
      <TorusKnot ref={meshRef} args={[1, 0.3, 128, 32]}>
        <MeshWobbleMaterial
          color="var(--secondary)"
          speed={3}
          factor={0.6}
          wireframe
        />
      </TorusKnot>
    );
  }

  return (
    <Box ref={meshRef} args={[2, 2, 2]}>
      <MeshDistortMaterial
        color="var(--secondary)"
        speed={1}
        distort={0.2}
        wireframe
      />
    </Box>
  );
};

export const ProjectHologram = ({ type }: { type: string }) => {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="var(--primary)" />
        <spotLight position={[-10, -10, -10]} intensity={0.5} color="var(--secondary)" />
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <HologramCore type={type} />
        </Float>
      </Canvas>
    </div>
  );
};
