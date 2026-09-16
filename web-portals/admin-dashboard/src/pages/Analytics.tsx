import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const TT = { background: "#0D1525", border: "1px solid #1C2B45", borderRadius: "8px", fontSize: "11px", color: "#E2EAF8" };

const sosVolume = [
  { month: "Jan", sos: 1240, resolved: 1180 }, { month: "Feb", sos: 980, resolved: 940 },
  { month: "Mar", sos: 1680, resolved: 1590 }, { month: "Apr", sos: 2340, resolved: 2100 },
  { month: "May", sos: 3120, resolved: 2890 }, { month: "Jun", sos: 2840, resolved: 2640 },
];

const fakeReportTrend = [
  { week: "W1", ai: 142, confirmed: 118, genuine: 24 },
  { week: "W2", ai: 167, confirmed: 138, genuine: 29 },
  { week: "W3", ai: 203, confirmed: 174, genuine: 29 },
  { week: "W4", ai: 188, confirmed: 159, genuine: 29 },
  { week: "W5", ai: 221, confirmed: 192, genuine: 29 },
  { week: "W6", ai: 256, confirmed: 218, genuine: 38 },
];

const avgResponseTime = [
  { month: "Jan", min: 8.4 }, { month: "Feb", min: 7.9 }, { month: "Mar", min: 7.1 },
  { month: "Apr", min: 6.5 }, { month: "May", min: 5.9 }, { month: "Jun", min: 4.7 },
];

const aiAccuracy = [
  { week: "W1", accuracy: 87.2, respVerif: 83.1 }, { week: "W2", accuracy: 88.9, respVerif: 84.7 },
  { week: "W3", accuracy: 89.4, respVerif: 85.2 }, { week: "W4", accuracy: 90.1, respVerif: 86.4 },
  { week: "W5", accuracy: 91.0, respVerif: 87.9 }, { week: "W6", accuracy: 91.4, respVerif: 87.2 },
];

const weatherAlerts = [
  { name: "Cyclone", value: 34, color: "#EF4444" },
  { name: "Flood", value: 89, color: "#4488FF" },
  { name: "Landslide", value: 21, color: "#F59E0B" },
  { name: "Earthquake", value: 12, color: "#A78BFA" },
  { name: "Heatwave", value: 47, color: "#FF6B35" },
  { name: "Other", value: 18, color: "#3D5070" },
];

const KPI_CARDS = [
  { label: "Total SOS This Month", value: "2,840", sub: "+12.4% vs last month", color: "#4488FF" },
  { label: "Fake Reports Confirmed", value: "218", sub: "85.2% AI precision", color: "#EF4444" },
  { label: "Avg Response Time", value: "4.7 min", sub: "↓ 3.7 min from Jan", color: "#10B981" },
  { label: "AI Fake Detection Accuracy", value: "91.4%", sub: "+4.2% this quarter", color: "#22D3EE" },
  { label: "Responder Verification Rate", value: "87.2%", sub: "+4.1% vs baseline", color: "#A78BFA" },
  { label: "Weather Alerts Issued", value: "221", sub: "89 flood · 34 cyclone", color: "#F59E0B" },
];

export default function Analytics() {
  return (
    <div className="p-6 space-y-5">
      {/* KPI row */}
      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(6, 1fr)" }}>
        {KPI_CARDS.map(k => (
          <div key={k.label} className="rounded-xl p-3 border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
            <div className="text-[10px]" style={{ color: "#3D5070" }}>{k.label}</div>
            <div className="text-lg font-semibold mt-1 mb-0.5" style={{ color: k.color }}>{k.value}</div>
            <div className="text-[9px] font-mono" style={{ color: "#3D5070" }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* SOS Volume */}
        <div className="rounded-xl p-4 border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
          <div className="mb-3">
            <div className="text-sm font-semibold" style={{ color: "#E2EAF8" }}>SOS Volume — 6 Months</div>
            <div className="text-[10px] font-mono mt-0.5" style={{ color: "#3D5070" }}>DISPATCHED VS RESOLVED</div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={sosVolume}>
              <defs>
                <linearGradient id="sosG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4488FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4488FF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="resG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1C2B45" />
              <XAxis dataKey="month" tick={{ fill: "#3D5070", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#3D5070", fontSize: 9 }} axisLine={false} tickLine={false} width={36} />
              <Tooltip contentStyle={TT} />
              <Area type="monotone" dataKey="sos" stroke="#4488FF" strokeWidth={2} fill="url(#sosG)" name="SOS" />
              <Area type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} fill="url(#resG)" name="Resolved" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Fake report trends */}
        <div className="rounded-xl p-4 border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
          <div className="mb-3">
            <div className="text-sm font-semibold" style={{ color: "#E2EAF8" }}>Fake Report Trends — Weekly</div>
            <div className="text-[10px] font-mono mt-0.5" style={{ color: "#3D5070" }}>AI FLAGGED · CONFIRMED · GENUINE FALSE-POSITIVE</div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={fakeReportTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1C2B45" />
              <XAxis dataKey="week" tick={{ fill: "#3D5070", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#3D5070", fontSize: 9 }} axisLine={false} tickLine={false} width={28} />
              <Tooltip contentStyle={TT} />
              <Bar dataKey="confirmed" fill="#EF4444" radius={[2, 2, 0, 0]} name="Confirmed Fake" />
              <Bar dataKey="genuine" fill="#F59E0B" radius={[2, 2, 0, 0]} name="Genuine (FP)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Response time */}
        <div className="rounded-xl p-4 border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
          <div className="mb-3">
            <div className="text-sm font-semibold" style={{ color: "#E2EAF8" }}>Average Response Time</div>
            <div className="text-[10px] font-mono mt-0.5" style={{ color: "#3D5070" }}>MINUTES · IMPROVING TREND</div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={avgResponseTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1C2B45" />
              <XAxis dataKey="month" tick={{ fill: "#3D5070", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#3D5070", fontSize: 9 }} axisLine={false} tickLine={false} width={28} domain={[0, 12]} />
              <Tooltip contentStyle={TT} formatter={(v) => [`${v} min`, "Avg Response"]} />
              <Line type="monotone" dataKey="min" stroke="#10B981" strokeWidth={2.5} dot={{ fill: "#10B981", r: 4 }} name="Avg (min)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AI Accuracy */}
        <div className="rounded-xl p-4 border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
          <div className="mb-3">
            <div className="text-sm font-semibold" style={{ color: "#E2EAF8" }}>AI & Responder Accuracy</div>
            <div className="text-[10px] font-mono mt-0.5" style={{ color: "#3D5070" }}>WEEKLY % ACCURACY</div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={aiAccuracy}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1C2B45" />
              <XAxis dataKey="week" tick={{ fill: "#3D5070", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#3D5070", fontSize: 9 }} axisLine={false} tickLine={false} width={36} domain={[80, 95]} />
              <Tooltip contentStyle={TT} formatter={(v) => [`${v}%`]} />
              <Line type="monotone" dataKey="accuracy" stroke="#4488FF" strokeWidth={2} dot={{ fill: "#4488FF", r: 3 }} name="AI Accuracy" />
              <Line type="monotone" dataKey="respVerif" stroke="#A78BFA" strokeWidth={2} dot={{ fill: "#A78BFA", r: 3 }} name="Responder Verif." />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-[10px]" style={{ color: "#4488FF" }}><span className="w-3 h-0.5 inline-block" style={{ background: "#4488FF" }} /> AI Accuracy</div>
            <div className="flex items-center gap-1.5 text-[10px]" style={{ color: "#A78BFA" }}><span className="w-3 h-0.5 inline-block" style={{ background: "#A78BFA" }} /> Responder Verif.</div>
          </div>
        </div>
      </div>

      {/* Weather alerts breakdown */}
      <div className="rounded-xl p-4 border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold mb-0.5" style={{ color: "#E2EAF8" }}>Weather Alerts by Type</div>
            <div className="text-[10px] font-mono" style={{ color: "#3D5070" }}>TOTAL 221 ISSUED THIS MONTH</div>
          </div>
          <div className="flex gap-4">
            {weatherAlerts.map(w => (
              <div key={w.name} className="flex items-center gap-1.5 text-[10px]" style={{ color: "#7B8DB5" }}>
                <span className="w-2 h-2 rounded-full" style={{ background: w.color }} />
                {w.name} <span className="font-mono" style={{ color: w.color }}>{w.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 h-6 rounded-full overflow-hidden flex">
          {weatherAlerts.map(w => (
            <div key={w.name} style={{ flex: w.value, background: w.color, opacity: 0.85 }} title={`${w.name}: ${w.value}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
