export default function SplashScreen({ onDone }: { onDone: () => void }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-between py-16"
      style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e3a8a 40%, #2563eb 75%, #3b82f6 100%)" }}
    >
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #60a5fa 0%, transparent 70%)" }} />

      <div />

      {/* Center content */}
      <div className="flex flex-col items-center">
        {/* Shield logo */}
        <div className="relative mb-8">
          {/* Ripple rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border border-blue-400/30 animate-sos-ring" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center" style={{ animationDelay: "0.5s" }}>
            <div className="w-32 h-32 rounded-full border border-blue-400/20 animate-sos-ring" />
          </div>

          {/* Shield */}
          <div className="w-28 h-28 flex items-center justify-center relative">
            <svg width="96" height="112" viewBox="0 0 96 112" fill="none">
              <defs>
                <linearGradient id="shieldGrad" x1="0" y1="0" x2="96" y2="112" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#60a5fa"/>
                  <stop offset="100%" stopColor="#2563eb"/>
                </linearGradient>
              </defs>
              <path d="M48 4L8 20v28c0 24.8 17.3 48 40 56 22.7-8 40-31.2 40-56V20L48 4z" fill="url(#shieldGrad)" stroke="white" strokeWidth="2" strokeOpacity="0.4"/>
              <path d="M48 20L24 30v18c0 15.6 10.9 30.2 24 35.2 13.1-5 24-19.6 24-35.2V30L48 20z" fill="white" fillOpacity="0.15"/>
              {/* AI text */}
              <text x="28" y="62" fontSize="26" fontWeight="800" fontFamily="Inter,sans-serif" fill="white" letterSpacing="-1">AI</text>
              {/* Checkmark/pulse line */}
              <path d="M30 74 L38 82 L58 62" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <h1 className="text-white font-bold tracking-widest text-4xl" style={{ letterSpacing: "6px" }}>RakshaSetu</h1>
        <div className="flex items-center gap-2 mt-3">
          <div className="w-8 h-px bg-blue-400/50" />
          <p className="text-blue-200 text-sm font-medium tracking-widest uppercase" style={{ letterSpacing: "3px" }}>
            Protect · Respond · Recover
          </p>
          <div className="w-8 h-px bg-blue-400/50" />
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col items-center gap-6">
        {/* Loading dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        <div className="text-center">
          <p className="text-blue-300 text-xs font-medium">Innovik Hackathon 2026</p>
          <p className="text-blue-400/60 text-xs mt-0.5">Disaster Management Platform</p>
        </div>

        <button
          onClick={onDone}
          className="px-8 py-2 rounded-full border border-white/20 text-white/60 text-xs font-medium"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
