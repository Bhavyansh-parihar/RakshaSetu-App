import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../localization/LanguageContext";

export default function GuidelinesScreen({ onBack }: { onBack: () => void }) {
  const { t } = useTranslation();
  const { currentLang, setLanguage } = useLanguage();

  const categoryIds = ["flood", "fire", "earthquake", "cyclone", "landslide", "firstaid"] as const;
  const categoryIcons: Record<string, string> = {
    flood: "🌊", fire: "🔥", earthquake: "🏔️",
    cyclone: "🌀", landslide: "🏞️", firstaid: "🩹"
  };
  const categoryColors: Record<string, { color: string; bg: string }> = {
    flood:     { color: "#2563EB", bg: "#eff6ff" },
    fire:      { color: "#DC2626", bg: "#fef2f2" },
    earthquake:{ color: "#EA580C", bg: "#fff7ed" },
    cyclone:   { color: "#7C3AED", bg: "#f5f3ff" },
    landslide: { color: "#92400E", bg: "#fffbeb" },
    firstaid:  { color: "#16A34A", bg: "#f0fdf4" },
  };

  const [active, setActive] = useState<string>("flood");
  const [expanded, setExpanded] = useState<string | null>(null);

  const current = { id: active, ...categoryColors[active] };
  const tips = t(`guidelines.categories.${active}.tips`, { returnObjects: true }) as string[];
  const label = t(`guidelines.categories.${active}.label`);

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
          <h1 className="font-bold text-slate-900 text-lg flex-1">{t("guidelines.title")}</h1>
          {/* Lang toggle */}
          <div className="flex bg-slate-100 rounded-xl p-0.5">
            {(["en", "hi"] as const).map((l) => (
              <button key={l} onClick={() => setLanguage(l)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentLang === l ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"}`}>
                {l === "en" ? "English" : "हिन्दी"}
              </button>
            ))}
          </div>
        </div>

        {/* Category scroll */}
        <div className="flex gap-2 overflow-x-auto -mx-1 px-1">
          {categoryIds.map((id) => (
            <button
              key={id}
              onClick={() => { setActive(id); setExpanded(null); }}
              className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-2xl border-2 transition-all ${
                active === id ? "border-current shadow-sm" : "border-transparent bg-slate-100"
              }`}
              style={active === id ? { borderColor: categoryColors[id].color, background: categoryColors[id].bg } : {}}
            >
              <span className="text-xl">{categoryIcons[id]}</span>
              <span className="text-xs font-semibold" style={{ color: active === id ? categoryColors[id].color : "#64748b" }}>
                {t(`guidelines.categories.${id}.label`)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4" style={{ paddingBottom: 80 }}>
        {/* Hero card */}
        <div className="rounded-2xl p-5 mb-4 overflow-hidden relative" style={{ background: `linear-gradient(135deg, ${current.color} 0%, ${current.color}cc 100%)` }}>
          <div className="absolute right-4 top-4 text-7xl opacity-20">{categoryIcons[active]}</div>
          <div className="relative z-10">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
              {t("guidelines.disasterGuidelines")}
            </p>
            <h2 className="text-white font-black text-2xl mb-2">
              {label} {t("guidelines.safety")}
            </h2>
            <p className="text-white/80 text-sm">
              {tips.length} {t("guidelines.criticalProtocols")}
            </p>
          </div>
        </div>

        {/* Accordion tips */}
        <div className="flex flex-col gap-2">
          {tips.map((tip, i) => (
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
                    {t("guidelines.expandedNote")}
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
            <p className="text-sm font-bold text-red-700">{t("guidelines.danger")}</p>
            <p className="text-xs text-red-500 mt-0.5">{t("guidelines.dangerDesc")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
