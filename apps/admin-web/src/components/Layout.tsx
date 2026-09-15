import { useState } from "react";
import {
  LayoutDashboard, Users, AlertTriangle, MessageSquare, BarChart3,
  ClipboardList, Building2, Phone, BookOpen, Settings, ChevronRight,
  Bell, Search, Shield, Menu, X, LogOut, ChevronDown
} from "lucide-react";

export type Page =
  | "overview" | "users" | "moderation" | "grievances"
  | "analytics" | "audit" | "shelters" | "helplines"
  | "guidelines" | "settings";

interface NavItem { id: Page; label: string; icon: React.ElementType; badge?: number; }

const NAV: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "User Management", icon: Users },
  { id: "moderation", label: "Fake Report Moderation", icon: AlertTriangle, badge: 14 },
  { id: "grievances", label: "Grievance Management", icon: MessageSquare, badge: 7 },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "audit", label: "Audit Logs", icon: ClipboardList },
  { id: "shelters", label: "Shelter Management", icon: Building2 },
  { id: "helplines", label: "Helpline Management", icon: Phone },
  { id: "guidelines", label: "Safety Guidelines CMS", icon: BookOpen },
  { id: "settings", label: "System Settings", icon: Settings },
];

interface Props {
  current: Page;
  onNavigate: (p: Page) => void;
  children: React.ReactNode;
}

export default function Layout({ current, onNavigate, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);

  const currentLabel = NAV.find(n => n.id === current)?.label ?? "";

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#07090F" }}>
      {/* Sidebar */}
      <aside
        className="flex flex-col flex-shrink-0 transition-all duration-300 border-r"
        style={{
          width: sidebarOpen ? 248 : 64,
          background: "#0B0F1A",
          borderColor: "#1C2B45",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-14 border-b flex-shrink-0" style={{ borderColor: "#1C2B45" }}>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0" style={{ background: "linear-gradient(135deg, #4488FF 0%, #22D3EE 100%)" }}>
            <Shield size={16} color="#fff" />
          </div>
          {sidebarOpen && (
            <div className="min-w-0">
              <div className="text-sm font-semibold leading-none" style={{ color: "#E2EAF8" }}>RakshaSetu</div>
              <div className="text-[10px] mt-0.5 font-mono uppercase tracking-widest" style={{ color: "#3D5070" }}>Admin Console</div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(p => !p)}
            className="ml-auto flex-shrink-0 p-1 rounded hover:opacity-70 transition-opacity"
            style={{ color: "#3D5070" }}
          >
            {sidebarOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {NAV.map(item => {
            const active = current === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-lg mb-0.5 transition-all duration-150 relative group"
                style={{
                  background: active ? "#172240" : "transparent",
                  borderLeft: active ? "2px solid #4488FF" : "2px solid transparent",
                }}
              >
                <div className="flex-shrink-0" style={{ color: active ? "#4488FF" : "#3D5070" }}>
                  <Icon size={16} />
                </div>
                {sidebarOpen ? (
                  <>
                    <span className="text-[13px] font-medium flex-1 text-left truncate" style={{ color: active ? "#E2EAF8" : "#7B8DB5" }}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: "#1A3A7A", color: "#4488FF" }}>
                        {item.badge}
                      </span>
                    )}
                  </>
                ) : (
                  item.badge && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "#EF4444" }} />
                  )
                )}
                {!sidebarOpen && (
                  <div className="absolute left-full ml-2 z-50 hidden group-hover:flex items-center">
                    <div className="text-xs whitespace-nowrap px-2 py-1 rounded" style={{ background: "#111E34", color: "#E2EAF8", border: "1px solid #1C2B45" }}>
                      {item.label}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Admin profile */}
        <div className="border-t p-3 flex-shrink-0" style={{ borderColor: "#1C2B45" }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0" style={{ background: "#172240", color: "#4488FF" }}>
              SA
            </div>
            {sidebarOpen && (
              <>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate" style={{ color: "#E2EAF8" }}>Super Admin</div>
                  <div className="text-[10px] truncate" style={{ color: "#3D5070" }}>admin@raksha.gov.in</div>
                </div>
                <LogOut size={13} style={{ color: "#3D5070" }} className="flex-shrink-0 cursor-pointer hover:opacity-70" />
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex items-center gap-4 px-6 h-14 border-b flex-shrink-0" style={{ background: "#0B0F1A", borderColor: "#1C2B45" }}>
          <div>
            <div className="text-sm font-semibold" style={{ color: "#E2EAF8" }}>{currentLabel}</div>
            <div className="text-[10px] font-mono" style={{ color: "#3D5070" }}>NDMA · National Disaster Management Authority</div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            {/* Search */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs" style={{ background: "#0D1525", border: "1px solid #1C2B45", color: "#3D5070" }}>
              <Search size={12} />
              <span>Search…</span>
              <span className="font-mono text-[10px] ml-2">⌘K</span>
            </div>
            {/* Notifs */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(p => !p)}
                className="relative flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
                style={{ background: notifOpen ? "#172240" : "transparent", color: "#7B8DB5" }}
              >
                <Bell size={15} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "#EF4444" }} />
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 rounded-xl z-50 overflow-hidden" style={{ background: "#0D1525", border: "1px solid #1C2B45" }}>
                  <div className="px-4 py-3 border-b text-xs font-semibold" style={{ borderColor: "#1C2B45", color: "#7B8DB5" }}>NOTIFICATIONS</div>
                  {[
                    { msg: "14 new fake reports flagged by AI", time: "2m ago", dot: "#EF4444" },
                    { msg: "Grievance #GRV-1142 escalated", time: "15m ago", dot: "#F59E0B" },
                    { msg: "Shelter capacity critical in Odisha", time: "1h ago", dot: "#F59E0B" },
                    { msg: "AI model accuracy dropped to 84%", time: "3h ago", dot: "#4488FF" },
                  ].map((n, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3 border-b transition-colors hover:opacity-80" style={{ borderColor: "#1C2B45" }}>
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.dot }} />
                      <div className="flex-1">
                        <div className="text-xs" style={{ color: "#E2EAF8" }}>{n.msg}</div>
                        <div className="text-[10px] mt-0.5 font-mono" style={{ color: "#3D5070" }}>{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* System status */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono" style={{ background: "#0A1A0E", border: "1px solid #10B981", color: "#10B981" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />
              SYSTEMS NOMINAL
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto" style={{ background: "#07090F" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
