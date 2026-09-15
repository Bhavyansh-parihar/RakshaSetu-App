const notifications = [
  {
    group: "Today",
    items: [
      { icon: "🌊", type: "Flood Alert", msg: "Flood warning issued for Andheri, Kurla, and Bandra areas. Evacuate to nearest shelter.", time: "9:41 AM", unread: true, color: "#2563EB" },
      { icon: "🆘", type: "SOS Nearby", msg: "A citizen near your location has sent an SOS. NDRF team dispatched.", time: "8:15 AM", unread: true, color: "#DC2626" },
      { icon: "✅", type: "Report Update", msg: "Your report RPT-2026-0047 has been assigned to NDRF Team Delta.", time: "7:30 AM", unread: false, color: "#16A34A" },
    ],
  },
  {
    group: "Yesterday",
    items: [
      { icon: "⚠️", type: "Weather Warning", msg: "IMD issues heavy rainfall warning for Maharashtra till 18 Sep 2026.", time: "6:00 PM", unread: false, color: "#EA580C" },
      { icon: "⛺", type: "Shelter Update", msg: "Dharavi Shelter is now at full capacity. Next nearest: Kurla Community Hall.", time: "2:45 PM", unread: false, color: "#7C3AED" },
      { icon: "📋", type: "Report Resolved", msg: "Your fire incident report RPT-2026-0039 has been marked as resolved.", time: "11:20 AM", unread: false, color: "#16A34A" },
    ],
  },
];

export default function NotificationsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="absolute inset-0 bg-slate-50 flex flex-col" style={{ paddingTop: 48 }}>
      {/* Header */}
      <div className="bg-white flex items-center gap-3 px-5 py-4 border-b border-slate-100">
        <button onClick={onBack} className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-slate-900 text-lg">Notifications</h1>
          <p className="text-xs text-slate-400">2 unread alerts</p>
        </div>
        <button className="text-xs font-semibold text-blue-600">Mark all read</button>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 80 }}>
        {notifications.map((group) => (
          <div key={group.group}>
            <div className="px-5 py-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{group.group}</p>
            </div>
            <div className="flex flex-col gap-2 px-4">
              {group.items.map((item, i) => (
                <div
                  key={i}
                  className={`flex gap-3 p-4 rounded-2xl border transition-all ${
                    item.unread ? "bg-white border-blue-200 shadow-sm" : "bg-white border-slate-200"
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: item.color + "18" }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-xs font-bold" style={{ color: item.color }}>{item.type}</p>
                      {item.unread && <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />}
                      <p className="text-xs text-slate-400 ml-auto flex-shrink-0">{item.time}</p>
                    </div>
                    <p className="text-sm text-slate-700 leading-snug">{item.msg}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
