import React from "react";
export default function SolarTable({ config, analysis }) {
  const tiltRad = (config.tilt * Math.PI) / 180;

  return (
    <group position={[config.x, 0, config.y]} rotation={[tiltRad, 0, 0]}>
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 0.05, 3.4]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.2} />
      </mesh>

      <mesh position={[-1.5, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1.2]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[1.5, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1.2]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      {Array.from({ length: 2 }).map((_, rowIndex) =>
        Array.from({ length: 3 }).map((_, colIndex) => {
          const panelKey = `R${rowIndex}C${colIndex}`;
          const panelMetrics = analysis?.panels?.find((p) => p.id === panelKey);

          const xPos = (colIndex - 1) * 1.1;
          const zPos = (rowIndex - 0.5) * 1.7;

          let panelColor = "#1e3a8a";
          if (panelMetrics && panelMetrics.shadeRatio > 0) {
            if (panelMetrics.efficiency < 20) panelColor = "#ef4444";
            else if (panelMetrics.efficiency < 70) panelColor = "#f59e0b";
            else panelColor = "#0284c7";
          }

          return (
            <group key={panelKey} position={[xPos, 0.45, zPos]}>
              <mesh castShadow receiveShadow>
                <boxGeometry args={[1.0, 0.03, 1.6]} />
                <meshStandardMaterial
                  color={panelColor}
                  roughness={0.1}
                  metalness={0.5}
                />
              </mesh>

              <mesh>
                <boxGeometry args={[1.04, 0.035, 1.64]} />
                <meshStandardMaterial color="#1e293b" wireframe />
              </mesh>
            </group>
          );
        }),
      )}
    </group>
  );
}
