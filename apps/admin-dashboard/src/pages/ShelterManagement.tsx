import { useState } from "react";
import { Plus, Edit2, MapPin, Users, CheckCircle, X, Eye } from "lucide-react";

interface Shelter {
  id: string;
  name: string;
  location: string;
  district: string;
  capacity: number;
  occupancy: number;
  status: "Active" | "Full" | "Closed" | "Maintenance";
  facilities: string[];
  contact: string;
  lastUpdated: string;
}

const SHELTERS: Shelter[] = [
  { id: "SHL-201", name: "Rajiv Gandhi Community Centre", location: "12.9716° N, 77.5946° E", district: "Bengaluru South", capacity: 450, occupancy: 312, status: "Active", facilities: ["Water", "Power", "Medical", "Toilets", "Food"], contact: "+91 80 2234 5678", lastUpdated: "2025-06-12 10:00" },
  { id: "SHL-202", name: "Puri Beach Relief Camp", location: "19.8135° N, 85.8312° E", district: "Puri, Odisha", capacity: 800, occupancy: 801, status: "Full", facilities: ["Water", "Power", "Medical", "Food"], contact: "+91 6752 234567", lastUpdated: "2025-06-12 08:30" },
  { id: "SHL-203", name: "District Sports Complex Shelter", location: "25.5941° N, 85.1376° E", district: "Patna, Bihar", capacity: 600, occupancy: 89, status: "Active", facilities: ["Water", "Power", "Toilets"], contact: "+91 612 223 4567", lastUpdated: "2025-06-11 22:10" },
  { id: "SHL-204", name: "Chennai Corporation Hall", location: "13.0827° N, 80.2707° E", district: "Chennai, TN", capacity: 350, occupancy: 0, status: "Closed", facilities: ["Water", "Toilets"], contact: "+91 44 2534 5678", lastUpdated: "2025-06-10 16:00" },
  { id: "SHL-205", name: "YMCA Cyclone Shelter", location: "17.6868° N, 83.2185° E", district: "Visakhapatnam, AP", capacity: 1000, occupancy: 445, status: "Active", facilities: ["Water", "Power", "Medical", "Toilets", "Food", "Internet"], contact: "+91 891 234 5678", lastUpdated: "2025-06-12 12:45" },
];

const STATUS_COLOR = { Active: "#10B981", Full: "#EF4444", Closed: "#3D5070", Maintenance: "#F59E0B" };
const ALL_FACILITIES = ["Water", "Power", "Medical", "Toilets", "Food", "Internet", "Heating", "Blankets"];

function OccBar({ occ, cap }: { occ: number; cap: number }) {
  const pct = Math.min(100, Math.round((occ / cap) * 100));
  const color = pct >= 90 ? "#EF4444" : pct >= 70 ? "#F59E0B" : "#10B981";
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-[10px] font-mono" style={{ color: "#3D5070" }}>{occ}/{cap}</span>
        <span className="text-[10px] font-mono" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1C2B45" }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export default function ShelterManagement() {
  const [shelters, setShelters] = useState<Shelter[]>(SHELTERS);
  const [editTarget, setEditTarget] = useState<Shelter | null>(null);
  const [preview, setPreview] = useState<Shelter | null>(null);
  const [editForm, setEditForm] = useState<Partial<Shelter>>({});

  const openEdit = (s: Shelter) => { setEditTarget(s); setEditForm({ ...s }); };
  const saveEdit = () => {
    if (!editTarget) return;
    setShelters(ss => ss.map(s => s.id === editTarget.id ? { ...s, ...editForm, lastUpdated: new Date().toISOString().slice(0, 16).replace("T", " ") } : s));
    setEditTarget(null);
  };

  const toggleFacility = (f: string) => {
    const current = editForm.facilities ?? [];
    setEditForm({ ...editForm, facilities: current.includes(f) ? current.filter(x => x !== f) : [...current, f] });
  };

  const STATUS_OPTIONS = ["Active", "Full", "Closed", "Maintenance"] as const;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-sm font-semibold mb-0.5" style={{ color: "#E2EAF8" }}>Shelter Network</div>
          <div className="text-[10px] font-mono" style={{ color: "#3D5070" }}>
            {shelters.filter(s => s.status === "Active").length} Active · {shelters.reduce((a, s) => a + s.capacity, 0).toLocaleString()} total capacity
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium" style={{ background: "#4488FF", color: "#fff" }}>
          <Plus size={13} /> Add Shelter
        </button>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
        {shelters.map(s => (
          <div key={s.id} className="rounded-xl p-4 border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-mono" style={{ color: "#4488FF" }}>{s.id}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: `${STATUS_COLOR[s.status]}15`, color: STATUS_COLOR[s.status] }}>
                    {s.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-sm font-semibold" style={{ color: "#E2EAF8" }}>{s.name}</div>
                <div className="flex items-center gap-1 text-[10px] mt-0.5" style={{ color: "#7B8DB5" }}>
                  <MapPin size={9} /> {s.district}
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setPreview(s)} className="p-1.5 rounded" style={{ color: "#7B8DB5" }}><Eye size={13} /></button>
                <button onClick={() => openEdit(s)} className="p-1.5 rounded" style={{ color: "#4488FF" }}><Edit2 size={13} /></button>
              </div>
            </div>
            <OccBar occ={s.occupancy} cap={s.capacity} />
            <div className="flex flex-wrap gap-1 mt-3">
              {s.facilities.map(f => (
                <span key={f} className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: "#172240", color: "#4488FF" }}>{f}</span>
              ))}
            </div>
            <div className="text-[9px] font-mono mt-2" style={{ color: "#3D5070" }}>Updated {s.lastUpdated}</div>
          </div>
        ))}
      </div>

      {/* Edit modal */}
      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "#000000CC" }}>
          <div className="rounded-2xl p-6 w-[480px] max-h-[80vh] overflow-y-auto" style={{ background: "#0D1525", border: "1px solid #1C2B45" }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-sm font-semibold" style={{ color: "#E2EAF8" }}>Edit Shelter</div>
                <div className="text-[10px] font-mono" style={{ color: "#3D5070" }}>{editTarget.id}</div>
              </div>
              <button onClick={() => setEditTarget(null)} style={{ color: "#3D5070" }}><X size={14} /></button>
            </div>

            <div className="space-y-3">
              {[
                { label: "Name", key: "name" as const, type: "text" },
                { label: "Capacity", key: "capacity" as const, type: "number" },
                { label: "Current Occupancy", key: "occupancy" as const, type: "number" },
                { label: "Contact", key: "contact" as const, type: "text" },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-[10px] font-mono mb-1 block" style={{ color: "#3D5070" }}>{f.label.toUpperCase()}</label>
                  <input
                    type={f.type}
                    value={(editForm[f.key] ?? "") as string}
                    onChange={e => setEditForm({ ...editForm, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value })}
                    className="w-full rounded-lg px-3 py-2 text-xs outline-none"
                    style={{ background: "#111E34", border: "1px solid #1C2B45", color: "#E2EAF8" }}
                  />
                </div>
              ))}

              <div>
                <label className="text-[10px] font-mono mb-2 block" style={{ color: "#3D5070" }}>STATUS</label>
                <div className="flex gap-2">
                  {STATUS_OPTIONS.map(st => (
                    <button key={st} onClick={() => setEditForm({ ...editForm, status: st })}
                      className="flex-1 py-1.5 rounded-lg text-[10px] font-mono transition-colors"
                      style={{ background: editForm.status === st ? `${STATUS_COLOR[st]}20` : "#111E34", border: `1px solid ${editForm.status === st ? STATUS_COLOR[st] : "#1C2B45"}`, color: editForm.status === st ? STATUS_COLOR[st] : "#3D5070" }}>
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono mb-2 block" style={{ color: "#3D5070" }}>FACILITIES</label>
                <div className="flex flex-wrap gap-2">
                  {ALL_FACILITIES.map(f => {
                    const on = (editForm.facilities ?? []).includes(f);
                    return (
                      <button key={f} onClick={() => toggleFacility(f)}
                        className="text-[10px] px-2.5 py-1 rounded-full font-mono transition-colors"
                        style={{ background: on ? "#172240" : "#111E34", border: `1px solid ${on ? "#4488FF" : "#1C2B45"}`, color: on ? "#4488FF" : "#3D5070" }}>
                        {on && <CheckCircle size={8} className="inline mr-1" />}{f}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-5">
              <button onClick={() => setEditTarget(null)} className="flex-1 py-2 rounded-lg text-xs" style={{ background: "#111E34", color: "#7B8DB5", border: "1px solid #1C2B45" }}>Cancel</button>
              <button onClick={saveEdit} className="flex-1 py-2 rounded-lg text-xs font-semibold" style={{ background: "#4488FF", color: "#fff" }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Citizen preview modal */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "#000000CC" }}>
          <div className="rounded-2xl overflow-hidden" style={{ width: 360, border: "1px solid #1C2B45" }}>
            <div className="px-4 py-3 flex items-center gap-2" style={{ background: "#1A2540" }}>
              <div className="w-2 h-2 rounded-full" style={{ background: "#EF4444" }} />
              <div className="w-2 h-2 rounded-full" style={{ background: "#F59E0B" }} />
              <div className="w-2 h-2 rounded-full" style={{ background: "#10B981" }} />
              <span className="text-[10px] font-mono ml-2" style={{ color: "#3D5070" }}>Citizen App Preview — Shelter Detail</span>
              <button onClick={() => setPreview(null)} className="ml-auto" style={{ color: "#3D5070" }}><X size={12} /></button>
            </div>
            <div className="p-5" style={{ background: "#0F1523" }}>
              <div className="text-center mb-4">
                <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-2" style={{ background: `${STATUS_COLOR[preview.status]}20` }}>
                  <Building2 size={24} style={{ color: STATUS_COLOR[preview.status] }} />
                </div>
                <div className="text-base font-semibold" style={{ color: "#E2EAF8" }}>{preview.name}</div>
                <div className="text-xs mt-0.5" style={{ color: "#7B8DB5" }}>{preview.district}</div>
              </div>
              <div className="rounded-xl p-3 mb-3" style={{ background: "#172240" }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs" style={{ color: "#7B8DB5" }}>Occupancy</span>
                  <span className="text-xs font-semibold" style={{ color: preview.occupancy >= preview.capacity ? "#EF4444" : "#10B981" }}>{preview.occupancy}/{preview.capacity}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "#1C2B45" }}>
                  <div className="h-full rounded-full" style={{ width: `${Math.min(100, (preview.occupancy / preview.capacity) * 100)}%`, background: preview.occupancy >= preview.capacity ? "#EF4444" : "#10B981" }} />
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {preview.facilities.map(f => (
                  <span key={f} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "#172240", color: "#4488FF" }}>{f}</span>
                ))}
              </div>
              <button className="w-full py-2.5 rounded-xl text-sm font-semibold" style={{ background: preview.status === "Active" ? "#4488FF" : "#3D5070", color: "#fff" }}>
                {preview.status === "Active" ? "Navigate Here" : "Shelter Unavailable"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Building2({ size, style }: { size: number; style: React.CSSProperties }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" /></svg>;
}
