import { useState } from "react";

interface Props {
  navigate: (screen: string) => void;
}

export default function Navigation({ navigate }: Props) {
  const [started, setStarted] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#111827] relative">
      {/* Map simulation */}
      <div className="flex-1 relative overflow-hidden">
        {/* OSM-style dark map */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="600" fill="#1A2234"/>
          {/* Roads */}
          <line x1="0" y1="200" x2="400" y2="200" stroke="#2D4160" strokeWidth="12"/>
          <line x1="0" y1="350" x2="400" y2="350" stroke="#2D4160" strokeWidth="8"/>
          <line x1="200" y1="0" x2="200" y2="600" stroke="#2D4160" strokeWidth="12"/>
          <line x1="100" y1="0" x2="100" y2="600" stroke="#243350" strokeWidth="6"/>
          <line x1="300" y1="0" x2="300" y2="600" stroke="#243350" strokeWidth="6"/>
          <line x1="0" y1="100" x2="400" y2="100" stroke="#243350" strokeWidth="5"/>
          <line x1="0" y1="300" x2="400" y2="300" stroke="#243350" strokeWidth="5"/>
          <line x1="0" y1="450" x2="400" y2="450" stroke="#243350" strokeWidth="4"/>
          {/* Blocks */}
          {[[110,110,80,80],[110,210,80,80],[210,110,80,80],[210,210,80,80],[110,360,80,80],[210,360,80,80],[310,110,80,80],[310,210,80,80],[110,460,80,60],[210,460,80,60]].map(([x,y,w,h],i) => (
            <rect key={i} x={x} y={y} width={w} height={h} fill="#1E2D42" rx="4"/>
          ))}
          {/* Water area */}
          <rect x="0" y="0" width="90" height="100" fill="#0D2035" opacity="0.8" rx="4"/>
          <rect x="0" y="0" width="90" height="100" fill="#0A84FF" opacity="0.08"/>
          <text x="45" y="55" textAnchor="middle" fill="#0A84FF" fontSize="8" opacity="0.6">RIVER</text>
          {/* Route */}
          <path d="M200 520 L200 350 L200 200 L160 200 L160 160 L130 160 L130 130" stroke="#FF4F38" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="14,7" opacity="0.9"/>
          {/* Shelter markers */}
          <circle cx="310" cy="120" r="14" fill="#30D158" opacity="0.25"/>
          <circle cx="310" cy="120" r="9" fill="#30D158" opacity="0.7"/>
          <text x="310" y="124" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">S</text>
          <circle cx="110" cy="390" r="14" fill="#30D158" opacity="0.25"/>
          <circle cx="110" cy="390" r="9" fill="#30D158" opacity="0.7"/>
          <text x="110" y="394" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">S</text>
          {/* Destination */}
          <circle cx="130" cy="130" r="20" fill="#FF3B30" opacity="0.2"/>
          <circle cx="130" cy="130" r="12" fill="#FF3B30" opacity="0.9"/>
          <text x="130" y="134" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">🆘</text>
          {/* Me */}
          <circle cx="200" cy="520" r="18" fill="#0A84FF" opacity="0.15"/>
          <circle cx="200" cy="520" r="10" fill="#0A84FF"/>
          <circle cx="200" cy="520" r="5" fill="white"/>
        </svg>

        {/* Top info bar */}
        <div className="absolute top-0 left-0 right-0 pt-10 px-4 pb-3 bg-gradient-to-b from-[#111827] to-transparent">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("incident-details")} className="w-9 h-9 bg-[#1E2D42]/90 border border-[#2D4160] rounded-xl flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="#F0F5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="flex-1 bg-[#1A2234]/90 backdrop-blur border border-[#2D4160] rounded-2xl px-4 py-2.5 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#FF3B30] animate-pulse" />
              <div>
                <p className="text-[#F0F5FA] text-sm font-600">47-B Nehru Nagar, Kolhapur</p>
                <p className="text-[#8BAFC8] text-xs">Bhavyansh Parihar · INC-2847</p>
              </div>
            </div>
          </div>
        </div>

        {/* ETA Card */}
        <div className="absolute top-24 right-4 bg-[#1A2234]/90 backdrop-blur border border-[#2D4160] rounded-2xl px-4 py-3 text-center">
          <p className="text-[#4D6E8A] text-xs mono">ETA</p>
          <p className="font-display text-2xl font-700 text-[#F0F5FA]">6 min</p>
          <p className="text-[#8BAFC8] text-xs">1.4 km</p>
        </div>

        {/* Shelter legend */}
        <div className="absolute bottom-44 right-4 bg-[#1A2234]/90 backdrop-blur border border-[#2D4160] rounded-xl px-3 py-2.5 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#30D158]" />
            <span className="text-[#F0F5FA] text-xs">Shelter</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#FF3B30]" />
            <span className="text-[#F0F5FA] text-xs">Target</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#0A84FF]" />
            <span className="text-[#F0F5FA] text-xs">You</span>
          </div>
        </div>

        {/* OSM credit */}
        <div className="absolute bottom-36 left-2 text-[#4D6E8A] text-xs opacity-60">© OpenStreetMap</div>
      </div>

      {/* Bottom navigation panel */}
      <div className="bg-[#1A2234] border-t border-[#2D4160] px-4 py-4">
        {/* Turn instructions */}
        <div className="flex items-center gap-3 bg-[#1E2D42] border border-[#2D4160] rounded-2xl px-4 py-3 mb-3">
          <div className="w-10 h-10 bg-[#FF4F38] rounded-xl flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M4 12h16M12 4l8 8-8 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-[#F0F5FA] font-600 text-sm">Turn right on MG Road</p>
            <p className="text-[#8BAFC8] text-xs">In 280m — then straight 900m</p>
          </div>
          <span className="text-[#F0F5FA] font-display text-xl font-700">280m</span>
        </div>

        {/* Conditions */}
        <div className="flex gap-2 mb-4">
          {[
            { label: "Traffic", value: "Moderate", color: "#FFB800" },
            { label: "Flood Risk", value: "High", color: "#FF3B30" },
            { label: "Signal", value: "4G", color: "#30D158" },
          ].map((c) => (
            <div key={c.label} className="flex-1 bg-[#1E2D42] border border-[#2D4160] rounded-xl px-2 py-2 text-center">
              <p className="text-xs font-600" style={{ color: c.color }}>{c.value}</p>
              <p className="text-[#4D6E8A] text-xs">{c.label}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => { setStarted(true); setTimeout(() => navigate("active-rescue"), 400); }}
          className="w-full bg-[#FF4F38] text-white font-display text-xl font-700 tracking-wider py-4 rounded-2xl active:scale-95 transition-transform"
          style={{ boxShadow: "0 4px 24px #FF4F3840" }}
        >
          {started ? "ARRIVED — STARTING RESCUE..." : "CONFIRM ARRIVAL AT SCENE"}
        </button>
      </div>
    </div>
  );
}
