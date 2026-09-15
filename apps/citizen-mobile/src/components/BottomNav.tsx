import { useTranslation } from "react-i18next";

type Screen = string;

export default function BottomNav({ active, onNavigate }: { active: Screen; onNavigate: (s: Screen) => void }) {
  const { t } = useTranslation();

  const tabs = [
    {
      id: "home",
      label: t('bottom_nav.home'),
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.5" : "1.8"} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
    {
      id: "shelters",
      label: t('bottom_nav.shelters'),
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.5" : "1.8"} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="2.5"/>
        </svg>
      ),
    },
    {
      id: "report",
      label: t('bottom_nav.report'),
      icon: (_active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" strokeWidth="1.8"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ),
      sos: true,
    },
    {
      id: "chatbot",
      label: t('bottom_nav.chatbot'),
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.5" : "1.8"} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
      ),
    },
    {
      id: "profile",
      label: t('bottom_nav.profile'),
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.5" : "1.8"} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-100 flex items-start pt-2 px-2 z-40" style={{ paddingBottom: "env(safe-area-inset-bottom, 8px)" }}>
      {tabs.map((tab) =>
        tab.sos ? (
          <button
            key={tab.id}
            onClick={() => onNavigate("report")}
            className="flex-1 flex flex-col items-center"
          >
            <div
              className="w-14 h-14 -mt-6 rounded-full flex items-center justify-center shadow-lg text-white"
              style={{ background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", boxShadow: "0 4px 16px rgba(220,38,38,0.4)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" strokeLinecap="round" strokeLinejoin="round">
                <text x="2" y="17" fontSize="13" fontWeight="700" fontFamily="Inter,sans-serif" fill="white">SOS</text>
              </svg>
            </div>
            <span className="text-xs font-medium text-red-500 mt-0.5">{tab.label}</span>
          </button>
        ) : (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-1 transition-colors ${active === tab.id ? "text-blue-600" : "text-slate-400"}`}
          >
            {tab.icon(active === tab.id)}
            <span className={`text-xs font-medium ${active === tab.id ? "text-blue-600" : "text-slate-400"}`}>{tab.label}</span>
          </button>
        )
      )}
    </div>
  );
}
