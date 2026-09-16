import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../localization/LanguageContext";

export default function Settings() {
  const { t } = useTranslation();
  const { currentLang, setLanguage } = useLanguage();
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [vibrate, setVibrate] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [autoAccept, setAutoAccept] = useState(false);

  const Toggle = ({ on, toggle }: { on: boolean; toggle: () => void }) => (
    <button
      onClick={toggle}
      className={`relative w-12 h-6 rounded-full transition-colors ${on ? "bg-[#FF4F38]" : "bg-[#2D4160]"}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${on ? "left-7" : "left-1"}`} />
    </button>
  );

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-[#1E2D42] border border-[#2D4160] rounded-2xl overflow-hidden">
      <p className="text-[#8BAFC8] text-xs uppercase tracking-widest mono px-4 py-3 border-b border-[#2D4160]">{title}</p>
      {children}
    </div>
  );

  const Row = ({ label, sub, right }: { label: string; sub?: string; right: React.ReactNode }) => (
    <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#2D4160] last:border-0">
      <div>
        <p className="text-[#F0F5FA] text-sm font-600">{label}</p>
        {sub && <p className="text-[#4D6E8A] text-xs mt-0.5">{sub}</p>}
      </div>
      {right}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#111827] overflow-y-auto">
      <div className="bg-[#1A2234] border-b border-[#2D4160] px-4 pt-10 pb-4">
        <h1 className="font-display text-3xl font-800 text-[#F0F5FA] tracking-wide">{t("settings.title").toUpperCase()}</h1>
        <p className="text-[#8BAFC8] text-xs mt-0.5">RakshaSetu Field Responder v3.2.1</p>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4">

        {/* Language Section */}
        <Section title={t("settings.language").toUpperCase()}>
          <div className="flex items-center justify-between px-4 py-3.5">
            <div>
              <p className="text-[#F0F5FA] text-sm font-600">{t("settings.appLanguage")}</p>
              <p className="text-[#4D6E8A] text-xs mt-0.5">{t("settings.currently")} {currentLang === "hi" ? "हिन्दी" : "English"}</p>
            </div>
            <div className="flex bg-[#2D4160] rounded-xl p-0.5">
              {(["en", "hi"] as const).map((l) => (
                <button key={l} onClick={() => setLanguage(l)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentLang === l ? "bg-[#FF4F38] text-white" : "text-[#8BAFC8]"}`}>
                  {l === "en" ? "EN" : "हि"}
                </button>
              ))}
            </div>
          </div>
        </Section>

        <Section title="NOTIFICATIONS">
          <Row label="Push Notifications" sub="SOS, reassignments, alerts" right={<Toggle on={notifications} toggle={() => setNotifications(!notifications)} />} />
          <Row label="Alert Sound" sub="Loud alarm for incoming SOS" right={<Toggle on={sound} toggle={() => setSound(!sound)} />} />
          <Row label="Vibration" sub="Haptic feedback" right={<Toggle on={vibrate} toggle={() => setVibrate(!vibrate)} />} />
        </Section>

        <Section title="OPERATIONS">
          <Row label="Auto-Accept High Priority" sub="P9–10 accepted automatically" right={<Toggle on={autoAccept} toggle={() => setAutoAccept(!autoAccept)} />} />
          <Row label="AI Verification Threshold" right={
            <span className="text-[#FFB800] text-sm font-600 bg-[#FFB80015] border border-[#FFB80030] rounded-lg px-3 py-1">0.4 – 0.6</span>
          } />
          <Row label="My Zone" right={
            <span className="text-[#F0F5FA] text-sm font-600">Kolhapur West</span>
          } />
        </Section>

        <Section title="OFFLINE & SYNC">
          <Row label="Offline Mode" sub="Cache tasks and map data" right={<Toggle on={offlineMode} toggle={() => setOfflineMode(!offlineMode)} />} />
          <Row label="Map Cache" right={
            <button className="text-[#0A84FF] text-xs font-600 bg-[#0A84FF15] border border-[#0A84FF30] rounded-lg px-3 py-1.5">Download (420 MB)</button>
          } />
          <Row label="Last Synced" right={<span className="text-[#8BAFC8] text-xs mono">14:28:03 today</span>} />
        </Section>

        <Section title="ACCESSIBILITY">
          <Row label="High Contrast Mode" sub="For low visibility conditions" right={<Toggle on={highContrast} toggle={() => setHighContrast(!highContrast)} />} />
          <Row label="Text Size" right={
            <div className="flex gap-2">
              {["S", "M", "L"].map((s) => (
                <button key={s} className={`w-8 h-8 rounded-lg text-xs font-700 border ${s === "L" ? "bg-[#FF4F38] border-[#FF4F38] text-white" : "bg-[#1A2234] border-[#2D4160] text-[#8BAFC8]"}`}>{s}</button>
              ))}
            </div>
          } />
        </Section>

        <Section title="ACCOUNT">
          <Row label="Change Password" right={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#4D6E8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
          <Row label="Report Issue" right={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#4D6E8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
          <Row label={t("settings.privacy")} right={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#4D6E8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>} />
        </Section>

        <button className="w-full bg-[#FF3B3015] border border-[#FF3B3040] text-[#FF3B30] font-display text-lg font-700 tracking-wider py-4 rounded-2xl active:scale-95 transition-transform">
          {t("settings.logout").toUpperCase()}
        </button>
        <div className="pb-4" />
      </div>
    </div>
  );
}
