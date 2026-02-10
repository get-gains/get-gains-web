"use client";

import { Canvas } from "@react-three/fiber";
import { CrashTestDummy } from "./crash-test-dummy";
import { SceneLighting } from "./scene-lighting";
import { GroundGrid } from "./ground-grid";
import { GlitchEffects } from "./glitch-effects";
import { useEffect, useState } from "react";
// Glitch effect disabled per design decision — bloom only

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative h-full w-full">
      {/* Scanline CSS overlay */}
      <div className="bg-scanlines pointer-events-none absolute inset-0 z-10" />

      <Canvas
        camera={{
          position: isMobile ? [4, 4, 4] : [5, 5, 5],
          fov: isMobile ? 55 : 50,
          near: 0.1,
          far: 100,
        }}
        style={{ background: "transparent" }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneLighting />
        <CrashTestDummy />
        <GroundGrid />
        {!isMobile && <GlitchEffects enableBloom enableGlitch={false} />}
        {isMobile && <GlitchEffects enableBloom={false} enableGlitch={false} />}
      </Canvas>
    </div>
  );
}
