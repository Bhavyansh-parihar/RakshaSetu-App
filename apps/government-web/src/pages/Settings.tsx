import React, { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    sos: true, dispatch: true, weather: true, broadcasts: false, reports: true,
  });
  const [saved, setSaved] = useState(false);
  const [aiThreshold, setAiThreshold] = useState(75);
  const [autoEscalate, setAutoEscalate] = useState(true);
  const [mapRefresh, setMapRefresh] = useState("30");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative w-10 h-5 rounded-full transition-colors ${value ? "bg-primary" : "bg-muted"}`}
    >
      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold font-display text-foreground">Settings</h2>
          <p className="text-sm text-muted-foreground font-mono">System configuration · SDMA Bihar</p>
        </div>
        <div className="flex items-center gap-2">
          {saved && (
            <span className="text-xs font-mono text-safe fade-up">✓ Settings saved</span>
          )}
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-display font-medium hover:opacity-90 transition-opacity"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {/* Profile */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold font-display text-foreground mb-4">User Profile</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-lg font-bold font-display">
              DM
            </div>
            <div>
              <div className="text-sm font-semibold font-display text-foreground">District Magistrate</div>
              <div className="text-xs text-muted-foreground font-mono">Patna HQ · Super Admin</div>
              <div className="text-xs text-muted-foreground font-mono">dm.patna@bihar.gov.in</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">Full Name</label>
              <input defaultValue="Shri Rajnath Prasad IAS" className="w-full text-sm bg-secondary border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">Contact</label>
              <input defaultValue="+91 98765 00001" className="w-full text-sm bg-secondary border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring font-mono" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold font-display text-foreground mb-4">Notification Preferences</h3>
          <div className="flex flex-col gap-3">
            {[
              { key: "sos" as const, label: "New SOS Alerts", desc: "Immediate notification for new SOS signals" },
              { key: "dispatch" as const, label: "Responder Dispatch", desc: "Updates on team deployment" },
              { key: "weather" as const, label: "Weather Alerts", desc: "Aurora model weather warnings" },
              { key: "broadcasts" as const, label: "Broadcast Confirmations", desc: "Alert delivery confirmations" },
              { key: "reports" as const, label: "Daily Reports", desc: "Morning situation report" },
            ].map((n) => (
              <div key={n.key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <div className="text-sm font-display text-foreground">{n.label}</div>
                  <div className="text-xs text-muted-foreground">{n.desc}</div>
                </div>
                <Toggle
                  value={notifications[n.key]}
                  onChange={() => setNotifications((p) => ({ ...p, [n.key]: !p[n.key] }))}
                />
              </div>
            ))}
          </div>
        </div>

        {/* AI & Automation */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold font-display text-foreground mb-4">AI & Automation</h3>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-sm font-display text-foreground">AI Confidence Threshold</div>
                  <div className="text-xs text-muted-foreground">Minimum confidence for auto-classification</div>
                </div>
                <span className="text-sm font-bold font-mono text-primary">{aiThreshold}%</span>
              </div>
              <input
                type="range" min={50} max={99} value={aiThreshold}
                onChange={(e) => setAiThreshold(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div className="flex items-center justify-between py-2 border-t border-border">
              <div>
                <div className="text-sm font-display text-foreground">Auto-Escalate Critical Incidents</div>
                <div className="text-xs text-muted-foreground">Automatically notify DM for Priority Score &gt; 90</div>
              </div>
              <Toggle value={autoEscalate} onChange={() => setAutoEscalate((p) => !p)} />
            </div>
          </div>
        </div>

        {/* Map & Data */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold font-display text-foreground mb-4">Map & Data</h3>
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-2">Map Refresh Interval</label>
              <select
                value={mapRefresh}
                onChange={(e) => setMapRefresh(e.target.value)}
                className="text-sm bg-secondary border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring font-mono"
              >
                <option value="10">Every 10 seconds</option>
                <option value="30">Every 30 seconds</option>
                <option value="60">Every 60 seconds</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-2">Default District</label>
              <select className="text-sm bg-secondary border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                <option>Patna</option>
                <option>Muzaffarpur</option>
                <option>Darbhanga</option>
              </select>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold font-display text-foreground mb-4">System Information</h3>
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            {[
              { label: "Platform", value: "RakshaSetu v2.4.1" },
              { label: "Authority", value: "SDMA Bihar" },
              { label: "Aurora Model", value: "v3.2.1 · Active" },
              { label: "Database", value: "Synced · 2m ago" },
              { label: "API Status", value: "All Systems OK" },
              { label: "Last Backup", value: "Sep 15, 04:00 IST" },
            ].map((i) => (
              <div key={i.label} className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">{i.label}</span>
                <span className="text-foreground font-semibold">{i.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
