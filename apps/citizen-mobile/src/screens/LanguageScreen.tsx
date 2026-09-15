import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageScreen({ onDone }: { onDone: () => void }) {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState<"en" | "hi">(
    (localStorage.getItem('appLanguage') as "en" | "hi") || "en"
  );

  const handleLanguageSelect = (lang: "en" | "hi") => {
    setSelected(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('appLanguage', lang);
  };

  return (
    <div className="absolute inset-0 bg-white flex flex-col pt-16">
      {/* Illustration */}
      <div className="flex justify-center py-8">
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-blue-50 flex items-center justify-center">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              {/* Globe */}
              <circle cx="40" cy="40" r="34" stroke="#2563EB" strokeWidth="2" fill="#EFF6FF"/>
              <ellipse cx="40" cy="40" rx="16" ry="34" stroke="#2563EB" strokeWidth="1.5" fill="none"/>
              <line x1="6" y1="40" x2="74" y2="40" stroke="#2563EB" strokeWidth="1.5"/>
              <line x1="12" y1="24" x2="68" y2="24" stroke="#2563EB" strokeWidth="1"/>
              <line x1="12" y1="56" x2="68" y2="56" stroke="#2563EB" strokeWidth="1"/>
              {/* India shape hint */}
              <path d="M38 28 L44 30 L46 38 L44 50 L38 54 L34 48 L32 38 L36 30Z" fill="#2563EB" fillOpacity="0.3" stroke="#1E3A8A" strokeWidth="1"/>
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-xs">🇮🇳</div>
        </div>
      </div>

      <div className="px-6 mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900">{t('language_screen.title')}</h2>
        <p className="text-slate-500 text-sm mt-1.5">{t('language_screen.subtitle')}</p>
      </div>

      {/* Language cards */}
      <div className="px-6 flex flex-col gap-4 flex-1">
        {[
          { id: "en" as const, title: t('language_screen.en'), subtitle: t('language_screen.en_sub'), flag: "🇬🇧", bg: "#2563EB" },
          { id: "hi" as const, title: t('language_screen.hi'), subtitle: t('language_screen.hi_sub'), flag: "🇮🇳", bg: "#EA580C" },
        ].map((lang) => (
          <button
            key={lang.id}
            onClick={() => handleLanguageSelect(lang.id)}
            className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
              selected === lang.id
                ? "border-blue-500 bg-blue-50"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${selected === lang.id ? "" : "bg-slate-100"}`}
              style={selected === lang.id ? { background: lang.bg + "22" } : {}}>
              {lang.flag}
            </div>
            <div className="flex-1">
              <p className="text-slate-900 font-semibold text-lg">{lang.title}</p>
              <p className="text-slate-500 text-sm">{lang.subtitle}</p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected === lang.id ? "border-blue-500 bg-blue-500" : "border-slate-300"}`}>
              {selected === lang.id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
            </div>
          </button>
        ))}

        <div className="mt-auto pb-8 pt-4">
          <button
            onClick={onDone}
            className="w-full py-4 rounded-2xl text-white font-semibold text-base transition-transform active:scale-95"
            style={{ background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" }}
          >
            {t('language_screen.continue')}
          </button>
          <p className="text-center text-xs text-slate-400 mt-3">You can change this later in Settings</p>
        </div>
      </div>
    </div>
  );
}
