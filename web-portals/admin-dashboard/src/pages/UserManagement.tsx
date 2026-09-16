import { useState } from "react";
import { Search, Filter, CheckCircle, Ban, AlertOctagon, RefreshCw, ChevronDown } from "lucide-react";

type Tab = "citizens" | "responders" | "government" | "admins";

const CITIZENS = [
  { id: "CIT-10291", name: "Priya Nair", phone: "+91 94471 23456", district: "Kochi, Kerala", registered: "12 Jan 2025", status: "Active", reports: 3, fakeCount: 1 },
  { id: "CIT-10289", name: "Rahul Mehta", phone: "+91 98201 87654", district: "Ahmedabad, Gujarat", registered: "8 Feb 2025", status: "Active", reports: 12, fakeCount: 0 },
  { id: "CIT-10284", name: "Sunita Devi", phone: "+91 70011 33221", district: "Patna, Bihar", registered: "21 Mar 2025", status: "Suspended", reports: 7, fakeCount: 3 },
  { id: "CIT-10271", name: "Arjun Sharma", phone: "+91 91234 56789", district: "Jaipur, Rajasthan", registered: "5 Apr 2025", status: "Active", reports: 2, fakeCount: 0 },
  { id: "CIT-10268", name: "Fatima Begum", phone: "+91 82345 67890", district: "Hyderabad, TS", registered: "18 Apr 2025", status: "Active", reports: 5, fakeCount: 1 },
  { id: "CIT-10251", name: "Vikram Patel", phone: "+91 93456 78901", district: "Surat, Gujarat", registered: "2 May 2025", status: "Banned", reports: 15, fakeCount: 7 },
  { id: "CIT-10244", name: "Deepa Krishnan", phone: "+91 84567 89012", district: "Chennai, TN", registered: "14 May 2025", status: "Active", reports: 1, fakeCount: 0 },
];

const RESPONDERS = [
  { id: "RSP-2041", name: "Cdr. Anupam Mishra", org: "NDRF Battalion 9", district: "Lucknow, UP", status: "Approved", incidents: 34, rating: 4.8 },
  { id: "RSP-2039", name: "Dr. Kavita Rao", org: "State Medical Force", district: "Bengaluru, KA", status: "Approved", incidents: 21, rating: 4.6 },
  { id: "RSP-2038", name: "Insp. Rajan Thakur", org: "SDRF Himachal", district: "Shimla, HP", status: "Pending", incidents: 0, rating: 0 },
  { id: "RSP-2036", name: "Sgt. Mohan Yadav", org: "Civil Defence", district: "Varanasi, UP", status: "Approved", incidents: 18, rating: 4.2 },
  { id: "RSP-2034", name: "Lt. Pooja Bisht", org: "ITBP Unit 4", district: "Dehradun, UK", status: "Suspended", incidents: 7, rating: 3.1 },
];

const GOVTUSERS = [
  { id: "GOV-881", name: "Sec. Ramesh Gupta", dept: "MHA - Emergency Cell", role: "Read-only", state: "Central", status: "Active" },
  { id: "GOV-879", name: "DM Lakshmi Iyer", dept: "District Collectorate", role: "District Admin", state: "Tamil Nadu", status: "Active" },
  { id: "GOV-874", name: "Commr. Dev Singh", dept: "State DMA", role: "State Admin", state: "Uttarakhand", status: "Active" },
  { id: "GOV-870", name: "ADM Prabhavati", dept: "Revenue Division", role: "Read-only", state: "Odisha", status: "Suspended" },
];

const STATUS_COLOR: Record<string, string> = {
  Active: "#10B981", Approved: "#10B981", Pending: "#F59E0B",
  Suspended: "#F59E0B", Banned: "#EF4444", "Read-only": "#7B8DB5",
  "District Admin": "#4488FF", "State Admin": "#A78BFA",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: `${STATUS_COLOR[status] ?? "#7B8DB5"}18`, color: STATUS_COLOR[status] ?? "#7B8DB5" }}>
      {status}
    </span>
  );
}

function ActionMenu({ onAction }: { onAction: (a: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(p => !p)} className="text-[10px] font-mono px-2 py-1 rounded flex items-center gap-1" style={{ background: "#172240", color: "#4488FF" }}>
        Actions <ChevronDown size={10} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 z-20 rounded-lg overflow-hidden" style={{ background: "#0D1525", border: "1px solid #1C2B45", minWidth: 140 }}>
          {[
            { label: "Approve", icon: CheckCircle, color: "#10B981" },
            { label: "Suspend", icon: AlertOctagon, color: "#F59E0B" },
            { label: "Ban", icon: Ban, color: "#EF4444" },
            { label: "Reset Access", icon: RefreshCw, color: "#7B8DB5" },
          ].map(a => (
            <button
              key={a.label}
              onClick={() => { onAction(a.label); setOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors hover:opacity-80"
              style={{ color: a.color }}
            >
              <a.icon size={11} /> {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function UserManagement() {
  const [tab, setTab] = useState<Tab>("citizens");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const TABS: { id: Tab; label: string; count: number }[] = [
    { id: "citizens", label: "Citizens", count: 284917 },
    { id: "responders", label: "Responders", count: 12348 },
    { id: "government", label: "Government", count: 1847 },
    { id: "admins", label: "Admins", count: 12 },
  ];

  return (
    <div className="p-6">
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2 rounded-lg text-sm" style={{ background: "#10B981", color: "#fff" }}>
          {toast}
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b pb-0" style={{ borderColor: "#1C2B45" }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="px-4 py-3 text-sm font-medium relative transition-colors"
            style={{
              color: tab === t.id ? "#4488FF" : "#7B8DB5",
              borderBottom: tab === t.id ? "2px solid #4488FF" : "2px solid transparent",
            }}
          >
            {t.label}
            <span className="ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: "#111E34", color: tab === t.id ? "#4488FF" : "#3D5070" }}>
              {t.count.toLocaleString()}
            </span>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1 max-w-sm" style={{ background: "#0D1525", border: "1px solid #1C2B45" }}>
          <Search size={13} style={{ color: "#3D5070" }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, ID, or district…"
            className="bg-transparent text-xs outline-none flex-1"
            style={{ color: "#E2EAF8" }}
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: "#0D1525", border: "1px solid #1C2B45", color: "#7B8DB5" }}>
          <Filter size={12} /> Filter
        </button>
      </div>

      {/* Citizens table */}
      {tab === "citizens" && (
        <div className="rounded-xl overflow-hidden border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #1C2B45" }}>
                {["Citizen ID", "Name", "Phone", "District", "Registered", "Reports", "Fake Count", "Status", ""].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-mono uppercase tracking-wider" style={{ color: "#3D5070" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CITIZENS.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.id.includes(search)).map(c => (
                <tr key={c.id} className="border-b transition-colors hover:opacity-80" style={{ borderColor: "#1C2B45" }}>
                  <td className="px-4 py-3 text-xs font-mono" style={{ color: "#4488FF" }}>{c.id}</td>
                  <td className="px-4 py-3 text-xs font-medium" style={{ color: "#E2EAF8" }}>{c.name}</td>
                  <td className="px-4 py-3 text-xs font-mono" style={{ color: "#7B8DB5" }}>{c.phone}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#7B8DB5" }}>{c.district}</td>
                  <td className="px-4 py-3 text-[10px] font-mono" style={{ color: "#3D5070" }}>{c.registered}</td>
                  <td className="px-4 py-3 text-xs font-mono text-center" style={{ color: "#E2EAF8" }}>{c.reports}</td>
                  <td className="px-4 py-3 text-xs font-mono text-center" style={{ color: c.fakeCount > 2 ? "#EF4444" : c.fakeCount > 0 ? "#F59E0B" : "#3D5070" }}>{c.fakeCount}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3"><ActionMenu onAction={a => showToast(`${a} applied to ${c.name}`)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Responders table */}
      {tab === "responders" && (
        <div className="rounded-xl overflow-hidden border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #1C2B45" }}>
                {["Responder ID", "Name", "Organisation", "District", "Incidents", "Rating", "Status", ""].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-mono uppercase tracking-wider" style={{ color: "#3D5070" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RESPONDERS.map(r => (
                <tr key={r.id} className="border-b transition-colors hover:opacity-80" style={{ borderColor: "#1C2B45" }}>
                  <td className="px-4 py-3 text-xs font-mono" style={{ color: "#22D3EE" }}>{r.id}</td>
                  <td className="px-4 py-3 text-xs font-medium" style={{ color: "#E2EAF8" }}>{r.name}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#7B8DB5" }}>{r.org}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#7B8DB5" }}>{r.district}</td>
                  <td className="px-4 py-3 text-xs font-mono text-center" style={{ color: "#E2EAF8" }}>{r.incidents}</td>
                  <td className="px-4 py-3 text-xs font-mono" style={{ color: r.rating >= 4.5 ? "#10B981" : r.rating >= 3.5 ? "#F59E0B" : "#EF4444" }}>
                    {r.rating > 0 ? `★ ${r.rating}` : "—"}
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-4 py-3"><ActionMenu onAction={a => showToast(`${a} applied to ${r.name}`)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Government table */}
      {tab === "government" && (
        <div className="rounded-xl overflow-hidden border" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #1C2B45" }}>
                {["User ID", "Name", "Department", "Role", "State", "Status", ""].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-mono uppercase tracking-wider" style={{ color: "#3D5070" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GOVTUSERS.map(g => (
                <tr key={g.id} className="border-b transition-colors hover:opacity-80" style={{ borderColor: "#1C2B45" }}>
                  <td className="px-4 py-3 text-xs font-mono" style={{ color: "#A78BFA" }}>{g.id}</td>
                  <td className="px-4 py-3 text-xs font-medium" style={{ color: "#E2EAF8" }}>{g.name}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#7B8DB5" }}>{g.dept}</td>
                  <td className="px-4 py-3"><StatusBadge status={g.role} /></td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#7B8DB5" }}>{g.state}</td>
                  <td className="px-4 py-3"><StatusBadge status={g.status} /></td>
                  <td className="px-4 py-3"><ActionMenu onAction={a => showToast(`${a} applied to ${g.name}`)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "admins" && (
        <div className="rounded-xl p-8 border text-center" style={{ background: "#0D1525", borderColor: "#1C2B45" }}>
          <div className="text-sm" style={{ color: "#7B8DB5" }}>12 admin accounts — managed via secure internal portal</div>
        </div>
      )}
    </div>
  );
}
