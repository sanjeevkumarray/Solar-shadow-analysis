import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import SimulationScene from "./components/SimulationScene";
import { calculateSunPosition } from "./utils/solarCalc";
import { runAnalysis } from "./utils/analysisEngine";

export default function App() {
  const [buildings, setBuildings] = useState([
    {
      id: "b1",
      name: "Building Alpha",
      x: -8,
      y: 6,
      width: 4,
      length: 4,
      height: 8,
    },
  ]);

  const [tanks, setTanks] = useState([
    { id: "t1", name: "Water Tank A", x: 6, y: -4, radius: 1.5, height: 5 },
  ]);

  const [tables, setTables] = useState([
    { id: "table1", name: "Solar Array East", x: -2, y: -2, tilt: 15 },
    { id: "table2", name: "Solar Array West", x: 4, y: 4, tilt: 15 },
  ]);

  const [controlMode, setControlMode] = useState("date");
  const [azimuth, setAzimuth] = useState(180);
  const [elevation, setElevation] = useState(45);
  const [date, setDate] = useState("2026-06-21");
  const [time, setTime] = useState("12:00");

  const [isPlaying, setIsPlaying] = useState(false);
  const playbackRef = useRef(null);

  const [metrics, setMetrics] = useState({ tables: {} });

  useEffect(() => {
    if (controlMode === "date") {
      const { az, el } = calculateSunPosition(date, time);
      setAzimuth(az);
      setElevation(el);
    }
  }, [date, time, controlMode]);

  useEffect(() => {
    const analysisResults = runAnalysis({
      buildings,
      tanks,
      tables,
      azimuth,
      elevation,
    });
    setMetrics(analysisResults);
  }, [buildings, tanks, tables, azimuth, elevation]);

  useEffect(() => {
    if (isPlaying) {
      playbackRef.current = setInterval(() => {
        setTime((prevTime) => {
          const [hrs, mins] = prevTime.split(":").map(Number);
          let newMins = mins + 10;
          let newHrs = hrs;
          if (newMins >= 60) {
            newMins = 0;
            newHrs = (hrs + 1) % 24;
          }
          const pad = (n) => String(n).padStart(2, "0");
          return `${pad(newHrs)}:${pad(newMins)}`;
        });
      }, 400);
    } else {
      clearInterval(playbackRef.current);
    }
    return () => clearInterval(playbackRef.current);
  }, [isPlaying]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="flex-1 h-full relative">
        <SimulationScene
          buildings={buildings}
          tanks={tanks}
          tables={tables}
          azimuth={azimuth}
          elevation={elevation}
          metrics={metrics}
        />

        <div className="absolute top-4 left-4 pointer-events-none bg-slate-900/80 backdrop-blur border border-slate-700/50 p-4 rounded-lg shadow-xl">
          <h1 className="text-lg font-bold tracking-wider text-blue-400">
            HELIOS • SHADOW ANALYTICS
          </h1>
          <p className="text-xs text-slate-400">
            Real-time Solar Irradiance & Edge Occlusion Modelling
          </p>
        </div>
      </div>

      <Sidebar
        buildings={buildings}
        setBuildings={setBuildings}
        tanks={tanks}
        setTanks={setTanks}
        tables={tables}
        setTables={setTables}
        controlMode={controlMode}
        setControlMode={setControlMode}
        azimuth={azimuth}
        setAzimuth={setAzimuth}
        elevation={elevation}
        setElevation={setElevation}
        date={date}
        setDate={setDate}
        time={time}
        setTime={setTime}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        metrics={metrics}
      />
    </div>
  );
}
