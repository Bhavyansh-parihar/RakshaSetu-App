import { useState } from "react";
import { AlertTriangle, MapPin, Camera, Clock, User, Shield, CheckCircle, Eye, AlertOctagon, Ban, X, ChevronRight, Info } from "lucide-react";

type Risk = "LOW" | "MEDIUM" | "HIGH";
type ActionType = "warning" | "surveillance" | "temp-suspend" | "perm-ban" | "genuine" | null;

interface Report {
  id: string;
  citizenId: string;
  citizenName: string;
  gps: string;
  mediaCount: number;
  aiConfidence: number;
  responderVerified: boolean;
  timestamp: string;
  prevFake: number;
  incidentType: string;
  risk: Risk;
  district: string;
  status: "pending" | "reviewed";
  resolvedAction?: ActionType;
}

const REPORTS: Report[] = [
  {
    id: "FRP-7841", citizenId: "CIT-10251", citizenName: "Vikram Patel",
    gps: "21.1702° N, 72.8311° E", mediaCount: 3, aiConfidence: 0.91,
    responderVerified: false, timestamp: "2025-06-12 14:32:11",
    prevFake: 7, incidentType: "Flood SOS", risk: "HIGH", district: "Surat, Gujarat", status: "pending",
  },
  {
    id: "FRP-7839", citizenId: "CIT-10284", citizenName: "Sunita Devi",
    gps: "25.5941° N, 85.1376° E", mediaCount: 1, aiConfidence: 0.68,
    responderVerified: false, timestamp: "2025-06-12 13:11:04",
    prevFake: 3, incidentType: "Building Collapse", risk: "HIGH", district: "Patna, Bihar", status: "pending",
  },
  {
    id: "FRP-7833", citizenId: "CIT-10441", citizenName: "Mohammed Riyaz",
    gps: "17.3850° N, 78.4867° E", mediaCount: 2, aiConfidence: 0.52,
    responderVerified: false, timestamp: "2025-06-12 11:47:33",
    prevFake: 1, incidentType: "Landslide", risk: "MEDIUM", district: "Hyderabad, TS", status: "pending",
  },
  {
    id: "FRP-7828", citizenId: "CIT-10522", citizenName: "Anjali Singh",
    gps: "26.8467° N, 80.9462° E", mediaCount: 0, aiConfidence: 0.44,
    responderVerified: false, timestamp: "2025-06-12 09:21:18",
    prevFake: 0, incidentType: "Gas Leak", risk: "MEDIUM", district: "Lucknow, UP", status: "pending",
  },
  {
    id: "FRP-7820", citizenId: "CIT-10678", citizenName: "Rajesh Kumar",
    gps: "12.9716° N, 77.5946° E", mediaCount: 4, aiConfidence: 0.31,
    responderVerified: false, timestamp: "2025-06-12 08:05:44",
    prevFake: 0, incidentType: "Fire", risk: "LOW", district: "Bengaluru, KA", status: "pending",
  },
  {
    id: "FRP-7814", citizenId: "CIT-10789", citizenName: "Pooja Mishra",
    gps: "22.5726° N, 88.3639° E", mediaCount: 2, aiConfidence: 0.78,
    responderVerified: false, timestamp: "2025-06-11 22:14:09",
    prevFake: 2, incidentType: "Flood SOS", risk: "HIGH", district: "Kolkata, WB", status: "pending",
  },
];

const RISK_COLOR: Record<Risk, string> = {
  LOW: "#10B981", MEDIUM: "#F59E0B", HIGH: "#EF4444",
};

const ACTION_LABELS: Record<NonNullable<ActionType>, { label: string; color: string; icon: React.ElementType }> = {
  warning: { label: "Issue Warning", color: "#F59E0B", icon: AlertTriangle },
  surveillance: { label: "Under Surveillance", color: "#A78BFA", icon: Eye },
  "temp-suspend": { label: "Temporary Suspension", color: "#FF6B35", icon: AlertOctagon },
  "perm-ban": { label: "Permanent Ban", color: "#EF4444", icon: Ban },
  genuine: { label: "Mark Genuine", color: "#10B981", icon: CheckCircle },
};

function ConfidenceBar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color = value >= 0.7 ? "#EF4444" : value >= 0.4 ? "#F59E0B" : "#10B981";
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-[10px] font-mono" style={{ color: "#7B8DB5" }}>AI CONFIDENCE</span>
        <span className="text-sm font-semibold font-mono" style={{ color }}>{(value * 100).toFixed(0)}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "#1C2B45" }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }} />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[9px] font-mono" style={{ color: "#10B981" }}>GENUINE ↑</span>
        <span className="text-[9px] font-mono" style={{ color: "#3D5070" }}>0.4 | 0.6</span>
        <span className="text-[9px] font-mono" style={{ color: "#EF4444" }}>↑ FAKE</span>
      </div>
    </div>
  );
}

export default function FakeReportModeration() {
  const [selected, setSelected] = useState<Report>(REPORTS[0]);
  const [reports, setReports] = useState<Report[]>(REPORTS);
  const [confirmAction, setConfirmAction] = useState<ActionType>(null);
  const [resolvedId, setResolvedId] = useState<string | null>(null);
  const [banModal, setBanModal] = useState(false);
  const [note, setNote] = useState("");

  const applyAction = (action: ActionType) => {
    if (action === "perm-ban") { setBanModal(true); return; }
    finalize(action);
  };

  const finalize = (action: ActionType) => {
    setReports(rs => rs.map(r => r.id === selected.id ? { ...r, status: "reviewed", resolvedAction: action } : r));
    setResolvedId(selected.id);
    setBanModal(false);
    setNote("");
    const remaining = reports.filter(r => r.id !== selected.id && r.status === "pending");
    if (remaining.length) setSelected(remaining[0]);
  };

  const pending = reports.filter(r => r.status === "pending");
  const reviewed = reports.filter(r => r.status === "reviewed");

  return (
    <div className="flex h-full">
      {/* Left list */}
      <div className="flex-shrink-0 border-r overflow-y-auto" style={{ width: 300, background: "#0B0F1A", borderColor: "#1C2B45" }}>
        <div className="px-4 py-3 border-b sticky top-0 z-10" style={{ background: "#0B0F1A", borderColor: "#1C2B45" }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold" style={{ color: "#E2EAF8" }}>Suspicious Reports</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: "#3A1010", color: "#EF4444" }}>{pending.length} PENDING</span>
          </div>
        </div>

        {pending.length > 0 && (
          <div className="px-3 pt-3 pb-1">
            <div className="text-[9px] font-mono uppercase tracking-widest px-1 mb-2" style={{ color: "#3D5070" }}>Pending Review</div>
            {pending.map(r => (
              <button
                key={r.id}
                onClick={() => setSelected(r)}
                className="w-full rounded-lg p-3 mb-1.5 text-left transition-all"
                style={{
                  background: selected.id === r.id ? "#172240" : "#0D1525",
                  border: selected.id === r.id ? "1px solid #4488FF" : "1px solid #1C2B45",
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono" style={{ color: "#4488FF" }}>{r.id}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: `${RISK_COLOR[r.risk]}15`, color: RISK_COLOR[r.risk] }}>{r.risk}</span>
                </div>
                <div className="text-xs font-medium mb-0.5" style={{ color: "#E2EAF8" }}>{r.citizenName}</div>
                <div className="text-[10px]" style={{ color: "#7B8DB5" }}>{r.incidentType} · {r.district}</div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[9px] font-mono" style={{ color: "#3D5070" }}>{r.timestamp.split(" ")[1]}</span>
                  <span className="text-[9px] font-mono" style={{ color: r.prevFake > 3 ? "#EF4444" : r.prevFake > 0 ? "#F59E0B" : "#3D5070" }}>
                    {r.prevFake} prev fake{r.prevFake !== 1 ? "s" : ""}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {reviewed.length > 0 && (
          <div className="px-3 py-1">
            <div className="text-[9px] font-mono uppercase tracking-widest px-1 mb-2 mt-2" style={{ color: "#3D5070" }}>Reviewed Today</div>
            {reviewed.map(r => (
              <div key={r.id} className="rounded-lg p-3 mb-1.5 opacity-50" style={{ background: "#0D1525", border: "1px solid #1C2B45" }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono" style={{ color: "#4488FF" }}>{r.id}</span>
                  {r.resolvedAction && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: `${ACTION_LABELS[r.resolvedAction].color}15`, color: ACTION_LABELS[r.resolvedAction].color }}>
                      {r.resolvedAction}
                    </span>
                  )}
                </div>
                <div className="text-xs" style={{ color: "#7B8DB5" }}>{r.citizenName}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail panel */}
      <div className="flex-1 overflow-y-auto p-6" style={{ background: "#07090F" }}>
        {/* Report header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-lg font-semibold font-mono" style={{ color: "#4488FF" }}>{selected.id}</span>
              <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: `${RISK_COLOR[selected.risk]}18`, color: RISK_COLOR[selected.risk], border: `1px solid ${RISK_COLOR[selected.risk]}40` }}>
                {selected.risk} RISK
              </span>
              <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: "#111E34", color: "#7B8DB5" }}>
                {selected.status.toUpperCase()}
              </span>
            </div>
            <div className="text-xs" style={{ color: "#7B8DB5" }}>{selected.incidentType} · Reported {selected.timestamp}</div>
          </div>
          {selected.prevFake >= 5 && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: "#3A1010", border: "1px solid #EF444440", color: "#EF4444" }}>
              <AlertTriangle size={12} />
              Serial offender — {selected.prevFake} prior fake reports
            </div>
          )}
        </div>

        <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {/* Citizen info */}
          <div className="rounded-xl p-4 border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
            <div className="text-[10px] font-mono uppercase tracking-wider mb-3" style={{ color: "#3D5070" }}>Citizen Profile</div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold" style={{ background: "#172240", color: "#4488FF" }}>
                  {selected.citizenName.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: "#E2EAF8" }}>{selected.citizenName}</div>
                  <div className="text-[10px] font-mono" style={{ color: "#3D5070" }}>{selected.citizenId}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Metadata label="District" value={selected.district} />
                <Metadata label="Prev Fakes" value={selected.prevFake.toString()} highlight={selected.prevFake > 3 ? "#EF4444" : selected.prevFake > 0 ? "#F59E0B" : undefined} />
              </div>
            </div>
          </div>

          {/* GPS + media */}
          <div className="rounded-xl p-4 border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
            <div className="text-[10px] font-mono uppercase tracking-wider mb-3" style={{ color: "#3D5070" }}>Location & Media</div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin size={13} style={{ color: "#4488FF" }} />
                <span className="text-xs font-mono" style={{ color: "#E2EAF8" }}>{selected.gps}</span>
              </div>
              <div className="rounded-lg overflow-hidden" style={{ height: 90, background: "#111E34", position: "relative" }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-[10px] font-mono" style={{ color: "#3D5070" }}>MAP PREVIEW</div>
                </div>
                <div className="absolute inset-0" style={{
                  background: "repeating-linear-gradient(0deg, #1C2B4520 0px, #1C2B4520 1px, transparent 1px, transparent 30px), repeating-linear-gradient(90deg, #1C2B4520 0px, #1C2B4520 1px, transparent 1px, transparent 30px)"
                }} />
                <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
                  <div className="w-3 h-3 rounded-full" style={{ background: "#EF4444", boxShadow: "0 0 0 4px #EF444430" }} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Camera size={13} style={{ color: "#7B8DB5" }} />
                <span className="text-xs" style={{ color: "#7B8DB5" }}>{selected.mediaCount} media file{selected.mediaCount !== 1 ? "s" : ""} uploaded</span>
                {selected.mediaCount === 0 && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: "#3A1010", color: "#EF4444" }}>NO MEDIA</span>
                )}
              </div>
              {selected.mediaCount > 0 && (
                <div className="flex gap-2">
                  {Array.from({ length: Math.min(selected.mediaCount, 3) }).map((_, i) => (
                    <div key={i} className="w-14 h-12 rounded" style={{ background: "#111E34", border: "1px solid #1C2B45" }}>
                      <div className="w-full h-full flex items-center justify-center">
                        <Camera size={10} style={{ color: "#3D5070" }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* AI Analysis */}
          <div className="rounded-xl p-4 border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
            <div className="text-[10px] font-mono uppercase tracking-wider mb-3" style={{ color: "#3D5070" }}>AI Analysis</div>
            <ConfidenceBar value={selected.aiConfidence} />
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: "#1C2B45" }}>
                <span className="text-[10px] font-mono" style={{ color: "#7B8DB5" }}>Responder Verification</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: selected.responderVerified ? "#0A1A0E" : "#3A1010", color: selected.responderVerified ? "#10B981" : "#EF4444" }}>
                  {selected.responderVerified ? "VERIFIED" : "NOT VERIFIED"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: "#1C2B45" }}>
                <span className="text-[10px] font-mono" style={{ color: "#7B8DB5" }}>Incident Timestamp</span>
                <span className="text-[10px] font-mono" style={{ color: "#E2EAF8" }}>{selected.timestamp}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[10px] font-mono" style={{ color: "#7B8DB5" }}>Metadata Integrity</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: selected.mediaCount > 0 ? "#0A1A0E" : "#3A1010", color: selected.mediaCount > 0 ? "#10B981" : "#F59E0B" }}>
                  {selected.mediaCount > 0 ? "INTACT" : "MISSING MEDIA"}
                </span>
              </div>
            </div>
            <div className="mt-3 p-3 rounded-lg text-[10px] leading-relaxed" style={{ background: "#111E34", color: "#7B8DB5" }}>
              <span style={{ color: "#E2EAF8" }}>AI Assessment: </span>
              {selected.aiConfidence >= 0.7
                ? `High probability of fabricated report. GPS coordinates inconsistent with reported incident zone. Image metadata timestamps mismatched by ${Math.round(selected.aiConfidence * 40)}+ minutes.`
                : selected.aiConfidence >= 0.4
                ? `Borderline confidence. Manual human verification recommended before taking action. Report is in the ambiguous zone (0.4–0.6 threshold).`
                : `Low fake probability. Report appears genuine. Possible AI false-positive — consider marking as genuine.`}
            </div>
          </div>

          {/* Risk factors */}
          <div className="rounded-xl p-4 border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
            <div className="text-[10px] font-mono uppercase tracking-wider mb-3" style={{ color: "#3D5070" }}>Risk Factors</div>
            <div className="space-y-2">
              {[
                { label: "AI Confidence Score", val: selected.aiConfidence >= 0.7 ? "HIGH RISK" : selected.aiConfidence >= 0.4 ? "MODERATE" : "LOW RISK", color: selected.aiConfidence >= 0.7 ? "#EF4444" : selected.aiConfidence >= 0.4 ? "#F59E0B" : "#10B981" },
                { label: "Previous Fake Reports", val: selected.prevFake > 5 ? "SERIAL" : selected.prevFake > 2 ? "REPEAT" : selected.prevFake > 0 ? "PRIOR OFFENCE" : "CLEAN", color: selected.prevFake > 5 ? "#EF4444" : selected.prevFake > 2 ? "#F59E0B" : selected.prevFake > 0 ? "#F59E0B" : "#10B981" },
                { label: "Responder Dispatch Waste", val: selected.responderVerified ? "DISPATCHED" : "NO DISPATCH", color: selected.responderVerified ? "#EF4444" : "#7B8DB5" },
                { label: "Media Evidence", val: selected.mediaCount === 0 ? "ABSENT" : "PRESENT", color: selected.mediaCount === 0 ? "#EF4444" : "#10B981" },
                { label: "Overall Risk Level", val: selected.risk, color: RISK_COLOR[selected.risk] },
              ].map(f => (
                <div key={f.label} className="flex items-center justify-between py-1.5 border-b last:border-0" style={{ borderColor: "#1C2B45" }}>
                  <span className="text-[10px]" style={{ color: "#7B8DB5" }}>{f.label}</span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded" style={{ background: `${f.color}15`, color: f.color }}>{f.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action area */}
        {selected.status === "pending" ? (
          <div className="mt-4 rounded-xl p-4 border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
            <div className="text-[10px] font-mono uppercase tracking-wider mb-3" style={{ color: "#3D5070" }}>Moderation Action</div>
            <div className="flex flex-wrap gap-2">
              {(Object.entries(ACTION_LABELS) as [NonNullable<ActionType>, typeof ACTION_LABELS[keyof typeof ACTION_LABELS]][]).map(([key, cfg]) => {
                const Icon = cfg.icon;
                return (
                  <button
                    key={key}
                    onClick={() => applyAction(key)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all hover:opacity-90"
                    style={{
                      background: key === "perm-ban" ? cfg.color : `${cfg.color}18`,
                      color: key === "perm-ban" ? "#fff" : cfg.color,
                      border: `1px solid ${cfg.color}40`,
                    }}
                  >
                    <Icon size={12} /> {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-xl p-4 border text-center" style={{ background: "#0A1A0E", borderColor: "#10B98140" }}>
            <CheckCircle size={16} style={{ color: "#10B981", margin: "0 auto 8px" }} />
            <div className="text-sm" style={{ color: "#10B981" }}>Report reviewed — action applied</div>
          </div>
        )}
      </div>

      {/* Ban confirmation modal */}
      {banModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "#000000CC" }}>
          <div className="rounded-2xl p-6 w-96" style={{ background: "#0D1525", border: "1px solid #EF444440" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#3A1010" }}>
                <Ban size={18} style={{ color: "#EF4444" }} />
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: "#EF4444" }}>Permanent Ban</div>
                <div className="text-[10px]" style={{ color: "#7B8DB5" }}>This action cannot be undone</div>
              </div>
              <button onClick={() => setBanModal(false)} className="ml-auto" style={{ color: "#3D5070" }}>
                <X size={14} />
              </button>
            </div>
            <div className="rounded-lg p-3 mb-4" style={{ background: "#111E34" }}>
              <div className="text-xs font-medium mb-1" style={{ color: "#E2EAF8" }}>{selected.citizenName}</div>
              <div className="text-[10px] font-mono" style={{ color: "#3D5070" }}>{selected.citizenId} · {selected.prevFake} prior fake reports</div>
            </div>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Add ban reason for audit trail…"
              rows={3}
              className="w-full rounded-lg p-3 text-xs outline-none resize-none mb-4"
              style={{ background: "#111E34", border: "1px solid #1C2B45", color: "#E2EAF8" }}
            />
            <div className="flex gap-2">
              <button
                onClick={() => setBanModal(false)}
                className="flex-1 py-2 rounded-lg text-xs"
                style={{ background: "#111E34", color: "#7B8DB5", border: "1px solid #1C2B45" }}
              >
                Cancel
              </button>
              <button
                onClick={() => finalize("perm-ban")}
                className="flex-1 py-2 rounded-lg text-xs font-semibold"
                style={{ background: "#EF4444", color: "#fff" }}
              >
                Confirm Permanent Ban
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Metadata({ label, value, highlight }: { label: string; value: string; highlight?: string }) {
  return (
    <div className="rounded-lg p-2" style={{ background: "#111E34" }}>
      <div className="text-[9px] font-mono uppercase" style={{ color: "#3D5070" }}>{label}</div>
      <div className="text-xs font-semibold mt-0.5" style={{ color: highlight ?? "#E2EAF8" }}>{value}</div>
    </div>
  );
}
