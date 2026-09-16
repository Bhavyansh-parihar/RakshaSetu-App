import React, { useState } from "react";
import { globalTimeline, incidents } from "../data/mock";

const eventStyles: Record<string, { dot: string; bg: string; label: string }> = {
  sos: { dot: "bg-critical", bg: "bg-critical/10 border-critical/20", label: "SOS" },
  ai: { dot: "bg-primary", bg: "bg-primary/10 border-primary/20", label: "AI" },
  dispatch: { dot: "bg-warn", bg: "bg-warn/10 border-warn/20", label: "Dispatch" },
  update: { dot: "bg-blue-400", bg: "bg-blue-400/10 border-blue-400/20", label: "Update" },
  resolved: { dot: "bg-safe", bg: "bg-safe/10 border-safe/20", label: "Resolved" },
};

const priorityDot: Record<string, string> = {
  Critical: "bg-critical",
  High: "bg-warn",
  Medium: "bg-primary",
  Low: "bg-safe",
};

export default function IncidentTimeline() {
  const [filter, setFilter] = useState("All");
  const [incidentFilter, setIncidentFilter] = useState("All");

  const filteredEvents = globalTimeline.filter((ev) => {
    if (filter !== "All" && ev.type !== filter.toLowerCase()) return false;
    if (incidentFilter !== "All" && ev.id !== incidentFilter) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold font-display text-foreground">Incident Timeline</h2>
          <p className="text-sm text-muted-foreground font-mono">
            {filteredEvents.length} events · Today Sep 15, 2026
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-secondary rounded px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-critical" style={{ animation: "blink 1.4s infinite" }} />
          Live updating
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div>
          <span className="text-[10px] font-mono text-muted-foreground uppercase mr-2">Event Type</span>
          <div className="inline-flex rounded-md border border-border overflow-hidden">
            {["All", "SOS", "AI", "Dispatch", "Update", "Resolved"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-mono transition-colors ${
                  filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="text-[10px] font-mono text-muted-foreground uppercase mr-2">Incident</span>
          <select
            value={incidentFilter}
            onChange={(e) => setIncidentFilter(e.target.value)}
            className="text-xs bg-secondary border border-border rounded px-2 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-ring font-mono"
          >
            <option>All</option>
            {incidents.map((i) => <option key={i.id}>{i.id}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Main timeline */}
        <div className="xl:col-span-2">
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border" />

            {filteredEvents.map((ev, i) => {
              const style = eventStyles[ev.type] ?? eventStyles.update;
              return (
                <div key={i} className="relative mb-4 fade-up" style={{ animationDelay: `${i * 0.03}s` }}>
                  {/* Dot */}
                  <div className={`absolute -left-5 top-3 w-3 h-3 rounded-full border-2 border-card ${style.dot}`} />

                  <div className={`bg-card border rounded-lg px-4 py-3 ${style.bg}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[10px] font-mono font-semibold text-muted-foreground">{ev.time}</span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border font-semibold ${style.bg}`}>
                            {style.label}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground">{ev.id}</span>
                          <span className={`w-1.5 h-1.5 rounded-full ${priorityDot[ev.priority] ?? "bg-muted"}`} />
                          <span className="text-[10px] text-muted-foreground">{ev.priority}</span>
                        </div>
                        <p className="text-sm text-foreground">{ev.event}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats panel */}
        <div className="flex flex-col gap-4">
          {/* Event type breakdown */}
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-sm font-semibold font-display text-foreground mb-4">Event Breakdown</h3>
            <div className="flex flex-col gap-3">
              {Object.entries(eventStyles).map(([type, style]) => {
                const count = globalTimeline.filter((e) => e.type === type).length;
                const pct = Math.round((count / globalTimeline.length) * 100);
                return (
                  <div key={type}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                        <span className="text-xs font-display text-foreground capitalize">{type}</span>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground">{count}</span>
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${style.dot} rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active incidents */}
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-sm font-semibold font-display text-foreground mb-4">Active Incidents</h3>
            <div className="flex flex-col gap-2">
              {incidents.filter((i) => i.status === "Active").map((inc) => (
                <div key={inc.id} className="flex items-start gap-2.5 p-2.5 rounded-md bg-secondary">
                  <span className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${priorityDot[inc.priority]}`} />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-muted-foreground">{inc.id}</span>
                      <span className="text-xs font-display font-medium text-foreground">{inc.type}</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground">{inc.location}</div>
                    <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
                      {inc.responder} · {inc.responder_eta}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response stats */}
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-sm font-semibold font-display text-foreground mb-4">Today's Stats</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: "SOS Received", value: "16", color: "text-critical" },
                { label: "Dispatches", value: "14", color: "text-warn" },
                { label: "Resolved", value: "7", color: "text-safe" },
                { label: "Avg Response", value: "8.7 min", color: "text-primary" },
                { label: "Rescues Today", value: "23", color: "text-safe" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                  <span className={`text-sm font-bold font-mono ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
