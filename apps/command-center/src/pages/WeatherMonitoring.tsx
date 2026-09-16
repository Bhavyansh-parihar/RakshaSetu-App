import React, { useState } from "react";
import { weatherData } from "../data/mock";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line,
} from "recharts";

const severityColor: Record<string, string> = {
  Red: "text-critical bg-critical/10 border-critical/30",
  Orange: "text-warn bg-warn/10 border-warn/30",
  Yellow: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
};

const severityDot: Record<string, string> = {
  Red: "bg-critical",
  Orange: "bg-warn",
  Yellow: "bg-yellow-400",
};

export default function WeatherMonitoring() {
  const [activeTab, setActiveTab] = useState<"rain" | "temp" | "wind">("rain");

  const chartKey = { rain: "rain", temp: "temp", wind: "wind" }[activeTab] as "rain" | "temp" | "wind";
  const chartColor = { rain: "#3B82F6", temp: "#F97316", wind: "#8B5CF6" }[activeTab];
  const chartLabel = { rain: "Rainfall (mm/h)", temp: "Temperature (°C)", wind: "Wind Speed (km/h)" }[activeTab];

  return (
    <div className="p-6 max-w-[1440px] mx-auto flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold font-display text-foreground">Weather Monitoring</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-primary/30 text-primary bg-primary/10 font-semibold">
              Microsoft Aurora
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-mono">AI-powered weather intelligence · Updated 3 min ago</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-secondary rounded-md px-3 py-2">
          <span className="w-1.5 h-1.5 rounded-full bg-safe" style={{ animation: "blink 2s infinite" }} />
          Live Feed
        </div>
      </div>

      {/* Aurora Weather Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {weatherData.alerts.map((alert) => (
          <div
            key={alert.type}
            className={`relative bg-card border rounded-xl p-5 overflow-hidden ${severityColor[alert.severity].includes("critical") ? "border-critical/40" : alert.severity === "Orange" ? "border-warn/40" : "border-yellow-400/30"}`}
          >
            {/* Background gradient */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                background: alert.severity === "Red"
                  ? "radial-gradient(circle at top right, #EF4444, transparent 70%)"
                  : alert.severity === "Orange"
                    ? "radial-gradient(circle at top right, #F59E0B, transparent 70%)"
                    : "radial-gradient(circle at top right, #FBBF24, transparent 70%)",
              }}
            />
            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${severityColor[alert.severity]}`}>
                  {alert.severity} ALERT
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${severityDot[alert.severity]}`}
                  style={{ animation: alert.severity === "Red" ? "blink 1.2s infinite" : "blink 2s infinite" }}
                />
              </div>
              <h3 className="text-base font-bold font-display text-foreground mb-1">{alert.type}</h3>
              <p className="text-xs text-muted-foreground mb-3">{alert.forecast}</p>

              {/* Probability bar */}
              <div className="mb-3">
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1">
                  <span>AI Probability</span>
                  <span className="text-foreground font-semibold">{alert.probability}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${alert.severity === "Red" ? "bg-critical" : alert.severity === "Orange" ? "bg-warn" : "bg-yellow-400"}`}
                    style={{ width: `${alert.probability}%` }}
                  />
                </div>
              </div>

              <div className="text-[10px] font-mono text-muted-foreground">
                {alert.districts.join(" · ")}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Forecast + Map row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Chart */}
        <div className="xl:col-span-2 bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold font-display text-foreground">24h Forecast</h3>
            <div className="flex rounded-md border border-border overflow-hidden">
              {[
                { key: "rain" as const, label: "Rainfall" },
                { key: "temp" as const, label: "Temp" },
                { key: "wind" as const, label: "Wind" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`px-3 py-1.5 text-xs font-mono transition-colors ${
                    activeTab === t.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weatherData.forecast} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="weatherGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="hour" tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11, fontFamily: "JetBrains Mono" }}
                  labelStyle={{ color: "var(--foreground)" }}
                  itemStyle={{ color: chartColor }}
                  formatter={(v) => [`${v}`, chartLabel]}
                />
                <Area type="monotone" dataKey={chartKey} stroke={chartColor} strokeWidth={2} fill="url(#weatherGrad)" dot={false} activeDot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Aurora model status */}
        <div className="bg-card border border-border rounded-lg p-5 flex flex-col gap-4">
          <div>
            <div className="text-xs font-semibold font-display text-foreground mb-1">Aurora Model Status</div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-safe">
              <span className="w-1.5 h-1.5 rounded-full bg-safe" />
              Model running · v3.2.1
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { label: "Last Inference", value: "3 min ago" },
              { label: "Model Accuracy", value: "96.4%" },
              { label: "Data Sources", value: "IMD + Satellite" },
              { label: "Forecast Range", value: "72 hours" },
              { label: "Resolution", value: "2km grid" },
            ].map((m) => (
              <div key={m.label} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{m.label}</span>
                <span className="text-xs font-mono font-semibold text-foreground">{m.value}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-3">
            <div className="text-[10px] font-mono uppercase text-muted-foreground mb-2">District Risk Index</div>
            {[
              { district: "Patna", risk: 92, color: "bg-critical" },
              { district: "Vaishali", risk: 78, color: "bg-warn" },
              { district: "Muzaffarpur", risk: 71, color: "bg-warn" },
              { district: "Darbhanga", risk: 55, color: "bg-primary" },
            ].map((d) => (
              <div key={d.district} className="mb-2">
                <div className="flex justify-between text-[10px] font-mono mb-0.5">
                  <span className="text-muted-foreground">{d.district}</span>
                  <span className="text-foreground">{d.risk}</span>
                </div>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${d.color} rounded-full`} style={{ width: `${d.risk}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Forecast map visualization */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <h3 className="text-sm font-semibold font-display text-foreground">Precipitation Forecast Map · Next 6h</h3>
        </div>
        <div className="relative bg-slate-100" style={{ height: 280 }}>
          <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 100 100" preserveAspectRatio="none">
            {[10,20,30,40,50,60,70,80,90].map((v) => (
              <React.Fragment key={v}>
                <line x1={v} y1="0" x2={v} y2="100" stroke="#334155" strokeWidth="0.3" />
                <line x1="0" y1={v} x2="100" y2={v} stroke="#334155" strokeWidth="0.3" />
              </React.Fragment>
            ))}
          </svg>
          {/* Precipitation cells */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <ellipse cx="40" cy="40" rx="25" ry="20" fill="#3B82F6" fillOpacity="0.35" />
            <ellipse cx="50" cy="45" rx="18" ry="14" fill="#1D4ED8" fillOpacity="0.4" />
            <ellipse cx="55" cy="38" rx="10" ry="8" fill="#1E3A8A" fillOpacity="0.5" />
            <ellipse cx="70" cy="55" rx="12" ry="9" fill="#F97316" fillOpacity="0.2" />
            <ellipse cx="25" cy="60" rx="14" ry="10" fill="#3B82F6" fillOpacity="0.2" />
          </svg>
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/95 border border-slate-200 shadow-md rounded-lg px-3 py-2">
            <div className="text-[10px] font-mono text-slate-500 mb-1.5 uppercase font-medium">Rainfall Intensity</div>
            <div className="flex items-center gap-3">
              {[
                { color: "#BFDBFE", label: "Light" },
                { color: "#3B82F6", label: "Moderate" },
                { color: "#1D4ED8", label: "Heavy" },
                { color: "#1E3A8A", label: "Extreme" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1">
                  <div className="w-3 h-2 rounded-sm" style={{ backgroundColor: l.color }} />
                  <span className="text-[9px] text-slate-700 font-mono font-medium">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-3 right-4 font-mono text-[10px] text-slate-500">
            Aurora Forecast · 240mm/24h
          </div>
        </div>
      </div>
    </div>
  );
}
