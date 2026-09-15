export default function ProfileScreen({ onBack, onNavigate }: { onBack: () => void; onNavigate: (s: string) => void }) {
  return (
    <div className="absolute inset-0 bg-slate-50 flex flex-col" style={{ paddingTop: 48 }}>
      {/* Header gradient */}
      <div className="relative px-5 pt-4 pb-16" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)" }}>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <h1 className="font-bold text-white text-lg flex-1">My Profile</h1>
          <button className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
        </div>

        {/* Profile info */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-3xl">👤</div>
          <div>
            <h2 className="text-white font-bold text-xl">Bhavyansh Parihar</h2>
            <p className="text-blue-200 text-sm">bhavyansh@email.com</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-green-300 text-xs font-medium">Safe Status</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto -mt-8" style={{ paddingBottom: 80 }}>
        {/* Citizen ID card */}
        <div className="mx-4 mb-4">
          <div className="rounded-2xl overflow-hidden shadow-lg" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)" }}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest">RakshaSetu · Citizen ID</p>
                  <p className="text-white font-black text-lg mt-0.5">IND-2026-00412</p>
                </div>
                <div className="text-right">
                  <svg width="32" height="38" viewBox="0 0 32 38" fill="none">
                    <path d="M16 1L2 7v10c0 9 6.3 17.4 14 19.7C23.7 34.4 30 26 30 17V7L16 1z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.5"/>
                    <text x="7" y="24" fontSize="10" fontWeight="800" fontFamily="Inter,sans-serif" fill="white">AI</text>
                  </svg>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-blue-200 text-xs">Blood Group</p>
                  <p className="text-white font-black text-2xl">B+</p>
                </div>
                <div className="text-center">
                  {/* QR placeholder */}
                  <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center">
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                      {[[0,0,12,12],[16,0,12,12],[0,16,12,12]].map(([x,y,w,h],i) => (
                        <rect key={i} x={x} y={y} width={w} height={h} rx="2" fill="#1e3a8a"/>
                      ))}
                      {[[3,3,6,6],[19,3,6,6],[3,19,6,6]].map(([x,y,w,h],i) => (
                        <rect key={i+"i"} x={x} y={y} width={w} height={h} rx="1" fill="white"/>
                      ))}
                      {[16,20,24,28,32,36].map((x,i) => <rect key={x} x={x} y={16+i%3*4} width={3} height={3} rx="0.5" fill="#1e3a8a"/>)}
                    </svg>
                  </div>
                  <p className="text-blue-200 text-xs mt-1">Scan QR</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medical info */}
        <div className="mx-4 mb-4 bg-white rounded-2xl border border-slate-200 p-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Medical Information</p>
          <div className="grid grid-cols-2 gap-2">
            {[["🩸 Blood Group", "B Positive"], ["🎂 Age", "23 years"], ["⚕️ Allergies", "None"], ["💊 Medications", "None"]].map(([k, v]) => (
              <div key={k as string} className="bg-slate-50 rounded-xl p-2.5">
                <p className="text-xs text-slate-400">{k}</p>
                <p className="text-sm font-semibold text-slate-800">{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency contacts preview */}
        <div className="mx-4 mb-4 bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Emergency Contacts</p>
            <button onClick={() => onNavigate("contacts")} className="text-xs text-blue-600 font-semibold">View All</button>
          </div>
          {[{ name: "Rahul Sharma", rel: "Father", phone: "+91 98765 00001" }, { name: "Priya Sharma", rel: "Mother", phone: "+91 98765 00002" }].map((c) => (
            <div key={c.name} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-lg">👤</div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">{c.name}</p>
                <p className="text-xs text-slate-400">{c.rel} · {c.phone}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Language & Settings */}
        <div className="mx-4 mb-4 bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {[{ icon: "🌐", label: "Language", value: "English" }, { icon: "🌙", label: "Dark Mode", value: "Off" }, { icon: "⚙️", label: "Settings", value: "" }].map((item, i) => (
            <button key={i} onClick={() => onNavigate("settings")} className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 last:border-0 text-left">
              <span className="text-xl">{item.icon}</span>
              <p className="text-sm font-medium text-slate-700 flex-1">{item.label}</p>
              <p className="text-xs text-slate-400">{item.value}</p>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="mx-4 mb-4">
          <button className="w-full py-3.5 rounded-2xl border-2 border-red-200 text-red-500 font-semibold text-sm">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
