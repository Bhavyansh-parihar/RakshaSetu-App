import { useState } from "react";
import { Search, Filter, Download } from "lucide-react";

type Role = "Admin" | "System" | "Responder" | "Gov" | "AI";

interface Log {
  id: string;
  timestamp: string;
  actor: string;
  role: Role;
  action: string;
  target: string;
  severity: "INFO" | "WARN" | "CRITICAL";
  ip: string;
}

const LOGS: Log[] = [
  { id: "AUD-91042", timestamp: "2025-06-12 14:38:22", actor: "Super Admin", role: "Admin", action: "PERMANENT_BAN", target: "CIT-10251 (Vikram Patel)", severity: "CRITICAL", ip: "10.0.0.1" },
  { id: "AUD-91041", timestamp: "2025-06-12 14:32:11", actor: "AI Engine v2.1", role: "AI", action: "FAKE_REPORT_FLAGGED", target: "FRP-7841", severity: "WARN", ip: "internal" },
  { id: "AUD-91040", timestamp: "2025-06-12 14:12:04", actor: "Admin Priya", role: "Admin", action: "SHELTER_UPDATED", target: "SHL-224 (Chennai)", severity: "INFO", ip: "10.0.0.4" },
  { id: "AUD-91039", timestamp: "2025-06-12 13:55:18", actor: "AI Engine v2.1", role: "AI", action: "FAKE_REPORT_FLAGGED", target: "FRP-7839", severity: "WARN", ip: "internal" },
  { id: "AUD-91038", timestamp: "2025-06-12 13:40:02", actor: "Gov User Ramesh", role: "Gov", action: "REPORT_EXPORTED", target: "Analytics June 2025", severity: "INFO", ip: "192.168.1.12" },
  { id: "AUD-91037", timestamp: "2025-06-12 13:11:33", actor: "Admin Priya", role: "Admin", action: "GRIEVANCE_RESOLVED", target: "GRV-1128", severity: "INFO", ip: "10.0.0.4" },
  { id: "AUD-91036", timestamp: "2025-06-12 12:48:09", actor: "RSP-2034 (Pooja Bisht)", role: "Responder", action: "INCIDENT_CLOSED", target: "INC-4398", severity: "INFO", ip: "mobile" },
  { id: "AUD-91035", timestamp: "2025-06-12 12:20:41", actor: "System", role: "System", action: "AI_MODEL_UPDATED", target: "GeminiFlash v2.1 → v2.2", severity: "WARN", ip: "internal" },
  { id: "AUD-91034", timestamp: "2025-06-12 11:55:17", actor: "Super Admin", role: "Admin", action: "THRESHOLD_CHANGED", target: "Fake threshold 0.35 → 0.40", severity: "CRITICAL", ip: "10.0.0.1" },
  { id: "AUD-91033", timestamp: "2025-06-12 11:22:03", actor: "Admin Priya", role: "Admin", action: "USER_SUSPENDED", target: "CIT-10284 (Sunita Devi)", severity: "WARN", ip: "10.0.0.4" },
  { id: "AUD-91032", timestamp: "2025-06-12 10:41:19", actor: "System", role: "System", action: "BACKUP_COMPLETED", target: "DB snapshot 2025-06-12", severity: "INFO", ip: "internal" },
  { id: "AUD-91031", timestamp: "2025-06-12 10:14:08", actor: "AI Engine v2.1", role: "AI", action: "WEATHER_ALERT_ISSUED", target: "Cyclone Zephyr — AP Coast", severity: "CRITICAL", ip: "internal" },
];

const SEV_COLOR = { INFO: "#10B981", WARN: "#F59E0B", CRITICAL: "#EF4444" };
const ROLE_COLOR: Record<Role, string> = { Admin: "#4488FF", System: "#7B8DB5", Responder: "#22D3EE", Gov: "#A78BFA", AI: "#FF6B35" };

export default function AuditLogs() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [sevFilter, setSevFilter] = useState<string>("All");

  const filtered = LOGS.filter(l =>
    (roleFilter === "All" || l.role === roleFilter) &&
    (sevFilter === "All" || l.severity === sevFilter) &&
    (!search || l.action.includes(search.toUpperCase()) || l.actor.toLowerCase().includes(search.toLowerCase()) || l.target.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6">
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1 max-w-md" style={{ background: "#0D1525", border: "1px solid #1C2B45" }}>
          <Search size={13} style={{ color: "#3D5070" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search action, actor, target…" className="bg-transparent text-xs outline-none flex-1" style={{ color: "#E2EAF8" }} />
        </div>
        <div className="flex items-center gap-2">
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="text-xs rounded-lg px-3 py-2 outline-none" style={{ background: "#0D1525", border: "1px solid #1C2B45", color: "#7B8DB5" }}>
            {["All", "Admin", "AI", "System", "Responder", "Gov"].map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select value={sevFilter} onChange={e => setSevFilter(e.target.value)} className="text-xs rounded-lg px-3 py-2 outline-none" style={{ background: "#0D1525", border: "1px solid #1C2B45", color: "#7B8DB5" }}>
            {["All", "INFO", "WARN", "CRITICAL"].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <button className="ml-auto flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: "#0D1525", border: "1px solid #1C2B45", color: "#7B8DB5" }}>
          <Download size={12} /> Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: "Total Events Today", value: LOGS.length.toString(), color: "#4488FF" },
          { label: "Critical", value: LOGS.filter(l => l.severity === "CRITICAL").length.toString(), color: "#EF4444" },
          { label: "Warnings", value: LOGS.filter(l => l.severity === "WARN").length.toString(), color: "#F59E0B" },
          { label: "Info", value: LOGS.filter(l => l.severity === "INFO").length.toString(), color: "#10B981" },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-3 border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
            <div className="text-[10px] font-mono" style={{ color: "#3D5070" }}>{s.label}</div>
            <div className="text-2xl font-semibold mt-1" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid #1C2B45" }}>
              {["Log ID", "Timestamp", "Actor", "Role", "Action", "Target", "Severity", "IP"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-mono uppercase tracking-wider" style={{ color: "#3D5070" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id} className="border-b transition-colors hover:opacity-80" style={{ borderColor: "#1C2B45" }}>
                <td className="px-4 py-2.5 text-[10px] font-mono" style={{ color: "#3D5070" }}>{l.id}</td>
                <td className="px-4 py-2.5 text-[10px] font-mono" style={{ color: "#7B8DB5" }}>{l.timestamp}</td>
                <td className="px-4 py-2.5 text-xs" style={{ color: "#E2EAF8" }}>{l.actor}</td>
                <td className="px-4 py-2.5">
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: `${ROLE_COLOR[l.role]}15`, color: ROLE_COLOR[l.role] }}>{l.role}</span>
                </td>
                <td className="px-4 py-2.5 text-[10px] font-mono" style={{ color: "#E2EAF8" }}>{l.action}</td>
                <td className="px-4 py-2.5 text-xs" style={{ color: "#7B8DB5" }}>{l.target}</td>
                <td className="px-4 py-2.5">
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: `${SEV_COLOR[l.severity]}15`, color: SEV_COLOR[l.severity] }}>{l.severity}</span>
                </td>
                <td className="px-4 py-2.5 text-[10px] font-mono" style={{ color: "#3D5070" }}>{l.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 text-[10px] font-mono" style={{ color: "#3D5070" }}>
          Showing {filtered.length} of {LOGS.length} events
        </div>
      </div>
    </div>
  );
}
