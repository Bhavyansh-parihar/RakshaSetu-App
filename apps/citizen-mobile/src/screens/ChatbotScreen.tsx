import { useState } from "react";

const suggestions = ["Flood Safety", "Earthquake Tips", "First Aid", "Nearby Shelter", "SOS Help", "Evacuation Routes"];

type Message = { from: "user" | "bot"; text: string };

const initialMessages: Message[] = [
  { from: "bot", text: "Hello Bhavyansh! I'm your RakshaSetu Survival Assistant, powered by Gemini. How can I help you stay safe today? 🛡️" },
];

const botResponses: Record<string, string> = {
  "Flood Safety": "During a flood: 1) Move to higher ground immediately. 2) Do not walk in moving water. 3) Avoid driving through flooded roads. 4) Listen to emergency broadcasts. 5) Turn off utilities at main switches if safe to do so. 🌊",
  "Earthquake Tips": "During an earthquake: DROP, COVER, HOLD ON. Get under a sturdy table or desk. Stay away from windows. After shaking stops, check for injuries and gas leaks. Do not use elevators. 🏔️",
  "First Aid": "Basic first aid: 1) Check for safety. 2) Call emergency services (112). 3) For bleeding — apply direct pressure. 4) For unconscious victims — check breathing. 5) Do not move injured persons unless there is immediate danger. 🚑",
  "Nearby Shelter": "The nearest open shelter is Seva Shelter at Andheri East — 1.2 km away, capacity 842/1200. I'm showing directions. Shall I send your location to a family member? 📍",
  "SOS Help": "To send SOS: Hold the red SOS button on the Home screen for 3 seconds. Your location and details will be shared with NDRF and local emergency services. Responders will be dispatched within minutes. 🆘",
  "Evacuation Routes": "Current recommended evacuation route from Andheri: Take Western Express Highway north towards Dahisar. Avoid Goregaon link road (flooded). Alternative: S.V. Road towards Malad. 🗺️",
};

export default function ChatbotScreen({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [listening, setListening] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { from: "user", text };
    const response = botResponses[text] || "I understand your concern. Please stay calm. For immediate emergency assistance, press the SOS button. Responders are on standby in your area.";
    setMessages((m) => [...m, userMsg, { from: "bot", text: response }]);
    setInput("");
  };

  return (
    <div className="absolute inset-0 bg-white flex flex-col" style={{ paddingTop: 48 }}>
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-5 py-3">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-xl shadow">🤖</div>
          <div className="flex-1">
            <p className="font-bold text-slate-900 text-sm">RakshaSetu Survival Assistant</p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <p className="text-xs text-green-600 font-medium">Online · Powered by Gemini</p>
            </div>
          </div>
          {/* Language toggle */}
          <div className="flex bg-slate-100 rounded-xl p-0.5">
            {["en", "hi"].map((l) => (
              <button key={l} onClick={() => setLang(l as "en" | "hi")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === l ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"}`}>
                {l === "en" ? "EN" : "हि"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.from === "user" ? "flex-row-reverse" : ""} animate-fade-in`}>
            {msg.from === "bot" && (
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-sm mt-auto">🤖</div>
            )}
            <div
              className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.from === "user"
                  ? "text-white rounded-tr-sm"
                  : "bg-slate-100 text-slate-800 rounded-tl-sm"
              }`}
              style={msg.from === "user" ? { background: "linear-gradient(135deg, #2563eb, #1d4ed8)" } : {}}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Suggestion chips */}
        {messages.length <= 2 && (
          <div>
            <p className="text-xs text-slate-400 font-medium mb-2 text-center">Quick questions</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-slate-100 px-4 py-3" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
        {listening && (
          <div className="flex items-center gap-2 px-4 py-2 mb-2 bg-red-50 rounded-xl border border-red-200">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <p className="text-xs text-red-600 font-medium flex-1">Listening...</p>
            <div className="flex items-end gap-0.5 h-4">
              {[1,2,3,4,5,6,7].map((i) => <div key={i} className="wave-bar w-1 bg-red-400 rounded-full" />)}
            </div>
          </div>
        )}
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center bg-slate-100 rounded-2xl px-4 py-2.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder={lang === "hi" ? "यहाँ टाइप करें..." : "Type a message..."}
              className="flex-1 bg-transparent text-sm text-slate-700 outline-none"
            />
          </div>
          <button
            onClick={() => setListening((v) => !v)}
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${listening ? "bg-red-500" : "bg-slate-200"}`}
          >
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" stroke={listening ? "white" : "#64748b"} strokeWidth="1.8" strokeLinecap="round">
              <rect x="5" y="1" width="6" height="10" rx="3"/>
              <path d="M1 9a7 7 0 0014 0M8 16v3M5 19h6"/>
            </svg>
          </button>
          <button
            onClick={() => send(input)}
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
