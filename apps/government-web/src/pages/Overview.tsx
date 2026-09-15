import React, { useState } from "react";
import { incidents, responders, shelters, globalTimeline } from "../data/mock";
import IncidentDrawer from "../components/IncidentDrawer";
import type { Incident } from "../types";

interface OverviewProps {
  onNavigate?: (page: string) => void;
}

const statCards = [
  {
    label: "Active SOS",
    value: "4",
    change: "+2 last hour",
    color: "text-critical",
    bg: "bg-critical/10",
    border: "border-critical/20",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: "High Priority Incidents",
    value: "7",
    change: "3 critical",
    color: "text-warn",
    bg: "bg-warn/10",
    border: "border-warn/20",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: "Responders Active",
    value: "5",
    change: "2 standby",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
      </svg>
    ),
  },
  {
    label: "Shelters Open",
    value: "5",
    change: "1,973 occupants",
    color: "text-safe",
    bg: "bg-safe/10",
    border: "border-safe/20",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    ),
  },
  {
    label: "Weather Alerts",
    value: "4",
    change: "1 red, 1 orange",
    color: "text-warn",
    bg: "bg-warn/10",
    border: "border-warn/20",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
      </svg>
    ),
  },
  {
    label: "Today's Rescues",
    value: "23",
    change: "↑ 8 from yesterday",
    color: "text-safe",
    bg: "bg-safe/10",
    border: "border-safe/20",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
  },
];

const incidentTypeColor: Record<string, string> = {
  Flood: "bg-blue-500",
  Fire: "bg-orange-500",
  Medical: "bg-green-500",
  Landslide: "bg-yellow-600",
  Other: "bg-gray-500",
};

const priorityDot: Record<string, string> = {
  Critical: "bg-critical",
  High: "bg-warn",
  Medium: "bg-primary",
  Low: "bg-safe",
};

export default function Overview({ onNavigate }: OverviewProps) {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="p-6 flex flex-col gap-5 max-w-[1440px] w-full mx-auto">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {statCards.map((s) => (
            <div key={s.label} className={`bg-card rounded-lg border ${s.border} p-4 fade-up`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`${s.bg} ${s.color} p-2 rounded-md`}>{s.icon}</div>
              </div>
              <div className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</div>
              <div className="text-xs text-foreground font-display font-medium mt-0.5">{s.label}</div>
              <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{s.change}</div>
            </div>
          ))}
        </div>

        {/* Main layout: map + sidebar */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4" style={{ minHeight: 400 }}>
          {/* Hero Map */}
          <div className="xl:col-span-2 bg-card rounded-lg border border-border overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-critical" style={{ animation: "blink 1.4s infinite" }} />
                <span className="text-sm font-semibold text-foreground font-display">Live Incident Map</span>
                <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">Bihar State</span>
              </div>
              <button
                onClick={() => onNavigate?.("map")}
                className="text-xs text-primary hover:underline font-mono"
              >
                Full Map →
              </button>
            </div>

            {/* Map area */}
            <div className="flex-1 relative bg-[#0a1628] overflow-hidden" style={{ minHeight: 300 }}>
              {/* Grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((v) => (
                  <React.Fragment key={v}>
                    <line x1={v} y1="0" x2={v} y2="100" stroke="#4B6FA5" strokeWidth="0.3" />
                    <line x1="0" y1={v} x2="100" y2={v} stroke="#4B6FA5" strokeWidth="0.3" />
                  </React.Fragment>
                ))}
              </svg>

              {/* Flood zones */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <ellipse cx="38" cy="48" rx="14" ry="9" fill="#3B82F6" fillOpacity="0.18" stroke="#3B82F6" strokeWidth="0.4" strokeOpacity="0.6" />
                <ellipse cx="52" cy="36" rx="10" ry="7" fill="#3B82F6" fillOpacity="0.13" stroke="#3B82F6" strokeWidth="0.4" strokeOpacity="0.5" />
                <ellipse cx="68" cy="55" rx="8" ry="5" fill="#F97316" fillOpacity="0.15" stroke="#F97316" strokeWidth="0.4" strokeOpacity="0.6" />
                <ellipse cx="75" cy="28" rx="7" ry="5" fill="#EAB308" fillOpacity="0.15" stroke="#EAB308" strokeWidth="0.4" strokeOpacity="0.5" />
              </svg>

              {/* Rivers */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 10,50 Q 30,45 50,52 Q 70,58 90,50" fill="none" stroke="#60A5FA" strokeWidth="0.8" strokeOpacity="0.5" />
                <path d="M 20,20 Q 35,35 50,52" fill="none" stroke="#93C5FD" strokeWidth="0.5" strokeOpacity="0.4" />
              </svg>

              {/* Incident markers */}
              {incidents.map((inc) => (
                <button
                  key={inc.id}
                  onClick={() => setSelectedIncident(inc as Incident)}
                  className="absolute group"
                  style={{ left: `${inc.coords.x}%`, top: `${inc.coords.y}%`, transform: "translate(-50%, -50%)" }}
                >
                  <div className="relative">
                    {inc.status === "Active" && (
                      <div
                        className={`absolute inset-0 rounded-full ${incidentTypeColor[inc.type] ?? "bg-gray-500"} opacity-40`}
                        style={{ animation: "pulse-ring 1.8s ease-out infinite" }}
                      />
                    )}
                    <div
                      className={`w-3.5 h-3.5 rounded-full border-2 border-white ${incidentTypeColor[inc.type] ?? "bg-gray-500"} relative z-10`}
                    />
                  </div>
                  <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-card border border-border rounded px-2 py-1 text-[10px] font-mono text-foreground z-20 pointer-events-none">
                    {inc.id} · {inc.type} · {inc.priority}
                  </div>
                </button>
              ))}

              {/* Responder markers */}
              {responders.filter((r) => r.status !== "Standby").map((r) => (
                <div
                  key={r.id}
                  className="absolute w-2.5 h-2.5 rounded-sm bg-safe border border-white/50"
                  style={{ left: `${r.coords.x}%`, top: `${r.coords.y}%`, transform: "translate(-50%, -50%)" }}
                  title={r.name}
                />
              ))}

              {/* Shelter markers */}
              {shelters.map((s) => (
                <div
                  key={s.id}
                  className="absolute w-3 h-3 flex items-center justify-center"
                  style={{ left: `${s.coords.x}%`, top: `${s.coords.y}%`, transform: "translate(-50%, -50%)" }}
                  title={s.name}
                >
                  <div className="w-2.5 h-2.5 bg-purple-400 rounded-sm rotate-45 border border-white/40" />
                </div>
              ))}

              {/* Legend */}
              <div className="absolute bottom-3 left-3 bg-black/70 rounded-lg px-3 py-2 flex flex-col gap-1.5">
                {[
                  { color: "bg-blue-500", label: "Flood" },
                  { color: "bg-orange-500", label: "Fire" },
                  { color: "bg-green-500", label: "Medical" },
                  { color: "bg-yellow-600", label: "Landslide" },
                  { color: "bg-safe rounded-sm", label: "Responder" },
                  { color: "bg-purple-400 rotate-45 rounded-sm", label: "Shelter" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 ${l.color}`} />
                    <span className="text-[10px] text-white/70 font-mono">{l.label}</span>
                  </div>
                ))}
              </div>

              {/* Coordinates */}
              <div className="absolute top-2 right-3 font-mono text-[10px] text-blue-300/50">
                25.5941°N · 85.1376°E
              </div>
            </div>
          </div>

          {/* Right panel: incidents + activity */}
          <div className="flex flex-col gap-3">
            {/* Active Incidents */}
            <div className="bg-card rounded-lg border border-border flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground font-display">Active Incidents</span>
                <button onClick={() => onNavigate?.("map")} className="text-[11px] text-primary font-mono hover:underline">View all</button>
              </div>
              <div className="flex flex-col divide-y divide-border max-h-48 overflow-y-auto">
                {incidents.filter((i) => i.status === "Active").map((inc) => (
                  <button
                    key={inc.id}
                    onClick={() => setSelectedIncident(inc as Incident)}
                    className="flex items-start gap-2.5 px-4 py-3 hover:bg-secondary text-left transition-colors"
                  >
                    <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${priorityDot[inc.priority]}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-mono text-muted-foreground">{inc.id}</span>
                        <span className="text-xs font-display font-medium text-foreground">{inc.type}</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground truncate">{inc.location}</div>
                    </div>
                    <span className={`text-[10px] font-mono flex-shrink-0 ${
                      inc.priority === "Critical" ? "text-critical" : inc.priority === "High" ? "text-warn" : "text-primary"
                    }`}>
                      {inc.priority}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Activity */}
            <div className="bg-card rounded-lg border border-border flex flex-col overflow-hidden flex-1">
              <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-critical" style={{ animation: "blink 1.4s infinite" }} />
                <span className="text-sm font-semibold text-foreground font-display">Live Activity</span>
              </div>
              <div className="flex flex-col gap-0 overflow-y-auto flex-1 py-1">
                {globalTimeline.slice(0, 8).map((ev, i) => (
                  <div key={i} className="flex gap-2.5 px-4 py-2 hover:bg-secondary transition-colors">
                    <span className="text-[10px] font-mono text-muted-foreground w-10 flex-shrink-0 mt-0.5">{ev.time}</span>
                    <div className="flex-1">
                      <span className="text-[11px] font-mono text-muted-foreground">{ev.id}</span>
                      <div className="text-xs text-foreground">{ev.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: shelters + responders summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded-lg border border-border">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <span className="text-sm font-semibold font-display text-foreground">Shelter Capacity</span>
              <button onClick={() => onNavigate?.("shelters")} className="text-[11px] text-primary font-mono hover:underline">Manage</button>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {shelters.slice(0, 4).map((s) => {
                const pct = Math.round((s.occupied / s.capacity) * 100);
                return (
                  <div key={s.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground font-display truncate max-w-[60%]">{s.name}</span>
                      <span className={`text-xs font-mono font-semibold ${pct >= 90 ? "text-critical" : pct >= 70 ? "text-warn" : "text-safe"}`}>
                        {pct}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${pct >= 90 ? "bg-critical" : pct >= 70 ? "bg-warn" : "bg-safe"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <span className="text-sm font-semibold font-display text-foreground">Responder Status</span>
              <button onClick={() => onNavigate?.("responders")} className="text-[11px] text-primary font-mono hover:underline">View all</button>
            </div>
            <div className="p-4 flex flex-col gap-2">
              {responders.map((r) => (
                <div key={r.id} className="flex items-center gap-3">
                  <div
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      r.status === "Deployed" || r.status === "On Site" ? "bg-critical" :
                      r.status === "En Route" ? "bg-warn" : "bg-safe"
                    }`}
                  />
                  <div className="flex-1 text-xs font-display font-medium text-foreground truncate">{r.name}</div>
                  <div className="text-[10px] font-mono text-muted-foreground">{r.type}</div>
                  <div className={`text-[10px] font-mono font-semibold ${
                    r.status === "Deployed" || r.status === "On Site" ? "text-critical" :
                    r.status === "En Route" ? "text-warn" : "text-safe"
                  }`}>
                    {r.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedIncident && (
        <IncidentDrawer
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
          onNavigateAlerts={() => { setSelectedIncident(null); onNavigate?.("alerts"); }}
        />
      )}
    </div>
  );
}
