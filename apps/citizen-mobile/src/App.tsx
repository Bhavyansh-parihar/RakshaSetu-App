import { useState, useEffect } from "react";
import { useCitizenStore } from "./store/useCitizenStore";
import PhoneFrame from "./components/PhoneFrame";
import BottomNav from "./components/BottomNav";
import DrawerMenu from "./components/DrawerMenu";

import SplashScreen from "./screens/SplashScreen";
import LanguageScreen from "./screens/LanguageScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SheltersScreen from "./screens/SheltersScreen";
import ReportScreen from "./screens/ReportScreen";
import HistoryScreen from "./screens/HistoryScreen";
import ChatbotScreen from "./screens/ChatbotScreen";
import GuidelinesScreen from "./screens/GuidelinesScreen";
import ContactsScreen from "./screens/ContactsScreen";
import HelplineScreen from "./screens/HelplineScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import GrievanceScreen from "./screens/GrievanceScreen";

type Screen =
  | "splash" | "language" | "login"
  | "home" | "shelters" | "report" | "history"
  | "chatbot" | "guidelines" | "contacts"
  | "helpline" | "notifications" | "profile" | "settings" | "grievance";

const bottomNavScreens = new Set(["home", "shelters", "report", "chatbot", "profile"]);

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [history, setHistory] = useState<Screen[]>([]);
  
  const connectSocket = useCitizenStore(state => state.connectSocket);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      connectSocket(token);
    }
  }, [connectSocket]);

  // Request basic permissions when the app mounts or user logs in
  useEffect(() => {
    const requestPermissions = async () => {
      // 1. Camera & Microphone
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
          stream.getTracks().forEach(track => track.stop()); // Stop immediately after granting
        }
      } catch (err) {
        console.warn('Camera/Mic permission denied:', err);
      }
      
      // 2. Location
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            () => console.log('Location permission granted'),
            (err) => console.warn('Location permission denied:', err)
          );
        }
      } catch (err) {
        console.warn('Location API error:', err);
      }
    };
    
    // Request permissions after a slight delay so it doesn't block the initial splash screen
    const timer = setTimeout(() => requestPermissions(), 3000);
    return () => clearTimeout(timer);
  }, []);

  const navigate = (to: Screen) => {
    setHistory((h) => [...h, screen]);
    setScreen(to);
  };

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      setScreen(prev);
    }
  };

  const showBottomNav = bottomNavScreens.has(screen);

  return (
    <>
      {/* Status bar text color context */}
      <div className="absolute inset-0 bg-white">
        {/* Screens */}
        {screen === "splash" && <SplashScreen onDone={() => navigate("language")} />}
        {screen === "language" && <LanguageScreen onDone={() => navigate("login")} />}
        {screen === "login" && <LoginScreen onDone={() => navigate("home")} />}
        {screen === "home" && (
          <HomeScreen
            onNavigate={(s) => navigate(s as Screen)}
            onMenu={() => setDrawerOpen(true)}
          />
        )}
        {screen === "shelters" && <SheltersScreen onBack={goBack} />}
        {screen === "report" && <ReportScreen onBack={goBack} onSubmit={() => navigate("history")} />}
        {screen === "history" && <HistoryScreen onBack={goBack} onGrievance={() => navigate("grievance")} />}
        {screen === "chatbot" && <ChatbotScreen onBack={goBack} />}
        {screen === "guidelines" && <GuidelinesScreen onBack={goBack} />}
        {screen === "contacts" && <ContactsScreen onBack={goBack} />}
        {screen === "helpline" && <HelplineScreen onBack={goBack} />}
        {screen === "notifications" && <NotificationsScreen onBack={goBack} />}
        {screen === "profile" && <ProfileScreen onBack={goBack} onNavigate={(s) => navigate(s as Screen)} />}
        {screen === "settings" && <SettingsScreen onBack={goBack} />}
        {screen === "grievance" && <GrievanceScreen onBack={goBack} />}

        {/* Bottom navigation */}
        {showBottomNav && (
          <BottomNav
            active={screen}
            onNavigate={(s) => {
              setHistory([]);
              setScreen(s as Screen);
            }}
          />
        )}

        {/* Drawer */}
        {drawerOpen && (
          <DrawerMenu
            active={screen}
            onNavigate={(s) => navigate(s as Screen)}
            onClose={() => setDrawerOpen(false)}
          />
        )}
      </div>
    </>
  );
}
