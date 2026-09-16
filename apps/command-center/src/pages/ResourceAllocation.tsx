import React, { useState } from "react";
import { resources } from "../data/mock";

const resourceIcons: Record<string, string> = {
  "Food Packets": "🍱",
  "Medicine Kits": "💊",
  "Rescue Vehicles": "🚗",
  "Water Supply": "💧",
  "Boats": "🚤",
  "Generators": "⚡",
  "Tents": "⛺",
  "Life Jackets": "🦺",
};

export default function ResourceAllocation() {
  const [requestModal, setRequestModal] = useState<string | null>(null);
  const [requested, setRequested] = useState<Set<string>>(new Set());

  const handleRequest = (name: string) => {
    setRequested((p) => new Set([...p, name]));
    setRequestModal(null);
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold font-display text-foreground">Resource Allocation</h2>
          <p className="text-sm text-muted-foreground font-mono">Inventory levels · Real-time tracking</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-display font-medium hover:opacity-90 transition-opacity">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
          Request Supply
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Critical Supply", count: resources.filter(r => (r.used / r.total) >= 0.85).length, color: "text-critical", bg: "bg-critical/10" },
          { label: "Low Supply", count: resources.filter(r => { const p = r.used / r.total; return p >= 0.70 && p < 0.85; }).length, color: "text-warn", bg: "bg-warn/10" },
          { label: "Adequate", count: resources.filter(r => (r.used / r.total) < 0.70).length, color: "text-safe", bg: "bg-safe/10" },
          { label: "Requests Pending", count: requested.size, color: "text-primary", bg: "bg-primary/10" },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} border border-border rounded-lg p-4`}>
            <div className={`text-2xl font-bold font-mono ${s.color}`}>{s.count}</div>
            <div className="text-xs text-muted-foreground font-display mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Resource grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {resources.map((r) => {
          const pct = Math.round((r.used / r.total) * 100);
          const avail = r.total - r.used;
          const isRequested = requested.has(r.name);

          return (
            <div key={r.name} className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{resourceIcons[r.name] ?? "📦"}</span>
                  <div>
                    <h3 className="text-sm font-semibold font-display text-foreground">{r.name}</h3>
                    <p className="text-xs text-muted-foreground font-mono">
                      {r.used.toLocaleString()} / {r.total.toLocaleString()} {r.unit}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isRequested && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border text-primary bg-primary/10 border-primary/30">
                      REQUESTED
                    </span>
                  )}
                  <span
                    className={`text-lg font-bold font-mono ${
                      pct >= 85 ? "text-critical" : pct >= 70 ? "text-warn" : "text-safe"
                    }`}
                  >
                    {pct}%
                  </span>
                </div>
              </div>

              {/* Progress bar with segments */}
              <div className="h-3 bg-muted rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full transition-all ${
                    pct >= 85 ? "bg-critical" : pct >= 70 ? "bg-warn" : "bg-safe"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-muted-foreground">Deployed</div>
                    <div className="text-sm font-mono font-bold text-foreground">{r.used.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-muted-foreground">Available</div>
                    <div className={`text-sm font-mono font-bold ${avail < r.total * 0.15 ? "text-critical" : "text-safe"}`}>
                      {avail.toLocaleString()}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setRequestModal(r.name)}
                  className="text-xs font-mono text-primary hover:underline"
                >
                  Request more
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Allocation by District */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="text-sm font-semibold font-display text-foreground mb-4">Allocation by District</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["District", "Food Packets", "Medicine Kits", "Vehicles", "Water (kL)", "Status"].map((h) => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { district: "Patna", food: 4200, medicine: 680, vehicles: 18, water: 180000, status: "Critical" },
                { district: "Vaishali", food: 2100, medicine: 340, vehicles: 8, water: 85000, status: "High" },
                { district: "Muzaffarpur", food: 1200, medicine: 210, vehicles: 5, water: 32000, status: "Medium" },
                { district: "Darbhanga", food: 840, medicine: 120, vehicles: 3, water: 15000, status: "Low" },
              ].map((d) => (
                <tr key={d.district} className="hover:bg-secondary transition-colors">
                  <td className="px-3 py-3 text-sm font-display font-medium text-foreground">{d.district}</td>
                  <td className="px-3 py-3 text-xs font-mono text-muted-foreground">{d.food.toLocaleString()}</td>
                  <td className="px-3 py-3 text-xs font-mono text-muted-foreground">{d.medicine.toLocaleString()}</td>
                  <td className="px-3 py-3 text-xs font-mono text-muted-foreground">{d.vehicles}</td>
                  <td className="px-3 py-3 text-xs font-mono text-muted-foreground">{(d.water / 1000).toFixed(0)}kL</td>
                  <td className="px-3 py-3">
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border font-semibold ${
                      d.status === "Critical" ? "text-critical bg-critical/10 border-critical/30" :
                      d.status === "High" ? "text-warn bg-warn/10 border-warn/30" :
                      d.status === "Medium" ? "text-primary bg-primary/10 border-primary/30" :
                      "text-safe bg-safe/10 border-safe/30"
                    }`}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request modal */}
      {requestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setRequestModal(null)}>
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-sm mx-4 fade-up" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-sm font-bold font-display text-foreground mb-1">Request Supply</h3>
            <p className="text-xs text-muted-foreground mb-4">{requestModal}</p>
            <div className="flex flex-col gap-3">
              <input
                type="number"
                placeholder="Quantity"
                className="w-full text-sm bg-secondary border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring font-mono"
              />
              <select className="w-full text-sm bg-secondary border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                <option>Patna Central Store</option>
                <option>State Emergency Reserve</option>
                <option>NDRF Depot</option>
              </select>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => handleRequest(requestModal)}
                  className="flex-1 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold font-display hover:opacity-90 transition-opacity"
                >
                  Submit Request
                </button>
                <button
                  onClick={() => setRequestModal(null)}
                  className="flex-1 py-2.5 rounded-md border border-border text-foreground text-sm font-display hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
