interface Props {
  navigate: (screen: string) => void;
}

export default function CompletedRescue({ navigate }: Props) {
  return (
    <div className="flex flex-col h-full bg-[#111827] overflow-y-auto">
      {/* Success hero */}
      <div
        className="px-4 pt-12 pb-8 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0A2518 0%, #1A2234 100%)" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #30D158, transparent 70%)" }} />
        <div className="relative flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-[#30D158] flex items-center justify-center mb-5 shadow-lg"
            style={{ boxShadow: "0 0 40px #30D15840" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M4 12l5 5L20 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="font-display text-4xl font-900 text-[#30D158] tracking-wide">RESCUE COMPLETE</h1>
          <p className="text-[#8BAFC8] text-sm mt-2">All civilians evacuated safely</p>
          <p className="text-[#4D6E8A] text-xs mono mt-1">INC-2847 · Closed at 15:04:22</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4">
        {/* Summary stats */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "PEOPLE RESCUED", value: "4", unit: "civilians", color: "#30D158" },
            { label: "OPERATION TIME", value: "34", unit: "minutes", color: "#0A84FF" },
            { label: "INJURIES", value: "0", unit: "reported", color: "#30D158" },
            { label: "RISK LEVEL", value: "P9", unit: "resolved", color: "#FF3B30" },
          ].map((s) => (
            <div key={s.label} className="bg-[#1E2D42] border border-[#2D4160] rounded-2xl p-4 text-center">
              <p className="font-display text-3xl font-900" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[#F0F5FA] text-xs font-600 mt-1">{s.unit}</p>
              <p className="text-[#4D6E8A] text-xs mono mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Timeline summary */}
        <div className="bg-[#1E2D42] border border-[#2D4160] rounded-2xl p-4">
          <p className="text-[#8BAFC8] text-xs uppercase tracking-widest mono mb-4">OPERATION TIMELINE</p>
          {[
            { label: "SOS Received", time: "14:30:02", done: true },
            { label: "Accepted & Dispatched", time: "14:31:45", done: true },
            { label: "Reached Scene", time: "14:37:18", done: true },
            { label: "Rescue Started", time: "14:39:50", done: true },
            { label: "Rescue Completed", time: "15:04:22", done: true },
          ].map((t, i, arr) => (
            <div key={t.label} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-[#30D158] flex items-center justify-center shrink-0">
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l2.5 2.5L10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                {i < arr.length - 1 && <div className="w-0.5 flex-1 min-h-6 bg-[#30D158] opacity-40" />}
              </div>
              <div className="pb-4 flex-1 flex items-center justify-between">
                <p className="text-[#F0F5FA] text-sm font-600">{t.label}</p>
                <span className="text-[#8BAFC8] text-xs mono">{t.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Citizen feedback */}
        <div className="bg-[#30D15810] border border-[#30D15830] rounded-2xl p-4">
          <p className="text-[#8BAFC8] text-xs uppercase tracking-widest mono mb-3">CITIZEN FEEDBACK</p>
          <div className="flex items-center gap-3">
            <div className="text-3xl">👤</div>
            <div>
              <p className="text-[#F0F5FA] text-sm font-600">Bhavyansh Parihar</p>
              <div className="flex gap-1 mt-1">
                {[1,2,3,4,5].map(i => <span key={i} className="text-[#FFB800] text-base">★</span>)}
              </div>
            </div>
          </div>
          <p className="text-[#8BAFC8] text-sm mt-3 italic">"The responder arrived quickly and was incredibly professional. My children and I are safe. Thank you so much."</p>
        </div>

        {/* Report */}
        <div className="bg-[#1E2D42] border border-[#2D4160] rounded-2xl p-4">
          <p className="text-[#8BAFC8] text-xs uppercase tracking-widest mono mb-3">COMPLETION REPORT</p>
          <div className="flex flex-col gap-2">
            {[
              { label: "Responder", value: "Arjun Mehta · NDRF-MH-04821" },
              { label: "Team", value: "Alpha-7" },
              { label: "Equipment used", value: "Inflatable boat, life vests ×4" },
              { label: "Submitted to", value: "Command Center, Kolhapur" },
            ].map((r) => (
              <div key={r.label} className="flex items-start justify-between gap-2 py-2 border-b border-[#2D4160] last:border-0">
                <span className="text-[#8BAFC8] text-xs">{r.label}</span>
                <span className="text-[#F0F5FA] text-xs font-600 text-right">{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pb-6">
          <button className="w-full bg-[#1E2D42] border border-[#0A84FF40] text-[#0A84FF] font-display text-lg font-700 tracking-wider py-4 rounded-2xl active:scale-95 transition-transform">
            DOWNLOAD REPORT
          </button>
          <button
            onClick={() => navigate("dashboard")}
            className="w-full bg-[#FF4F38] text-white font-display text-xl font-700 tracking-wider py-4 rounded-2xl active:scale-95 transition-transform"
            style={{ boxShadow: "0 4px 24px #FF4F3840" }}
          >
            RETURN TO DASHBOARD
          </button>
        </div>
      </div>
    </div>
  );
}
