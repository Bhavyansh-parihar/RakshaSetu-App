import { useState } from "react";
import { Save, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";

interface Settings {
  fakeThreshold: number;
  humanWindowLow: number;
  humanWindowHigh: number;
  genuineThreshold: number;
  geminiModel: string;
  geminiApiKey: string;
  weatherApiKey: string;
  weatherUpdateInterval: number;
  notifProvider: string;
  notifApiKey: string;
  defaultLanguage: string;
  secondaryLanguage: string;
  maxSosRetry: number;
  sosTimeout: number;
}

const DEFAULT: Settings = {
  fakeThreshold: 0.40,
  humanWindowLow: 0.40,
  humanWindowHigh: 0.60,
  genuineThreshold: 0.60,
  geminiModel: "gemini-2.0-flash",
  geminiApiKey: "AIza••••••••••••••••••••••",
  weatherApiKey: "ow••••••••••••••••••••••••",
  weatherUpdateInterval: 15,
  notifProvider: "FCM",
  notifApiKey: "AAAA••••••••••••••••••",
  defaultLanguage: "en",
  secondaryLanguage: "hi",
  maxSosRetry: 3,
  sosTimeout: 30,
};

function ThresholdViz({ fake, winLow, winHigh }: { fake: number; winLow: number; winHigh: number }) {
  return (
    <div className="relative h-10 rounded-lg overflow-hidden" style={{ background: "#111E34" }}>
      <div className="absolute inset-0 flex">
        <div className="flex items-center justify-center text-[9px] font-mono" style={{ width: `${fake * 100}%`, background: "#10B981", opacity: 0.7, color: "#fff" }}>GENUINE</div>
        <div className="flex items-center justify-center text-[9px] font-mono" style={{ width: `${(winHigh - winLow) * 100}%`, background: "#F59E0B", opacity: 0.7, color: "#fff" }}>VERIFY</div>
        <div className="flex items-center justify-center text-[9px] font-mono flex-1" style={{ background: "#EF4444", opacity: 0.7, color: "#fff" }}>FAKE</div>
      </div>
      {[fake, winLow, winHigh].map((v, i) => (
        <div key={i} className="absolute top-0 bottom-0 w-0.5" style={{ left: `${v * 100}%`, background: "#fff", opacity: 0.5 }} />
      ))}
    </div>
  );
}

function Slider({ label, value, min, max, step, onChange, color }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; color: string;
}) {
  return (
    <div className="rounded-xl p-4 border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium" style={{ color: "#E2EAF8" }}>{label}</span>
        <span className="text-lg font-semibold font-mono" style={{ color }}>{value.toFixed(2)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full"
        style={{ accentColor: color }}
      />
      <div className="flex justify-between text-[9px] font-mono mt-1" style={{ color: "#3D5070" }}>
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, masked, options }: {
  label: string; value: string | number; onChange: (v: string) => void;
  masked?: boolean; options?: string[];
}) {
  return (
    <div>
      <label className="text-[10px] font-mono mb-1 block" style={{ color: "#3D5070" }}>{label}</label>
      {options ? (
        <select value={value} onChange={e => onChange(e.target.value)} className="w-full rounded-lg px-3 py-2 text-xs outline-none" style={{ background: "#0D1525", border: "1px solid #1C2B45", color: "#E2EAF8" }}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={masked ? "password" : "text"} value={value} onChange={e => onChange(e.target.value)}
          className="w-full rounded-lg px-3 py-2 text-xs outline-none font-mono"
          style={{ background: "#0D1525", border: "1px solid #1C2B45", color: "#E2EAF8" }} />
      )}
    </div>
  );
}

export default function SystemSettings() {
  const [s, setS] = useState<Settings>(DEFAULT);
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const upd = (key: keyof Settings, val: number | string) => setS(prev => ({ ...prev, [key]: val }));

  return (
    <div className="p-6 space-y-5">
      {/* AI Thresholds */}
      <section className="rounded-2xl border overflow-hidden" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
        <div className="px-5 py-4 border-b flex items-center gap-2" style={{ borderColor: "#1C2B45" }}>
          <div className="w-2 h-2 rounded-full" style={{ background: "#4488FF" }} />
          <div className="text-sm font-semibold" style={{ color: "#E2EAF8" }}>AI Detection Thresholds</div>
          <div className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: "#1A3A7A", color: "#4488FF" }}>Gemini v2.0</div>
        </div>
        <div className="p-5">
          <div className="mb-4">
            <div className="text-[10px] font-mono mb-2" style={{ color: "#3D5070" }}>THRESHOLD VISUALIZATION</div>
            <ThresholdViz fake={s.fakeThreshold} winLow={s.humanWindowLow} winHigh={s.humanWindowHigh} />
            <div className="flex justify-between text-[9px] font-mono mt-1" style={{ color: "#3D5070" }}>
              <span style={{ color: "#10B981" }}>0.0 → Genuine</span>
              <span style={{ color: "#F59E0B" }}>Human Verify Zone</span>
              <span style={{ color: "#EF4444" }}>Fake ← 1.0</span>
            </div>
          </div>

          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            <Slider label="Fake Threshold" value={s.fakeThreshold} min={0.1} max={0.9} step={0.01} onChange={v => upd("fakeThreshold", v)} color="#EF4444" />
            <Slider label="Human Verify — Low" value={s.humanWindowLow} min={0.1} max={s.humanWindowHigh - 0.01} step={0.01} onChange={v => upd("humanWindowLow", v)} color="#F59E0B" />
            <Slider label="Human Verify — High" value={s.humanWindowHigh} min={s.humanWindowLow + 0.01} max={0.9} step={0.01} onChange={v => upd("humanWindowHigh", v)} color="#F59E0B" />
          </div>

          <div className="mt-3 p-3 rounded-lg flex gap-3" style={{ background: "#111E34" }}>
            {[
              { label: "≤ Fake Threshold", zone: `0.00 – ${s.fakeThreshold.toFixed(2)}`, color: "#10B981", desc: "Auto-genuine" },
              { label: "Verify Window", zone: `${s.humanWindowLow.toFixed(2)} – ${s.humanWindowHigh.toFixed(2)}`, color: "#F59E0B", desc: "Manual review" },
              { label: "≥ Genuine Threshold", zone: `${s.humanWindowHigh.toFixed(2)} – 1.00`, color: "#EF4444", desc: "Auto-fake flag" },
            ].map(z => (
              <div key={z.label} className="flex-1 rounded-lg p-2.5" style={{ background: `${z.color}10`, border: `1px solid ${z.color}30` }}>
                <div className="text-[9px] font-mono" style={{ color: z.color }}>{z.label}</div>
                <div className="text-sm font-semibold font-mono mt-0.5" style={{ color: z.color }}>{z.zone}</div>
                <div className="text-[9px] mt-0.5" style={{ color: "#3D5070" }}>{z.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Gemini Config */}
        <section className="rounded-2xl border overflow-hidden" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: "#1C2B45" }}>
            <div className="text-sm font-semibold" style={{ color: "#E2EAF8" }}>Gemini AI Configuration</div>
          </div>
          <div className="p-5 space-y-3">
            <Field label="MODEL" value={s.geminiModel} onChange={v => upd("geminiModel", v)} options={["gemini-2.0-flash", "gemini-2.0-pro", "gemini-1.5-flash", "gemini-1.5-pro"]} />
            <Field label="API KEY" value={s.geminiApiKey} onChange={v => upd("geminiApiKey", v)} masked />
            <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs" style={{ background: "#111E34", border: "1px solid #1C2B45", color: "#7B8DB5" }}>
              <RefreshCw size={11} /> Test Connection
            </button>
          </div>
        </section>

        {/* OpenWeather Config */}
        <section className="rounded-2xl border overflow-hidden" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: "#1C2B45" }}>
            <div className="text-sm font-semibold" style={{ color: "#E2EAF8" }}>OpenWeather Configuration</div>
          </div>
          <div className="p-5 space-y-3">
            <Field label="API KEY" value={s.weatherApiKey} onChange={v => upd("weatherApiKey", v)} masked />
            <div>
              <label className="text-[10px] font-mono mb-1 block" style={{ color: "#3D5070" }}>UPDATE INTERVAL (minutes)</label>
              <input type="number" value={s.weatherUpdateInterval} onChange={e => upd("weatherUpdateInterval", parseInt(e.target.value))}
                className="w-full rounded-lg px-3 py-2 text-xs outline-none font-mono" style={{ background: "#0D1525", border: "1px solid #1C2B45", color: "#E2EAF8" }} />
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs" style={{ background: "#111E34", border: "1px solid #1C2B45", color: "#7B8DB5" }}>
              <RefreshCw size={11} /> Test Connection
            </button>
          </div>
        </section>

        {/* Notifications */}
        <section className="rounded-2xl border overflow-hidden" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: "#1C2B45" }}>
            <div className="text-sm font-semibold" style={{ color: "#E2EAF8" }}>Notification Provider</div>
          </div>
          <div className="p-5 space-y-3">
            <Field label="PROVIDER" value={s.notifProvider} onChange={v => upd("notifProvider", v)} options={["FCM", "OneSignal", "Expo", "AWS SNS"]} />
            <Field label="API KEY / SERVER KEY" value={s.notifApiKey} onChange={v => upd("notifApiKey", v)} masked />
            <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <label className="text-[10px] font-mono mb-1 block" style={{ color: "#3D5070" }}>SOS MAX RETRY</label>
                <input type="number" value={s.maxSosRetry} onChange={e => upd("maxSosRetry", parseInt(e.target.value))} min={1} max={10} className="w-full rounded-lg px-3 py-2 text-xs outline-none font-mono" style={{ background: "#0D1525", border: "1px solid #1C2B45", color: "#E2EAF8" }} />
              </div>
              <div>
                <label className="text-[10px] font-mono mb-1 block" style={{ color: "#3D5070" }}>SOS TIMEOUT (s)</label>
                <input type="number" value={s.sosTimeout} onChange={e => upd("sosTimeout", parseInt(e.target.value))} min={5} max={120} className="w-full rounded-lg px-3 py-2 text-xs outline-none font-mono" style={{ background: "#0D1525", border: "1px solid #1C2B45", color: "#E2EAF8" }} />
              </div>
            </div>
          </div>
        </section>

        {/* Language */}
        <section className="rounded-2xl border overflow-hidden" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: "#1C2B45" }}>
            <div className="text-sm font-semibold" style={{ color: "#E2EAF8" }}>Language Configuration</div>
          </div>
          <div className="p-5 space-y-3">
            <Field label="DEFAULT LANGUAGE" value={s.defaultLanguage} onChange={v => upd("defaultLanguage", v)} options={["en", "hi", "ta", "te", "kn", "ml", "bn", "or", "gu", "mr"]} />
            <Field label="SECONDARY LANGUAGE" value={s.secondaryLanguage} onChange={v => upd("secondaryLanguage", v)} options={["hi", "en", "ta", "te", "kn", "ml", "bn", "or", "gu", "mr"]} />
            <div className="p-3 rounded-lg text-[10px]" style={{ background: "#111E34", color: "#7B8DB5" }}>
              All safety guidelines and SOS alerts will be delivered in <span style={{ color: "#E2EAF8" }}>{s.defaultLanguage.toUpperCase()}</span> with <span style={{ color: "#E2EAF8" }}>{s.secondaryLanguage.toUpperCase()}</span> as fallback.
            </div>
          </div>
        </section>
      </div>

      {/* Save bar */}
      <div className="sticky bottom-0 flex items-center justify-between px-5 py-3 rounded-2xl" style={{ background: "#0D1525", border: "1px solid #1C2B45" }}>
        <div className="flex items-center gap-2 text-xs" style={{ color: "#7B8DB5" }}>
          <AlertTriangle size={13} style={{ color: "#F59E0B" }} />
          Changes to AI thresholds affect live report moderation. Review before saving.
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <div className="flex items-center gap-1.5 text-xs" style={{ color: "#10B981" }}>
              <CheckCircle size={12} /> Saved successfully
            </div>
          )}
          <button onClick={save} className="flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold" style={{ background: "#4488FF", color: "#fff" }}>
            <Save size={13} /> Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
}
