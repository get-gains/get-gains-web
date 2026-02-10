"use client";

import { Grid } from "@react-three/drei";

export function GroundGrid() {
  return (
    <Grid
      args={[20, 20]}
      position={[0, -1.8, 0]}
      cellSize={0.5}
      cellThickness={0.5}
      cellColor="#363636"
      sectionSize={2}
      sectionThickness={1}
      sectionColor="#4A4A4A"
      fadeDistance={12}
      fadeStrength={1.5}
      infiniteGrid
    />
  );
}
