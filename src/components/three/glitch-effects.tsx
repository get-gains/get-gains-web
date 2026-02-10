"use client";

import { EffectComposer, Bloom, Glitch } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";
import { Vector2 } from "three";

interface GlitchEffectsProps {
  enableBloom?: boolean;
  enableGlitch?: boolean;
}

function BloomAndGlitch() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        intensity={1.5}
        radius={0.8}
      />
      <Glitch
        delay={new Vector2(2, 4)}
        duration={new Vector2(0.1, 0.3)}
        strength={new Vector2(0.02, 0.05)}
        mode={GlitchMode.SPORADIC}
      />
    </EffectComposer>
  );
}

function GlitchOnly() {
  return (
    <EffectComposer>
      <Glitch
        delay={new Vector2(2, 4)}
        duration={new Vector2(0.1, 0.3)}
        strength={new Vector2(0.02, 0.05)}
        mode={GlitchMode.SPORADIC}
      />
    </EffectComposer>
  );
}

export function GlitchEffects({
  enableBloom = true,
  enableGlitch = true,
}: GlitchEffectsProps) {
  if (enableBloom && enableGlitch) return <BloomAndGlitch />;
  if (enableGlitch) return <GlitchOnly />;
  if (enableBloom) {
    return (
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={1.5}
          radius={0.8}
        />
      </EffectComposer>
    );
  }
  return null;
}
