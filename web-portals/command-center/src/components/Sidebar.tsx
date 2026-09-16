import React from "react";

type Page =
  | "overview"
  | "map"
  | "responders"
  | "shelters"
  | "weather"
  | "resources"
  | "alerts"
  | "timeline"
  | "analytics"
  | "settings";

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  collapsed: boolean;
}

const navItems: { id: Page; label: string; icon: React.ReactNode; badge?: number | string }[] = [
  {
    id: "overview",
    label: "Overview",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5">
        <path d="M2 10a8 8 0 1116 0A8 8 0 012 10zm8-3a1 1 0 00-1 1v3a1 1 0 002 0V8a1 1 0 00-1-1zm0 6a1 1 0 100 2 1 1 0 000-2z" />
      </svg>
    ),
  },
  {
    id: "map",
    label: "Live Incident Map",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5">
        <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
      </svg>
    ),
    badge: 5,
  },
  {
    id: "responders",
    label: "Responders",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
    ),
  },
  {
    id: "shelters",
    label: "Shelters",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    ),
  },
  {
    id: "weather",
    label: "Weather (Aurora)",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5">
        <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
      </svg>
    ),
    badge: "4",
  },
  {
    id: "resources",
    label: "Resource Allocation",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5">
        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
      </svg>
    ),
  },
  {
    id: "alerts",
    label: "Broadcast Alerts",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5">
        <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: "timeline",
    label: "Incident Timeline",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5">
        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
      </svg>
    ),
  },
];

const settingsItem: { id: Page; label: string; icon: React.ReactNode } = {
  id: "settings",
  label: "Settings",
  icon: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4.5 h-4.5">
      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
  ),
};

export default function Sidebar({ currentPage, onNavigate, collapsed }: SidebarProps) {
  return (
    <aside
      style={{ width: collapsed ? 56 : 220, transition: "width 0.2s ease", minWidth: collapsed ? 56 : 220 }}
      className="flex flex-col h-screen bg-card border-r border-border flex-shrink-0"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3.5 h-14 border-b border-border flex-shrink-0">
        <div className="flex-shrink-0 w-7 h-7 rounded-md bg-primary flex items-center justify-center">
          <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4">
            <path fillRule="evenodd" d="M2.94 6.412A2 2 0 002 8.108V16a2 2 0 002 2h12a2 2 0 002-2V8.108a2 2 0 00-.94-1.696l-6-3.75a2 2 0 00-2.12 0l-6 3.75zm2.615 4.423a1 1 0 10-1.11 1.664l5 3.333a1 1 0 001.11 0l5-3.333a1 1 0 00-1.11-1.664L10 13.798 5.555 10.835z" clipRule="evenodd" />
          </svg>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-sm font-bold text-foreground font-display whitespace-nowrap leading-tight">RakshaSetu</div>
            <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider whitespace-nowrap">Command Center</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 flex flex-col gap-0.5 px-2">
        {navItems.map((item) => {
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.label : undefined}
              className={`
                flex items-center gap-2.5 w-full rounded-md px-2.5 py-2 text-sm transition-all text-left
                ${active
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }
              `}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && (
                <span className="flex-1 truncate font-display">{item.label}</span>
              )}
              {!collapsed && item.badge !== undefined && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                    active ? "bg-white/20 text-white" : "bg-critical/20 text-critical"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Settings + Status */}
      <div className="flex-shrink-0 border-t border-border p-2">
        <button
          onClick={() => onNavigate(settingsItem.id)}
          title={collapsed ? settingsItem.label : undefined}
          className={`flex items-center gap-2.5 w-full rounded-md px-2.5 py-2 text-sm transition-all
            ${currentPage === "settings"
              ? "bg-primary text-primary-foreground font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }
          `}
        >
          <span className="flex-shrink-0">{settingsItem.icon}</span>
          {!collapsed && <span className="font-display">{settingsItem.label}</span>}
        </button>
        {!collapsed && (
          <div className="mt-2 px-2.5 py-2 rounded-md bg-safe/10 border border-safe/20">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-safe inline-block" style={{ animation: "blink 2s infinite" }} />
              <span className="text-[11px] text-safe font-mono font-medium">SYSTEM OPERATIONAL</span>
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5 font-mono">v2.4.1 · SDMA Bihar</div>
          </div>
        )}
      </div>
    </aside>
  );
}
