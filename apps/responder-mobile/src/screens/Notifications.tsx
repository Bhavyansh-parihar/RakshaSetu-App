const notifications = [
  { id: 1, type: "SOS", title: "New SOS — Priority 9", body: "Bhavyansh Parihar · Sector 7B · 1.4 km", time: "2m ago", read: false, color: "#FF3B30" },
  { id: 2, type: "WEATHER", title: "Weather Alert: Aurora Watch", body: "Heavy rainfall · Wind 62 km/h · Kolhapur", time: "8m ago", read: false, color: "#FFB800" },
  { id: 3, type: "SYSTEM", title: "Task Reassigned: INC-2831", body: "Incident reassigned from Team Beta to Alpha-7", time: "22m ago", read: false, color: "#0A84FF" },
  { id: 4, type: "SOS", title: "SOS Resolved: INC-2839", body: "Rescue completed by Ravi Kumar", time: "41m ago", read: true, color: "#30D158" },
  { id: 5, type: "SYSTEM", title: "Shift Reminder", body: "Your shift ends at 18:00 — log handover notes", time: "1h ago", read: true, color: "#8BAFC8" },
  { id: 6, type: "WEATHER", title: "Flash Flood Advisory Lifted", body: "Sector 4 & 5 — risk downgraded to moderate", time: "2h ago", read: true, color: "#30D158" },
];

const icons: Record<string, string> = {
  SOS: "🆘",
  WEATHER: "🌧",
  SYSTEM: "⚙️",
};

export default function Notifications() {
  return (
    <div className="flex flex-col h-full bg-[#111827] overflow-y-auto">
      <div className="bg-[#1A2234] border-b border-[#2D4160] px-4 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-800 text-[#F0F5FA] tracking-wide">NOTIFICATIONS</h1>
            <p className="text-[#8BAFC8] text-xs mt-0.5">3 unread</p>
          </div>
          <button className="text-[#0A84FF] text-xs font-600 bg-[#0A84FF15] border border-[#0A84FF30] rounded-xl px-3 py-2">Mark all read</button>
        </div>
      </div>

      <div className="flex flex-col px-4 py-4 gap-2">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`bg-[#1E2D42] border rounded-2xl p-4 flex items-start gap-3 transition-opacity ${n.read ? "opacity-60" : ""}`}
            style={{ borderColor: n.read ? "#2D4160" : n.color + "40" }}
          >
            {!n.read && (
              <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: n.color }} />
            )}
            {n.read && <div className="w-2 h-2 mt-1.5 shrink-0" />}
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl"
              style={{ background: n.color + "15", border: `1px solid ${n.color}30` }}>
              {icons[n.type]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[#F0F5FA] text-sm font-600 leading-tight">{n.title}</p>
                <span className="text-[#4D6E8A] text-xs shrink-0 mono">{n.time}</span>
              </div>
              <p className="text-[#8BAFC8] text-xs mt-1 leading-relaxed">{n.body}</p>
              <span
                className="inline-block text-xs font-600 mt-2 px-2 py-0.5 rounded-lg"
                style={{ color: n.color, background: n.color + "15" }}
              >
                {n.type}
              </span>
            </div>
          </div>
        ))}

        {/* Offline queue indicator */}
        <div className="bg-[#1E2D42] border border-[#2D4160] border-dashed rounded-2xl p-4 flex items-center gap-3 opacity-50">
          <div className="w-10 h-10 rounded-xl bg-[#1A2234] border border-[#2D4160] flex items-center justify-center text-xl">📶</div>
          <div>
            <p className="text-[#F0F5FA] text-sm font-600">2 updates queued offline</p>
            <p className="text-[#8BAFC8] text-xs">Will sync when connection restores</p>
          </div>
        </div>

        <div className="pb-4" />
      </div>
    </div>
  );
}
