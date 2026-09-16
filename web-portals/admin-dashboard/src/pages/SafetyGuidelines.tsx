import { useState } from "react";
import { Plus, Edit2, Eye, Save, Globe } from "lucide-react";

interface Guideline {
  id: string;
  title: string;
  titleHi: string;
  category: string;
  content: string;
  contentHi: string;
  published: boolean;
  lastUpdated: string;
}

const GUIDELINES_INIT: Guideline[] = [
  {
    id: "GDL-001", title: "What to do during a Flood", titleHi: "बाढ़ के दौरान क्या करें",
    category: "Flood", published: true, lastUpdated: "2025-06-10",
    content: "Move to higher ground immediately. Do not walk, swim or drive through flood waters. Stay off bridges over fast-moving water. Evacuate if told to do so. Disconnect utilities if instructed.",
    contentHi: "तुरंत ऊँची जमीन पर जाएँ। बाढ़ के पानी में चलें, तैरें या गाड़ी न चलाएँ। तेज बहते पानी के ऊपर पुलों से दूर रहें। यदि कहा जाए तो खाली करें।",
  },
  {
    id: "GDL-002", title: "Earthquake Safety Protocol", titleHi: "भूकंप सुरक्षा प्रोटोकॉल",
    category: "Earthquake", published: true, lastUpdated: "2025-06-08",
    content: "Drop, Cover, and Hold On. Move away from windows. If outdoors, find a clear spot. Do not use elevators. After shaking stops, check for injuries and hazards.",
    contentHi: "नीचे झुकें, ढकें और पकड़े रहें। खिड़कियों से दूर जाएँ। यदि बाहर हैं, तो खुली जगह खोजें। लिफ्ट का उपयोग न करें।",
  },
  {
    id: "GDL-003", title: "Cyclone Preparedness", titleHi: "चक्रवात की तैयारी",
    category: "Cyclone", published: true, lastUpdated: "2025-06-05",
    content: "Secure loose objects. Stock emergency supplies for 72 hours. Know your evacuation route. Stay informed via official alerts. Board up windows if time permits.",
    contentHi: "ढीली वस्तुओं को सुरक्षित करें। 72 घंटों के लिए आपातकालीन आपूर्ति संग्रहीत करें। अपना निकासी मार्ग जानें।",
  },
  {
    id: "GDL-004", title: "Heat Wave Action Plan", titleHi: "लू से बचाव कार्य योजना",
    category: "Heatwave", published: false, lastUpdated: "2025-06-01",
    content: "Stay indoors during peak hours (11am–4pm). Drink ORS frequently. Wear loose, light-coloured cotton clothes. Never leave children or pets in cars.",
    contentHi: "चरम घंटों के दौरान घर के अंदर रहें। ओआरएस बार-बार पियें। हल्के रंग के ढीले कपास के कपड़े पहनें।",
  },
];

export default function SafetyGuidelines() {
  const [guidelines, setGuidelines] = useState<Guideline[]>(GUIDELINES_INIT);
  const [selected, setSelected] = useState<Guideline>(GUIDELINES_INIT[0]);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Guideline>(GUIDELINES_INIT[0]);
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [preview, setPreview] = useState(false);

  const select = (g: Guideline) => { setSelected(g); setDraft({ ...g }); setEditing(false); };
  const save = () => {
    setGuidelines(gs => gs.map(g => g.id === draft.id ? draft : g));
    setSelected(draft);
    setEditing(false);
  };

  const CAT_COLORS: Record<string, string> = {
    Flood: "#4488FF", Earthquake: "#A78BFA", Cyclone: "#22D3EE", Heatwave: "#FF6B35",
  };

  return (
    <div className="flex h-full">
      {/* List */}
      <div className="flex-shrink-0 border-r overflow-y-auto" style={{ width: 280, background: "#0B0F1A", borderColor: "#1C2B45" }}>
        <div className="px-4 py-3 border-b flex items-center justify-between sticky top-0 z-10" style={{ background: "#0B0F1A", borderColor: "#1C2B45" }}>
          <span className="text-xs font-semibold" style={{ color: "#E2EAF8" }}>Guidelines</span>
          <button className="flex items-center gap-1 text-[10px] px-2 py-1 rounded" style={{ background: "#172240", color: "#4488FF" }}>
            <Plus size={10} /> Add
          </button>
        </div>
        <div className="p-3 space-y-2">
          {guidelines.map(g => (
            <button
              key={g.id}
              onClick={() => select(g)}
              className="w-full rounded-lg p-3 text-left transition-all"
              style={{ background: selected.id === g.id ? "#172240" : "#0D1525", border: `1px solid ${selected.id === g.id ? "#4488FF" : "#1C2B45"}` }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: `${CAT_COLORS[g.category] ?? "#3D5070"}20`, color: CAT_COLORS[g.category] ?? "#3D5070" }}>{g.category}</span>
                <span className="text-[9px] font-mono ml-auto" style={{ color: g.published ? "#10B981" : "#3D5070" }}>{g.published ? "LIVE" : "DRAFT"}</span>
              </div>
              <div className="text-xs font-medium leading-tight" style={{ color: "#E2EAF8" }}>{g.title}</div>
              <div className="text-[9px] mt-1" style={{ color: "#7B8DB5" }}>{g.titleHi}</div>
              <div className="text-[9px] font-mono mt-1" style={{ color: "#3D5070" }}>Updated {g.lastUpdated}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-y-auto" style={{ background: "#07090F" }}>
        <div className="flex items-center gap-3 px-6 py-3 border-b sticky top-0 z-10" style={{ background: "#0B0F1A", borderColor: "#1C2B45" }}>
          <div className="flex gap-1 p-1 rounded-lg" style={{ background: "#0D1525", border: "1px solid #1C2B45" }}>
            <button onClick={() => setLang("en")} className="px-3 py-1 rounded text-xs font-mono transition-colors" style={{ background: lang === "en" ? "#172240" : "transparent", color: lang === "en" ? "#4488FF" : "#3D5070" }}>
              <Globe size={10} className="inline mr-1" />EN
            </button>
            <button onClick={() => setLang("hi")} className="px-3 py-1 rounded text-xs font-mono transition-colors" style={{ background: lang === "hi" ? "#172240" : "transparent", color: lang === "hi" ? "#4488FF" : "#3D5070" }}>
              HI
            </button>
          </div>
          <div className="ml-auto flex gap-2">
            <button onClick={() => setPreview(p => !p)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ background: "#0D1525", border: "1px solid #1C2B45", color: "#7B8DB5" }}>
              <Eye size={12} /> {preview ? "Edit" : "Preview"}
            </button>
            {!editing ? (
              <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ background: "#172240", color: "#4488FF" }}>
                <Edit2 size={12} /> Edit
              </button>
            ) : (
              <button onClick={save} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "#4488FF", color: "#fff" }}>
                <Save size={12} /> Save
              </button>
            )}
            <button
              onClick={() => { const g = { ...draft, published: !draft.published }; setDraft(g); setGuidelines(gs => gs.map(x => x.id === g.id ? g : x)); setSelected(g); }}
              className="px-3 py-1.5 rounded-lg text-xs font-mono transition-colors"
              style={{ background: selected.published ? "#0A1A0E" : "#172240", border: `1px solid ${selected.published ? "#10B981" : "#4488FF"}`, color: selected.published ? "#10B981" : "#4488FF" }}
            >
              {selected.published ? "✓ LIVE" : "PUBLISH"}
            </button>
          </div>
        </div>

        <div className={`p-6 ${preview ? "grid gap-4" : ""}`} style={preview ? { gridTemplateColumns: "1fr 340px" } : {}}>
          {/* Edit form */}
          <div className="space-y-4">
            <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <label className="text-[10px] font-mono mb-1 block" style={{ color: "#3D5070" }}>TITLE (EN)</label>
                {editing ? (
                  <input value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} className="w-full rounded-lg px-3 py-2 text-sm outline-none" style={{ background: "#0D1525", border: "1px solid #1C2B45", color: "#E2EAF8" }} />
                ) : (
                  <div className="text-sm font-medium" style={{ color: "#E2EAF8" }}>{selected.title}</div>
                )}
              </div>
              <div>
                <label className="text-[10px] font-mono mb-1 block" style={{ color: "#3D5070" }}>शीर्षक (HI)</label>
                {editing ? (
                  <input value={draft.titleHi} onChange={e => setDraft({ ...draft, titleHi: e.target.value })} className="w-full rounded-lg px-3 py-2 text-sm outline-none" style={{ background: "#0D1525", border: "1px solid #1C2B45", color: "#E2EAF8" }} />
                ) : (
                  <div className="text-sm" style={{ color: "#E2EAF8" }}>{selected.titleHi}</div>
                )}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono mb-1 block" style={{ color: "#3D5070" }}>
                CONTENT — {lang === "en" ? "ENGLISH" : "HINDI"}
              </label>
              {editing ? (
                <textarea
                  rows={8}
                  value={lang === "en" ? draft.content : draft.contentHi}
                  onChange={e => setDraft({ ...draft, [lang === "en" ? "content" : "contentHi"]: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                  style={{ background: "#0D1525", border: "1px solid #1C2B45", color: "#E2EAF8", lineHeight: 1.7 }}
                />
              ) : (
                <div className="rounded-xl px-4 py-3 text-sm leading-relaxed" style={{ background: "#0D1525", border: "1px solid #1C2B45", color: "#E2EAF8" }}>
                  {lang === "en" ? selected.content : selected.contentHi}
                </div>
              )}
            </div>
          </div>

          {/* Mobile preview */}
          {preview && (
            <div className="flex-shrink-0">
              <div className="text-[10px] font-mono mb-2 text-center" style={{ color: "#3D5070" }}>CITIZEN APP PREVIEW</div>
              <div className="mx-auto rounded-3xl overflow-hidden" style={{ width: 320, border: "8px solid #172240", background: "#0F1523" }}>
                <div className="px-4 py-2 text-center text-[9px] font-mono" style={{ background: "#172240", color: "#3D5070" }}>9:41 ●●●●</div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${CAT_COLORS[selected.category] ?? "#4488FF"}20` }}>
                      <span style={{ color: CAT_COLORS[selected.category] ?? "#4488FF", fontSize: 16 }}>⚠</span>
                    </div>
                    <span className="text-[9px] font-mono uppercase" style={{ color: CAT_COLORS[selected.category] ?? "#4488FF" }}>{selected.category} Safety</span>
                  </div>
                  <div className="text-sm font-semibold mb-1 leading-tight" style={{ color: "#E2EAF8" }}>
                    {lang === "en" ? selected.title : selected.titleHi}
                  </div>
                  <div className="text-[11px] leading-relaxed" style={{ color: "#7B8DB5" }}>
                    {lang === "en" ? selected.content : selected.contentHi}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 py-2 rounded-xl text-[11px] font-semibold" style={{ background: "#4488FF", color: "#fff" }}>Share</button>
                    <button className="flex-1 py-2 rounded-xl text-[11px]" style={{ background: "#172240", color: "#7B8DB5" }}>Save</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
