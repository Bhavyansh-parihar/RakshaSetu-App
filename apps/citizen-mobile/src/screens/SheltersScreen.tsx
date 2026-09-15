import { useState } from "react";

const shelters = [
  { name: "Seva Shelter — Andheri East", distance: "1.2 km", capacity: "842/1200", eta: "8 min", status: "open", tags: ["Food", "Water", "Medical"] },
  { name: "Bandra Relief Camp", distance: "2.8 km", capacity: "1100/1200", eta: "15 min", status: "open", tags: ["Food", "Water"] },
  { name: "Dharavi Shelter Point", distance: "4.1 km", capacity: "1200/1200", eta: "22 min", status: "full", tags: ["Water"] },
  { name: "Kurla Community Hall", distance: "5.3 km", capacity: "330/800", eta: "28 min", status: "open", tags: ["Food", "Water", "Medical", "Children"] },
];

const filters = ["All", "Open", "Nearby", "Medical", "Food", "Water"];

export default function SheltersScreen({ onBack }: { onBack: () => void }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = shelters.filter((s) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Open") return s.status === "open";
    if (activeFilter === "Nearby") return parseFloat(s.distance) < 3;
    return s.tags.includes(activeFilter);
  });

  return (
    <div className="absolute inset-0 bg-white flex flex-col" style={{ paddingTop: 48 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
        <button onClick={onBack} className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div>
          <h1 className="font-bold text-slate-900 text-lg">Nearby Shelters</h1>
          <p className="text-xs text-slate-400">4 shelters found near you</p>
        </div>
        <div className="ml-auto w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>
      </div>

      {/* Full-screen map */}
      <div className="map-bg h-48 relative flex-shrink-0">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 393 192" fill="none">
          <line x1="0" y1="96" x2="393" y2="96" stroke="#94a3b8" strokeWidth="2.5"/>
          <line x1="196" y1="0" x2="196" y2="192" stroke="#94a3b8" strokeWidth="2.5"/>
          <line x1="0" y1="48" x2="196" y2="48" stroke="#cbd5e1" strokeWidth="1.5"/>
          <line x1="196" y1="144" x2="393" y2="144" stroke="#cbd5e1" strokeWidth="1.5"/>
          <line x1="100" y1="0" x2="100" y2="192" stroke="#e2e8f0" strokeWidth="1"/>
          <line x1="300" y1="0" x2="300" y2="192" stroke="#e2e8f0" strokeWidth="1"/>
          {/* Flood overlay */}
          <rect x="0" y="0" width="140" height="120" fill="#93c5fd" fillOpacity="0.2" rx="8"/>
          <text x="70" y="70" textAnchor="middle" fontSize="10" fill="#2563eb" fontWeight="600">Flood Zone</text>
          {/* Shelter markers */}
          {[{x:280,y:60},{x:320,y:140},{x:240,y:160},{x:360,y:100}].map((pos,i) => (
            <g key={i}>
              <circle cx={pos.x} cy={pos.y} r="14" fill={i===2?"#ef4444":"#16a34a"} stroke="white" strokeWidth="2"/>
              <text x={pos.x} y={pos.y+4} textAnchor="middle" fontSize="9" fill="white" fontWeight="700">S</text>
            </g>
          ))}
          {/* User */}
          <circle cx="196" cy="96" r="8" fill="#2563eb" stroke="white" strokeWidth="2.5"/>
          <circle cx="196" cy="96" r="18" fill="#2563eb" fillOpacity="0.15"/>
        </svg>
      </div>

      {/* Bottom sheet */}
      <div className="flex-1 flex flex-col">
        {/* Drag handle */}
        <div className="flex justify-center py-2.5">
          <div className="w-10 h-1 bg-slate-300 rounded-full" />
        </div>

        {/* Search */}
        <div className="px-4 mb-3">
          <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input placeholder="Search shelters..." className="flex-1 bg-transparent text-sm text-slate-700 outline-none" />
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 px-4 overflow-x-auto pb-2 mb-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                activeFilter === f ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200 text-slate-500 bg-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Shelter list */}
        <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-3" style={{ paddingBottom: 80 }}>
          {filtered.map((shelter, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${shelter.status === "full" ? "bg-red-100" : "bg-green-100"}`}>
                  ⛺
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-slate-900 text-sm">{shelter.name}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${shelter.status === "full" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
                      {shelter.status === "full" ? "Full" : "Open"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                    <p className="text-xs text-slate-500">📍 {shelter.distance}</p>
                    <p className="text-xs text-slate-500">👥 {shelter.capacity}</p>
                    <p className="text-xs text-slate-500">⏱ {shelter.eta}</p>
                  </div>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {shelter.tags.map((t) => (
                      <span key={t} className="text-xs bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
                <button
                  disabled={shelter.status === "full"}
                  className={`px-3 py-2 rounded-xl text-xs font-bold text-white ${shelter.status === "full" ? "bg-slate-300" : "bg-blue-600"}`}
                >
                  {shelter.status === "full" ? "Full" : "Navigate"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
