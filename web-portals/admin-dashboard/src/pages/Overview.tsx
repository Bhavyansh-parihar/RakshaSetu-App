import { Users, Shield, Building, Zap, AlertTriangle, MessageSquare, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const STAT_CARDS = [
  { label: "Citizens Registered", value: "2,84,917", change: "+1,243 today", trend: "up", icon: Users, color: "#4488FF" },
  { label: "Responders Registered", value: "12,348", change: "+84 pending approval", trend: "neutral", icon: Shield, color: "#22D3EE" },
  { label: "Government Users", value: "1,847", change: "+12 this week", trend: "up", icon: Building, color: "#A78BFA" },
  { label: "Active Incidents", value: "234", change: "+18 from yesterday", trend: "up", icon: Zap, color: "#F59E0B" },
  { label: "Fake Reports Today", value: "47", change: "+14 flagged by AI", trend: "down", icon: AlertTriangle, color: "#EF4444" },
  { label: "Pending Grievances", value: "91", change: "7 critical", trend: "down", icon: MessageSquare, color: "#FF6B6B" },
];

const sosData = [
  { t: "00:00", sos: 12 }, { t: "02:00", sos: 8 }, { t: "04:00", sos: 5 },
  { t: "06:00", sos: 18 }, { t: "08:00", sos: 45 }, { t: "10:00", sos: 67 },
  { t: "12:00", sos: 89 }, { t: "14:00", sos: 102 }, { t: "16:00", sos: 78 },
  { t: "18:00", sos: 134 }, { t: "20:00", sos: 98 }, { t: "22:00", sos: 43 },
];

const fakeData = [
  { day: "Mon", flagged: 23, confirmed: 18, genuine: 5 },
  { day: "Tue", flagged: 31, confirmed: 24, genuine: 7 },
  { day: "Wed", flagged: 19, confirmed: 12, genuine: 7 },
  { day: "Thu", flagged: 42, confirmed: 35, genuine: 7 },
  { day: "Fri", flagged: 38, confirmed: 30, genuine: 8 },
  { day: "Sat", flagged: 56, confirmed: 44, genuine: 12 },
  { day: "Sun", flagged: 47, confirmed: 38, genuine: 9 },
];

const rtData = [
  { t: "Week 1", avg: 8.4 }, { t: "Week 2", avg: 7.1 }, { t: "Week 3", avg: 6.8 },
  { t: "Week 4", avg: 5.9 }, { t: "Week 5", avg: 6.2 }, { t: "Week 6", avg: 4.7 },
];

const RECENT_INCIDENTS = [
  { id: "INC-4421", type: "Flood", district: "Puri, Odisha", severity: "HIGH", responders: 12, time: "14 min ago" },
  { id: "INC-4420", type: "Cyclone Warning", district: "Visakhapatnam, AP", severity: "CRITICAL", responders: 28, time: "42 min ago" },
  { id: "INC-4419", type: "Landslide", district: "Shimla, HP", severity: "MEDIUM", responders: 6, time: "1h ago" },
  { id: "INC-4418", type: "Earthquake", district: "Manipur", severity: "HIGH", responders: 18, time: "2h ago" },
  { id: "INC-4417", type: "Flash Flood", district: "Coimbatore, TN", severity: "LOW", responders: 4, time: "3h ago" },
];

const SEVERITY_COLOR: Record<string, string> = {
  LOW: "#10B981", MEDIUM: "#F59E0B", HIGH: "#EF4444", CRITICAL: "#FF0033",
};

const TooltipStyle = { background: "#0D1525", border: "1px solid #1C2B45", borderRadius: "8px", fontSize: "11px", color: "#E2EAF8" };

export default function Overview() {
  return (
    <div className="p-6 space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {STAT_CARDS.map(card => {
          const Icon = card.icon;
          const TrendIcon = card.trend === "up" ? TrendingUp : card.trend === "down" ? TrendingDown : Minus;
          const trendColor = card.trend === "up" ? "#10B981" : card.trend === "down" ? "#EF4444" : "#7B8DB5";
          return (
            <div key={card.label} className="rounded-xl p-4 border relative overflow-hidden" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
              <div className="absolute right-0 top-0 w-20 h-20 rounded-full opacity-5" style={{ background: card.color, transform: "translate(30%, -30%)" }} />
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: `${card.color}18` }}>
                  <Icon size={15} style={{ color: card.color }} />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono" style={{ color: trendColor }}>
                  <TrendIcon size={10} />
                  <span>live</span>
                </div>
              </div>
              <div className="text-2xl font-semibold mb-1" style={{ color: "#E2EAF8" }}>{card.value}</div>
              <div className="text-[11px]" style={{ color: "#3D5070" }}>{card.label}</div>
              <div className="text-[10px] mt-1 font-mono" style={{ color: trendColor }}>{card.change}</div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="rounded-xl p-4 border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold" style={{ color: "#E2EAF8" }}>SOS Volume — Today</div>
              <div className="text-[10px] font-mono mt-0.5" style={{ color: "#3D5070" }}>HOURLY DISPATCH COUNT</div>
            </div>
            <div className="text-xl font-semibold" style={{ color: "#4488FF" }}>699</div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={sosData}>
              <defs>
                <linearGradient id="sosGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4488FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4488FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1C2B45" />
              <XAxis dataKey="t" tick={{ fill: "#3D5070", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#3D5070", fontSize: 9 }} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={TooltipStyle} />
              <Area type="monotone" dataKey="sos" stroke="#4488FF" strokeWidth={2} fill="url(#sosGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl p-4 border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold" style={{ color: "#E2EAF8" }}>Fake Report Trends — 7 Days</div>
              <div className="text-[10px] font-mono mt-0.5" style={{ color: "#3D5070" }}>FLAGGED VS CONFIRMED FAKE</div>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono">
              <span style={{ color: "#EF4444" }}>■ Confirmed</span>
              <span style={{ color: "#F59E0B" }}>■ Genuine</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={fakeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1C2B45" />
              <XAxis dataKey="day" tick={{ fill: "#3D5070", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#3D5070", fontSize: 9 }} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={TooltipStyle} />
              <Bar dataKey="confirmed" fill="#EF4444" radius={[2, 2, 0, 0]} />
              <Bar dataKey="genuine" fill="#F59E0B" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1.6fr 1fr" }}>
        {/* Recent incidents */}
        <div className="rounded-xl border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "#1C2B45" }}>
            <div className="text-sm font-semibold" style={{ color: "#E2EAF8" }}>Recent Incidents</div>
            <div className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: "#172240", color: "#4488FF" }}>LIVE</div>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #1C2B45" }}>
                {["Incident ID", "Type", "District", "Severity", "Responders", "Time"].map(h => (
                  <th key={h} className="px-4 py-2 text-left text-[10px] font-mono uppercase tracking-wider" style={{ color: "#3D5070" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_INCIDENTS.map(inc => (
                <tr key={inc.id} className="border-b transition-colors hover:opacity-80" style={{ borderColor: "#1C2B45" }}>
                  <td className="px-4 py-3 text-xs font-mono" style={{ color: "#4488FF" }}>{inc.id}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#E2EAF8" }}>{inc.type}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#7B8DB5" }}>{inc.district}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: `${SEVERITY_COLOR[inc.severity]}18`, color: SEVERITY_COLOR[inc.severity] }}>
                      {inc.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-center" style={{ color: "#7B8DB5" }}>{inc.responders}</td>
                  <td className="px-4 py-3 text-[10px] font-mono" style={{ color: "#3D5070" }}>{inc.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Avg response time */}
        <div className="rounded-xl p-4 border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
          <div className="mb-4">
            <div className="text-sm font-semibold" style={{ color: "#E2EAF8" }}>Avg Response Time</div>
            <div className="text-[10px] font-mono mt-0.5" style={{ color: "#3D5070" }}>MINUTES · 6-WEEK TREND</div>
          </div>
          <div className="text-3xl font-semibold mb-1" style={{ color: "#10B981" }}>4.7 <span className="text-sm" style={{ color: "#3D5070" }}>min</span></div>
          <div className="text-[10px] font-mono mb-4" style={{ color: "#10B981" }}>↓ 2.1 min from baseline</div>
          <ResponsiveContainer width="100%" height={110}>
            <LineChart data={rtData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1C2B45" />
              <XAxis dataKey="t" tick={{ fill: "#3D5070", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#3D5070", fontSize: 9 }} axisLine={false} tickLine={false} width={24} />
              <Tooltip contentStyle={TooltipStyle} />
              <Line type="monotone" dataKey="avg" stroke="#10B981" strokeWidth={2} dot={{ fill: "#10B981", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { label: "AI Accuracy", value: "91.4%", color: "#4488FF" },
              { label: "Verified Rate", value: "87.2%", color: "#22D3EE" },
            ].map(m => (
              <div key={m.label} className="rounded-lg p-3" style={{ background: "#111E34" }}>
                <div className="text-[10px] font-mono" style={{ color: "#3D5070" }}>{m.label}</div>
                <div className="text-lg font-semibold mt-0.5" style={{ color: m.color }}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
