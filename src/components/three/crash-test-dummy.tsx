"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PRIMARY_COLOR = new THREE.Color("#E8844A");
const JOINT_COLOR = new THREE.Color("#E8844A");

// Animation constants
const SQUAT_DURATION = 2.5;
const SQUAT_DEPTH = 1.0;
const HIP_DROP = 1.2;
const MAX_KNEE_BEND = 1.2;
const TORSO_LEAN = 0.2;
const ARM_RAISE = Math.PI / 2; // arms parallel to ground

interface DummyRefs {
  root: React.RefObject<THREE.Group | null>;
  hips: React.RefObject<THREE.Group | null>;
  torso: React.RefObject<THREE.Group | null>;
  head: React.RefObject<THREE.Group | null>;
  upperArmL: React.RefObject<THREE.Group | null>;
  upperArmR: React.RefObject<THREE.Group | null>;
  lowerArmL: React.RefObject<THREE.Group | null>;
  lowerArmR: React.RefObject<THREE.Group | null>;
  upperLegL: React.RefObject<THREE.Group | null>;
  upperLegR: React.RefObject<THREE.Group | null>;
  lowerLegL: React.RefObject<THREE.Group | null>;
  lowerLegR: React.RefObject<THREE.Group | null>;
}

function WireframeMesh({
  geometry,
  position,
  scale,
}: {
  geometry: THREE.BufferGeometry;
  position?: [number, number, number];
  scale?: [number, number, number];
}) {
  const edgesGeometry = useMemo(
    () => new THREE.EdgesGeometry(geometry),
    [geometry],
  );

  return (
    <group position={position} scale={scale}>
      {/* Wireframe edges */}
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial
          color={PRIMARY_COLOR}
          linewidth={1}
          transparent
          opacity={0.9}
        />
      </lineSegments>
      {/* Faint solid fill for depth */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={PRIMARY_COLOR}
          emissive={PRIMARY_COLOR}
          emissiveIntensity={0.3}
          transparent
          opacity={0.08}
          wireframe={false}
        />
      </mesh>
    </group>
  );
}

function Joint({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshStandardMaterial
        color={JOINT_COLOR}
        emissive={JOINT_COLOR}
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}

export function CrashTestDummy() {
  const refs: DummyRefs = {
    root: useRef<THREE.Group>(null),
    hips: useRef<THREE.Group>(null),
    torso: useRef<THREE.Group>(null),
    head: useRef<THREE.Group>(null),
    upperArmL: useRef<THREE.Group>(null),
    upperArmR: useRef<THREE.Group>(null),
    lowerArmL: useRef<THREE.Group>(null),
    lowerArmR: useRef<THREE.Group>(null),
    upperLegL: useRef<THREE.Group>(null),
    upperLegR: useRef<THREE.Group>(null),
    lowerLegL: useRef<THREE.Group>(null),
    lowerLegR: useRef<THREE.Group>(null),
  };

  // Geometries (memoized)
  const headGeo = useMemo(() => new THREE.SphereGeometry(0.25, 12, 12), []);
  const torsoGeo = useMemo(() => new THREE.BoxGeometry(0.6, 0.8, 0.3), []);
  const upperArmGeo = useMemo(
    () => new THREE.CylinderGeometry(0.06, 0.05, 0.5, 8),
    [],
  );
  const lowerArmGeo = useMemo(
    () => new THREE.CylinderGeometry(0.05, 0.04, 0.45, 8),
    [],
  );
  const upperLegGeo = useMemo(
    () => new THREE.CylinderGeometry(0.08, 0.07, 0.6, 8),
    [],
  );
  const lowerLegGeo = useMemo(
    () => new THREE.CylinderGeometry(0.07, 0.05, 0.55, 8),
    [],
  );
  const hipGeo = useMemo(() => new THREE.BoxGeometry(0.5, 0.2, 0.25), []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    // Squat animation
    const t = Math.sin((elapsed / SQUAT_DURATION) * Math.PI * 2) * 0.5 + 0.5;
    const squatAmount = t * SQUAT_DEPTH;

    // Move hips down
    if (refs.hips.current) {
      refs.hips.current.position.y = -squatAmount * HIP_DROP;
    }

    // Bend upper legs forward
    if (refs.upperLegL.current) {
      refs.upperLegL.current.rotation.x = squatAmount * MAX_KNEE_BEND;
    }
    if (refs.upperLegR.current) {
      refs.upperLegR.current.rotation.x = squatAmount * MAX_KNEE_BEND;
    }

    // Bend lower legs back
    if (refs.lowerLegL.current) {
      refs.lowerLegL.current.rotation.x = -squatAmount * MAX_KNEE_BEND * 1.2;
    }
    if (refs.lowerLegR.current) {
      refs.lowerLegR.current.rotation.x = -squatAmount * MAX_KNEE_BEND * 1.2;
    }

    // Torso lean
    if (refs.torso.current) {
      refs.torso.current.rotation.x = squatAmount * TORSO_LEAN;
    }

    // Arms raise for balance
    if (refs.upperArmL.current) {
      refs.upperArmL.current.rotation.x = squatAmount * ARM_RAISE;
    }
    if (refs.upperArmR.current) {
      refs.upperArmR.current.rotation.x = squatAmount * ARM_RAISE;
    }
  });

  return (
    <group ref={refs.root} position={[0, 0.2, 0]} rotation={[0, Math.PI, 0]}>
      {/* Hips group — moves down during squat */}
      <group ref={refs.hips}>
        {/* Hip bone */}
        <WireframeMesh geometry={hipGeo} position={[0, 0, 0]} />
        <Joint position={[0, 0, 0]} />

        {/* Torso — attached to hips */}
        <group ref={refs.torso} position={[0, 0.5, 0]}>
          <WireframeMesh geometry={torsoGeo} position={[0, 0.4, 0]} />

          {/* Head */}
          <group ref={refs.head} position={[0, 1.05, 0]}>
            <WireframeMesh geometry={headGeo} />
            <Joint position={[0, 0, 0]} />
          </group>

          {/* Left Arm */}
          <group ref={refs.upperArmL} position={[-0.4, 0.75, 0]}>
            <WireframeMesh geometry={upperArmGeo} position={[0, -0.25, 0]} />
            <Joint position={[0, 0, 0]} />
            <group ref={refs.lowerArmL} position={[0, -0.5, 0]}>
              <WireframeMesh geometry={lowerArmGeo} position={[0, -0.22, 0]} />
              <Joint position={[0, 0, 0]} />
            </group>
          </group>

          {/* Right Arm */}
          <group ref={refs.upperArmR} position={[0.4, 0.75, 0]}>
            <WireframeMesh geometry={upperArmGeo} position={[0, -0.25, 0]} />
            <Joint position={[0, 0, 0]} />
            <group ref={refs.lowerArmR} position={[0, -0.5, 0]}>
              <WireframeMesh geometry={lowerArmGeo} position={[0, -0.22, 0]} />
              <Joint position={[0, 0, 0]} />
            </group>
          </group>
        </group>

        {/* Left Leg */}
        <group ref={refs.upperLegL} position={[-0.18, -0.15, 0]}>
          <WireframeMesh geometry={upperLegGeo} position={[0, -0.3, 0]} />
          <Joint position={[0, 0, 0]} />
          <group ref={refs.lowerLegL} position={[0, -0.6, 0]}>
            <WireframeMesh geometry={lowerLegGeo} position={[0, -0.28, 0]} />
            <Joint position={[0, 0, 0]} />
          </group>
        </group>

        {/* Right Leg */}
        <group ref={refs.upperLegR} position={[0.18, -0.15, 0]}>
          <WireframeMesh geometry={upperLegGeo} position={[0, -0.3, 0]} />
          <Joint position={[0, 0, 0]} />
          <group ref={refs.lowerLegR} position={[0, -0.6, 0]}>
            <WireframeMesh geometry={lowerLegGeo} position={[0, -0.28, 0]} />
            <Joint position={[0, 0, 0]} />
          </group>
        </group>
      </group>
    </group>
  );
}
