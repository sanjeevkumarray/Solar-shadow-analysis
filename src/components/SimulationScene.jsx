import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import SolarTable from "./SolarTable";
import Obstacles from "./Obstacles";

export default function SimulationScene({
  buildings,
  tanks,
  tables,
  azimuth,
  elevation,
  metrics,
}) {
  const azRad = ((azimuth - 180) * Math.PI) / 180;
  const elRad = (elevation * Math.PI) / 180;

  const radius = 25;
  const sunX = radius * -Math.sin(azRad) * Math.cos(elRad);
  const sunZ = radius * -Math.cos(azRad) * Math.cos(elRad);
  const sunY = radius * Math.sin(elRad);

  const isNight = elevation <= 0;

  return (
    <div className="w-full h-full bg-slate-900">
      <Canvas shadows camera={{ position: [15, 15, 20], fov: 50 }}>
        <color attach="background" args={[isNight ? "#030712" : "#0f172a"]} />

        <ambientLight intensity={isNight ? 0.05 : 0.3} />

        {!isNight && (
          <directionalLight
            castShadow
            position={[sunX, sunY, sunZ]}
            intensity={2.5}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={60}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
            shadow-bias={-0.0005}
          />
        )}

        {!isNight && (
          <mesh position={[sunX, sunY, sunZ]}>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshBasicMaterial color="#fcd34d" toneMapped={false} />
          </mesh>
        )}

        <Obstacles buildings={buildings} tanks={tanks} />

        {tables.map((table) => (
          <SolarTable
            key={table.id}
            config={table}
            analysis={metrics.tables[table.id]}
          />
        ))}

        <Grid
          renderOrder={-1}
          position={[0, -0.01, 0]}
          args={[50, 50]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#334155"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#475569"
          fadeDistance={40}
        />

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.02, 0]}
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <shadowMaterial opacity={0.4} />
        </mesh>

        <OrbitControls
          maxPolarAngle={Math.PI / 2 - 0.05}
          minDistance={5}
          maxDistance={45}
        />
      </Canvas>
    </div>
  );
}
