import React from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  darkMode: boolean;
  onToggleDark: () => void;
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

export default function Header({ title, subtitle, darkMode, onToggleDark, onToggleSidebar, sidebarCollapsed }: HeaderProps) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  const dateStr = now.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });

  return (
    <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-3 flex-shrink-0">
      <button
        onClick={onToggleSidebar}
        className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5">
          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      </button>

      <div className="flex-1">
        <h1 className="text-sm font-semibold text-foreground font-display leading-tight">{title}</h1>
        {subtitle && <p className="text-[11px] text-muted-foreground font-mono">{subtitle}</p>}
      </div>

      {/* Live clock */}
      <div className="hidden md:flex items-center gap-1.5 text-xs font-mono text-muted-foreground border border-border rounded px-2.5 py-1">
        <span className="w-1.5 h-1.5 rounded-full bg-safe inline-block" style={{ animation: "blink 2s infinite" }} />
        <span className="text-foreground font-medium">{timeStr}</span>
        <span className="opacity-50">·</span>
        <span>{dateStr}</span>
      </div>

      {/* Alert indicator */}
      <button className="relative p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
        <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-critical border border-card" />
      </button>

      {/* Dark mode toggle */}
      <button
        onClick={onToggleDark}
        className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      {/* User avatar */}
      <div className="flex items-center gap-2 pl-2 border-l border-border">
        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold font-display">
          DM
        </div>
        <div className="hidden md:block">
          <div className="text-xs font-medium text-foreground font-display leading-tight">District Magistrate</div>
          <div className="text-[10px] text-muted-foreground font-mono">Patna HQ · Admin</div>
        </div>
      </div>
    </header>
  );
}
