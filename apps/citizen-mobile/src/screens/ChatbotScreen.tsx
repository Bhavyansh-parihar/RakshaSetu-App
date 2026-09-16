import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../localization/LanguageContext";
import axios from "axios";

type Message = { from: "user" | "bot"; text: string };

export default function ChatbotScreen({ onBack }: { onBack: () => void }) {
  const { t } = useTranslation();
  const { currentLang, setLanguage } = useLanguage();

  const getSuggestions = () => t("chatbot.suggestions", { returnObjects: true }) as string[];
  const getInitialMsg = (): Message => ({ from: "bot", text: t("chatbot.initialMsg") });

  const [messages, setMessages] = useState<Message[]>([getInitialMsg()]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Setup Web Speech API recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = currentLang === "hi" ? "hi-IN" : "en-IN";

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join("");
      setInput(transcript);
    };

    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;
  }, [currentLang]);

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      alert(t("permissions.micRequired"));
      return;
    }
    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      recognition.lang = currentLang === "hi" ? "hi-IN" : "en-IN";
      recognition.start();
      setListening(true);
    }
  };

  const send = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { from: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "https://rakshasetu-app-8dvk.onrender.com";
      const res = await axios.post(`${API_URL}/chatbot/ask`, { message: text, language: currentLang });
      setMessages((m) => [...m, { from: "bot", text: res.data.reply }]);
    } catch {
      setMessages((m) => [...m, { from: "bot", text: t("chatbot.errorMsg") }]);
    } finally {
      setIsTyping(false);
    }
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
            <p className="font-bold text-slate-900 text-sm">{t("chatbot.title")}</p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <p className="text-xs text-green-600 font-medium">{t("chatbot.online")}</p>
            </div>
          </div>
          {/* Language toggle — drives global language */}
          <div className="flex bg-slate-100 rounded-xl p-0.5">
            {(["en", "hi"] as const).map((l) => (
              <button key={l} onClick={() => setLanguage(l)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentLang === l ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"}`}>
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

        {isTyping && (
          <div className="flex gap-2 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-sm mt-auto">🤖</div>
            <div className="bg-slate-100 text-slate-800 px-4 py-3 rounded-2xl rounded-tl-sm text-sm flex gap-1 items-center">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {/* Suggestion chips */}
        {messages.length <= 2 && (
          <div>
            <p className="text-xs text-slate-400 font-medium mb-2 text-center">{t("chatbot.quickQuestions")}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {getSuggestions().map((s) => (
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
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-slate-100 px-4 py-3" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
        {listening && (
          <div className="flex items-center gap-2 px-4 py-2 mb-2 bg-red-50 rounded-xl border border-red-200">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <p className="text-xs text-red-600 font-medium flex-1">{t("chatbot.listening")}</p>
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
              placeholder={t("chatbot.placeholder")}
              className="flex-1 bg-transparent text-sm text-slate-700 outline-none"
            />
          </div>
          <button
            onClick={toggleListening}
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
