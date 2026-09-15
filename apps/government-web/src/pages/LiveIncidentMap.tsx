import React, { useState } from "react";
import { incidents, responders, shelters } from "../data/mock";
import IncidentDrawer from "../components/IncidentDrawer";
import type { Incident } from "../types";

const LAYERS = ["SOS Incidents", "Responders", "Shelters", "Flood Zones", "Fire Zones", "Weather Layer"];
const PRIORITIES = ["All", "Critical", "High", "Medium", "Low"];
const TYPES = ["All", "Flood", "Fire", "Medical", "Landslide"];
const DISTRICTS = ["All", "Patna", "Muzaffarpur", "Darbhanga", "Nalanda"];
const STATUSES = ["All", "Active", "Resolved"];

const incidentTypeColor: Record<string, string> = {
  Flood: "#3B82F6",
  Fire: "#F97316",
  Medical: "#22C55E",
  Landslide: "#CA8A04",
};

const priorityColor: Record<string, string> = {
  Critical: "text-critical bg-critical/10 border-critical/30",
  High: "text-warn bg-warn/10 border-warn/30",
  Medium: "text-primary bg-primary/10 border-primary/30",
  Low: "text-safe bg-safe/10 border-safe/30",
};

export default function LiveIncidentMap({ onNavigate }: { onNavigate?: (p: string) => void }) {
  const [layers, setLayers] = useState<Set<string>>(new Set(LAYERS));
  const [priority, setPriority] = useState("All");
  const [type, setType] = useState("All");
  const [district, setDistrict] = useState("All");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState<Incident | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(true);

  const toggleLayer = (l: string) => {
    const next = new Set(layers);
    next.has(l) ? next.delete(l) : next.add(l);
    setLayers(next);
  };

  const filtered = incidents.filter((inc) => {
    if (priority !== "All" && inc.priority !== priority) return false;
    if (type !== "All" && inc.type !== type) return false;
    if (district !== "All" && inc.district !== district) return false;
    if (status !== "All" && inc.status !== status) return false;
    return true;
  });

  return (
    <div className="flex h-full relative">
      {/* Map area */}
      <div className="flex-1 relative bg-[#07101E] overflow-hidden">
        {/* Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95].map((v) => (
            <React.Fragment key={v}>
              <line x1={v} y1="0" x2={v} y2="100" stroke="#4B6FA5" strokeWidth="0.2" />
              <line x1="0" y1={v} x2="100" y2={v} stroke="#4B6FA5" strokeWidth="0.2" />
            </React.Fragment>
          ))}
        </svg>

        {/* District label */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[11px] text-blue-300/40 tracking-widest uppercase">
          Bihar · District Emergency Map
        </div>

        {/* Flood zones layer */}
        {layers.has("Flood Zones") && (
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <ellipse cx="38" cy="48" rx="16" ry="10" fill="#3B82F6" fillOpacity="0.14" stroke="#3B82F6" strokeWidth="0.4" strokeOpacity="0.5" />
            <ellipse cx="52" cy="36" rx="12" ry="8" fill="#3B82F6" fillOpacity="0.10" stroke="#3B82F6" strokeWidth="0.3" strokeOpacity="0.4" />
            <ellipse cx="28" cy="58" rx="9" ry="6" fill="#3B82F6" fillOpacity="0.12" stroke="#3B82F6" strokeWidth="0.3" strokeOpacity="0.4" />
          </svg>
        )}

        {/* Fire zones layer */}
        {layers.has("Fire Zones") && (
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <ellipse cx="68" cy="55" rx="9" ry="6" fill="#F97316" fillOpacity="0.15" stroke="#F97316" strokeWidth="0.4" strokeOpacity="0.5" />
          </svg>
        )}

        {/* Weather layer */}
        {layers.has("Weather Layer") && (
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <ellipse cx="50" cy="40" rx="35" ry="25" fill="#7C3AED" fillOpacity="0.06" stroke="#7C3AED" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 2" />
          </svg>
        )}

        {/* Rivers */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 5,52 Q 25,47 50,54 Q 72,60 95,52" fill="none" stroke="#60A5FA" strokeWidth="1" strokeOpacity="0.35" />
          <path d="M 18,18 Q 34,36 50,54" fill="none" stroke="#93C5FD" strokeWidth="0.6" strokeOpacity="0.25" />
        </svg>

        {/* Incident markers */}
        {layers.has("SOS Incidents") && filtered.map((inc) => {
          const color = incidentTypeColor[inc.type] ?? "#6B7280";
          return (
            <button
              key={inc.id}
              onClick={() => setSelected(inc as Incident)}
              className="absolute group"
              style={{ left: `${inc.coords.x}%`, top: `${inc.coords.y}%`, transform: "translate(-50%, -50%)", zIndex: 20 }}
            >
              <div className="relative">
                {inc.status === "Active" && (
                  <div
                    className="absolute inset-0 rounded-full opacity-50"
                    style={{ backgroundColor: color, animation: "pulse-ring 1.8s ease-out infinite" }}
                  />
                )}
                <div
                  className="w-4 h-4 rounded-full border-2 border-white/80 relative z-10 flex items-center justify-center"
                  style={{ backgroundColor: color }}
                />
              </div>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-xl">
                  <div className="text-[11px] font-mono text-muted-foreground">{inc.id}</div>
                  <div className="text-xs font-display font-semibold text-foreground">{inc.type} · {inc.priority}</div>
                  <div className="text-[11px] text-muted-foreground">{inc.citizen}</div>
                </div>
              </div>
            </button>
          );
        })}

        {/* Responder markers */}
        {layers.has("Responders") && responders.map((r) => (
          <div
            key={r.id}
            className="absolute group"
            style={{ left: `${r.coords.x}%`, top: `${r.coords.y}%`, transform: "translate(-50%, -50%)", zIndex: 15 }}
          >
            <div className={`w-3 h-3 rounded-sm border border-white/60 ${
              r.status === "Standby" ? "bg-safe" : r.status === "En Route" ? "bg-warn" : "bg-critical"
            }`} />
            <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
              <div className="bg-card border border-border rounded px-2 py-1">
                <div className="text-[10px] font-mono text-foreground">{r.name} · {r.status}</div>
              </div>
            </div>
          </div>
        ))}

        {/* Shelter markers */}
        {layers.has("Shelters") && shelters.map((s) => (
          <div
            key={s.id}
            className="absolute group"
            style={{ left: `${s.coords.x}%`, top: `${s.coords.y}%`, transform: "translate(-50%, -50%)", zIndex: 15 }}
          >
            <div className="w-3.5 h-3.5 bg-purple-400 rotate-45 border border-white/50" />
            <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
              <div className="bg-card border border-border rounded px-2 py-1">
                <div className="text-[10px] font-mono text-foreground">{s.name}</div>
                <div className="text-[10px] text-muted-foreground">{s.occupied}/{s.capacity}</div>
              </div>
            </div>
          </div>
        ))}

        {/* Incident count badge */}
        <div className="absolute top-10 right-4 bg-card/90 border border-border rounded-lg p-3">
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">Active Incidents</div>
          {[
            { label: "Critical", count: filtered.filter(i => i.priority === "Critical" && i.status === "Active").length, color: "text-critical" },
            { label: "High", count: filtered.filter(i => i.priority === "High" && i.status === "Active").length, color: "text-warn" },
            { label: "Medium", count: filtered.filter(i => i.priority === "Medium" && i.status === "Active").length, color: "text-primary" },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between gap-4 mb-1">
              <span className="text-[11px] text-muted-foreground">{item.label}</span>
              <span className={`text-sm font-bold font-mono ${item.color}`}>{item.count}</span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-black/75 rounded-lg px-3 py-2.5 flex flex-col gap-1.5">
          {[
            { label: "Flood SOS", color: "#3B82F6", shape: "circle" },
            { label: "Fire SOS", color: "#F97316", shape: "circle" },
            { label: "Medical", color: "#22C55E", shape: "circle" },
            { label: "Landslide", color: "#CA8A04", shape: "circle" },
            { label: "Responder", color: "#10B981", shape: "square" },
            { label: "Shelter", color: "#A78BFA", shape: "diamond" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <div
                className={l.shape === "diamond" ? "rotate-45" : ""}
                style={{
                  width: 8, height: 8,
                  backgroundColor: l.color,
                  borderRadius: l.shape === "circle" ? "50%" : l.shape === "square" ? 2 : 0,
                  flexShrink: 0,
                }}
              />
              <span className="text-[10px] text-white/60 font-mono">{l.label}</span>
            </div>
          ))}
        </div>

        {/* Coordinates */}
        <div className="absolute bottom-4 right-4 font-mono text-[10px] text-blue-400/40 text-right">
          <div>25.5941°N 85.1376°E</div>
          <div className="mt-0.5 text-blue-400/30">Zoom: District Level</div>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-72 flex-shrink-0 bg-card border-l border-border flex flex-col overflow-hidden">
        {/* Layers */}
        <div className="px-4 py-3 border-b border-border">
          <div className="text-xs font-semibold font-display text-foreground mb-2.5">Map Layers</div>
          <div className="flex flex-col gap-1.5">
            {LAYERS.map((l) => (
              <label key={l} className="flex items-center gap-2 cursor-pointer group">
                <div
                  onClick={() => toggleLayer(l)}
                  className={`w-3.5 h-3.5 rounded border transition-colors ${
                    layers.has(l)
                      ? "bg-primary border-primary"
                      : "bg-transparent border-border group-hover:border-muted-foreground"
                  }`}
                >
                  {layers.has(l) && (
                    <svg viewBox="0 0 10 10" fill="white" className="w-3.5 h-3.5 -mt-px -ml-px">
                      <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{l}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 py-3 border-b border-border">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="text-xs font-semibold font-display text-foreground flex items-center justify-between w-full"
          >
            <span>Filters</span>
            <svg viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 text-muted-foreground transition-transform ${filtersOpen ? "" : "-rotate-90"}`}>
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {filtersOpen && (
            <div className="mt-2.5 flex flex-col gap-2">
              {[
                { label: "Priority", value: priority, options: PRIORITIES, set: setPriority },
                { label: "Type", value: type, options: TYPES, set: setType },
                { label: "District", value: district, options: DISTRICTS, set: setDistrict },
                { label: "Status", value: status, options: STATUSES, set: setStatus },
              ].map(({ label, value, options, set }) => (
                <div key={label}>
                  <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-1">{label}</div>
                  <select
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    className="w-full text-xs bg-secondary border border-border rounded px-2 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    {options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Incident list */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-2.5 flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-muted-foreground">
              {filtered.length} incident{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex flex-col divide-y divide-border">
            {filtered.map((inc) => (
              <button
                key={inc.id}
                onClick={() => setSelected(inc as Incident)}
                className={`flex items-start gap-2.5 px-4 py-3 hover:bg-secondary text-left transition-colors ${selected?.id === inc.id ? "bg-secondary" : ""}`}
              >
                <div
                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: incidentTypeColor[inc.type] ?? "#6B7280" }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-muted-foreground">{inc.id}</span>
                    <span className={`text-[9px] font-mono px-1 py-px rounded border ${priorityColor[inc.priority]}`}>
                      {inc.priority}
                    </span>
                  </div>
                  <div className="text-xs font-display font-medium text-foreground">{inc.type}</div>
                  <div className="text-[11px] text-muted-foreground truncate">{inc.location}</div>
                </div>
                <span className={`text-[10px] font-mono flex-shrink-0 ${inc.status === "Active" ? "text-critical" : "text-safe"}`}>
                  {inc.status}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <IncidentDrawer
          incident={selected}
          onClose={() => setSelected(null)}
          onNavigateAlerts={() => { setSelected(null); onNavigate?.("alerts"); }}
        />
      )}
    </div>
  );
}
