import { useState } from "react";

const categories = [
  { id: "flood", icon: "🌊", label: "Flood", color: "#2563EB", bg: "#eff6ff", tips: ["Move to higher ground immediately", "Do not walk in moving water", "Avoid flooded roads while driving", "Keep emergency kit ready", "Disconnect electrical appliances", "Listen to local emergency broadcasts"] },
  { id: "fire", icon: "🔥", label: "Fire", color: "#DC2626", bg: "#fef2f2", tips: ["Stay low to the ground", "Use wet cloth over nose and mouth", "Never use elevators", "Meet at designated assembly point", "Call fire brigade: 101", "Do not re-enter burning building"] },
  { id: "earthquake", icon: "🏔️", label: "Earthquake", color: "#EA580C", bg: "#fff7ed", tips: ["Drop, Cover, Hold On", "Stay away from windows", "Turn off gas immediately after shaking stops", "Check for structural damage", "Expect aftershocks", "Use stairs, not elevators"] },
  { id: "cyclone", icon: "🌀", label: "Cyclone", color: "#7C3AED", bg: "#f5f3ff", tips: ["Evacuate coastal areas immediately", "Board up windows and doors", "Store emergency supplies", "Keep fully charged devices", "Follow evacuation orders", "Stay indoors until all-clear"] },
  { id: "landslide", icon: "🏞️", label: "Landslide", color: "#92400E", bg: "#fffbeb", tips: ["Watch for warning signs: cracks, bulging ground", "Evacuate immediately when ordered", "Stay out of valleys during heavy rain", "Listen for rumbling sounds", "Report damaged roads to authorities"] },
  { id: "firstaid", icon: "🩹", label: "First Aid", color: "#16A34A", bg: "#f0fdf4", tips: ["Check for safety before helping", "Call 112 for emergency services", "Apply direct pressure for bleeding", "CPR: 30 compressions, 2 breaths", "Do not move spinal injury victims", "Keep victims warm and calm"] },
];

export default function GuidelinesScreen({ onBack }: { onBack: () => void }) {
  const [active, setActive] = useState("flood");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [lang, setLang] = useState<"en" | "hi">("en");

  const current = categories.find((c) => c.id === active)!;

  return (
    <div className="absolute inset-0 bg-slate-50 flex flex-col" style={{ paddingTop: 48 }}>
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <h1 className="font-bold text-slate-900 text-lg flex-1">Safety Guidelines</h1>
          {/* Lang toggle */}
          <div className="flex bg-slate-100 rounded-xl p-0.5">
            {["en", "hi"].map((l) => (
              <button key={l} onClick={() => setLang(l as "en" | "hi")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === l ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"}`}>
                {l === "en" ? "English" : "हिन्दी"}
              </button>
            ))}
          </div>
        </div>

        {/* Category scroll */}
        <div className="flex gap-2 overflow-x-auto -mx-1 px-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-2xl border-2 transition-all ${
                active === cat.id ? "border-current shadow-sm" : "border-transparent bg-slate-100"
              }`}
              style={active === cat.id ? { borderColor: cat.color, background: cat.bg } : {}}
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="text-xs font-semibold" style={{ color: active === cat.id ? cat.color : "#64748b" }}>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4" style={{ paddingBottom: 80 }}>
        {/* Hero card */}
        <div className="rounded-2xl p-5 mb-4 overflow-hidden relative" style={{ background: `linear-gradient(135deg, ${current.color} 0%, ${current.color}cc 100%)` }}>
          <div className="absolute right-4 top-4 text-7xl opacity-20">{current.icon}</div>
          <div className="relative z-10">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
              {lang === "hi" ? "आपदा दिशानिर्देश" : "Disaster Guidelines"}
            </p>
            <h2 className="text-white font-black text-2xl mb-2">
              {lang === "hi" ? `${current.label} सुरक्षा` : `${current.label} Safety`}
            </h2>
            <p className="text-white/80 text-sm">
              {lang === "hi" ? `${current.tips.length} महत्वपूर्ण सुरक्षा टिप्स` : `${current.tips.length} critical safety protocols`}
            </p>
          </div>
        </div>

        {/* Accordion tips */}
        <div className="flex flex-col gap-2">
          {current.tips.map((tip, i) => (
            <button
              key={i}
              onClick={() => setExpanded(expanded === tip ? null : tip)}
              className="bg-white border border-slate-200 rounded-2xl p-4 text-left flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm text-white"
                style={{ background: current.color }}>
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">{tip}</p>
                {expanded === tip && (
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed animate-fade-in">
                    Follow this guideline carefully and report to your local emergency coordinator. Contact 112 for immediate assistance.
                  </p>
                )}
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: expanded === tip ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          ))}
        </div>

        {/* Emergency note */}
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl flex gap-3">
          <span className="text-2xl">🚨</span>
          <div>
            <p className="text-sm font-bold text-red-700">In Immediate Danger?</p>
            <p className="text-xs text-red-500 mt-0.5">Press the SOS button on the home screen or call 112 immediately.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
