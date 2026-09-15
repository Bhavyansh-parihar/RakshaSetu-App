import { useState } from "react";

const reports = [
  {
    id: "RPT-2026-0047",
    type: "Flood",
    icon: "🌊",
    status: "In Progress",
    statusColor: "#2563EB",
    priority: 87,
    responder: "NDRF Team Delta",
    timestamp: "Today, 08:23 AM",
    image: "🌊",
    progress: 60,
  },
  {
    id: "RPT-2026-0039",
    type: "Fire",
    icon: "🔥",
    status: "Resolved",
    statusColor: "#16A34A",
    priority: 95,
    responder: "Fire Brigade Unit 3",
    timestamp: "Yesterday, 02:15 PM",
    image: "🔥",
    progress: 100,
  },
  {
    id: "RPT-2026-0031",
    type: "Medical",
    icon: "🚑",
    status: "Assigned",
    statusColor: "#EA580C",
    priority: 72,
    responder: "Ambulance A-7",
    timestamp: "12 Sep, 10:45 AM",
    image: "🚑",
    progress: 30,
  },
  {
    id: "RPT-2026-0021",
    type: "Flood",
    icon: "🌊",
    status: "Rejected",
    statusColor: "#DC2626",
    priority: 41,
    responder: "—",
    timestamp: "8 Sep, 06:12 AM",
    image: "🌊",
    progress: 0,
  },
];

const filters = ["All", "Active", "Resolved", "Rejected"];

export default function HistoryScreen({ onBack, onGrievance }: { onBack: () => void; onGrievance?: () => void }) {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>("RPT-2026-0047");

  const filtered = reports.filter((r) => {
    if (filter === "All") return true;
    if (filter === "Active") return ["In Progress", "Assigned", "Pending"].includes(r.status);
    return r.status === filter;
  });

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
          <h1 className="font-bold text-slate-900 text-lg">Report History</h1>
          <p className="text-xs text-slate-400">{reports.length} total reports</p>
        </div>
        {onGrievance && (
          <button
            onClick={onGrievance}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)" }}
          >
            📝 Grievance
          </button>
        )}
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 px-4 py-3 bg-white border-b border-slate-100 overflow-x-auto">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              filter === f ? "bg-blue-600 border-blue-600 text-white" : "border-slate-200 text-slate-500 bg-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto px-4 pt-4" style={{ paddingBottom: 80 }}>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-slate-200" />

          <div className="flex flex-col gap-4">
            {filtered.map((report) => (
              <div key={report.id} className="flex gap-3">
                {/* Timeline dot */}
                <div className="flex flex-col items-center flex-shrink-0 mt-4">
                  <div className="w-10 h-10 rounded-full border-2 border-white shadow flex items-center justify-center text-lg"
                    style={{ background: report.statusColor + "22", borderColor: report.statusColor }}>
                    {report.icon}
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <button className="w-full p-4 text-left" onClick={() => setExpanded(expanded === report.id ? null : report.id)}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{report.type} Incident</p>
                        <p className="text-xs text-slate-400 mt-0.5">{report.id} · {report.timestamp}</p>
                      </div>
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                        style={{ background: report.statusColor + "18", color: report.statusColor }}
                      >
                        {report.status}
                      </span>
                    </div>
                  </button>

                  {expanded === report.id && (
                    <div className="px-4 pb-4 border-t border-slate-100 pt-3 animate-fade-in">
                      {/* Image preview */}
                      <div className="h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center text-4xl mb-3">
                        {report.image}
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-slate-50 rounded-xl p-2.5">
                          <p className="text-xs text-slate-400">Priority Score</p>
                          <p className="font-bold text-slate-900 text-sm">{report.priority}/100</p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-2.5">
                          <p className="text-xs text-slate-400">Responder</p>
                          <p className="font-bold text-slate-900 text-sm">{report.responder}</p>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <p className="text-xs font-semibold text-slate-600">Response Progress</p>
                          <p className="text-xs font-bold" style={{ color: report.statusColor }}>{report.progress}%</p>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${report.progress}%`, background: report.statusColor }} />
                        </div>

                        {/* Status timeline dots */}
                        <div className="flex items-center justify-between mt-3">
                          {["Submitted", "Assigned", "In Progress", "Resolved"].map((step, i) => {
                            const done = report.progress >= (i + 1) * 25;
                            return (
                              <div key={step} className="flex flex-col items-center gap-1">
                                <div className={`w-3 h-3 rounded-full border-2 ${done ? "bg-current border-current" : "bg-white border-slate-300"}`}
                                  style={done ? { color: report.statusColor, borderColor: report.statusColor, background: report.statusColor } : {}} />
                                <p className="text-xs text-slate-400" style={{ fontSize: "9px" }}>{step}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
