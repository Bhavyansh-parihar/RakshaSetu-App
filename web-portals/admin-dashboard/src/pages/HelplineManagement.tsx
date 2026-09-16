import { useState } from "react";
import { Phone, Plus, Edit2, Globe } from "lucide-react";

interface Helpline {
  id: string;
  name: string;
  number: string;
  type: "National" | "State" | "District";
  state: string;
  category: string;
  enabled: boolean;
  calls24h: number;
}

const HELPLINES_INIT: Helpline[] = [
  { id: "HL-001", name: "NDMA National Helpline", number: "1078", type: "National", state: "Central", category: "Disaster", enabled: true, calls24h: 12847 },
  { id: "HL-002", name: "Police Emergency", number: "100", type: "National", state: "Central", category: "Law Enforcement", enabled: true, calls24h: 38291 },
  { id: "HL-003", name: "Fire & Rescue", number: "101", type: "National", state: "Central", category: "Fire", enabled: true, calls24h: 4231 },
  { id: "HL-004", name: "Ambulance", number: "102", type: "National", state: "Central", category: "Medical", enabled: true, calls24h: 18432 },
  { id: "HL-005", name: "Single Emergency Number", number: "112", type: "National", state: "Central", category: "All Emergency", enabled: true, calls24h: 92341 },
  { id: "HL-006", name: "ODISHA SDMA", number: "0674-2534177", type: "State", state: "Odisha", category: "Disaster", enabled: true, calls24h: 3241 },
  { id: "HL-007", name: "Kerala SDMA", number: "0471-2364424", type: "State", state: "Kerala", category: "Disaster", enabled: true, calls24h: 2841 },
  { id: "HL-008", name: "Assam SDMA", number: "1800-345-3611", type: "State", state: "Assam", category: "Disaster", enabled: false, calls24h: 0 },
  { id: "HL-009", name: "Child Helpline", number: "1098", type: "National", state: "Central", category: "Child Safety", enabled: true, calls24h: 6712 },
  { id: "HL-010", name: "Women Helpline", number: "181", type: "National", state: "Central", category: "Women Safety", enabled: true, calls24h: 9234 },
  { id: "HL-011", name: "NDRF Control Room", number: "011-26701700", type: "National", state: "Central", category: "Disaster Response", enabled: true, calls24h: 1823 },
  { id: "HL-012", name: "Tamil Nadu SEOC", number: "044-28524485", type: "State", state: "Tamil Nadu", category: "Disaster", enabled: true, calls24h: 2134 },
];

const TYPE_COLOR = { National: "#4488FF", State: "#A78BFA", District: "#22D3EE" };

export default function HelplineManagement() {
  const [helplines, setHelplines] = useState<Helpline[]>(HELPLINES_INIT);
  const [filter, setFilter] = useState<string>("All");

  const toggle = (id: string) => setHelplines(hs => hs.map(h => h.id === id ? { ...h, enabled: !h.enabled } : h));

  const types = ["All", "National", "State", "District"];
  const filtered = filter === "All" ? helplines : helplines.filter(h => h.type === filter);

  const enabled = helplines.filter(h => h.enabled).length;
  const totalCalls = helplines.reduce((a, h) => a + h.calls24h, 0);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-3">
          {[
            { label: "Active Helplines", value: `${enabled}/${helplines.length}`, color: "#10B981" },
            { label: "Total Calls (24h)", value: totalCalls.toLocaleString(), color: "#4488FF" },
          ].map(s => (
            <div key={s.label} className="rounded-xl px-4 py-3 border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
              <div className="text-[10px] font-mono" style={{ color: "#3D5070" }}>{s.label}</div>
              <div className="text-xl font-semibold mt-0.5" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 p-1 rounded-lg" style={{ background: "#0D1525", border: "1px solid #1C2B45" }}>
            {types.map(t => (
              <button key={t} onClick={() => setFilter(t)} className="px-3 py-1 rounded text-xs font-mono transition-colors"
                style={{ background: filter === t ? "#172240" : "transparent", color: filter === t ? "#4488FF" : "#3D5070" }}>
                {t}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium" style={{ background: "#4488FF", color: "#fff" }}>
            <Plus size={13} /> Add Helpline
          </button>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid #1C2B45" }}>
              {["ID", "Name", "Number", "Type", "State/Region", "Category", "Calls (24h)", "Status", ""].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-mono uppercase tracking-wider" style={{ color: "#3D5070" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(h => (
              <tr key={h.id} className="border-b transition-colors hover:opacity-80" style={{ borderColor: "#1C2B45" }}>
                <td className="px-4 py-3 text-[10px] font-mono" style={{ color: "#3D5070" }}>{h.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0" style={{ background: `${TYPE_COLOR[h.type]}18` }}>
                      <Phone size={10} style={{ color: TYPE_COLOR[h.type] }} />
                    </div>
                    <span className="text-xs font-medium" style={{ color: "#E2EAF8" }}>{h.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm font-semibold font-mono" style={{ color: h.enabled ? "#10B981" : "#3D5070" }}>{h.number}</td>
                <td className="px-4 py-3">
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: `${TYPE_COLOR[h.type]}15`, color: TYPE_COLOR[h.type] }}>{h.type}</span>
                </td>
                <td className="px-4 py-3 text-xs" style={{ color: "#7B8DB5" }}>{h.state}</td>
                <td className="px-4 py-3 text-xs" style={{ color: "#7B8DB5" }}>{h.category}</td>
                <td className="px-4 py-3 text-xs font-mono text-right" style={{ color: h.enabled ? "#E2EAF8" : "#3D5070" }}>
                  {h.enabled ? h.calls24h.toLocaleString() : "—"}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggle(h.id)}
                    className="relative w-9 h-5 rounded-full transition-colors flex-shrink-0"
                    style={{ background: h.enabled ? "#10B981" : "#1C2B45" }}
                  >
                    <span className="absolute top-0.5 transition-all rounded-full w-4 h-4" style={{ background: "#fff", left: h.enabled ? "calc(100% - 18px)" : "2px" }} />
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button style={{ color: "#3D5070" }}><Edit2 size={12} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
