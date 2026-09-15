import { useState } from "react";
import { useResponderStore } from "../store/useResponderStore";

interface Props {
  navigate: (screen: string) => void;
}

export default function AIVerification({ navigate }: Props) {
  const [verdict, setVerdict] = useState<"genuine" | "fake" | null>(null);
  const [rating, setRating] = useState(7);
  const [submitted, setSubmitted] = useState(false);
  const incident = useResponderStore(state => state.selectedIncident || state.highPriorityQueue[0]);

  const aiScore = Math.round((incident?.aiConfidence ?? 0.52) * 100);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => navigate("navigation"), 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#111827] overflow-y-auto">
      {/* Header */}
      <div className="bg-[#1A2234] border-b border-[#2D4160] px-4 pt-10 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("incident-details")} className="w-9 h-9 bg-[#1E2D42] border border-[#2D4160] rounded-xl flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#F0F5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div>
            <p className="text-[#4D6E8A] text-xs mono">INCIDENT VERIFICATION</p>
            <h1 className="font-display text-2xl font-800 text-[#F0F5FA] tracking-wide">AI VERIFICATION</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4">
        {/* Why this screen */}
        <div className="bg-[#FFB80010] border border-[#FFB80030] rounded-2xl p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FFB80020] flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FFB800" strokeWidth="1.8" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="text-[#FFB800] text-xs font-700 uppercase tracking-wide">AI Analysis & Verification</p>
            <p className="text-[#8BAFC8] text-xs mt-0.5">AI confidence score is {aiScore}%. Review uploaded evidence below to verify genuine emergency.</p>
          </div>
        </div>

        {/* Confidence Meter */}
        <div className="bg-[#1E2D42] border border-[#2D4160] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[#8BAFC8] text-xs uppercase tracking-widest mono">AI CONFIDENCE SCORE</p>
            <span className="font-display text-2xl font-700 text-[#FFB800]">{aiScore}%</span>
          </div>
          <div className="bg-[#1A2234] rounded-full h-3 overflow-hidden relative">
            <div className="absolute inset-y-0 left-[40%] right-[40%] bg-[#FFB80030] z-10" />
            <div className="h-full bg-gradient-to-r from-[#FF3B30] via-[#FFB800] to-[#30D158] rounded-full" style={{ width: "100%" }} />
            {/* Marker */}
            <div className="absolute top-0 h-full w-0.5 bg-white shadow" style={{ left: `${aiScore}%` }} />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[#FF3B30] text-xs mono">0 — FAKE</span>
            <span className="text-[#FFB800] text-xs mono">0.4–0.6 VERIFY</span>
            <span className="text-[#30D158] text-xs mono">GENUINE — 1</span>
          </div>
        </div>

        {/* Evidence */}
        <div className="bg-[#1E2D42] border border-[#2D4160] rounded-2xl overflow-hidden">
          <p className="text-[#8BAFC8] text-xs uppercase tracking-widest mono px-4 pt-4 pb-3">UPLOADED EVIDENCE</p>
          {/* Uploaded Evidence Media */}
          <div className="relative bg-[#1A2234] mx-4 rounded-xl overflow-hidden border border-[#2D4160] mb-4 min-h-[176px] flex items-center justify-center">
            {incident?.mediaUrl ? (
              <img src={incident.mediaUrl} alt="Uploaded evidence" className="w-full h-56 object-cover" />
            ) : (
              <div className="h-44 flex items-center justify-center flex-col gap-2 p-4">
                <div className="text-4xl">📷</div>
                <p className="text-[#4D6E8A] text-xs">No media attached with report</p>
                <p className="text-[#F0F5FA] text-sm font-600">{incident?.description || "Incident Report"}</p>
              </div>
            )}
            <div className="absolute top-2 right-2 bg-[#1A2234]/80 backdrop-blur rounded-lg px-2 py-1 flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
              <span className="text-[#30D158] text-xs mono">GPS MATCH</span>
            </div>
          </div>
          <div className="px-4 pb-4">
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "GPS Accuracy", value: "±4m", ok: true },
                { label: "Timestamp", value: "14:32:07", ok: true },
                { label: "Image Hash", value: "Unmodified", ok: true },
                { label: "Metadata", value: "Consistent", ok: true },
              ].map((m) => (
                <div key={m.label} className="bg-[#1A2234] rounded-xl px-3 py-2 flex items-center justify-between">
                  <span className="text-[#8BAFC8] text-xs">{m.label}</span>
                  <span className="text-[#30D158] text-xs font-600">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Verdict */}
        <div className="bg-[#1E2D42] border border-[#2D4160] rounded-2xl p-4">
          <p className="text-[#F0F5FA] font-600 text-sm mb-4">Is this report genuine?</p>
          <div className="flex gap-3">
            <button
              onClick={() => setVerdict("genuine")}
              className={`flex-1 py-3.5 rounded-xl font-display text-lg font-700 tracking-wide transition-all ${verdict === "genuine" ? "bg-[#30D158] text-white" : "bg-[#30D15815] border border-[#30D15840] text-[#30D158]"}`}
            >
              ✓ GENUINE
            </button>
            <button
              onClick={() => setVerdict("fake")}
              className={`flex-1 py-3.5 rounded-xl font-display text-lg font-700 tracking-wide transition-all ${verdict === "fake" ? "bg-[#FF3B30] text-white" : "bg-[#FF3B3015] border border-[#FF3B3040] text-[#FF3B30]"}`}
            >
              ✕ FAKE
            </button>
          </div>
        </div>

        {/* Rating (only if genuine) */}
        {verdict === "genuine" && (
          <div className="bg-[#1E2D42] border border-[#30D15830] rounded-2xl p-4 animate-slide-up">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#F0F5FA] font-600 text-sm">Rate the severity (1–10)</p>
              <span className="font-display text-2xl font-700 text-[#30D158]">{rating}</span>
            </div>
            <input
              type="range" min={1} max={10} value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full accent-[#30D158]"
            />
            <div className="flex justify-between text-xs text-[#4D6E8A] mt-1">
              <span>1 — Minor</span>
              <span className="text-[#8BAFC8] text-xs">Normalized score: <span className="text-[#30D158] font-600">{(rating / 10).toFixed(1)}</span></span>
              <span>10 — Critical</span>
            </div>
            <button
              onClick={handleSubmit}
              className={`w-full mt-4 font-display text-xl font-700 tracking-wider py-4 rounded-2xl active:scale-95 transition-all ${submitted ? "bg-[#30D158]" : "bg-[#FF4F38]"} text-white`}
              style={{ boxShadow: "0 4px 24px #FF4F3840" }}
            >
              {submitted ? "SUBMITTED — PROCEEDING..." : `SUBMIT SCORE ${(rating / 10).toFixed(1)} → NAVIGATE`}
            </button>
          </div>
        )}

        {verdict === "fake" && (
          <div className="bg-[#FF3B3010] border border-[#FF3B3030] rounded-2xl p-4 animate-slide-up">
            <p className="text-[#FF3B30] font-600 text-sm mb-1">Report will be flagged for Admin</p>
            <p className="text-[#8BAFC8] text-xs mb-4">The incident will be escalated to the command center for review and action against misuse.</p>
            <button
              onClick={() => navigate("dashboard")}
              className="w-full bg-[#FF3B30] text-white font-display text-xl font-700 tracking-wider py-4 rounded-2xl active:scale-95 transition-transform"
            >
              FLAG & RETURN TO DASHBOARD
            </button>
          </div>
        )}

        <div className="pb-4" />
      </div>
    </div>
  );
}
