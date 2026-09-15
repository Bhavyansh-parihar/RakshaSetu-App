import { ReactNode } from "react";

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #1e40af 100%)" }}>
      <div className="relative" style={{ width: 393, height: 852 }}>
        {/* Phone shell */}
        <div
          className="absolute inset-0 rounded-[48px] overflow-hidden shadow-2xl"
          style={{
            boxShadow: "0 0 0 2px #374151, 0 0 0 4px #111827, 0 32px 64px rgba(0,0,0,0.6)",
          }}
        >
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-12 z-50 flex items-center px-8 justify-between" style={{ background: "transparent" }}>
            <span className="text-xs font-semibold text-current opacity-80">9:41</span>
            <div className="w-28 h-7 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-2" />
            <div className="flex items-center gap-1 opacity-80">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><rect x="0" y="4" width="3" height="8" rx="0.5"/><rect x="4" y="2.5" width="3" height="9.5" rx="0.5"/><rect x="8" y="1" width="3" height="11" rx="0.5"/><rect x="12" y="0" width="3" height="12" rx="0.5"/></svg>
              <svg width="15" height="12" viewBox="0 0 15 12" fill="currentColor"><path d="M7.5 2.5C9.8 2.5 11.8 3.5 13.2 5L14.5 3.7C12.7 1.9 10.2 0.8 7.5 0.8C4.8 0.8 2.3 1.9 0.5 3.7L1.8 5C3.2 3.5 5.2 2.5 7.5 2.5Z"/><path d="M7.5 5.5C9 5.5 10.3 6.1 11.3 7.1L12.6 5.8C11.2 4.5 9.4 3.7 7.5 3.7C5.6 3.7 3.8 4.5 2.4 5.8L3.7 7.1C4.7 6.1 6 5.5 7.5 5.5Z"/><circle cx="7.5" cy="10" r="1.8"/></svg>
              <div className="flex items-center gap-0.5">
                <div className="w-6 h-3 border border-current rounded-sm relative"><div className="absolute inset-0.5 right-1 bg-current rounded-sm"/><div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0.5 h-1.5 bg-current rounded-full"/></div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="absolute inset-0 overflow-hidden rounded-[48px]">
            {children}
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-current opacity-30 rounded-full z-50" />
        </div>

        {/* Side buttons */}
        <div className="absolute -right-1 top-28 w-1 h-12 bg-gray-700 rounded-r-sm" />
        <div className="absolute -left-1 top-24 w-1 h-8 bg-gray-700 rounded-l-sm" />
        <div className="absolute -left-1 top-36 w-1 h-14 bg-gray-700 rounded-l-sm" />
        <div className="absolute -left-1 top-52 w-1 h-14 bg-gray-700 rounded-l-sm" />
      </div>
    </div>
  );
}
