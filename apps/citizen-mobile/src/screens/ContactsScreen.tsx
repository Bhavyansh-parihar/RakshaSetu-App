import { useState } from "react";

const contacts = [
  { name: "Rahul Sharma", rel: "Father", phone: "+91 98765 00001", primary: true },
  { name: "Priya Sharma", rel: "Mother", phone: "+91 98765 00002", primary: false },
  { name: "Ankit Kumar", rel: "Friend", phone: "+91 98765 00003", primary: false },
];

const rels = ["Father", "Mother", "Sibling", "Friend", "Spouse", "Other"];

export default function ContactsScreen({ onBack }: { onBack: () => void }) {
  const [adding, setAdding] = useState(false);

  return (
    <div className="absolute inset-0 bg-slate-50 flex flex-col" style={{ paddingTop: 48 }}>
      <div className="bg-white flex items-center gap-3 px-5 py-4 border-b border-slate-100">
        <button onClick={onBack} className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-slate-900 text-lg">Emergency Contacts</h1>
          <p className="text-xs text-slate-400">{contacts.length}/3 contacts added</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 flex flex-col gap-3" style={{ paddingBottom: 100 }}>
        {contacts.map((c, i) => (
          <div key={i} className={`bg-white rounded-2xl border-2 p-4 ${c.primary ? "border-blue-300" : "border-slate-200"}`}>
            {c.primary && (
              <div className="flex items-center gap-1 mb-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">Primary Contact</p>
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${c.primary ? "bg-blue-100" : "bg-slate-100"}`}>
                👤
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900">{c.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-full">{c.rel}</span>
                  <span className="text-xs text-slate-400">{c.phone}</span>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#16a34a">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                  </svg>
                </button>
                <button className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add contact form */}
        {adding ? (
          <div className="bg-white rounded-2xl border-2 border-blue-300 p-4">
            <p className="text-sm font-bold text-slate-700 mb-3">Add Emergency Contact</p>
            <div className="flex flex-col gap-3">
              <input placeholder="Full Name" className="border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500" />
              <input placeholder="Phone Number" type="tel" className="border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500" />
              <select className="border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 bg-white">
                <option>Select Relationship</option>
                {rels.map((r) => <option key={r}>{r}</option>)}
              </select>
              <div className="flex gap-2">
                <button onClick={() => setAdding(false)} className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-500">Cancel</button>
                <button onClick={() => setAdding(false)} className="flex-1 py-3 rounded-xl bg-blue-600 text-sm font-semibold text-white">Save Contact</button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="flex items-center justify-center gap-2 py-4 border-2 border-dashed border-blue-300 rounded-2xl text-blue-600 font-semibold text-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Emergency Contact
          </button>
        )}
      </div>
    </div>
  );
}
