import { useState } from "react";
import { useResponderStore } from "../store/useResponderStore";

interface Props {
  navigate: (screen: string) => void;
}

export default function IncomingSOS({ navigate }: Props) {
  const [accepting, setAccepting] = useState(false);
  const incident = useResponderStore(state => state.selectedIncident || state.highPriorityQueue[0]);

  const handleAccept = () => {
    setAccepting(true);
    setTimeout(() => navigate("incident-details"), 600);
  };

  const priorityVal = incident?.priorityScore ?? 9;
  const aiScore = Math.round((incident?.aiConfidence ?? 0.87) * 100);

  const statItems = [
    { label: "PRIORITY", value: `${priorityVal} / 10`, color: "#FF3B30", icon: "⚡" },
    { label: "AI CONFIDENCE", value: `${aiScore}%`, color: "#30D158", icon: "🤖" },
    { label: "INCIDENT ID", value: incident?.id || "INC-LIVE", color: "#0A84FF", icon: "🆔" },
    { label: "TYPE", value: (incident?.type ? incident.type.toUpperCase() : "SOS"), color: "#FFB800", icon: "⚠️" },
    { label: "STATUS", value: incident?.status || "PENDING", color: "#30D158", icon: "📍" },
    { label: "TIMESTAMP", value: "Live Alert", color: "#8BAFC8", icon: "🕐" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#111827] overflow-y-auto relative">
      {/* Pulsing emergency top bar */}
      <div
        className="bg-[#FF3B30] px-5 pt-8 pb-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #CC1A10 0%, #FF3B30 100%)" }}
      >
        <div className="absolute inset-0 animate-blink opacity-20 bg-white" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              <span className="text-white text-xs font-700 tracking-widest uppercase mono">INCOMING SOS</span>
            </div>
            <h1 className="font-display text-3xl font-900 text-white tracking-wide">
              {incident?.id || "INCIDENT"} (P{priorityVal})
            </h1>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white" strokeWidth="1"/>
            </svg>
          </div>
        </div>
        <p className="text-white/80 text-xs mt-1.5 mono">ROUTED FROM RAKSHASETU REAL-TIME DISPATCH</p>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4" style={{ paddingBottom: 80 }}>
        {/* Citizen Card */}
        <div className="bg-[#1E2D42] border border-[#3A5270] rounded-2xl p-4">
          <p className="text-[#8BAFC8] text-xs uppercase tracking-widest mono mb-3">CITIZEN INFORMATION</p>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2D4160] to-[#1E2D42] border border-[#3A5270] flex items-center justify-center text-2xl shrink-0 overflow-hidden">
              {incident?.mediaUrl ? (
                <img src={incident.mediaUrl} alt="Citizen Evidence" className="w-full h-full object-cover" />
              ) : (
                "👤"
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-display text-xl font-700 text-[#F0F5FA] tracking-wide truncate">
                BHAVYANSH PARIHAR
              </h2>
              <p className="text-[#8BAFC8] text-xs mono mt-0.5">{incident?.id || "CIT-MH-2026"}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-[#30D158] text-xs font-600 bg-[#30D15815] border border-[#30D15830] rounded-lg px-2 py-0.5">VERIFIED</span>
                <span className="text-[#8BAFC8] text-xs truncate">· Category: {incident?.type || "Emergency"}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#2D4160] mt-4 pt-3">
            <p className="text-[#8BAFC8] text-xs mb-1 font-semibold">DISTRESS MESSAGE</p>
            <p className="text-[#F0F5FA] text-sm leading-relaxed bg-[#1A2234] rounded-xl p-3 border border-[#2D4160] italic">
              "{incident?.description || "Immediate emergency assistance requested by citizen via SOS trigger."}"
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2">
          {statItems.map((s) => (
            <div key={s.label} className="bg-[#1E2D42] border border-[#2D4160] rounded-2xl p-3 text-center">
              <p className="text-lg mb-1">{s.icon}</p>
              <p className="font-display text-base font-700 tracking-wide" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[#4D6E8A] text-xs mono mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Location */}
        <div className="bg-[#1E2D42] border border-[#2D4160] rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#0A84FF]">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" stroke="currentColor" strokeWidth="1.8"/>
              <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
            </svg>
            <span className="text-[#8BAFC8] text-xs uppercase tracking-widest mono">LOCATION</span>
          </div>
          <p className="text-[#F0F5FA] font-600 text-sm">Near Reported Incident Area</p>
          <p className="text-[#8BAFC8] text-xs mt-0.5">Maharashtra, India</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[#4D6E8A] text-xs mono">
              {incident?.latitude || 19.1136}° N, {incident?.longitude || 72.8697}° E
            </span>
            <span className="text-[#30D158] text-xs">· GPS LOCKED</span>
          </div>
        </div>

        {/* AI Confidence */}
        <div className="bg-[#1E2D42] border border-[#30D15830] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#30D15820] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke="#30D158" strokeWidth="1.8"/>
                  <path d="M8 12l2.5 2.5L16 9" stroke="#30D158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-[#F0F5FA] text-sm font-600">AI Verification</span>
            </div>
            <span className="text-[#30D158] font-display text-xl font-700">{aiScore}%</span>
          </div>
          <div className="bg-[#1A2234] rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#30D158] to-[#5FE87E] rounded-full" style={{ width: `${aiScore}%` }} />
          </div>
          <p className="text-[#8BAFC8] text-xs mt-2">
            {aiScore >= 70 ? "High confidence — auto-routed. Verified evidence uploaded." : "Borderline confidence — verification advised."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pb-4">
          <button
            onClick={() => navigate("dashboard")}
            className="flex-1 bg-[#1E2D42] border border-[#FF3B3040] text-[#FF3B30] font-display text-xl font-700 tracking-wider py-4 rounded-2xl active:scale-95 transition-transform"
          >
            REJECT
          </button>
          <button
            onClick={handleAccept}
            className={`flex-1 font-display text-xl font-700 tracking-wider py-4 rounded-2xl active:scale-95 transition-all ${accepting ? "bg-[#30D158]" : "bg-[#FF4F38]"} text-white`}
            style={{ boxShadow: accepting ? "0 4px 24px #30D15840" : "0 4px 24px #FF4F3840" }}
          >
            {accepting ? "ACCEPTED ✓" : "ACCEPT SOS"}
          </button>
        </div>
      </div>
    </div>
  );
}
