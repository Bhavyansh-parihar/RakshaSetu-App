import { useState } from "react";

export default function LoginScreen({ onDone }: { onDone: (token?: string) => void }) {
  const [tab, setTab] = useState<"phone" | "email">("email");
  const [method, setMethod] = useState<"password" | "otp">("password");
  const [email, setEmail] = useState("test@test.com");
  const [phone, setPhone] = useState("9876543210");
  const [password, setPassword] = useState("test");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="absolute inset-0 bg-white flex flex-col">
      {/* Header gradient */}
      <div className="px-6 pt-16 pb-10" style={{ background: "linear-gradient(160deg, #1e3a8a 0%, #2563eb 100%)" }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <svg width="22" height="26" viewBox="0 0 22 26" fill="white">
              <path d="M11 1L2 5v7c0 5.75 3.9 11.13 9 12.7 5.1-1.57 9-6.95 9-12.7V5L11 1z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">RakshaSetu</h1>
            <p className="text-blue-200 text-xs">Citizen Login</p>
          </div>
        </div>
        <h2 className="text-white font-bold text-2xl">Welcome back</h2>
        <p className="text-blue-200 text-sm mt-1">Sign in to access your emergency portal</p>
      </div>

      <div className="flex-1 px-6 pt-6 flex flex-col">
        {/* Toggle: Phone / Email */}
        <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
          {["phone", "email"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as "phone" | "email")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === t ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}
            >
              {t === "phone" ? "📱 Phone" : "✉️ Email"}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">
            {tab === "phone" ? "Mobile Number" : "Email Address"}
          </label>
          <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden focus-within:border-blue-500 transition-colors bg-white">
            {tab === "phone" && (
              <div className="flex items-center gap-1 px-3 border-r border-slate-200 py-3.5">
                <span className="text-sm">🇮🇳</span>
                <span className="text-sm font-medium text-slate-700">+91</span>
              </div>
            )}
            <input
              type={tab === "phone" ? "tel" : "email"}
              value={tab === "phone" ? phone : email}
              onChange={(e) => tab === "phone" ? setPhone(e.target.value) : setEmail(e.target.value)}
              placeholder={tab === "phone" ? "98765 43210" : "test@test.com"}
              className="flex-1 px-4 py-3.5 text-slate-900 text-sm font-medium outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Password / OTP toggle */}
        <div className="flex gap-2 mb-4">
          {["password", "otp"].map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m as "password" | "otp")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border-2 transition-colors ${method === m ? "border-blue-500 bg-blue-50 text-blue-600" : "border-slate-200 text-slate-500"}`}
            >
              {m === "password" ? "🔒 Password" : "🔢 OTP"}
            </button>
          ))}
        </div>

        {method === "password" ? (
          <div className="mb-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Password</label>
            <div className="flex items-center border-2 border-slate-200 rounded-xl focus-within:border-blue-500 transition-colors">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="test" 
                className="flex-1 px-4 py-3.5 text-slate-900 text-sm outline-none bg-transparent font-medium" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-4 text-slate-400 text-sm hover:text-slate-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Enter OTP</label>
            <div className="flex gap-3">
              {[0,1,2,3,4,5].map((i) => (
                <input key={i} type="text" maxLength={1} defaultValue={i.toString()} className="flex-1 aspect-square text-center border-2 border-slate-200 rounded-xl text-xl font-bold text-slate-900 focus:border-blue-500 outline-none" />
              ))}
            </div>
            <button className="text-blue-600 text-xs font-semibold mt-2">Resend OTP in 30s</button>
          </div>
        )}

        <button className="text-blue-600 text-xs font-medium text-right mb-6">Forgot Password?</button>

        {/* Biometric */}
        <div className="flex items-center gap-3 mb-6 p-3 bg-slate-50 rounded-xl border border-slate-200">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round">
              <path d="M12 1a5 5 0 015 5v3M12 1a5 5 0 00-5 5v3M7 9a5 5 0 0010 0M12 14v4M9 18h6"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">Biometric Login</p>
            <p className="text-xs text-slate-400">Use fingerprint or Face ID</p>
          </div>
          <button className="ml-auto px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg">Enable</button>
        </div>

        <button
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            try {
              const loginEmail = tab === "email" ? email.trim() : "test@test.com";
              const response = await fetch("https://rakshasetu-app-8dvk.onrender.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loginEmail, password: password })
              });
              if (response.ok) {
                const resData = await response.json();
                localStorage.setItem("token", resData.access_token);
                onDone(resData.access_token);
              } else {
                alert("Login Failed. Use test@test.com and password: test");
              }
            } catch (err) {
              console.error(err);
              // Fallback for offline prototype
              onDone();
            } finally {
              setLoading(false);
            }
          }}
          className="w-full py-4 rounded-2xl text-white font-semibold text-base transition-transform active:scale-95 mb-4 shadow-md shadow-blue-500/20"
          style={{ background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" }}
        >
          {loading ? "Signing In..." : "Sign In Securely"}
        </button>

        <p className="text-center text-sm text-slate-500">
          New to RakshaSetu? <button className="text-blue-600 font-semibold">Register Now</button>
        </p>
      </div>
    </div>
  );
}
