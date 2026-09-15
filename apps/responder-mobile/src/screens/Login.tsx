interface Props {
  onLogin: () => void;
}

export default function Login({ onLogin }: Props) {
  return (
    <div className="flex flex-col h-full bg-[#111827] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A2234] via-[#111827] to-[#0A0810]" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #FF4F38 0%, transparent 70%)" }}
      />

      <div className="relative flex flex-col h-full px-6 pt-16 pb-10 animate-fade-in">
        {/* Logo */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-2xl bg-[#FF4F38] flex items-center justify-center shadow-lg">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <path d="M22 4L4 14V30L22 40L40 30V14L22 4Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
                <path d="M22 14V22M22 22V30M22 22H14M22 22H30" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#30D158] rounded-full border-2 border-[#111827] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          </div>
          <h1 className="font-display text-4xl font-800 tracking-wide text-[#F0F5FA]">RAKSHASETU</h1>
          <p className="text-[#8BAFC8] text-sm mt-1 tracking-widest uppercase">Field Responder</p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-[#2D4160]" />
          <span className="text-[#4D6E8A] text-xs tracking-widest uppercase">Secure Login</span>
          <div className="flex-1 h-px bg-[#2D4160]" />
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="text-[#8BAFC8] text-xs font-500 uppercase tracking-widest mb-2 block">Responder ID</label>
            <div className="bg-[#1A2234] border border-[#2D4160] rounded-xl px-4 py-3.5 flex items-center gap-3 focus-within:border-[#FF4F38] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#4D6E8A] shrink-0">
                <rect x="3" y="8" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M8 8V6C8 3.79 9.79 2 12 2s4 1.79 4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <circle cx="12" cy="14" r="2" fill="currentColor"/>
              </svg>
              <input
                type="text"
                defaultValue="NDRF-MH-04821"
                className="bg-transparent text-[#F0F5FA] text-sm flex-1 outline-none placeholder:text-[#4D6E8A]"
                placeholder="e.g. NDRF-MH-04821"
              />
            </div>
          </div>
          <div>
            <label className="text-[#8BAFC8] text-xs font-500 uppercase tracking-widest mb-2 block">Password</label>
            <div className="bg-[#1A2234] border border-[#2D4160] rounded-xl px-4 py-3.5 flex items-center gap-3 focus-within:border-[#FF4F38] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#4D6E8A] shrink-0">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <input
                type="password"
                defaultValue="••••••••"
                className="bg-transparent text-[#F0F5FA] text-sm flex-1 outline-none placeholder:text-[#4D6E8A]"
                placeholder="Enter password"
              />
            </div>
          </div>
        </div>

        {/* Biometric option */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="h-px flex-1 bg-[#2D4160]" />
          <button className="flex items-center gap-2 bg-[#1E2D42] border border-[#2D4160] rounded-xl px-4 py-2.5 text-[#8BAFC8] text-xs">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#0A84FF]">
              <path d="M12 1C8.96 1 6.21 2.68 4.72 5.16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M3.07 9.5A9.96 9.96 0 0 0 3 12c0 5.52 4.48 10 9.97 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M20.93 9.5C20.97 10.33 21 11 21 12c0 1.95-.45 3.8-1.25 5.44" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M12 7a5 5 0 0 1 5 5c0 .83-.14 1.63-.38 2.38" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M9 10.5c-.01.49.07.97.22 1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M12 13v4M10 17h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            Biometric Login
          </button>
          <div className="h-px flex-1 bg-[#2D4160]" />
        </div>

        {/* Login button */}
        <button
          onClick={onLogin}
          className="w-full bg-[#FF4F38] text-white font-display text-xl font-700 tracking-wider py-4 rounded-2xl shadow-lg active:scale-95 transition-transform mb-4"
          style={{ boxShadow: "0 4px 24px #FF4F3840" }}
        >
          AUTHENTICATE & LOGIN
        </button>

        <p className="text-center text-[#4D6E8A] text-xs">
          Having trouble? Contact{" "}
          <span className="text-[#0A84FF]">Control Room: 1078</span>
        </p>

        {/* Footer */}
        <div className="mt-auto pt-6 flex items-center justify-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#30D158] animate-pulse" />
            <span className="text-[#30D158] text-xs mono">SERVERS ONLINE</span>
          </div>
          <div className="w-px h-3 bg-[#2D4160]" />
          <span className="text-[#4D6E8A] text-xs">v3.2.1 · NDRF CERTIFIED</span>
        </div>
      </div>
    </div>
  );
}
