import { useState } from "react";

interface Props {
  navigate: (screen: string) => void;
}

const steps = [
  { key: "accepted", label: "SOS Accepted", time: "14:30:02", desc: "Incident accepted by Responder Arjun Mehta" },
  { key: "enroute", label: "En Route", time: "14:31:45", desc: "Responder departing, ETA 6 min" },
  { key: "reached", label: "Reached Scene", time: "14:37:18", desc: "Responder at 47-B Nehru Nagar" },
  { key: "started", label: "Rescue Started", time: null, desc: "Active rescue underway" },
  { key: "completed", label: "Rescue Complete", time: null, desc: "All civilians evacuated" },
];

export default function ActiveRescue({ navigate }: Props) {
  const [stepIdx, setStepIdx] = useState(2);
  const [uploading, setUploading] = useState(false);

  const advance = () => {
    if (stepIdx < steps.length - 1) {
      const next = stepIdx + 1;
      setStepIdx(next);
      if (next === steps.length - 1) {
        setTimeout(() => navigate("completed-rescue"), 700);
      }
    }
  };

  const stepLabels = ["Accept", "En Route", "Reached", "Rescue Started", "Complete"];
  const nextActions = [null, null, null, "START RESCUE OPERATIONS", "MARK AS COMPLETED"];

  return (
    <div className="flex flex-col h-full bg-[#111827] overflow-y-auto">
      {/* Header */}
      <div className="bg-[#1A2234] border-b border-[#2D4160] px-4 pt-10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#30D15820] border border-[#30D15840] rounded-xl flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#30D158] animate-pulse" />
          </div>
          <div>
            <p className="text-[#30D158] text-xs mono font-600 uppercase tracking-widest">LIVE RESCUE</p>
            <h1 className="font-display text-2xl font-800 text-[#F0F5FA] tracking-wide">ACTIVE RESCUE · INC-2847</h1>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            {steps.map((s, i) => (
              <div key={s.key} className="flex-1 flex flex-col items-center">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-700 border-2 transition-all ${
                  i < stepIdx ? "bg-[#30D158] border-[#30D158] text-white"
                  : i === stepIdx ? "bg-[#FF4F38] border-[#FF4F38] text-white"
                  : "border-[#2D4160] text-[#4D6E8A]"
                }`}>
                  {i < stepIdx ? "✓" : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-0.5 w-full mt-3 -mb-3 ${i < stepIdx ? "bg-[#30D158]" : "bg-[#2D4160]"}`} style={{ position: "absolute", display: "none" }} />
                )}
              </div>
            ))}
          </div>
          <div className="relative h-1.5 bg-[#2D4160] rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-gradient-to-r from-[#30D158] to-[#FF4F38] rounded-full transition-all duration-500"
              style={{ width: `${(stepIdx / (steps.length - 1)) * 100}%` }}
            />
          </div>
          <p className="text-[#8BAFC8] text-xs mt-1.5">{stepIdx + 1} of {steps.length} — {steps[stepIdx].label}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4">
        {/* Citizen status */}
        <div className="bg-[#1E2D42] border border-[#2D4160] rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2D4160] to-[#1E2D42] border border-[#3A5270] flex items-center justify-center text-xl">👤</div>
            <div className="flex-1">
              <p className="text-[#F0F5FA] font-600">Bhavyansh Parihar</p>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-2 h-2 rounded-full bg-[#30D158] animate-pulse" />
                <span className="text-[#30D158] text-xs font-600">CONTACT MAINTAINED</span>
              </div>
            </div>
            <button className="w-11 h-11 bg-[#30D15820] border border-[#30D15840] rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#30D158"/>
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="bg-[#1A2234] rounded-xl p-2.5 text-center">
              <p className="text-[#FFB800] font-display text-lg font-700">34%</p>
              <p className="text-[#4D6E8A] text-xs">Battery</p>
            </div>
            <div className="bg-[#1A2234] rounded-xl p-2.5 text-center">
              <p className="text-[#F0F5FA] font-display text-lg font-700">4</p>
              <p className="text-[#4D6E8A] text-xs">Persons</p>
            </div>
            <div className="bg-[#1A2234] rounded-xl p-2.5 text-center">
              <p className="text-[#0A84FF] font-display text-lg font-700">2F</p>
              <p className="text-[#4D6E8A] text-xs">Location</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-[#1E2D42] border border-[#2D4160] rounded-2xl p-4">
          <p className="text-[#8BAFC8] text-xs uppercase tracking-widest mono mb-4">RESCUE TIMELINE</p>
          <div className="flex flex-col gap-0">
            {steps.map((s, i) => (
              <div key={s.key} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 ${
                    i < stepIdx ? "bg-[#30D158] border-[#30D158]"
                    : i === stepIdx ? "bg-[#FF4F38] border-[#FF4F38] animate-pulse"
                    : "border-[#2D4160] bg-[#1A2234]"
                  }`}>
                    {i < stepIdx
                      ? <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 7l2.5 2.5L11 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      : i === stepIdx
                      ? <div className="w-3 h-3 rounded-full bg-white" />
                      : <div className="w-2.5 h-2.5 rounded-full bg-[#2D4160]" />
                    }
                  </div>
                  {i < steps.length - 1 && <div className={`w-0.5 flex-1 min-h-8 ${i < stepIdx ? "bg-[#30D158]" : "bg-[#2D4160]"}`} />}
                </div>
                <div className="pb-5 flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`font-600 text-sm ${i <= stepIdx ? "text-[#F0F5FA]" : "text-[#4D6E8A]"}`}>{s.label}</p>
                    {s.time && <span className="text-[#8BAFC8] text-xs mono">{s.time}</span>}
                    {!s.time && i <= stepIdx && <span className="text-[#FFB800] text-xs animate-blink">PENDING</span>}
                  </div>
                  <p className={`text-xs mt-0.5 ${i <= stepIdx ? "text-[#8BAFC8]" : "text-[#2D4160]"}`}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence upload */}
        <div className="bg-[#1E2D42] border border-[#2D4160] rounded-2xl p-4">
          <p className="text-[#8BAFC8] text-xs uppercase tracking-widest mono mb-3">PROOF UPLOAD</p>
          <button
            onClick={() => setUploading(!uploading)}
            className="w-full border-2 border-dashed border-[#3A5270] rounded-xl py-5 flex flex-col items-center gap-2 active:border-[#FF4F38] transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1A2234] flex items-center justify-center text-xl">📷</div>
            <p className="text-[#8BAFC8] text-sm">{uploading ? "photo_rescue_priya.jpg uploaded ✓" : "Upload photo/video evidence"}</p>
            <p className="text-[#4D6E8A] text-xs">Required for completion</p>
          </button>
        </div>

        {/* Action Button */}
        {nextActions[stepIdx] && (
          <button
            onClick={advance}
            className="w-full bg-[#FF4F38] text-white font-display text-xl font-700 tracking-wider py-4 rounded-2xl active:scale-95 transition-transform"
            style={{ boxShadow: "0 4px 24px #FF4F3840" }}
          >
            {nextActions[stepIdx]}
          </button>
        )}
        <div className="pb-4" />
      </div>
    </div>
  );
}
