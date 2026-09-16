import { useState, useRef, useEffect } from "react";
import axios from "axios";
const assignedResponders = [
  { id: "R-1041", name: "Constable Arvind Mehra", unit: "NDRF Team Delta", role: "Field Responder", phone: "+91 98100 41000", report: "RPT-2026-0047", dispatchTime: "15 Sep 2026, 08:45 AM" },
  { id: "R-0878", name: "Paramedic Sunil Rao", unit: "Ambulance A-7", role: "Medical Responder", phone: "+91 98100 87800", report: "RPT-2026-0039", dispatchTime: "14 Sep 2026, 02:20 PM" },
];

const categories = [
  { id: "no_show", label: "Responder Did Not Arrive", icon: "🚫" },
  { id: "delayed", label: "Excessive Delay in Response", icon: "⏱️" },
  { id: "misconduct", label: "Misconduct / Unprofessional Behaviour", icon: "⚠️" },
  { id: "negligence", label: "Negligence During Emergency", icon: "😔" },
  { id: "false_report", label: "False / Incorrect Report Filed", icon: "📋" },
  { id: "corruption", label: "Demanded Money / Corruption", icon: "💰" },
  { id: "other", label: "Other Issue", icon: "❗" },
];

const severities = [
  { id: "low", label: "Low", desc: "Minor inconvenience", color: "#16A34A", bg: "#f0fdf4" },
  { id: "medium", label: "Medium", desc: "Affected response quality", color: "#EA580C", bg: "#fff7ed" },
  { id: "high", label: "High", desc: "Serious misconduct", color: "#DC2626", bg: "#fef2f2" },
];

type Step = 1 | 2 | 3 | 4;

export default function GrievanceScreen({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<Step>(1);
  const [selectedResponder, setSelectedResponder] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [severity, setSeverity] = useState<string>("medium");
  const [description, setDescription] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleVoiceToggle = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const formData = new FormData();
          formData.append('audio', audioBlob, 'recording.webm');
          
          try {
             setDescription(prev => prev + (prev ? " " : "") + "(Transcribing...)");
             const res = await axios.post("https://rakshasetu-app-8dvk.onrender.com/incidents/transcribe", formData, {
               headers: { 'Content-Type': 'multipart/form-data' }
             });
             if (res.data && res.data.text) {
               setDescription(prev => prev.replace("(Transcribing...)", "").trim() + " " + res.data.text);
             }
          } catch(err) {
             console.error("Transcription failed", err);
             setDescription(prev => prev.replace("(Transcribing...)", "").trim());
             alert("Failed to transcribe audio. Is the backend running?");
          }
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Microphone access denied", err);
        alert("Please enable microphone access.");
      }
    }
  };
  const responder = assignedResponders.find((r) => r.id === selectedResponder);
  const category = categories.find((c) => c.id === selectedCategory);
  const sev = severities.find((s) => s.id === severity)!;

  if (submitted) {
    return (
      <div className="absolute inset-0 bg-white flex flex-col items-center justify-center px-8" style={{ paddingTop: 48 }}>
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-5xl mb-6">✅</div>
        <h2 className="text-2xl font-black text-slate-900 text-center mb-2">Complaint Filed</h2>
        <p className="text-slate-500 text-sm text-center leading-relaxed mb-2">
          Your grievance has been registered and assigned to the District Grievance Officer.
        </p>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 w-full mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-slate-400 font-medium">Complaint ID</p>
            <p className="text-sm font-black text-blue-600">GRV-2026-00{Math.floor(Math.random() * 900) + 100}</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-slate-400 font-medium">Filed Against</p>
            <p className="text-sm font-semibold text-slate-700">{responder?.name ?? "—"}</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-slate-400 font-medium">Category</p>
            <p className="text-sm font-semibold text-slate-700">{category?.label ?? "—"}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-400 font-medium">Expected Resolution</p>
            <p className="text-sm font-semibold text-slate-700">7 working days</p>
          </div>
        </div>
        <p className="text-xs text-slate-400 text-center mb-6">
          You will receive status updates via SMS and app notifications. You can track this complaint in the Grievance History section.
        </p>
        <button
          onClick={onBack}
          className="w-full py-4 rounded-2xl text-white font-bold"
          style={{ background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-slate-50 flex flex-col" style={{ paddingTop: 48 }}>
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-slate-900 text-lg">File a Grievance</h1>
            <p className="text-xs text-slate-400">Complaint against field responder</p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-1">
          {([1, 2, 3, 4] as Step[]).map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                  step === s
                    ? "text-white shadow-sm"
                    : step > s
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 text-slate-400"
                }`}
                style={step === s ? { background: "linear-gradient(135deg, #2563eb, #1d4ed8)" } : {}}
              >
                {step > s ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                ) : s}
              </div>
              {s < 4 && <div className={`flex-1 h-0.5 mx-1 rounded ${step > s ? "bg-blue-500" : "bg-slate-200"}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1 text-xs text-slate-400 font-medium" style={{ fontSize: "9px" }}>
          <span>Responder</span>
          <span>Issue Type</span>
          <span>Details</span>
          <span>Review</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 100 }}>

        {/* Step 1 — Select Responder */}
        {step === 1 && (
          <div className="px-4 pt-5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Assigned Responders</p>
            <p className="text-xs text-slate-400 mb-4">Select the responder your complaint is against</p>
            <div className="flex flex-col gap-3">
              {assignedResponders.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedResponder(r.id)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedResponder === r.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${selectedResponder === r.id ? "bg-blue-100" : "bg-slate-100"}`}>
                      👮
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-slate-900 text-sm">{r.name}</p>
                        <span className="text-xs bg-slate-100 text-slate-500 font-medium px-2 py-0.5 rounded-full flex-shrink-0">{r.id}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{r.unit}</p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="text-xs bg-blue-50 text-blue-600 font-medium px-2 py-0.5 rounded-full">
                          📋 {r.report}
                        </span>
                        <span className="text-xs text-slate-400">{r.dispatchTime}</span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${selectedResponder === r.id ? "border-blue-500 bg-blue-500" : "border-slate-300"}`}>
                      {selectedResponder === r.id && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                </button>
              ))}

              {/* Info banner */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
                <span className="text-xl flex-shrink-0">ℹ️</span>
                <p className="text-xs text-amber-700 leading-relaxed">
                  Only responders assigned to your verified incident reports are shown. False complaints are subject to legal action under IPC Section 182.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 — Issue Category */}
        {step === 2 && (
          <div className="px-4 pt-5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Nature of Complaint</p>
            <p className="text-xs text-slate-400 mb-4">Select the category that best describes the issue</p>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedCategory === cat.id ? "border-red-400 bg-red-50" : "border-slate-200 bg-white"
                  }`}
                >
                  <span className="text-2xl flex-shrink-0">{cat.icon}</span>
                  <p className={`text-sm font-semibold flex-1 ${selectedCategory === cat.id ? "text-red-700" : "text-slate-700"}`}>{cat.label}</p>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedCategory === cat.id ? "border-red-500 bg-red-500" : "border-slate-300"}`}>
                    {selectedCategory === cat.id && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 — Details */}
        {step === 3 && (
          <div className="px-4 pt-5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4">Grievance Details</p>

            {/* Severity */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-slate-500 mb-2">Severity Level</p>
              <div className="flex gap-2">
                {severities.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSeverity(s.id)}
                    className={`flex-1 py-3 rounded-xl border-2 text-center transition-all`}
                    style={severity === s.id ? { borderColor: s.color, background: s.bg } : { borderColor: "#e2e8f0", background: "white" }}
                  >
                    <p className="text-xs font-bold" style={{ color: severity === s.id ? s.color : "#94a3b8" }}>{s.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: severity === s.id ? s.color : "#cbd5e1", fontSize: "9px" }}>{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-slate-500 mb-2">Describe the Incident <span className="text-red-400">*</span></p>
              <div className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden focus-within:border-blue-500 transition-colors">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide a detailed account of what happened — time, location, behaviour, and any witnesses..."
                  className="w-full px-4 pt-3 pb-2 text-sm text-slate-700 outline-none bg-transparent resize-none"
                  rows={4}
                />
                <div className="flex items-center gap-2 px-4 pb-3 border-t border-slate-100 pt-2">
                  <button
                    onClick={handleVoiceToggle}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${isRecording ? "bg-red-500 text-white" : "bg-slate-100 text-slate-600"}`}
                  >
                    🎙️ {isRecording ? "Stop Recording" : "Voice Input"}
                  </button>
                  {isRecording && (
                    <div className="flex items-end gap-0.5 h-5">
                      {[1,2,3,4,5,6].map((i) => (
                        <div key={i} className="wave-bar w-1 bg-red-400 rounded-full" style={{ height: "4px" }} />
                      ))}
                    </div>
                  )}
                  <span className="text-xs text-slate-400 ml-auto">{description.length}/500</span>
                </div>
              </div>
            </div>

            {/* Evidence upload */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-slate-500 mb-2">Attach Evidence <span className="text-slate-400">(Optional)</span></p>
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-5 bg-white flex flex-col items-center gap-2">
                <span className="text-3xl">📎</span>
                <p className="text-xs font-semibold text-slate-600">Upload photos, videos or documents</p>
                <p className="text-xs text-slate-400">Max 10MB · JPG, PNG, MP4, PDF</p>
                <div className="flex gap-2 mt-1">
                  {[{ icon: "📷", label: "Photo" }, { icon: "🎥", label: "Video" }, { icon: "📄", label: "Document" }].map((b) => (
                    <button key={b.label} className="flex flex-col items-center gap-1 px-3 py-2 bg-blue-50 border border-blue-200 rounded-xl text-blue-600">
                      <span className="text-lg">{b.icon}</span>
                      <span className="text-xs font-semibold">{b.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Anonymous toggle */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">File Anonymously</p>
                <p className="text-xs text-slate-400 mt-0.5">Your name will be hidden from the responder. Officers may still contact you for investigation.</p>
              </div>
              <button
                onClick={() => setAnonymous((v) => !v)}
                className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${anonymous ? "bg-blue-500" : "bg-slate-300"}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${anonymous ? "translate-x-6" : "translate-x-0.5"}`} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4 — Review & Submit */}
        {step === 4 && (
          <div className="px-4 pt-5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4">Review Your Complaint</p>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-4">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
                <span className="text-base">👮</span>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Complaint Against</p>
              </div>
              <div className="p-4">
                <p className="font-bold text-slate-900">{responder?.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{responder?.unit} · {responder?.id}</p>
                <p className="text-xs text-slate-400 mt-0.5">Dispatched for {responder?.report} on {responder?.dispatchTime}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-4">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
                <span className="text-base">⚠️</span>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Issue Details</p>
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{category?.icon}</span>
                  <p className="text-sm font-semibold text-slate-800">{category?.label}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: sev.bg, color: sev.color }}>
                    {sev.label} Severity
                  </span>
                  {anonymous && <span className="text-xs bg-slate-100 text-slate-600 font-medium px-2 py-1 rounded-full">Anonymous</span>}
                </div>
                {description && (
                  <div className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs text-slate-600 leading-relaxed">{description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Legal notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5 flex gap-3">
              <span className="text-xl flex-shrink-0">⚖️</span>
              <div>
                <p className="text-xs font-bold text-amber-800 mb-1">Declaration</p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  I declare that the information provided is true to the best of my knowledge. I understand that filing a false complaint is punishable under IPC Section 182 and may lead to legal action.
                </p>
              </div>
            </div>

            <button
              onClick={() => setSubmitted(true)}
              disabled={!selectedResponder || !selectedCategory || !description}
              className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)" }}
            >
              Submit Grievance
            </button>
            <p className="text-center text-xs text-slate-400 mt-2">
              Complaint will be forwarded to the District Grievance Officer within 24 hours.
            </p>
          </div>
        )}
      </div>

      {/* Step navigation buttons */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-4 flex gap-3">
        {step > 1 && (
          <button
            onClick={() => setStep((s) => (s - 1) as Step)}
            className="flex-1 py-3.5 rounded-2xl border-2 border-slate-200 text-slate-600 font-semibold text-sm"
          >
            ← Back
          </button>
        )}
        {step < 4 ? (
          <button
            onClick={() => setStep((s) => (s + 1) as Step)}
            disabled={
              (step === 1 && !selectedResponder) ||
              (step === 2 && !selectedCategory) ||
              (step === 3 && !description)
            }
            className="flex-1 py-3.5 rounded-2xl text-white font-semibold text-sm transition-all disabled:opacity-40"
            style={{ background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" }}
          >
            Continue →
          </button>
        ) : null}
      </div>
    </div>
  );
}
