export default function Profile() {
  return (
    <div className="flex flex-col h-full bg-[#111827] overflow-y-auto">
      {/* Header */}
      <div
        className="px-4 pt-12 pb-6 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1A2234 0%, #111827 100%)" }}
      >
        <div className="absolute top-0 right-0 w-60 h-60 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #FF4F38, transparent 70%)" }} />
        <div className="relative flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF4F38] to-[#CC1A10] flex items-center justify-center text-4xl shadow-lg">
            👨‍🚒
          </div>
          <div>
            <h1 className="font-display text-3xl font-800 text-[#F0F5FA] tracking-wide">ARJUN MEHTA</h1>
            <p className="text-[#8BAFC8] text-sm">Senior Field Responder</p>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="w-2 h-2 rounded-full bg-[#30D158] animate-pulse" />
              <span className="text-[#30D158] text-xs font-600">ON DUTY</span>
              <span className="text-[#4D6E8A] text-xs">· Shift ends 18:00</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 pb-6">
        {/* ID Card */}
        <div
          className="rounded-2xl p-4 border border-[#FF4F3830] relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #2A100A 0%, #1E2D42 100%)" }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #FF4F38, transparent 70%)" }} />
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "RESPONDER ID", value: "NDRF-MH-04821" },
              { label: "BATCH", value: "MH-04 · Alpha-7" },
              { label: "DESIGNATION", value: "Field Responder Lvl 3" },
              { label: "ZONE", value: "Kolhapur West" },
              { label: "JOINED", value: "Mar 2019" },
              { label: "CLEARANCE", value: "Level 4" },
            ].map((f) => (
              <div key={f.label}>
                <p className="text-[#4D6E8A] text-xs mono">{f.label}</p>
                <p className="text-[#F0F5FA] text-sm font-600 mt-0.5">{f.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "RESCUES", value: "247", color: "#FF4F38" },
            { label: "THIS MONTH", value: "14", color: "#0A84FF" },
            { label: "RATING", value: "4.9★", color: "#FFB800" },
          ].map((s) => (
            <div key={s.label} className="bg-[#1E2D42] border border-[#2D4160] rounded-2xl p-3 text-center">
              <p className="font-display text-2xl font-800" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[#4D6E8A] text-xs mono mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-[#1E2D42] border border-[#2D4160] rounded-2xl p-4">
          <p className="text-[#8BAFC8] text-xs uppercase tracking-widest mono mb-3">CERTIFICATIONS</p>
          <div className="flex flex-col gap-2">
            {[
              { cert: "NDRF Basic Rescue", exp: "Dec 2026", active: true },
              { cert: "Swift Water Rescue", exp: "Jun 2025", active: true },
              { cert: "Hazmat Level II", exp: "Sep 2024", active: true },
              { cert: "First Responder Medical", exp: "Mar 2025", active: true },
            ].map((c) => (
              <div key={c.cert} className="flex items-center gap-3 py-2 border-b border-[#2D4160] last:border-0">
                <div className="w-8 h-8 rounded-xl bg-[#30D15820] border border-[#30D15840] flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4" stroke="#30D158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="9" stroke="#30D158" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[#F0F5FA] text-sm font-600">{c.cert}</p>
                  <p className="text-[#4D6E8A] text-xs">Expires {c.exp}</p>
                </div>
                <span className="text-[#30D158] text-xs font-600 bg-[#30D15815] border border-[#30D15830] rounded-lg px-2 py-0.5">VALID</span>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment */}
        <div className="bg-[#1E2D42] border border-[#2D4160] rounded-2xl p-4">
          <p className="text-[#8BAFC8] text-xs uppercase tracking-widest mono mb-3">ASSIGNED EQUIPMENT</p>
          <div className="flex flex-col gap-2">
            {["Inflatable rescue boat (MH-4B)", "Life vests ×6", "Rope rescue kit", "First aid kit (L3)", "Radio: CH-7 Primary"].map((e) => (
              <div key={e} className="flex items-center gap-2 py-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0A84FF] shrink-0" />
                <span className="text-[#F0F5FA] text-sm">{e}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
