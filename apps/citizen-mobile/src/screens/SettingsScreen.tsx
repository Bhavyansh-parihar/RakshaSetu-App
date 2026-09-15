import { useState } from "react";

type Toggle = { label: string; desc: string; icon: string; val: boolean };

export default function SettingsScreen({ onBack }: { onBack: () => void }) {
  const [toggles, setToggles] = useState<Toggle[]>([
    { label: "Push Notifications", desc: "Alerts for disasters & SOS updates", icon: "🔔", val: true },
    { label: "Location Services", desc: "Required for shelter & SOS features", icon: "📍", val: true },
    { label: "Dark Mode", desc: "Switch to dark interface", icon: "🌙", val: false },
    { label: "Microphone", desc: "For voice-to-text in reports", icon: "🎙️", val: true },
    { label: "Battery Optimization", desc: "Allow background location access", icon: "🔋", val: true },
  ]);

  const toggle = (i: number) =>
    setToggles((prev) => prev.map((t, j) => (j === i ? { ...t, val: !t.val } : t)));

  const [lang, setLang] = useState("English");

  return (
    <div className="absolute inset-0 bg-slate-50 flex flex-col" style={{ paddingTop: 48 }}>
      <div className="bg-white flex items-center gap-3 px-5 py-4 border-b border-slate-100">
        <button onClick={onBack} className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <h1 className="font-bold text-slate-900 text-lg">Settings</h1>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 80 }}>
        {/* Language */}
        <div className="px-4 pt-5 mb-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Language & Region</p>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-100">
              <span className="text-xl">🌐</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-700">App Language</p>
                <p className="text-xs text-slate-400">Currently: {lang}</p>
              </div>
              <div className="flex bg-slate-100 rounded-xl p-0.5">
                {["English", "हिन्दी"].map((l) => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === l ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-4">
              <span className="text-xl">🇮🇳</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-700">Region</p>
                <p className="text-xs text-slate-400">Maharashtra, India</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="px-4 mb-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Permissions & Features</p>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            {toggles.map((item, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-3.5 ${i < toggles.length - 1 ? "border-b border-slate-100" : ""}`}>
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-700">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
                <button
                  onClick={() => toggle(i)}
                  className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${item.val ? "bg-blue-500" : "bg-slate-300"}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${item.val ? "translate-x-6" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="px-4 mb-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">About</p>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            {[{ icon: "ℹ️", label: "About RakshaSetu", val: "" }, { icon: "🔒", label: "Privacy Policy", val: "" }, { icon: "📄", label: "Terms of Service", val: "" }].map((item, i, arr) => (
              <button key={i} className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${i < arr.length - 1 ? "border-b border-slate-100" : ""}`}>
                <span className="text-xl">{item.icon}</span>
                <p className="text-sm font-semibold text-slate-700 flex-1">{item.label}</p>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            ))}
          </div>
        </div>

        {/* Version card */}
        <div className="mx-4 mb-4 p-4 bg-white rounded-2xl border border-slate-200 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
            <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
              <path d="M12 1L2 5v7c0 9 5 14 10 15 5-1 10-6 10-15V5L12 1z" fill="white" fillOpacity="0.9"/>
              <text x="5.5" y="18" fontSize="9" fontWeight="800" fontFamily="Inter,sans-serif" fill="#2563EB">AI</text>
            </svg>
          </div>
          <div>
            <p className="font-bold text-slate-900">RakshaSetu</p>
            <p className="text-xs text-slate-400">Version 2.1.0 · Innovik Hackathon 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
