import { useState, useEffect } from "react";
import { useResponderStore } from "./store/useResponderStore";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import IncomingSOS from "./screens/IncomingSOS";
import IncidentDetails from "./screens/IncidentDetails";
import AIVerification from "./screens/AIVerification";
import Navigation from "./screens/Navigation";
import ActiveRescue from "./screens/ActiveRescue";
import CompletedRescue from "./screens/CompletedRescue";
import NearbyShelters from "./screens/NearbyShelters";
import Notifications from "./screens/Notifications";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";

type Screen =
  | "login"
  | "dashboard"
  | "incoming-sos"
  | "incident-details"
  | "ai-verification"
  | "navigation"
  | "active-rescue"
  | "completed-rescue"
  | "nearby-shelters"
  | "notifications"
  | "profile"
  | "settings";

const NAV_ITEMS = [
  {
    screen: "dashboard" as Screen,
    label: "Dashboard",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="2" stroke={active ? "#FF4F38" : "#3D5570"} strokeWidth="1.8" fill={active ? "#FF4F3820" : "none"}/>
        <rect x="13" y="3" width="8" height="8" rx="2" stroke={active ? "#FF4F38" : "#3D5570"} strokeWidth="1.8" fill={active ? "#FF4F3820" : "none"}/>
        <rect x="3" y="13" width="8" height="8" rx="2" stroke={active ? "#FF4F38" : "#3D5570"} strokeWidth="1.8" fill={active ? "#FF4F3820" : "none"}/>
        <rect x="13" y="13" width="8" height="8" rx="2" stroke={active ? "#FF4F38" : "#3D5570"} strokeWidth="1.8" fill={active ? "#FF4F3820" : "none"}/>
      </svg>
    ),
  },
  {
    screen: "incoming-sos" as Screen,
    label: "SOS",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          stroke={active ? "#FF4F38" : "#3D5570"} strokeWidth="1.8" fill={active ? "#FF4F38" : "none"} strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    screen: "nearby-shelters" as Screen,
    label: "Shelters",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" stroke={active ? "#FF4F38" : "#3D5570"} strokeWidth="1.8" fill={active ? "#FF4F3820" : "none"}/>
        <path d="M9 22V12h6v10" stroke={active ? "#FF4F38" : "#3D5570"} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    screen: "notifications" as Screen,
    label: "Alerts",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M6 10a6 6 0 1 1 12 0c0 3.87 1 5.5 2 7H4c1-1.5 2-3.13 2-7Z" stroke={active ? "#FF4F38" : "#3D5570"} strokeWidth="1.8" fill={active ? "#FF4F3820" : "none"} strokeLinejoin="round"/>
        <path d="M10 20a2 2 0 0 0 4 0" stroke={active ? "#FF4F38" : "#3D5570"} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    screen: "profile" as Screen,
    label: "Profile",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke={active ? "#FF4F38" : "#3D5570"} strokeWidth="1.8" fill={active ? "#FF4F3820" : "none"}/>
        <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke={active ? "#FF4F38" : "#3D5570"} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const SCREENS_WITHOUT_NAV: Screen[] = ["login", "navigation"];

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const connectSocket = useResponderStore((state) => state.connectSocket);

  useEffect(() => {
    const token = localStorage.getItem("responder_token");
    if (token) {
      connectSocket(token);
    }
  }, [connectSocket]);

  const navigate = (s: string) => setScreen(s as Screen);
  const showNav = !SCREENS_WITHOUT_NAV.includes(screen);
  const activeNavItem = NAV_ITEMS.find((n) => n.screen === screen)?.screen;

  const renderScreen = () => {
    switch (screen) {
      case "login": return <Login onLogin={() => {
        localStorage.setItem("responder_token", "demo-responder");
        connectSocket("demo-responder");
        navigate("dashboard");
      }} />;
      case "dashboard": return <Dashboard navigate={navigate} />;
      case "incoming-sos": return <IncomingSOS navigate={navigate} />;
      case "incident-details": return <IncidentDetails navigate={navigate} />;
      case "ai-verification": return <AIVerification navigate={navigate} />;
      case "navigation": return <Navigation navigate={navigate} />;
      case "active-rescue": return <ActiveRescue navigate={navigate} />;
      case "completed-rescue": return <CompletedRescue navigate={navigate} />;
      case "nearby-shelters": return <NearbyShelters navigate={navigate} />;
      case "notifications": return <Notifications />;
      case "profile": return <Profile />;
      case "settings": return <Settings />;
      default: return <Dashboard navigate={navigate} />;
    }
  };

  return (
    <>
      <div className="absolute inset-0 bg-[#111827] flex flex-col overflow-hidden">
        {/* Screen content */}
        <div className="flex-1 overflow-hidden relative animate-fade-in" key={screen}>
          {renderScreen()}
        </div>

        {/* Bottom Navigation */}
        {showNav && (
          <div
            className="shrink-0 border-t border-[#2D4160] flex items-center"
            style={{ background: "#1A2234", paddingBottom: "env(safe-area-inset-bottom, 8px)" }}
          >
            {NAV_ITEMS.map((item) => {
              const active = item.screen === screen;
              return (
                <button
                  key={item.screen}
                  onClick={() => navigate(item.screen)}
                  className="flex-1 flex flex-col items-center py-3 gap-1 transition-opacity active:opacity-70"
                >
                  <div className="relative">
                    {item.icon(active)}
                    {item.screen === "incoming-sos" && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF3B30] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-700 leading-none" style={{ fontSize: 9 }}>1</span>
                      </div>
                    )}
                    {item.screen === "notifications" && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF3B30] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-700 leading-none" style={{ fontSize: 9 }}>3</span>
                      </div>
                    )}
                  </div>
                  <span
                    className="text-xs font-600 transition-colors"
                    style={{ color: active ? "#FF4F38" : "#3D5570", fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
            {/* Settings gear */}
            <button
              onClick={() => navigate("settings")}
              className="flex-1 flex flex-col items-center py-3 gap-1 transition-opacity active:opacity-70"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke={screen === "settings" ? "#FF4F38" : "#3D5570"} strokeWidth="1.8"/>
                <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                  stroke={screen === "settings" ? "#FF4F38" : "#3D5570"} strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <span className="text-xs font-600" style={{ color: screen === "settings" ? "#FF4F38" : "#3D5570", fontFamily: "'Inter', sans-serif" }}>
                Settings
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
