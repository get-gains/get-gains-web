"use client";

export function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.6}
        color="#E8844A"
      />
      <pointLight position={[-5, 5, -5]} intensity={0.3} color="#4ADE80" />
      <pointLight position={[5, -2, 5]} intensity={0.2} color="#E8844A" />
    </>
  );
}
