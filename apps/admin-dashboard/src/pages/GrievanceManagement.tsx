import { useState } from "react";
import { MessageSquare, Clock, User, Tag, ChevronRight, CheckCircle, X, AlertCircle } from "lucide-react";

type GrievanceStatus = "Open" | "In Progress" | "Resolved" | "Closed";
type Category = "Responder Misconduct" | "Wrong Shelter Info" | "Technical Issue" | "Fake Report Appeal" | "Other";

interface Grievance {
  id: string;
  citizenName: string;
  citizenId: string;
  category: Category;
  status: GrievanceStatus;
  priority: "High" | "Medium" | "Low";
  submitted: string;
  district: string;
  description: string;
  assignee: string | null;
  resolution: string;
}

const GRIEVANCES: Grievance[] = [
  {
    id: "GRV-1142", citizenName: "Meera Krishnan", citizenId: "CIT-11204",
    category: "Responder Misconduct", status: "Open", priority: "High",
    submitted: "2025-06-12 10:14", district: "Kochi, Kerala",
    description: "Responder RSP-2041 arrived 3 hours late despite confirming dispatch. My family was stranded during flooding. The responder was rude and refused to help neighbours.",
    assignee: null, resolution: "",
  },
  {
    id: "GRV-1139", citizenName: "Arjun Mehta", citizenId: "CIT-10892",
    category: "Fake Report Appeal", status: "In Progress", priority: "High",
    submitted: "2025-06-11 16:40", district: "Mumbai, MH",
    description: "My flood report was flagged as fake but I have video evidence. The AI system incorrectly flagged my report. My account was suspended unfairly.",
    assignee: "Dept. Reviewer A", resolution: "",
  },
  {
    id: "GRV-1136", citizenName: "Sundar Rajan", citizenId: "CIT-10451",
    category: "Wrong Shelter Info", status: "In Progress", priority: "Medium",
    submitted: "2025-06-11 09:22", district: "Chennai, TN",
    description: "Shelter SHL-224 listed as active with 200 capacity but when we arrived it was closed. Over 40 displaced families had to sleep outside.",
    assignee: "Shelter Admin B", resolution: "",
  },
  {
    id: "GRV-1133", citizenName: "Poonam Yadav", citizenId: "CIT-10344",
    category: "Technical Issue", status: "Open", priority: "Medium",
    submitted: "2025-06-10 20:11", district: "Patna, Bihar",
    description: "SOS button not working on my phone for 2 days. Keep getting network error. Could not send SOS during flood emergency.",
    assignee: null, resolution: "",
  },
  {
    id: "GRV-1128", citizenName: "Devika Iyer", citizenId: "CIT-10211",
    category: "Other", status: "Resolved", priority: "Low",
    submitted: "2025-06-09 14:30", district: "Bengaluru, KA",
    description: "Need translation support for my elderly mother who only speaks Tamil.",
    assignee: "Support Team", resolution: "Added Tamil language support. User notified via SMS.",
  },
];

const STATUS_COLOR: Record<GrievanceStatus, string> = {
  Open: "#EF4444", "In Progress": "#F59E0B", Resolved: "#10B981", Closed: "#3D5070",
};

const PRIORITY_COLOR = { High: "#EF4444", Medium: "#F59E0B", Low: "#10B981" };

const CAT_ICON: Record<Category, React.ElementType> = {
  "Responder Misconduct": AlertCircle,
  "Wrong Shelter Info": Tag,
  "Technical Issue": AlertCircle,
  "Fake Report Appeal": MessageSquare,
  Other: MessageSquare,
};

const ASSIGNEES = ["Dept. Reviewer A", "Shelter Admin B", "Support Team", "Tech Support C", "Legal Team D"];

export default function GrievanceManagement() {
  const [grievances, setGrievances] = useState<Grievance[]>(GRIEVANCES);
  const [selected, setSelected] = useState<Grievance>(GRIEVANCES[0]);
  const [note, setNote] = useState("");
  const [assignee, setAssignee] = useState(selected.assignee ?? "");
  const [filterCat, setFilterCat] = useState<string>("All");

  const update = (id: string, patch: Partial<Grievance>) => {
    setGrievances(gs => gs.map(g => g.id === id ? { ...g, ...patch } : g));
    if (selected.id === id) setSelected(g => ({ ...g, ...patch }));
  };

  const resolve = () => {
    if (!note) return;
    update(selected.id, { status: "Resolved", resolution: note, assignee: assignee || selected.assignee });
    setNote("");
  };

  const cats = ["All", ...Array.from(new Set(GRIEVANCES.map(g => g.category)))];
  const filtered = filterCat === "All" ? grievances : grievances.filter(g => g.category === filterCat);

  return (
    <div className="flex h-full">
      {/* List */}
      <div className="flex-shrink-0 border-r overflow-y-auto" style={{ width: 320, background: "#0B0F1A", borderColor: "#1C2B45" }}>
        <div className="px-4 py-3 border-b sticky top-0 z-10" style={{ background: "#0B0F1A", borderColor: "#1C2B45" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold" style={{ color: "#E2EAF8" }}>Grievances</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: "#3A1010", color: "#EF4444" }}>
              {grievances.filter(g => g.status === "Open").length} OPEN
            </span>
          </div>
          <select
            value={filterCat}
            onChange={e => setFilterCat(e.target.value)}
            className="w-full text-xs rounded-lg px-2 py-1.5 outline-none"
            style={{ background: "#0D1525", border: "1px solid #1C2B45", color: "#7B8DB5" }}
          >
            {cats.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="p-3 space-y-2">
          {filtered.map(g => {
            const Icon = CAT_ICON[g.category];
            return (
              <button
                key={g.id}
                onClick={() => { setSelected(g); setNote(""); setAssignee(g.assignee ?? ""); }}
                className="w-full rounded-lg p-3 text-left transition-all"
                style={{
                  background: selected.id === g.id ? "#172240" : "#0D1525",
                  border: selected.id === g.id ? "1px solid #4488FF" : "1px solid #1C2B45",
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono" style={{ color: "#4488FF" }}>{g.id}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: `${STATUS_COLOR[g.status]}15`, color: STATUS_COLOR[g.status] }}>
                    {g.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs font-medium mb-0.5" style={{ color: "#E2EAF8" }}>{g.citizenName}</div>
                <div className="flex items-center gap-1 text-[10px]" style={{ color: "#7B8DB5" }}>
                  <Icon size={9} /> {g.category}
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[9px] font-mono" style={{ color: "#3D5070" }}>{g.district}</span>
                  <span className="text-[9px] font-mono" style={{ color: PRIORITY_COLOR[g.priority] }}>{g.priority}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail */}
      <div className="flex-1 overflow-y-auto p-6" style={{ background: "#07090F" }}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-lg font-semibold font-mono" style={{ color: "#4488FF" }}>{selected.id}</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${STATUS_COLOR[selected.status]}15`, color: STATUS_COLOR[selected.status] }}>
                {selected.status.toUpperCase()}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${PRIORITY_COLOR[selected.priority]}15`, color: PRIORITY_COLOR[selected.priority] }}>
                {selected.priority.toUpperCase()} PRIORITY
              </span>
            </div>
            <div className="text-xs" style={{ color: "#7B8DB5" }}>{selected.category} · {selected.district} · Submitted {selected.submitted}</div>
          </div>
        </div>

        <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {/* Citizen */}
          <div className="rounded-xl p-4 border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
            <div className="text-[10px] font-mono uppercase tracking-wider mb-3" style={{ color: "#3D5070" }}>Citizen</div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm" style={{ background: "#172240", color: "#4488FF" }}>
                {selected.citizenName.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: "#E2EAF8" }}>{selected.citizenName}</div>
                <div className="text-[10px] font-mono" style={{ color: "#3D5070" }}>{selected.citizenId}</div>
              </div>
            </div>
          </div>

          {/* Assign */}
          <div className="rounded-xl p-4 border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
            <div className="text-[10px] font-mono uppercase tracking-wider mb-3" style={{ color: "#3D5070" }}>Assignment</div>
            <select
              value={assignee}
              onChange={e => { setAssignee(e.target.value); update(selected.id, { assignee: e.target.value }); }}
              className="w-full text-xs rounded-lg px-3 py-2 outline-none mb-2"
              style={{ background: "#111E34", border: "1px solid #1C2B45", color: "#E2EAF8" }}
            >
              <option value="">— Unassigned —</option>
              {ASSIGNEES.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            <div className="flex gap-2">
              {(["Open", "In Progress", "Closed"] as GrievanceStatus[]).map(s => (
                <button
                  key={s}
                  onClick={() => update(selected.id, { status: s })}
                  className="flex-1 py-1 rounded text-[10px] font-mono transition-colors"
                  style={{
                    background: selected.status === s ? `${STATUS_COLOR[s]}20` : "#111E34",
                    border: `1px solid ${selected.status === s ? STATUS_COLOR[s] : "#1C2B45"}`,
                    color: selected.status === s ? STATUS_COLOR[s] : "#3D5070",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4 rounded-xl p-4 border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
          <div className="text-[10px] font-mono uppercase tracking-wider mb-3" style={{ color: "#3D5070" }}>Complaint Description</div>
          <p className="text-sm leading-relaxed" style={{ color: "#E2EAF8" }}>{selected.description}</p>
        </div>

        {/* Resolution */}
        {selected.status === "Resolved" || selected.resolution ? (
          <div className="mt-4 rounded-xl p-4 border" style={{ background: "#0A1A0E", borderColor: "#10B98140" }}>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={14} style={{ color: "#10B981" }} />
              <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "#10B981" }}>Resolution Notes</div>
            </div>
            <p className="text-sm" style={{ color: "#E2EAF8" }}>{selected.resolution}</p>
            {selected.assignee && <div className="text-[10px] font-mono mt-2" style={{ color: "#3D5070" }}>Resolved by {selected.assignee}</div>}
          </div>
        ) : (
          <div className="mt-4 rounded-xl p-4 border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
            <div className="text-[10px] font-mono uppercase tracking-wider mb-3" style={{ color: "#3D5070" }}>Add Resolution Notes</div>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={4}
              placeholder="Enter resolution details, action taken, and outcome…"
              className="w-full rounded-lg p-3 text-xs outline-none resize-none mb-3"
              style={{ background: "#111E34", border: "1px solid #1C2B45", color: "#E2EAF8" }}
            />
            <button
              onClick={resolve}
              disabled={!note}
              className="px-6 py-2 rounded-lg text-xs font-semibold transition-opacity"
              style={{ background: note ? "#10B981" : "#111E34", color: note ? "#fff" : "#3D5070", opacity: note ? 1 : 0.5 }}
            >
              <CheckCircle size={12} className="inline mr-2" />
              Mark as Resolved
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
