import React from "react";
import {
  Sun,
  ShieldAlert,
  Layers,
  Play,
  Pause,
  RefreshCw,
  Cpu,
} from "lucide-react";
export default function Sidebar({
  buildings,
  setBuildings,
  tanks,
  setTanks,
  tables,
  setTables,
  controlMode,
  setControlMode,
  azimuth,
  setAzimuth,
  elevation,
  setElevation,
  date,
  setDate,
  time,
  setTime,
  isPlaying,
  setIsPlaying,
  metrics,
}) {
  const updateObject = (type, id, field, val) => {
    const numVal = parseFloat(val) || 0;
    if (type === "building") {
      setBuildings(
        buildings.map((b) => (b.id === id ? { ...b, [field]: numVal } : b)),
      );
    } else if (type === "tank") {
      setTanks(tanks.map((t) => (t.id === id ? { ...t, [field]: numVal } : t)));
    } else if (type === "table") {
      setTables(
        tables.map((t) => (t.id === id ? { ...t, [field]: numVal } : t)),
      );
    }
  };

  return (
    <div className="w-96 h-full bg-slate-900 border-l border-slate-800 flex flex-col overflow-y-auto p-5 space-y-6 text-sm shadow-2xl z-10">
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-amber-400 flex items-center gap-2">
            <Sun size={16} /> Heliostat Tracking System
          </h2>
          <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono">
            {azimuth}° Az / {elevation}° El
          </span>
        </div>

        <div className="flex gap-2 p-0.5 bg-slate-900 rounded-lg border border-slate-800">
          <button
            onClick={() => setControlMode("date")}
            className={`flex-1 py-1.5 rounded-md text-xs font-medium transition ${controlMode === "date" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
          >
            Solar Clock
          </button>
          <button
            onClick={() => setControlMode("manual")}
            className={`flex-1 py-1.5 rounded-md text-xs font-medium transition ${controlMode === "manual" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
          >
            Manual Angles
          </button>
        </div>

        {controlMode === "date" ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Target Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Timeline Coordinate
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex-1 py-1.5 rounded flex items-center justify-center gap-2 font-medium text-xs border transition ${isPlaying ? "bg-amber-600 border-amber-500 text-white" : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"}`}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                {isPlaying ? "Pause Diurnal Orbit" : "Simulate Day Cycle"}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Azimuth</span>
                <span>{azimuth}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={azimuth}
                onChange={(e) => setAzimuth(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Elevation</span>
                <span>{elevation}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                value={elevation}
                onChange={(e) => setElevation(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
        <h2 className="font-semibold text-blue-400 flex items-center gap-2">
          <Cpu size={16} /> Array Performance Engine
        </h2>

        {Object.entries(metrics.tables).map(([tableId, data]) => (
          <div
            key={tableId}
            className="border-b border-slate-800/80 pb-3 last:border-0 last:pb-0"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-slate-300 font-mono text-xs">
                {tableId.toUpperCase()}
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded ${data.avgEfficiency > 75 ? "bg-emerald-950 text-emerald-400 border border-emerald-800" : data.avgEfficiency > 40 ? "bg-amber-950 text-amber-400 border border-amber-800" : "bg-rose-950 text-rose-400 border border-rose-800"}`}
              >
                Eff: {data.avgEfficiency}%
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {data.panels.map((p) => (
                <div
                  key={p.id}
                  className="bg-slate-900 border border-slate-800 p-2 rounded text-[11px] space-y-1"
                >
                  <div className="text-slate-400 font-mono font-bold flex justify-between">
                    <span>{p.id}</span>
                    <span
                      className={
                        p.efficiency < 50 ? "text-rose-400" : "text-emerald-400"
                      }
                    >
                      {p.efficiency}%
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 flex justify-between">
                    <span>Shd: {p.shadeRatio}%</span>
                  </div>
                  <div
                    className="text-[10px] bg-slate-950 px-1 py-0.5 rounded text-cyan-400/90 font-mono flex justify-between"
                    title="Edge Occlusion Factor"
                  >
                    <span>EOF:</span>
                    <span>{p.eof}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 flex-1">
        <h2 className="font-semibold text-slate-300 flex items-center gap-2">
          <Layers size={16} /> Asset Transformer Panel
        </h2>

        {buildings.map((b) => (
          <div
            key={b.id}
            className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2"
          >
            <div className="text-xs font-bold text-slate-400">
              {b.name} (Cuboid)
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                X:{" "}
                <input
                  type="number"
                  step="0.5"
                  value={b.x}
                  onChange={(e) =>
                    updateObject("building", b.id, "x", e.target.value)
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-white"
                />
              </div>
              <div>
                Y:{" "}
                <input
                  type="number"
                  step="0.5"
                  value={b.y}
                  onChange={(e) =>
                    updateObject("building", b.id, "y", e.target.value)
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-white"
                />
              </div>
              <div>
                W:{" "}
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  value={b.width}
                  onChange={(e) =>
                    updateObject("building", b.id, "width", e.target.value)
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-white"
                />
              </div>
              <div>
                H:{" "}
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  value={b.height}
                  onChange={(e) =>
                    updateObject("building", b.id, "height", e.target.value)
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-white"
                />
              </div>
            </div>
          </div>
        ))}

        {tanks.map((t) => (
          <div
            key={t.id}
            className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2"
          >
            <div className="text-xs font-bold text-slate-400">
              {t.name} (Cylinder)
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                X:{" "}
                <input
                  type="number"
                  step="0.5"
                  value={t.x}
                  onChange={(e) =>
                    updateObject("tank", t.id, "x", e.target.value)
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-white"
                />
              </div>
              <div>
                Y:{" "}
                <input
                  type="number"
                  step="0.5"
                  value={t.y}
                  onChange={(e) =>
                    updateObject("tank", t.id, "y", e.target.value)
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-white"
                />
              </div>
              <div>
                Rad:{" "}
                <input
                  type="number"
                  min="0.5"
                  step="0.2"
                  value={t.radius}
                  onChange={(e) =>
                    updateObject("tank", t.id, "radius", e.target.value)
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-white"
                />
              </div>
              <div>
                H:{" "}
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  value={t.height}
                  onChange={(e) =>
                    updateObject("tank", t.id, "height", e.target.value)
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-white"
                />
              </div>
            </div>
          </div>
        ))}

        {tables.map((tbl) => (
          <div
            key={tbl.id}
            className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2"
          >
            <div className="text-xs font-bold text-blue-400">
              {tbl.name} (Fixed Tilt 15°)
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                Pos X:{" "}
                <input
                  type="number"
                  step="0.5"
                  value={tbl.x}
                  onChange={(e) =>
                    updateObject("table", tbl.id, "x", e.target.value)
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-white"
                />
              </div>
              <div>
                Pos Y:{" "}
                <input
                  type="number"
                  step="0.5"
                  value={tbl.y}
                  onChange={(e) =>
                    updateObject("table", tbl.id, "y", e.target.value)
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-white"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
