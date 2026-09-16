import { useState, useEffect } from "react";
import {
  LayoutDashboard, Users, AlertTriangle, MessageSquare, BarChart3,
  ClipboardList, Building2, Phone, BookOpen, Settings,
  Bell, Search, Shield, Menu, LogOut, Sun, Moon, X
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
  const [darkMode, setDarkMode] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const currentLabel = NAV.find(n => n.id === current)?.label ?? "";

  // Dark mode toggle — applies .dark class to <html> without auto-styling pages
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside
        className={`flex flex-col flex-shrink-0 transition-all duration-300 border-r bg-white border-slate-200 ${sidebarOpen ? "w-[248px]" : "w-16"}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-14 border-b border-slate-200 flex-shrink-0">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)" }}
          >
            <Shield size={16} color="#fff" />
          </div>
          {sidebarOpen && (
            <div className="min-w-0">
              <div className="text-sm font-semibold leading-none text-slate-900">RakshaSetu</div>
              <div className="text-[10px] mt-0.5 font-mono uppercase tracking-widest text-slate-500">Admin Console</div>
            </div>
          )}
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
                className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg mb-0.5 transition-all duration-150 relative group ${
                  active
                    ? "bg-blue-50 text-blue-600 font-semibold border-l-2 border-blue-600"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-l-2 border-transparent"
                }`}
              >
                <div className="flex-shrink-0" style={{ color: active ? "#2563EB" : "#64748B" }}>
                  <Icon size={16} />
                </div>
                {sidebarOpen ? (
                  <>
                    <span className="text-[13px] font-medium flex-1 text-left truncate" style={{ color: active ? "#1E40AF" : "#475569" }}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </>
                ) : (
                  item.badge && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
                  )
                )}
                {!sidebarOpen && (
                  <div className="absolute left-full ml-2 z-50 hidden group-hover:flex items-center">
                    <div className="text-xs whitespace-nowrap px-2 py-1 rounded bg-slate-900 text-white shadow-md">
                      {item.label}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Admin profile */}
        <div className="border-t border-slate-200 p-3 flex-shrink-0 bg-white">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 bg-blue-100 text-blue-700">
              SA
            </div>
            {sidebarOpen && (
              <>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate text-slate-900">Super Admin</div>
                  <div className="text-[10px] truncate text-slate-500">admin@raksha.gov.in</div>
                </div>
                <LogOut size={13} className="text-slate-400 flex-shrink-0 cursor-pointer hover:text-slate-600" />
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50">
        {/* Top Header */}
        <header className="h-14 border-b border-slate-200 bg-white flex items-center px-4 gap-3 flex-shrink-0">
          {/* Hamburger */}
          <button
            id="admin-hamburger-btn"
            onClick={() => setSidebarOpen(p => !p)}
            className="p-1.5 rounded text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Page title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold text-slate-900 leading-tight truncate">{currentLabel}</h1>
            <p className="text-[11px] text-slate-500 font-mono">RakshaSetu · Admin Panel</p>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-1.5 bg-slate-50 w-44">
            <Search size={13} className="text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-xs text-slate-600 placeholder-slate-400 outline-none w-full"
            />
          </div>

          {/* Bell */}
          <button
            className="relative p-1.5 rounded text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setNotifOpen(p => !p)}
          >
            <Bell size={16} />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-500 border border-white" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            id="admin-dark-mode-toggle"
            onClick={() => setDarkMode(d => !d)}
            className="p-1.5 rounded text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
