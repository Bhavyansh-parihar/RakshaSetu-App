const helplines = [
  { icon: "👮", label: "Police", number: "100", color: "#1E3A8A", bg: "#eff6ff" },
  { icon: "🚑", label: "Ambulance", number: "108", color: "#16A34A", bg: "#f0fdf4" },
  { icon: "🚒", label: "Fire Brigade", number: "101", color: "#DC2626", bg: "#fef2f2" },
  { icon: "🌊", label: "Disaster Mgmt", number: "1077", color: "#2563EB", bg: "#eff6ff" },
  { icon: "👩", label: "Women Helpline", number: "1091", color: "#7C3AED", bg: "#f5f3ff" },
  { icon: "🪖", label: "NDRF", number: "011-24363260", color: "#EA580C", bg: "#fff7ed" },
  { icon: "🏥", label: "National Health", number: "104", color: "#0891B2", bg: "#ecfeff" },
  { icon: "📞", label: "Emergency", number: "112", color: "#DC2626", bg: "#fef2f2" },
];

export default function HelplineScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="absolute inset-0 bg-slate-50 flex flex-col" style={{ paddingTop: 48 }}>
      {/* Header */}
      <div className="bg-white flex items-center gap-3 px-5 py-4 border-b border-slate-100">
        <button onClick={onBack} className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div>
          <h1 className="font-bold text-slate-900 text-lg">Emergency Helplines</h1>
          <p className="text-xs text-slate-400">Tap to call · Available 24/7</p>
        </div>
      </div>

      {/* Universal SOS */}
      <div className="mx-4 mt-4 p-4 rounded-2xl border-2 border-red-300 bg-red-50 flex items-center gap-3 flex-shrink-0">
        <span className="text-3xl">🆘</span>
        <div className="flex-1">
          <p className="font-black text-red-700 text-lg">112 — Universal Emergency</p>
          <p className="text-xs text-red-400">Police • Ambulance • Fire — All services</p>
        </div>
        <button className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
          </svg>
        </button>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-4 py-4" style={{ paddingBottom: 80 }}>
        <div className="grid grid-cols-2 gap-3">
          {helplines.map((h) => (
            <div key={h.label} className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl" style={{ background: h.bg }}>
                  {h.icon}
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">{h.label}</p>
                  <p className="font-black text-slate-900 text-lg leading-tight" style={{ color: h.color }}>{h.number}</p>
                </div>
              </div>
              <button
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5"
                style={{ background: h.color }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
                Call Now
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
          <p className="text-xs font-semibold text-blue-700 mb-1">📱 One-tap calling</p>
          <p className="text-xs text-blue-500">All calls are free from any mobile network in India. Calls are automatically logged for your safety record.</p>
        </div>
      </div>
    </div>
  );
}
