import React, { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";
import { analyticsData } from "../data/mock";

const COLORS = ["#3B82F6", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-xl text-xs font-mono">
      <div className="text-muted-foreground mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></div>
      ))}
    </div>
  );
};

export default function Analytics() {
  const [period, setPeriod] = useState("7d");

  return (
    <div className="p-6 max-w-[1440px] mx-auto flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold font-display text-foreground">Analytics</h2>
          <p className="text-sm text-muted-foreground font-mono">Performance metrics · Sep 9–15, 2026</p>
        </div>
        <div className="flex rounded-md border border-border overflow-hidden">
          {["24h", "7d", "30d"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-xs font-mono transition-colors ${
                period === p ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {[
          { label: "Avg Response Time", value: "8.7 min", change: "↓ 2.1 min vs last week", good: true },
          { label: "Rescue Completion Rate", value: "93%", change: "↑ 5% vs last week", good: true },
          { label: "Total Incidents", value: "313", change: "↑ 47 vs last week", good: false },
          { label: "Active Shelters", value: "5", change: "1,973 occupants", good: true },
        ].map((k) => (
          <div key={k.label} className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-bold font-mono text-foreground mb-0.5">{k.value}</div>
            <div className="text-xs font-display text-muted-foreground mb-1">{k.label}</div>
            <div className={`text-[11px] font-mono ${k.good ? "text-safe" : "text-warn"}`}>{k.change}</div>
          </div>
        ))}
      </div>

      {/* Row 1: Response time + Rescue completion */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold font-display text-foreground mb-4">Average Response Time (min)</h3>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.responseTime} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="rtGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="avg" name="Response (min)" stroke="#F59E0B" strokeWidth={2} fill="url(#rtGrad)" dot={{ fill: "#F59E0B", r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold font-display text-foreground mb-4">Rescue Completion Rate (%)</h3>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.rescueCompletion} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="rcGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="rate" name="Completion %" stroke="#10B981" strokeWidth={2} fill="url(#rcGrad)" dot={{ fill: "#10B981", r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Incidents by type + Shelter occupancy */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold font-display text-foreground mb-4">Incidents by Type</h3>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.incidentsByType}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  dataKey="count"
                  nameKey="type"
                >
                  {analyticsData.incidentsByType.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => <span style={{ fontSize: 10, fontFamily: "JetBrains Mono", color: "var(--muted-foreground)" }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="xl:col-span-2 bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold font-display text-foreground mb-4">Shelter Occupancy (%)</h3>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.shelterOccupancy} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="shelter" tick={{ fontSize: 9, fontFamily: "JetBrains Mono", fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="pct" name="Occupancy %" radius={[4, 4, 0, 0]}>
                  {analyticsData.shelterOccupancy.map((entry, i) => (
                    <Cell key={i} fill={entry.pct >= 90 ? "#EF4444" : entry.pct >= 70 ? "#F59E0B" : "#10B981"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Hourly incident heatmap */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="text-sm font-semibold font-display text-foreground mb-4">Hourly Incident Distribution</h3>
        <div style={{ height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analyticsData.hourlyIncidents} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="hour"
                tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "var(--muted-foreground)" }}
                axisLine={false} tickLine={false}
                tickFormatter={(v) => `${v}:00`}
              />
              <YAxis tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Incidents" radius={[3, 3, 0, 0]}>
                {analyticsData.hourlyIncidents.map((entry, i) => (
                  <Cell key={i} fill={entry.count >= 14 ? "#EF4444" : entry.count >= 10 ? "#F59E0B" : "#3B82F6"} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Heatmap grid */}
        <div className="mt-4 border-t border-border pt-4">
          <div className="text-[10px] font-mono uppercase text-muted-foreground mb-3">Incident Density Heatmap</div>
          <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(12, 1fr)" }}>
            {analyticsData.hourlyIncidents.map((d, i) => {
              const intensity = d.count / 15;
              return (
                <div
                  key={i}
                  className="rounded aspect-square flex items-center justify-center text-[9px] font-mono text-white font-medium"
                  style={{
                    backgroundColor: `rgba(59, 130, 246, ${0.1 + intensity * 0.9})`,
                    opacity: 0.9,
                  }}
                  title={`${d.hour}:00 — ${d.count} incidents`}
                >
                  {d.count}
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] font-mono text-muted-foreground">Low</span>
            <div className="flex gap-0.5">
              {[0.1, 0.3, 0.5, 0.7, 0.9].map((o) => (
                <div key={o} className="w-4 h-2 rounded-sm" style={{ backgroundColor: `rgba(59, 130, 246, ${o})` }} />
              ))}
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">High</span>
          </div>
        </div>
      </div>
    </div>
  );
}
