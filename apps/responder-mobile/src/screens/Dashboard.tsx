interface Props {
  navigate: (screen: string) => void;
}

import { useResponderStore } from '../store/useResponderStore';

const nearby = [
  { id: "INC-2851", type: "MEDICAL", loc: "Park Street", dist: "0.8 km", priority: 5 },
  { id: "INC-2848", type: "STRANDED", loc: "Highway NH-48", dist: "2.1 km", priority: 6 },
];

export default function Dashboard({ navigate }: Props) {
  const highPriorityQueue = useResponderStore(state => state.highPriorityQueue);
  const setSelectedIncident = useResponderStore(state => state.setSelectedIncident);
  
  const incidents = highPriorityQueue.map(inc => ({
    raw: inc,
    id: inc.id || "INC-LIVE",
    type: (inc.type ? inc.type.toUpperCase() : "SOS ALERT"),
    priority: inc.priorityScore || 7,
    loc: inc.latitude && inc.longitude ? `${inc.latitude}°N, ${inc.longitude}°E` : "GPS Locked",
    time: "Just now",
    dist: "Live Alert",
    status: (inc.priorityScore || 7) >= 8 ? "CRITICAL" : "HIGH"
  }));
  
  const latestSOS = highPriorityQueue[0];
  
  const priorityColor = (p: number) =>
    p >= 8 ? "#FF3B30" : p >= 6 ? "#FFB800" : "#0A84FF";

  return (
    <div className="flex flex-col h-full bg-[#111827] overflow-y-auto">
      {/* Header */}
      <div className="bg-[#1A2234] border-b border-[#2D4160] px-5 pt-8 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[#8BAFC8] text-xs uppercase tracking-widest mono font-semibold">NDRF — Field Response</p>
            <h1 className="font-display text-2xl font-800 text-[#F0F5FA] tracking-wide mt-1">FIELD DASHBOARD</h1>
          </div>
          <button onClick={() => navigate("notifications")} className="relative mt-1">
            <div className="w-10 h-10 bg-[#1E2D42] border border-[#2D4160] rounded-xl flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 10a6 6 0 1 1 12 0c0 3.87 1 5.5 2 7H4c1-1.5 2-3.13 2-7Z" stroke="#F0F5FA" strokeWidth="1.8" strokeLinejoin="round"/>
                <path d="M10 20a2 2 0 0 0 4 0" stroke="#F0F5FA" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            {incidents.length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF3B30] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-700 leading-none">{incidents.length}</span>
              </div>
            )}
          </button>
        </div>

        {/* Status bar */}
        <div className="flex gap-2 mt-4">
          {[
            { label: "ON DUTY", value: "Active", color: "#30D158" },
            { label: "TEAM", value: "Alpha-7", color: "#0A84FF" },
            { label: "STATUS", value: incidents.length > 0 ? `${incidents.length} Active` : "Standby", color: incidents.length > 0 ? "#FF3B30" : "#30D158" },
          ].map((s) => (
            <div key={s.label} className="flex-1 bg-[#111827] border border-[#2D4160] rounded-xl px-3 py-2">
              <p className="text-[#4D6E8A] text-xs mono">{s.label}</p>
              <p className="font-600 text-xs mt-0.5" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4" style={{ paddingBottom: 80 }}>
        {/* Weather Warning */}
        <div
          className="rounded-2xl p-4 border border-[#FFB80030] relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #261E00 0%, #1A2234 100%)" }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #FFB800, transparent 70%)" }} />
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFB80020] border border-[#FFB80040] flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFB800" stroke="#FFB800" strokeWidth="1.2" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-display text-xs font-700 tracking-widest text-[#FFB800]">WEATHER ALERT — AURORA WATCH</span>
              </div>
              <p className="text-[#F0F5FA] text-sm font-600 mt-1">Hazard monitoring system active</p>
              <p className="text-[#8BAFC8] text-xs mt-0.5">Live sensor link established · Listening for real-time citizen SOS signals</p>
            </div>
          </div>
        </div>

        {/* High Priority Queue */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-700 tracking-wide text-[#F0F5FA]">HIGH PRIORITY QUEUE</h2>
            <span className={`text-xs font-600 rounded-lg px-2.5 py-1 ${latestSOS ? "text-[#FF3B30] bg-[#FF3B3015] border border-[#FF3B3030]" : "text-[#30D158] bg-[#30D15815] border border-[#30D15830]"}`}>
              {latestSOS ? "1 AWAITING" : "CLEAR"}
            </span>
          </div>
          {latestSOS ? (
            <button
              onClick={() => {
                setSelectedIncident(latestSOS);
                navigate("incoming-sos");
              }}
              className="w-full rounded-2xl p-4 border border-[#FF3B3050] active:scale-98 transition-transform relative overflow-hidden text-left"
              style={{ background: "linear-gradient(135deg, #2A100A 0%, #1E2D42 100%)" }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #FF3B30, transparent 70%)" }} />
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#FF3B30] rounded-2xl flex items-center justify-center shrink-0 relative">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v7M12 15v2" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M3 17L12 3l9 14H3Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                  <div className="absolute inset-0 rounded-2xl animate-pulse-ring border-2 border-[#FF3B30]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-base font-700 text-[#F0F5FA] tracking-wide truncate">
                    INCOMING SOS — {latestSOS.id} (P{latestSOS.priorityScore || 9})
                  </p>
                  <p className="text-[#FF3B30] text-xs font-600 mt-0.5 truncate">
                    {latestSOS.description || `Emergency Type: ${latestSOS.type || "SOS"}`} · Tap to respond
                  </p>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#FF3B30] shrink-0">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
          ) : (
            <div className="bg-[#1E2D42]/60 border border-[#2D4160] rounded-2xl p-5 text-center">
              <p className="text-sm font-semibold text-[#F0F5FA]">No Pending Emergency Alerts</p>
              <p className="text-xs text-[#8BAFC8] mt-1">When a citizen raises an SOS, it will appear here in real time.</p>
            </div>
          )}
        </section>

        {/* Active incidents */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${incidents.length > 0 ? "bg-[#FF3B30] animate-pulse" : "bg-[#30D158]"}`} />
              <h2 className="font-display text-lg font-700 tracking-wide text-[#F0F5FA]">ACTIVE INCIDENTS</h2>
            </div>
            <span className="text-[#8BAFC8] text-xs font-mono">{incidents.length} TOTAL</span>
          </div>
          {incidents.length > 0 ? (
            <div className="flex flex-col gap-2">
              {incidents.map((inc) => (
                <button
                  key={inc.id}
                  onClick={() => {
                    setSelectedIncident(inc.raw);
                    navigate("incident-details");
                  }}
                  className="w-full bg-[#1E2D42] border border-[#2D4160] rounded-2xl p-4 text-left active:scale-98 transition-transform hover:border-[#3A5270]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className="font-display text-xs font-700 px-2 py-0.5 rounded-lg"
                          style={{ color: priorityColor(inc.priority), background: priorityColor(inc.priority) + "20", border: `1px solid ${priorityColor(inc.priority)}40` }}
                        >
                          P{inc.priority} · {inc.status}
                        </span>
                        <span className="text-[#4D6E8A] text-xs mono">{inc.id}</span>
                      </div>
                      <p className="font-display text-base font-700 text-[#F0F5FA] tracking-wide">{inc.type}</p>
                      <p className="text-[#8BAFC8] text-xs mt-0.5 truncate">{inc.loc}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[#F0F5FA] text-sm font-600">{inc.dist}</p>
                      <p className="text-[#4D6E8A] text-xs mt-0.5">{inc.time}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-[#1E2D42]/40 border border-[#2D4160] rounded-2xl p-6 text-center">
              <p className="text-[#8BAFC8] text-xs">Waiting for incoming incident reports.</p>
            </div>
          )}
        </section>

        {/* Assigned Tasks */}
        <section className="mb-4">
          <h2 className="font-display text-lg font-700 tracking-wide text-[#F0F5FA] mb-3">ASSIGNED TASKS</h2>
          <div className="bg-[#1E2D42] border border-[#2D4160] rounded-2xl overflow-hidden">
            {[
              { task: "Patrol Sector 7B flood zone", due: "13:00", done: false },
              { task: "Submit INC-2830 completion report", due: "15:00", done: false },
              { task: "Equipment check — rescue kit", due: "11:30", done: true },
            ].map((t, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i < 2 ? "border-b border-[#2D4160]" : ""}`}>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${t.done ? "bg-[#30D158] border-[#30D158]" : "border-[#3A5270]"}`}>
                  {t.done && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <p className={`flex-1 text-sm ${t.done ? "line-through text-[#4D6E8A]" : "text-[#F0F5FA]"}`}>{t.task}</p>
                <span className={`text-xs mono ${t.done ? "text-[#4D6E8A]" : "text-[#FFB800]"}`}>{t.due}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
