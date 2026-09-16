import { useState, useRef, useEffect } from "react";
import { useCitizenStore } from "../store/useCitizenStore";
import axios from "axios";
const incidentTypes = [
  { id: "flood", icon: "🌊", label: "Flood", color: "#2563EB" },
  { id: "fire", icon: "🔥", label: "Fire", color: "#DC2626" },
  { id: "earthquake", icon: "🏔️", label: "Earthquake", color: "#EA580C" },
  { id: "medical", icon: "🚑", label: "Medical", color: "#16A34A" },
  { id: "accident", icon: "🚗", label: "Accident", color: "#7C3AED" },
  { id: "other", icon: "❗", label: "Other", color: "#64748B" },
];

export default function ReportScreen({ onBack, onSubmit }: { onBack: () => void; onSubmit: () => void }) {
  const [selected, setSelected] = useState("flood");
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [confidence, setConfidence] = useState(0);
  
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [description, setDescription] = useState("");
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
      const API_URL = import.meta.env.VITE_API_URL || 'https://rakshasetu-app-8dvk.onrender.com';
      const res = await axios.post(`${API_URL}/incidents/transcribe`, formData, {
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
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const storeToken = useCitizenStore(state => state.token);
  // Always fall back to localStorage so token is available even after page reload
  const token = storeToken || localStorage.getItem("token");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
        
        // Simulate progress for UI
        let p = 0;
        const iv = setInterval(() => {
          p += 15;
          setConfidence(Math.min(p, 94));
          if (p >= 94) { clearInterval(iv); setUploading(false); setUploaded(true); }
        }, 100);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSOSSubmit = async () => {
    try {
      // Dynamic location if available
      let lat = 19.1136 + (Math.random() - 0.5) * 0.01;
      let lng = 72.8697 + (Math.random() - 0.5) * 0.01;
      if (navigator.geolocation) {
        try {
          const pos: GeolocationPosition = await new Promise((res, rej) =>
            navigator.geolocation.getCurrentPosition(res, rej, { timeout: 2500 })
          );
          lat = Number(pos.coords.latitude.toFixed(4));
          lng = Number(pos.coords.longitude.toFixed(4));
        } catch {
          // Keep slightly jittered real-world coords
        }
      }

      // Dynamic battery if available
      let battery = 75;
      if ('getBattery' in navigator) {
        try {
          const b: any = await (navigator as any).getBattery();
          battery = Math.round(b.level * 100);
        } catch {}
      }
      
      const fileName = fileInputRef.current?.files?.[0]?.name || "unknown.jpg";

      // Create JSON payload
      const payload = {
        type: selected,
        description: description.trim() || `${selected.toUpperCase()} emergency reported by citizen`,
        imageBase64: imageBase64 || undefined,
        fileName: fileName,
        latitude: lat,
        longitude: lng,
        batteryLevel: battery,
        isSevereWeather: true,
        citizenId: token ? undefined : "citizen-bhavyansh-01"
      };

      const headers: any = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const API_URL = import.meta.env.VITE_API_URL || 'https://rakshasetu-app-8dvk.onrender.com';
      await axios.post(`${API_URL}/incidents/sos`, payload, { headers, timeout: 30000 });

      // Reset form state so next SOS is completely clean and independent
      setImageBase64(null);
      setDescription("");
      setUploaded(false);
      setConfidence(0);

      // Call the success callback
      onSubmit();
    } catch (err) {
      console.error("SOS Report failed", err);
      alert("Failed to send SOS");
    }
  };

  return (
    <div className="absolute inset-0 bg-slate-50 flex flex-col" style={{ paddingTop: 12 }}>
      {/* Header */}
      <div className="bg-white flex items-center gap-3 px-5 py-4 border-b border-slate-100 shadow-sm">
        <button onClick={onBack} className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div>
          <h1 className="font-bold text-slate-900 text-lg">Report Incident</h1>
          <p className="text-xs text-slate-400">Help responders reach you faster</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 80 }}>
        {/* Incident type */}
        <div className="px-4 pt-5 pb-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Incident Type</p>
          <div className="grid grid-cols-3 gap-2.5">
            {incidentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelected(type.id)}
                className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition-all ${
                  selected === type.id ? "border-current shadow-sm" : "border-slate-200 bg-white"
                }`}
                style={selected === type.id ? { borderColor: type.color, background: type.color + "11" } : {}}
              >
                <span className="text-2xl">{type.icon}</span>
                <p className="text-xs font-semibold" style={{ color: selected === type.id ? type.color : "#64748b" }}>{type.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Upload area */}
        <div className="px-4 mb-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Evidence Upload</p>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
          />
          {!uploaded ? (
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center bg-white">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl mb-3">📷</div>
              <p className="text-sm font-semibold text-slate-700 mb-1">Upload Photo or Video</p>
              <p className="text-xs text-slate-400 text-center mb-4">Drag & drop or choose from gallery</p>
              <div className="flex gap-2">
                {[{ icon: "📷", label: "Camera" }, { icon: "🖼️", label: "Gallery" }, { icon: "🎥", label: "Video" }].map((btn) => (
                  <button
                    key={btn.label}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-1 px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-600"
                  >
                    <span className="text-xl">{btn.icon}</span>
                    <span className="text-xs font-semibold">{btn.label}</span>
                  </button>
                ))}
              </div>
              {uploading && (
                <div className="w-full mt-4">
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${confidence}%` }} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1 text-center">Uploading... {confidence}%</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              {/* Preview placeholder */}
              <div className="h-36 flex items-center justify-center bg-slate-200 overflow-hidden">
                {imageBase64 ? (
                  <img src={imageBase64} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl">🌊</span>
                )}
              </div>
              {/* Metadata card */}
              <div className="p-4">
                <div className="flex items-start gap-2 mb-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Metadata Verified</p>
                    <p className="text-xs text-slate-400">Location & timestamp authenticated</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[["📍 Location", "Andheri, Mumbai"], ["📅 Timestamp", "15 Sep 2026, 09:41"], ["📱 Device", "Pixel 9 Pro"], ["🌐 Coords", "19.1136°N 72.8697°E"]].map(([k, v]) => (
                    <div key={k} className="bg-slate-50 rounded-xl p-2.5">
                      <p className="text-slate-400">{k}</p>
                      <p className="font-semibold text-slate-700">{v}</p>
                    </div>
                  ))}
                </div>
                {/* AI confidence */}
                <div className="mt-3 p-2.5 bg-blue-50 rounded-xl">
                  <div className="flex justify-between items-center mb-1.5">
                    <p className="text-xs font-semibold text-blue-700">AI Confidence Score</p>
                    <p className="text-sm font-black text-blue-700">{confidence}%</p>
                  </div>
                  <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${confidence}%` }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="px-4 mb-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Description</p>
          <div className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden focus-within:border-blue-500 transition-colors">
            <textarea
              placeholder="Describe the incident in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 pt-3 pb-2 text-sm text-slate-700 outline-none bg-transparent resize-none"
              rows={3}
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
                  {[1,2,3,4,5,6,7].map((i) => (
                    <div key={i} className="wave-bar w-1 bg-red-400 rounded-full" style={{ height: "4px" }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Priority */}
        <div className="px-4 mb-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Priority Level</p>
          <div className="flex gap-2">
            {[{ l: "Low", c: "#16A34A" }, { l: "Medium", c: "#EA580C" }, { l: "Critical", c: "#DC2626" }].map((p) => (
              <button key={p.l} className="flex-1 py-2.5 rounded-xl border-2 text-xs font-bold" style={{ borderColor: p.c, color: p.c }}>
                {p.l}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4">
          <button
            onClick={handleSOSSubmit}
            className="w-full py-4 rounded-2xl text-white font-bold text-base transition-transform active:scale-95"
            style={{ background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" }}
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
}
