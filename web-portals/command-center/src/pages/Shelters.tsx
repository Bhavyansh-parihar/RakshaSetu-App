import React, { useState } from "react";
import { shelters } from "../data/mock";

export default function Shelters() {
  const [selected, setSelected] = useState<string | null>(null);

  const totalCapacity = shelters.reduce((a, s) => a + s.capacity, 0);
  const totalOccupied = shelters.reduce((a, s) => a + s.occupied, 0);
  const overallPct = Math.round((totalOccupied / totalCapacity) * 100);

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold font-display text-foreground">Relief Shelters</h2>
          <p className="text-sm text-muted-foreground font-mono">
            {shelters.length} facilities · {totalOccupied.toLocaleString()} / {totalCapacity.toLocaleString()} occupied
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-display font-medium hover:opacity-90 transition-opacity">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Shelter
        </button>
      </div>

      {/* Summary bar */}
      <div className="bg-card border border-border rounded-lg p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-display font-semibold text-foreground">Overall Occupancy</span>
          <span className={`text-lg font-bold font-mono ${overallPct >= 85 ? "text-critical" : overallPct >= 70 ? "text-warn" : "text-safe"}`}>
            {overallPct}%
          </span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${overallPct >= 85 ? "bg-critical" : overallPct >= 70 ? "bg-warn" : "bg-safe"}`}
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <div className="text-[10px] font-mono uppercase text-muted-foreground">Total Capacity</div>
            <div className="text-xl font-bold font-mono text-foreground mt-0.5">{totalCapacity.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-muted-foreground">Occupied</div>
            <div className="text-xl font-bold font-mono text-foreground mt-0.5">{totalOccupied.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-muted-foreground">Available</div>
            <div className="text-xl font-bold font-mono text-safe mt-0.5">{(totalCapacity - totalOccupied).toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {shelters.map((s) => {
          const pct = Math.round((s.occupied / s.capacity) * 100);
          const isSelected = selected === s.id;
          const isLow = s.water_status === "Low" || s.food_days <= 2;

          return (
            <div
              key={s.id}
              onClick={() => setSelected(isSelected ? null : s.id)}
              className={`bg-card border rounded-lg p-5 cursor-pointer transition-all ${
                isSelected ? "border-primary shadow-lg shadow-primary/10" : "border-border hover:border-primary/40"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-mono text-muted-foreground">{s.id}</span>
                    {isLow && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border text-warn bg-warn/10 border-warn/30 font-semibold">
                        SUPPLY LOW
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold font-display text-foreground">{s.name}</h3>
                  <p className="text-[11px] text-muted-foreground font-mono">{s.district}</p>
                </div>
                <div
                  className={`text-sm font-bold font-mono ${pct >= 90 ? "text-critical" : pct >= 70 ? "text-warn" : "text-safe"}`}
                >
                  {pct}%
                </div>
              </div>

              {/* Capacity bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mb-1">
                  <span>{s.occupied} occupied</span>
                  <span>{s.capacity} capacity</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${pct >= 90 ? "bg-critical" : pct >= 70 ? "bg-warn" : "bg-safe"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-secondary rounded-md p-2 text-center">
                  <div className={`text-sm font-bold font-mono ${s.food_days <= 2 ? "text-critical" : s.food_days <= 4 ? "text-warn" : "text-safe"}`}>
                    {s.food_days}d
                  </div>
                  <div className="text-[9px] text-muted-foreground font-mono mt-0.5">Food Supply</div>
                </div>
                <div className="bg-secondary rounded-md p-2 text-center">
                  <div className={`text-sm font-bold font-mono ${s.water_status === "Low" ? "text-critical" : "text-safe"}`}>
                    {s.water_status === "Low" ? "LOW" : "OK"}
                  </div>
                  <div className="text-[9px] text-muted-foreground font-mono mt-0.5">Water</div>
                </div>
                <div className="bg-secondary rounded-md p-2 text-center">
                  <div className={`text-sm font-bold font-mono ${s.medical ? "text-safe" : "text-muted-foreground"}`}>
                    {s.medical ? "YES" : "NO"}
                  </div>
                  <div className="text-[9px] text-muted-foreground font-mono mt-0.5">Medical</div>
                </div>
              </div>

              {isSelected && (
                <div className="border-t border-border pt-3 mt-1 flex flex-col gap-2 fade-up">
                  <div className="text-[10px] text-muted-foreground font-mono">{s.contact}</div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 text-xs rounded-md bg-primary text-primary-foreground font-display font-medium hover:opacity-90 transition-opacity">
                      Request Supply
                    </button>
                    <button className="flex-1 py-2 text-xs rounded-md border border-border text-foreground font-display hover:bg-secondary transition-colors">
                      View Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
