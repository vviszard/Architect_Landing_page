import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Fix for missing R3F types in JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      points: any;
      bufferGeometry: any;
      bufferAttribute: any;
      pointsMaterial: any;
      gridHelper: any;
      lineSegments: any;
      lineBasicMaterial: any;
    }
  }
}

const ParticleScene = () => {
  const count = 400; 
  const connectionDistance = 3.5; // Threshold for drawing lines
  
  const pointsRef = useRef<THREE.Points>(null);
  const linesGeometryRef = useRef<THREE.BufferGeometry>(null);

  // Memoize particle data
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30; // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15; // Z
      
      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    return { positions: pos, velocities: vel };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;

    const geometry = pointsRef.current.geometry;
    const positionsArray = geometry.attributes.position.array as Float32Array;
    
    // Update points position
    for (let i = 0; i < count; i++) {
      positionsArray[i * 3] += velocities[i * 3];
      positionsArray[i * 3 + 1] += velocities[i * 3 + 1];
      positionsArray[i * 3 + 2] += velocities[i * 3 + 2];

      // Bounce off invisible walls
      if (Math.abs(positionsArray[i * 3]) > 15) velocities[i * 3] *= -1;
      if (Math.abs(positionsArray[i * 3 + 1]) > 10) velocities[i * 3 + 1] *= -1;
      if (Math.abs(positionsArray[i * 3 + 2]) > 7) velocities[i * 3 + 2] *= -1;
    }
    
    geometry.attributes.position.needsUpdate = true;

    // Connect dots logic (Brute force subset for performance)
    if (linesGeometryRef.current) {
        const linePositions = [];
        // Only check a subset or nearest neighbors to save frames. 
        // For simplicity in this demo, we check all but limit draw calls via distance.
        // Optimization: only check i against j > i
        let connections = 0;
        const maxConnections = 600; // Limit total lines

        for (let i = 0; i < count; i++) {
            if (connections >= maxConnections) break;
            for (let j = i + 1; j < count; j++) {
                const dx = positionsArray[i * 3] - positionsArray[j * 3];
                const dy = positionsArray[i * 3 + 1] - positionsArray[j * 3 + 1];
                const dz = positionsArray[i * 3 + 2] - positionsArray[j * 3 + 2];
                const distSq = dx*dx + dy*dy + dz*dz;

                if (distSq < connectionDistance * connectionDistance) {
                    linePositions.push(
                        positionsArray[i * 3], positionsArray[i * 3 + 1], positionsArray[i * 3 + 2],
                        positionsArray[j * 3], positionsArray[j * 3 + 1], positionsArray[j * 3 + 2]
                    );
                    connections++;
                }
            }
        }
        linesGeometryRef.current.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(linePositions, 3)
        );
        linesGeometryRef.current.setDrawRange(0, linePositions.length / 3);
    }
  });

  return (
    <group>
      {/* The Particles - Grey Dots */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#94a3b8" // Slate 400 (Greyish)
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* The Connections - Blue Lines */}
      <lineSegments>
        <bufferGeometry ref={linesGeometryRef} />
        <lineBasicMaterial 
            color="#bfdbfe" // Light Blue
            transparent 
            opacity={0.3} 
            linewidth={1} 
        />
      </lineSegments>
      
      {/* Blueprint Grid Lines Background */}
      <gridHelper args={[40, 40, 0xf1f5f9, 0xf1f5f9]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -5]} />
    </group>
  );
};

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 bg-white pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ParticleScene />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
