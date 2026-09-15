type Screen = string;

const navItems = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "shelters", label: "Nearby Shelters", icon: "📍" },
  { id: "history", label: "Report History", icon: "📋" },
  { id: "chatbot", label: "AI Assistant", icon: "🤖" },
  { id: "guidelines", label: "Safety Guidelines", icon: "📚" },
  { id: "contacts", label: "Emergency Contacts", icon: "👥" },
  { id: "helpline", label: "Helplines", icon: "📞" },
  { id: "grievance", label: "File a Grievance", icon: "📝" },
  { id: "profile", label: "Profile", icon: "👤" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

export default function DrawerMenu({ onNavigate, onClose, active }: { onNavigate: (s: Screen) => void; onClose: () => void; active: Screen }) {
  return (
    <div className="absolute inset-0 z-50 flex animate-fade-in">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="relative w-80 h-full bg-white flex flex-col animate-slide-up" style={{ borderRadius: "0 24px 24px 0" }}>
        {/* Header */}
        <div className="px-6 pt-16 pb-6" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)" }}>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            <div>
              <p className="text-white font-semibold text-base">Bhavyansh Parihar</p>
              <p className="text-blue-200 text-xs">Citizen ID: IND-2026-00412</p>
              <div className="mt-1 flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-green-300 text-xs font-medium">Safe</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <div className="flex-1 overflow-y-auto py-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); onClose(); }}
              className={`w-full flex items-center gap-4 px-6 py-3.5 text-left transition-colors ${active === item.id ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className={`text-sm font-medium ${active === item.id ? "text-blue-600" : ""}`}>{item.label}</span>
              {active === item.id && <div className="ml-auto w-1.5 h-6 bg-blue-600 rounded-full" />}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100">
          <p className="text-xs text-slate-400 text-center">RakshaSetu v2.1.0 · Innovik Hackathon 2026</p>
        </div>
      </div>
    </div>
  );
}
