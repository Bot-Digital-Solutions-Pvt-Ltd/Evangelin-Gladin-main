/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Butterfly = ({ position, setPosition }) => {
  const groupRef = useRef();
  const wingLeftRef = useRef();
  const wingRightRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const flap = Math.sin(t * 10) * 0.6;
    if (wingLeftRef.current) wingLeftRef.current.rotation.z = flap;
    if (wingRightRef.current) wingRightRef.current.rotation.z = -flap;
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <cylinderGeometry args={[0.1, 0.1, 1.2, 8]} />
        <meshStandardMaterial color="#a83279" />
      </mesh>

      <mesh ref={wingLeftRef} position={[0.5, 0, 0]}>
        <planeGeometry args={[1.2, 1.5]} />
        <meshStandardMaterial color="#ff6ec4" side={THREE.DoubleSide} transparent opacity={0.85} />
      </mesh>

      <mesh ref={wingRightRef} position={[-0.5, 0, 0]}>
        <planeGeometry args={[1.2, 1.5]} />
        <meshStandardMaterial color="#7873f5" side={THREE.DoubleSide} transparent opacity={0.85} />
      </mesh>
    </group>
  );
};

const ButterflyScene = () => {
  const [position, setPosition] = useState([0, 1.5, 0]);
  const { viewport, camera } = useThree();

  const dragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  
  const clampPosition = (pos) => {
    const [x, y, z] = pos;
    const xLimit = viewport.width / 2 - 1;  
    const yLimit = viewport.height / 2 - 1;
    return [
      THREE.MathUtils.clamp(x, -xLimit, xLimit),
      THREE.MathUtils.clamp(y, 0.5, yLimit), 
      z,
    ];
  };

  
  useEffect(() => {
    const onPointerDown = (e) => {
      dragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      dragging.current = false;
    };

    const onPointerMove = (e) => {
      if (!dragging.current) return;

      const deltaX = (e.clientX - lastMouse.current.x) / 100; 
      const deltaY = (e.clientY - lastMouse.current.y) / 100;

      lastMouse.current = { x: e.clientX, y: e.clientY };

      setPosition((prev) => {
        const newPos = [prev[0] + deltaX, prev[1] - deltaY, prev[2]];
        return clampPosition(newPos);
      });
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointermove', onPointerMove);

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [viewport]);

  return <Butterfly position={position} setPosition={setPosition} />;
};

const BusinessWomanButterfly = () => {
  return (
    <div style={{ width: '100%', height: 400, backgroundColor: '#1a0b3c' }}>
      <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} color="#ff6ec4" />
        <directionalLight position={[-5, -5, -5]} intensity={0.6} color="#7873f5" />
        <ButterflyScene />
      </Canvas>
    </div>
  );
};

export default BusinessWomanButterfly;
