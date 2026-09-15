import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Overview from "./pages/Overview";
import LiveIncidentMap from "./pages/LiveIncidentMap";
import Responders from "./pages/Responders";
import Shelters from "./pages/Shelters";
import WeatherMonitoring from "./pages/WeatherMonitoring";
import ResourceAllocation from "./pages/ResourceAllocation";
import BroadcastAlerts from "./pages/BroadcastAlerts";
import IncidentTimeline from "./pages/IncidentTimeline";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

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

const pageMeta: Record<Page, { title: string; subtitle?: string }> = {
  overview: { title: "Command Overview", subtitle: "Bihar · Patna District · Sep 15, 2026" },
  map: { title: "Live Incident Map", subtitle: "Real-time SOS · Responders · Flood / Fire Zones" },
  responders: { title: "Responder Units", subtitle: "Field teams · Deployment status" },
  shelters: { title: "Relief Shelters", subtitle: "Capacity · Supply tracking" },
  weather: { title: "Weather Monitoring", subtitle: "Microsoft Aurora AI · IMD integration" },
  resources: { title: "Resource Allocation", subtitle: "Inventory · Supply chain tracking" },
  alerts: { title: "Broadcast Alerts", subtitle: "Multilingual emergency notifications" },
  timeline: { title: "Incident Timeline", subtitle: "Chronological event log" },
  analytics: { title: "Analytics", subtitle: "Response performance · Rescue metrics" },
  settings: { title: "Settings", subtitle: "System configuration · SDMA Bihar" },
};

export default function App() {
  const [page, setPage] = useState<Page>("overview");
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Start dark
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const navigate = (p: string) => setPage(p as Page);
  const meta = pageMeta[page];

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar
        currentPage={page}
        onNavigate={(p) => setPage(p)}
        collapsed={sidebarCollapsed}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          title={meta.title}
          subtitle={meta.subtitle}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode((d) => !d)}
          onToggleSidebar={() => setSidebarCollapsed((c) => !c)}
          sidebarCollapsed={sidebarCollapsed}
        />

        <main className="flex-1 overflow-auto">
          {page === "overview" && <Overview onNavigate={navigate} />}
          {page === "map" && <LiveIncidentMap onNavigate={navigate} />}
          {page === "responders" && <Responders />}
          {page === "shelters" && <Shelters />}
          {page === "weather" && <WeatherMonitoring />}
          {page === "resources" && <ResourceAllocation />}
          {page === "alerts" && <BroadcastAlerts />}
          {page === "timeline" && <IncidentTimeline />}
          {page === "analytics" && <Analytics />}
          {page === "settings" && <Settings />}
        </main>
      </div>
    </div>
  );
}
