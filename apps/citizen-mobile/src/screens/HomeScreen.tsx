import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

type Screen = string;

const quickActions = [
  { id: "report", icon: "⚠️", label: "Report Incident", color: "#EA580C", bg: "#fff7ed" },
  { id: "chatbot", icon: "🤖", label: "AI Assistant", color: "#2563EB", bg: "#eff6ff" },
  { id: "guidelines", icon: "📚", label: "Safety Tips", color: "#16A34A", bg: "#f0fdf4" },
  { id: "helpline", icon: "📞", label: "Emergency Helpline", color: "#DC2626", bg: "#fef2f2" },
];

export default function HomeScreen({ onNavigate, onMenu }: { onNavigate: (s: Screen) => void; onMenu: () => void }) {
  const { t } = useTranslation();
  const [sosState, setSosState] = useState<"idle" | "holding" | "sent">("idle");
  const [countdown, setCountdown] = useState(3);
  const [disasterStatus] = useState<"safe" | "warning" | "flood">("warning");
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startHold = () => {
    setSosState("holding");
    setCountdown(3);
    let c = 3;
    intervalRef.current = setInterval(async () => {
      c -= 1;
      setCountdown(c);
      if (c <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setSosState("sent");
        
        // Trigger SOS on backend
        try {
          const token = localStorage.getItem("token");
          let lat = 19.0760 + (Math.random() - 0.5) * 0.01;
          let lng = 72.8777 + (Math.random() - 0.5) * 0.01;
          if (navigator.geolocation) {
            try {
              const pos: GeolocationPosition = await new Promise((res, rej) =>
                navigator.geolocation.getCurrentPosition(res, rej, { timeout: 2000 })
              );
              lat = Number(pos.coords.latitude.toFixed(4));
              lng = Number(pos.coords.longitude.toFixed(4));
            } catch {}
          }

          await fetch("https://rakshasetu-app-8dvk.onrender.com/incidents/sos", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              ...(token ? { "Authorization": `Bearer ${token}` } : {})
            },
            body: JSON.stringify({
              type: "SOS ALERT",
              description: "Emergency Panic Distress Alert Triggered from Home Screen",
              latitude: lat,
              longitude: lng,
              batteryLevel: 45,
              isSevereWeather: true
            })
          });
        } catch (err) {
          console.error("SOS trigger failed", err);
        }
      }
    }, 1000);
  };

  const cancelHold = () => {
    if (sosState === "holding") {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setSosState("idle");
      setCountdown(3);
    }
  };

  useEffect(() => {
    return () => {
      if (holdTimer.current) clearTimeout(holdTimer.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const statusConfig = {
    safe: { label: "You are Safe", color: "#16A34A", bg: "#f0fdf4", border: "#bbf7d0", icon: "✅" },
    warning: { label: "Warning: Flood Alert", color: "#EA580C", bg: "#fff7ed", border: "#fed7aa", icon: "⚠️" },
    flood: { label: "Danger: Flood Zone", color: "#DC2626", bg: "#fef2f2", border: "#fecaca", icon: "🚨" },
  }[disasterStatus];

  return (
    <div className="absolute inset-0 bg-slate-50 flex flex-col" style={{ paddingTop: 48 }}>
      {/* Header */}
      <div className="bg-white px-5 pt-4 pb-4 flex items-center gap-3 border-b border-slate-100">
        <button onClick={onMenu} className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round">
            <line x1="0" y1="1" x2="18" y2="1"/><line x1="0" y1="7" x2="18" y2="7"/><line x1="0" y1="13" x2="18" y2="13"/>
          </svg>
        </button>
        <div className="flex-1">
          <p className="text-xs text-slate-400 font-medium">{t('home.greeting').split(',')[0]}</p>
          <p className="text-slate-900 font-bold text-base leading-tight">Bhavyansh 👋</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
          <p className="text-xs font-bold text-blue-700">IND-2026-412</p>
        </div>
        <button className="relative w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 80 }}>
        {/* Status card */}
        <div className="mx-4 mt-4 p-4 rounded-2xl border-2 flex items-center gap-3" style={{ background: statusConfig.bg, borderColor: statusConfig.border }}>
          <span className="text-2xl">{statusConfig.icon}</span>
          <div className="flex-1">
            <p className="font-bold text-sm" style={{ color: statusConfig.color }}>{statusConfig.label}</p>
            <p className="text-xs text-slate-500 mt-0.5">Last updated: 2 min ago · Maharashtra</p>
          </div>
          <button className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white" style={{ background: statusConfig.color }}>Details</button>
        </div>

        {/* SOS Section */}
        <div className="flex flex-col items-center py-6">
          <p className="text-xs text-slate-400 font-medium mb-4 uppercase tracking-widest">Emergency SOS</p>

          {/* SOS Button */}
          <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
            {/* Ripple rings (idle) */}
            {sosState === "idle" && (
              <>
                <div className="absolute w-52 h-52 rounded-full border-2 border-red-200 animate-pulse-ring" />
                <div className="absolute w-44 h-44 rounded-full border-2 border-red-300 animate-pulse-ring" style={{ animationDelay: "0.7s" }} />
              </>
            )}

            {/* Progress ring (holding) */}
            {sosState === "holding" && (
              <svg className="absolute" width="220" height="220" viewBox="0 0 220 220" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="110" cy="110" r="100" fill="none" stroke="#fee2e2" strokeWidth="6"/>
                <circle
                  cx="110" cy="110" r="100"
                  fill="none" stroke="#dc2626" strokeWidth="6"
                  strokeDasharray="628"
                  strokeDashoffset={628 - (628 * (3 - countdown) / 3)}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
              </svg>
            )}

            {/* Main button */}
            <button
              onMouseDown={startHold}
              onMouseUp={cancelHold}
              onTouchStart={startHold}
              onTouchEnd={cancelHold}
              disabled={sosState === "sent"}
              className="relative w-44 h-44 rounded-full flex flex-col items-center justify-center text-white shadow-2xl transition-transform active:scale-95 select-none"
              style={{
                background: sosState === "sent"
                  ? "linear-gradient(135deg, #16a34a 0%, #15803d 100%)"
                  : "linear-gradient(135deg, #ef4444 0%, #dc2626 60%, #b91c1c 100%)",
                boxShadow: sosState === "sent"
                  ? "0 8px 32px rgba(22,163,74,0.5)"
                  : "0 8px 32px rgba(220,38,38,0.5), 0 2px 8px rgba(220,38,38,0.3)",
              }}
            >
              {sosState === "sent" ? (
                <>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span className="text-sm font-bold mt-1">SOS Sent!</span>
                </>
              ) : sosState === "holding" ? (
                <>
                  <span className="text-5xl font-black">{countdown}</span>
                  <span className="text-xs font-medium opacity-80">Release to cancel</span>
                </>
              ) : (
                <>
                  <span className="text-2xl font-black tracking-wider">SOS</span>
                  <span className="text-xs font-medium opacity-80 mt-1">Hold 3 sec</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-slate-400 mt-2 text-center">
            {sosState === "sent" ? "Help is on the way · Responders notified" :
             sosState === "holding" ? "Keep holding..." :
             "Hold for 3 seconds to send emergency SOS"}
          </p>
          {sosState === "sent" && (
            <button onClick={() => setSosState("idle")} className="mt-2 text-xs text-blue-600 font-semibold">
              Reset
            </button>
          )}
        </div>

        {/* Map section */}
        <div className="mx-4 mb-4">
          <div className="rounded-2xl overflow-hidden border border-slate-200">
            {/* Mapbox Map */}
            <div className="h-40 relative">
              <Map
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
                initialViewState={{
                  longitude: 72.8777,
                  latitude: 19.0760,
                  zoom: 13
                }}
                style={{ width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
              >
                {/* User marker */}
                <Marker longitude={72.8777} latitude={19.0760}>
                  <div className="relative z-10">
                    <div className="w-5 h-5 rounded-full bg-blue-600 border-3 border-white shadow-lg animate-pulse" style={{ border: "3px solid white" }} />
                    <div className="absolute -inset-2 rounded-full bg-blue-400/30 animate-sos-ring" />
                  </div>
                </Marker>

                {/* Shelter markers */}
                <Marker longitude={72.89} latitude={19.08}>
                  <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center border border-white shadow-md">
                    <span className="text-white text-[10px] font-bold">S</span>
                  </div>
                </Marker>
                <Marker longitude={72.86} latitude={19.06}>
                  <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center border border-white shadow-md">
                    <span className="text-white text-[10px] font-bold">S</span>
                  </div>
                </Marker>
              </Map>

              {/* Flood zone label */}
              <div className="absolute top-3 left-3 bg-red-500/90 text-white text-xs font-bold px-2 py-1 rounded-lg pointer-events-none z-10">
                ⚠️ Flood Zone
              </div>
            </div>

            {/* Nearest shelter card */}
            <div className="bg-white p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-lg">⛺</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-slate-900 text-sm">Seva Shelter — Andheri East</p>
                    <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">Open</span>
                  </div>
                  <div className="flex gap-4 mt-1">
                    <p className="text-xs text-slate-500">📍 1.2 km away</p>
                    <p className="text-xs text-slate-500">👥 842/1200</p>
                    <p className="text-xs text-slate-500">⏱ 8 min ETA</p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate("shelters")}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-white"
                  style={{ background: "#2563eb" }}
                >
                  Navigate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 mb-4">
          <p className="text-sm font-bold text-slate-700 mb-3">{t('home.quick_actions')}</p>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => onNavigate(action.id)}
                className="p-4 rounded-2xl text-left transition-transform active:scale-95 border border-slate-100"
                style={{ background: action.bg }}
              >
                <span className="text-2xl">{action.icon}</span>
                <p className="text-sm font-semibold mt-2" style={{ color: action.color }}>
                  {action.id === 'report' ? t('home.report_incident') : 
                   action.id === 'chatbot' ? t('bottom_nav.chatbot') : 
                   action.id === 'guidelines' ? t('home.guidelines') : 
                   t('home.emergency_contacts')}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
