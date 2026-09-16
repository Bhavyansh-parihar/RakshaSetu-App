import React, { useState } from "react";

const LANGUAGES = ["English", "Hindi", "Maithili", "Bhojpuri", "Urdu"];
const TARGETS = [
  { id: "district", label: "Entire District", desc: "All registered citizens in Patna district" },
  { id: "region", label: "Selected Region", desc: "Target specific zones or wards" },
  { id: "shelter", label: "Shelter Occupants", desc: "People checked into relief shelters" },
];
const ALERT_TYPES = ["Evacuation Order", "Flood Warning", "Road Closure", "Rescue Operation", "General Advisory"];
const SEVERITIES = ["Critical", "High", "Medium", "Informational"];

const TEMPLATES = {
  "Evacuation Order": "URGENT: Mandatory evacuation order issued for [ZONE]. Rising flood waters are posing an immediate threat to life. All residents must evacuate immediately to nearest designated shelter. Rescue teams are standing by.",
  "Flood Warning": "FLOOD WARNING: River Ganga water levels have crossed danger mark at [LOCATION]. Residents in low-lying areas must move to higher ground immediately. Avoid flood-affected roads.",
  "Road Closure": "TRAFFIC ADVISORY: [ROAD] is closed due to flood damage / ongoing rescue operations. Use alternative routes. Stay updated via this channel.",
  "Rescue Operation": "RESCUE OPERATION ACTIVE: Our teams are conducting rescue operations in [AREA]. Please cooperate with rescue personnel. If you need immediate help, call 112.",
  "General Advisory": "ADVISORY: Stay indoors and avoid unnecessary travel. Monitor this channel for updates. In case of emergency, call 112 or send SOS via RakshaSetu app.",
};

export default function BroadcastAlerts() {
  const [alertType, setAlertType] = useState(ALERT_TYPES[0]);
  const [severity, setSeverity] = useState(SEVERITIES[0]);
  const [target, setTarget] = useState("district");
  const [language, setLanguage] = useState("Hindi");
  const [message, setMessage] = useState(TEMPLATES[ALERT_TYPES[0] as keyof typeof TEMPLATES]);
  const [previewMode, setPreviewMode] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentAlerts, setSentAlerts] = useState([
    { id: "ALT-108", type: "Flood Warning", severity: "Critical", target: "Entire District", time: "07:10", reach: "1,24,582" },
    { id: "ALT-107", type: "Evacuation Order", severity: "Critical", target: "Digha Ghat Region", time: "07:03", reach: "8,420" },
    { id: "ALT-106", type: "Road Closure", severity: "Medium", target: "Entire District", time: "06:45", reach: "1,24,582" },
  ]);

  const handleSend = () => {
    const newAlert = {
      id: `ALT-${109 + sentAlerts.length}`,
      type: alertType,
      severity,
      target: TARGETS.find((t) => t.id === target)?.label ?? target,
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false }),
      reach: target === "district" ? "1,24,582" : target === "shelter" ? "1,973" : "~12,000",
    };
    setSentAlerts([newAlert, ...sentAlerts]);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const severityColor: Record<string, string> = {
    Critical: "text-critical bg-critical/10 border-critical/30",
    High: "text-warn bg-warn/10 border-warn/30",
    Medium: "text-primary bg-primary/10 border-primary/30",
    Informational: "text-safe bg-safe/10 border-safe/30",
  };

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold font-display text-foreground">Broadcast Alerts</h2>
          <p className="text-sm text-muted-foreground font-mono">Compose and send emergency notifications</p>
        </div>
        {sent && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-safe/10 border border-safe/30 text-safe text-sm font-mono fade-up">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Alert broadcast successfully
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Compose panel */}
        <div className="xl:col-span-2 flex flex-col gap-4">
          {/* Alert type + severity row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-2">Alert Type</label>
              <select
                value={alertType}
                onChange={(e) => {
                  setAlertType(e.target.value);
                  setMessage(TEMPLATES[e.target.value as keyof typeof TEMPLATES] ?? "");
                }}
                className="w-full text-sm bg-secondary border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring font-display"
              >
                {ALERT_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-2">Severity</label>
              <div className="flex gap-1.5 flex-wrap">
                {SEVERITIES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSeverity(s)}
                    className={`text-[11px] font-mono px-2.5 py-1.5 rounded border font-semibold transition-all ${
                      severity === s ? severityColor[s] : "border-border text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Target selection */}
          <div className="bg-card border border-border rounded-lg p-4">
            <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-3">Target Audience</label>
            <div className="grid grid-cols-3 gap-2">
              {TARGETS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTarget(t.id)}
                  className={`text-left p-3 rounded-md border transition-all ${
                    target === t.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/40 hover:bg-secondary"
                  }`}
                >
                  <div className="text-xs font-display font-semibold text-foreground mb-0.5">{t.label}</div>
                  <div className="text-[10px] text-muted-foreground">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Language</label>
              <span className="text-[10px] font-mono text-primary">AI Translation Available</span>
            </div>
            <div className="flex gap-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-3 py-1.5 rounded-md border text-xs font-display transition-all ${
                    language === l ? "border-primary bg-primary/10 text-primary font-medium" : "border-border text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Message composer */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Message</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded border transition-colors ${
                    previewMode ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {previewMode ? "Edit" : "Preview"}
                </button>
              </div>
            </div>
            {previewMode ? (
              <div className="bg-secondary rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${severityColor[severity]}`}>
                    {severity.toUpperCase()}
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">RakshaSetu Emergency Alert</span>
                </div>
                <div className="text-xs font-display font-semibold text-foreground mb-2">{alertType}</div>
                <div className="text-sm text-foreground leading-relaxed">{message}</div>
                <div className="mt-3 pt-3 border-t border-border text-[10px] font-mono text-muted-foreground">
                  Target: {TARGETS.find((t) => t.id === target)?.label} · Language: {language} · Reach: ~{target === "district" ? "1,24,582" : target === "shelter" ? "1,973" : "12,000"} people
                </div>
              </div>
            ) : (
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full text-sm bg-secondary border border-border rounded-lg px-3 py-2.5 text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-ring leading-relaxed"
                placeholder="Type your emergency message..."
              />
            )}
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] font-mono text-muted-foreground">{message.length} characters</span>
              {message.length > 500 && (
                <span className="text-[10px] font-mono text-warn">Long message may be split into multiple SMS</span>
              )}
            </div>
          </div>

          <button
            onClick={handleSend}
            className={`w-full py-3 rounded-lg font-display font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
              severity === "Critical"
                ? "bg-critical text-white hover:opacity-90"
                : severity === "High"
                  ? "bg-warn text-white hover:opacity-90"
                  : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
            </svg>
            Broadcast {severity} Alert to {TARGETS.find((t) => t.id === target)?.label}
          </button>
        </div>

        {/* Sent history */}
        <div className="bg-card border border-border rounded-lg flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="text-sm font-semibold font-display text-foreground">Sent Alerts</h3>
            <p className="text-[11px] text-muted-foreground font-mono mt-0.5">Today · Sep 15, 2026</p>
          </div>
          <div className="flex flex-col divide-y divide-border overflow-y-auto flex-1">
            {sentAlerts.map((a) => (
              <div key={a.id} className="px-4 py-3 hover:bg-secondary transition-colors">
                <div className="flex items-start justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-muted-foreground">{a.id}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">{a.time}</span>
                </div>
                <div className="text-xs font-display font-medium text-foreground mb-1">{a.type}</div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border font-semibold ${severityColor[a.severity]}`}>
                    {a.severity}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{a.target}</span>
                </div>
                <div className="flex items-center gap-1 mt-1.5">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-safe">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-[10px] font-mono text-safe">{a.reach} reached</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
