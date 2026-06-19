import React from "react";
export default function Obstacles({ buildings, tanks }) {
  return (
    <>
      {buildings.map((b) => (
        <mesh
          key={b.id}
          position={[b.x, b.height / 2, b.y]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[b.width, b.height, b.length]} />
          <meshStandardMaterial
            color="#64748b"
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
      ))}

      {tanks.map((t) => (
        <mesh
          key={t.id}
          position={[t.x, t.height / 2, t.y]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[t.radius, t.radius, t.height, 24]} />
          <meshStandardMaterial
            color="#94a3b8"
            roughness={0.3}
            metalness={0.4}
          />
        </mesh>
      ))}
    </>
  );
}
