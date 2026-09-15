import { useState } from "react";
import { useResponderStore } from "../store/useResponderStore";

interface Props {
  navigate: (screen: string) => void;
}

export default function IncidentDetails({ navigate }: Props) {
  const tabs = ["Overview", "Media", "History"];
  const [activeTab, setActiveTab] = useState("Overview");
  const incident = useResponderStore(state => state.selectedIncident || state.highPriorityQueue[0]);

  const incidentIdStr = incident?.id ? (incident.id.length > 8 ? incident.id.substring(0, 8) : incident.id) : "INC-2847";
  const incidentTypeStr = incident?.type ? incident.type.toUpperCase() : "FLOOD — TRAPPED CIVILIANS";

  return (
    <div className="flex flex-col h-full bg-[#111827] overflow-y-auto">
      {/* Header */}
      <div className="bg-[#1A2234] border-b border-[#2D4160] px-4 pt-10 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate("incoming-sos")} className="w-9 h-9 bg-[#1E2D42] border border-[#2D4160] rounded-xl flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#F0F5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex-1">
            <p className="text-[#4D6E8A] text-xs mono">INCIDENT DETAILS</p>
            <h1 className="font-display text-2xl font-800 text-[#F0F5FA] tracking-wide">{incidentIdStr}</h1>
          </div>
          <span className="text-[#FF3B30] text-xs font-700 bg-[#FF3B3015] border border-[#FF3B3040] rounded-xl px-3 py-1.5 uppercase tracking-wide">
            {incident ? `P${incident.priorityScore} CRITICAL` : "CRITICAL"}
          </span>
        </div>
        {/* Tabs */}
        <div className="flex gap-1 bg-[#111827] p-1 rounded-xl">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`flex-1 py-2 rounded-lg text-xs font-600 transition-colors ${t === activeTab ? "bg-[#1E2D42] border border-[#3A5270] text-[#F0F5FA]" : "text-[#4D6E8A]"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4">
        {/* Summary */}
        <div className="bg-[#FF3B3010] border border-[#FF3B3030] rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF3B30] flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
            </div>
            <div>
              <h2 className="font-display text-xl font-700 text-[#F0F5FA] tracking-wide">{incidentTypeStr}</h2>
              <p className="text-[#8BAFC8] text-xs mt-1">
                {incident?.description || "Emergency reported by citizen · Reported Just now"}
              </p>
            </div>
          </div>
        </div>

        {/* Evidence Image Card */}
        {incident?.mediaUrl && (
          <div className="bg-[#1E2D42] border border-[#3A5270] rounded-2xl overflow-hidden p-3">
            <p className="text-[#8BAFC8] text-xs uppercase tracking-widest mono mb-2 font-bold">Uploaded Evidence Image</p>
            <img 
              src={incident.mediaUrl} 
              alt="Uploaded incident evidence" 
              className="w-full h-48 object-cover rounded-xl border border-[#2D4160]"
            />
          </div>
        )}

        {/* Citizen */}
        <div className="bg-[#1E2D42] border border-[#2D4160] rounded-2xl p-4">
          <p className="text-[#8BAFC8] text-xs uppercase tracking-widest mono mb-3">CITIZEN</p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2D4160] to-[#1E2D42] border border-[#3A5270] flex items-center justify-center text-xl">👤</div>
            <div>
              <p className="text-[#F0F5FA] font-600">Bhavyansh Parihar</p>
              <p className="text-[#8BAFC8] text-xs mono">CIT-MH-2847-3921 · M, 23 · +91 98XXX XXXXX</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-[#1A2234] rounded-xl p-3">
              <p className="text-[#4D6E8A] text-xs mono">PEOPLE AT RISK</p>
              <p className="text-[#F0F5FA] font-display text-2xl font-700 mt-1">4</p>
              <p className="text-[#8BAFC8] text-xs">Adult + 3 children</p>
            </div>
            <div className="bg-[#1A2234] rounded-xl p-3">
              <p className="text-[#4D6E8A] text-xs mono">DEVICE BATTERY</p>
              <p className="text-[#FFB800] font-display text-2xl font-700 mt-1">34%</p>
              <p className="text-[#8BAFC8] text-xs">Est. 48 min remaining</p>
            </div>
          </div>
        </div>

        {/* Environmental */}
        <div className="bg-[#1E2D42] border border-[#2D4160] rounded-2xl p-4">
          <p className="text-[#8BAFC8] text-xs uppercase tracking-widest mono mb-3">ENVIRONMENTAL FACTORS</p>
          <div className="flex flex-col gap-2">
            {[
              { label: "Water level", value: "1.8m rising", risk: "EXTREME", color: "#FF3B30" },
              { label: "Wind speed", value: "62 km/h", risk: "HIGH", color: "#FF3B30" },
              { label: "Visibility", value: "~200m", risk: "LOW", color: "#FFB800" },
              { label: "Structure risk", value: "Moderate", risk: "MEDIUM", color: "#FFB800" },
            ].map((e) => (
              <div key={e.label} className="flex items-center justify-between py-2 border-b border-[#2D4160] last:border-0">
                <span className="text-[#8BAFC8] text-sm">{e.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#F0F5FA] text-sm font-600">{e.value}</span>
                  <span className="text-xs font-600 px-2 py-0.5 rounded-lg" style={{ color: e.color, background: e.color + "20" }}>{e.risk}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pb-4">
          <button
            onClick={() => navigate("ai-verification")}
            className="w-full bg-[#1E2D42] border border-[#0A84FF40] text-[#0A84FF] font-display text-lg font-700 tracking-wider py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            AI VERIFICATION
          </button>
          <button
            onClick={() => navigate("navigation")}
            className="w-full bg-[#FF4F38] text-white font-display text-xl font-700 tracking-wider py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
            style={{ boxShadow: "0 4px 24px #FF4F3840" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L12 22M12 2L4 10M12 2L20 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            NAVIGATE TO SCENE
          </button>
        </div>
      </div>
    </div>
  );
}
