'use client';
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, PerspectiveCamera } from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

const TechNodes = () => {
  const nodesRef = useRef<THREE.Group>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    if (!nodesRef.current) return;
    const targetY = scrollRef.current * 0.05;
    nodesRef.current.position.y = THREE.MathUtils.lerp(nodesRef.current.position.y, targetY, 0.1);
    nodesRef.current.rotation.y += 0.002;
  });

  const nodes = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 30 - 20
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: Math.random() * 0.5 + 0.2,
      type: i % 2 === 0 ? 'box' : 'torus'
    }));
  }, []);

  return (
    <group ref={nodesRef}>
      {nodes.map((node, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={1}>
          <mesh position={node.position} rotation={node.rotation} scale={node.scale}>
            {node.type === 'box' ? (
              <boxGeometry args={[1, 1, 1]} />
            ) : (
              <torusGeometry args={[0.8, 0.2, 16, 32]} />
            )}
            <meshStandardMaterial 
              color={i % 3 === 0 ? "#00f3ff" : "#bc13fe"} 
              wireframe 
              transparent 
              opacity={0.15} 
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

export const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none bg-black">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#bc13fe" />
        <TechNodes />
      </Canvas>
    </div>
  );
};
