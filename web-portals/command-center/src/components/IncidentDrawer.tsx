import React, { useState } from "react";
import type { Incident } from "../types";

interface IncidentDrawerProps {
  incident: Incident | null;
  onClose: () => void;
  onNavigateAlerts?: () => void;
}

const priorityColor: Record<string, string> = {
  Critical: "text-critical bg-critical/10 border-critical/30",
  High: "text-warn bg-warn/10 border-warn/30",
  Medium: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  Low: "text-safe bg-safe/10 border-safe/30",
};

const typeIcons: Record<string, string> = {
  Flood: "💧",
  Fire: "🔥",
  Medical: "🏥",
  Landslide: "⛰️",
  Other: "⚠️",
};

const eventColors: Record<string, string> = {
  sos: "bg-critical",
  ai: "bg-primary",
  dispatch: "bg-warn",
  update: "bg-blue-400",
  resolved: "bg-safe",
};

export default function IncidentDrawer({ incident, onClose, onNavigateAlerts }: IncidentDrawerProps) {
  const [responderOverride, setResponderOverride] = useState("");
  const [priority, setPriority] = useState(incident?.priority ?? "Critical");
  const [overrideMode, setOverrideMode] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const [overrideSaved, setOverrideSaved] = useState(false);

  if (!incident) return null;

  const handleSaveOverride = () => {
    setOverrideSaved(true);
    setOverrideMode(false);
    setTimeout(() => setOverrideSaved(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div
        className="w-full max-w-md h-full bg-card border-l border-border flex flex-col slide-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{typeIcons[incident.type] ?? "⚠️"}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{incident.id}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border font-semibold ${priorityColor[priority]}`}>
                  {priority}
                </span>
              </div>
              <h2 className="text-sm font-semibold text-foreground font-display">{incident.type} Incident</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5">
          {/* Citizen info */}
          <section>
            <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2.5">Citizen Information</h3>
            <div className="bg-secondary rounded-lg p-3.5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-foreground font-display">{incident.citizen}</div>
                  <div className="text-xs text-muted-foreground font-mono">{incident.phone}</div>
                </div>
                <a href={`tel:${incident.phone}`} className="p-2 rounded-md bg-safe/10 text-safe hover:bg-safe/20 transition-colors">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </a>
              </div>
              <div className="flex items-start gap-1.5">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs text-muted-foreground">{incident.location}</span>
              </div>
            </div>
          </section>

          {/* AI Assessment */}
          <section>
            <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2.5">AI Assessment</h3>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-secondary rounded-lg p-3">
                <div className="text-[10px] text-muted-foreground font-mono uppercase mb-1">Confidence</div>
                <div className="text-2xl font-bold font-mono text-primary">{incident.ai_confidence}%</div>
                <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${incident.ai_confidence}%` }} />
                </div>
              </div>
              <div className="bg-secondary rounded-lg p-3">
                <div className="text-[10px] text-muted-foreground font-mono uppercase mb-1">Priority Score</div>
                <div
                  className={`text-2xl font-bold font-mono ${
                    incident.priority_score >= 90 ? "text-critical" : incident.priority_score >= 75 ? "text-warn" : "text-safe"
                  }`}
                >
                  {incident.priority_score}
                </div>
                <div className="text-[10px] text-muted-foreground mt-1 font-mono">AI Generated · Read-only</div>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5 font-mono bg-secondary/50 rounded px-2.5 py-1.5">
              ⚠ AI scores are system-generated and cannot be manually modified.
            </p>
          </section>

          {/* Responder Assignment */}
          <section>
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Responder</h3>
              <button
                onClick={() => setOverrideMode(!overrideMode)}
                className="text-[11px] text-primary hover:underline font-mono"
              >
                {overrideMode ? "Cancel" : "Override"}
              </button>
            </div>
            {overrideMode ? (
              <div className="flex gap-2">
                <select
                  value={responderOverride}
                  onChange={(e) => setResponderOverride(e.target.value)}
                  className="flex-1 text-sm bg-secondary border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring font-mono"
                >
                  <option value="">Select team...</option>
                  <option>Team Alpha-3</option>
                  <option>Team Alpha-4</option>
                  <option>Fire Unit-7</option>
                  <option>NDRF Team-2</option>
                  <option>Boat Team-2</option>
                  <option>Medic Unit-5</option>
                </select>
                <button
                  onClick={handleSaveOverride}
                  disabled={!responderOverride}
                  className="px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40 transition-opacity"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="bg-secondary rounded-lg p-3.5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-foreground font-display">
                    {responderOverride || incident.responder}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">ETA: {incident.responder_eta}</div>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-safe/10 text-safe border border-safe/30">DEPLOYED</span>
              </div>
            )}
            {overrideSaved && (
              <p className="text-[11px] text-safe font-mono mt-1.5">✓ Responder assignment updated</p>
            )}
          </section>

          {/* Priority escalation */}
          <section>
            <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2.5">Priority Control</h3>
            <div className="flex gap-2">
              {["Low", "Medium", "High", "Critical"].map((p) => (
                <button
                  key={p}
                  onClick={() => { setPriority(p); setEscalated(true); }}
                  className={`flex-1 text-xs py-2 rounded-md border font-mono font-semibold transition-all ${
                    priority === p
                      ? priorityColor[p]
                      : "border-border text-muted-foreground hover:border-border hover:bg-secondary"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            {escalated && (
              <p className="text-[11px] text-warn font-mono mt-1.5">⚡ Priority updated to {priority} — notifying responders</p>
            )}
          </section>

          {/* Timeline */}
          <section>
            <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2.5">Timeline</h3>
            <div className="flex flex-col gap-0 relative">
              <div className="absolute left-[5px] top-2 bottom-2 w-[1px] bg-border" />
              {incident.timeline.map((event, i) => (
                <div key={i} className="flex gap-3 pb-3 relative pl-5">
                  <div
                    className={`absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${eventColors[event.type] ?? "bg-muted"}`}
                  />
                  <div>
                    <div className="text-xs text-foreground font-medium leading-tight">{event.event}</div>
                    <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{event.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Media */}
          {incident.media.length > 0 && (
            <section>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2.5">Uploaded Media</h3>
              <div className="flex gap-2 flex-wrap">
                {incident.media.map((m, i) => (
                  <div key={i} className="bg-secondary rounded-md px-3 py-2 text-xs text-muted-foreground font-mono flex items-center gap-1.5">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    {m}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex-shrink-0 border-t border-border p-4 flex gap-2">
          <button
            onClick={onNavigateAlerts}
            className="flex-1 py-2.5 rounded-md bg-warn text-white text-sm font-semibold font-display transition-opacity hover:opacity-90"
          >
            Broadcast Alert
          </button>
          <button className="flex-1 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold font-display transition-opacity hover:opacity-90">
            Add Rescue Team
          </button>
        </div>
      </div>
    </div>
  );
}
