import React, { useState } from "react";
import { responders } from "../data/mock";

const statusColor: Record<string, string> = {
  Deployed: "text-critical bg-critical/10 border-critical/30",
  "On Site": "text-warn bg-warn/10 border-warn/30",
  "En Route": "text-primary bg-primary/10 border-primary/30",
  Standby: "text-safe bg-safe/10 border-safe/30",
};

const typeIcons: Record<string, string> = {
  Rescue: "🦺",
  Fire: "🔥",
  Medical: "🏥",
  "Water Rescue": "🚤",
  NDRF: "⚡",
  Police: "👮",
};

export default function Responders() {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? responders : responders.filter((r) => r.status === filter);

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold font-display text-foreground">Responder Units</h2>
          <p className="text-sm text-muted-foreground font-mono">
            {responders.filter((r) => r.status !== "Standby").length} active · {responders.filter((r) => r.status === "Standby").length} standby
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border border-border overflow-hidden">
            {["All", "Deployed", "En Route", "On Site", "Standby"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 text-xs font-mono transition-colors ${
                  filter === s ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex rounded-md border border-border overflow-hidden">
            <button
              onClick={() => setView("grid")}
              className={`p-1.5 transition-colors ${view === "grid" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setView("table")}
              className={`p-1.5 transition-colors ${view === "table" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Status overview */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Units", value: responders.length, color: "text-foreground" },
          { label: "Deployed", value: responders.filter(r => r.status === "Deployed" || r.status === "On Site").length, color: "text-critical" },
          { label: "En Route", value: responders.filter(r => r.status === "En Route").length, color: "text-warn" },
          { label: "Standby", value: responders.filter(r => r.status === "Standby").length, color: "text-safe" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-4">
            <div className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground font-display mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <div key={r.id} className="bg-card border border-border rounded-lg p-5 hover:border-primary/40 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{typeIcons[r.type] ?? "👥"}</div>
                  <div>
                    <div className="text-sm font-semibold font-display text-foreground">{r.name}</div>
                    <div className="text-[11px] font-mono text-muted-foreground">{r.id} · {r.type}</div>
                  </div>
                </div>
                <span className={`text-[10px] font-mono px-2 py-1 rounded border font-semibold ${statusColor[r.status]}`}>
                  {r.status}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-muted-foreground truncate">{r.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-muted-foreground">{r.members} members</span>
                </div>
                {r.incident && (
                  <div className="flex items-center gap-2 text-xs">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="font-mono text-primary">{r.incident}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground font-mono">{r.last_update}</span>
                <button className="text-xs text-primary hover:underline font-mono">Contact →</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Unit", "Type", "Status", "Location", "Incident", "Members", "Last Update", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-secondary transition-colors">
                  <td className="px-4 py-3">
                    <div className="text-xs font-semibold font-display text-foreground">{r.name}</div>
                    <div className="text-[10px] font-mono text-muted-foreground">{r.id}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{typeIcons[r.type]} {r.type}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${statusColor[r.status]}`}>{r.status}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground max-w-[160px] truncate">{r.location}</td>
                  <td className="px-4 py-3 text-xs font-mono text-primary">{r.incident ?? "—"}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{r.members}</td>
                  <td className="px-4 py-3 text-[10px] text-muted-foreground font-mono">{r.last_update}</td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-primary hover:underline font-mono">Contact</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
