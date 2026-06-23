"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [phoneError, setPhoneError] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9\-]/g, "");
    setForm({ ...form, phone: value });
    if (value.length > 0 && value.replace(/\-/g, "").length !== 10) {
      setPhoneError("מספר טלפון לא תקין");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneError) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      
      <div className="absolute top-[-80px] left-[-80px] w-96 h-96 bg-indigo-200 rounded-full opacity-30 blur-3xl" />
      <div className="absolute bottom-[-100px] right-[-60px] w-80 h-80 bg-purple-300 rounded-full opacity-30 blur-3xl" />
      <div className="absolute top-1/2 left-[-120px] w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-2xl" />
      <div className="absolute top-10 right-10 w-40 h-40 bg-pink-200 rounded-full opacity-20 blur-2xl" />

      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-10 w-full max-w-lg border border-white">
        
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-2xl mb-4">
            <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">צור קשר</h1>
          <p className="text-gray-400 text-sm">נשמח לשמוע ממך! נחזור אליך בהקדם.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1.5">שם מלא</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white transition"
              placeholder="אנא מלא שם ושם משפחה"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1.5">אימייל</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white transition"
              placeholder="Email@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1.5">טלפון</label>
            <input
              type="tel"
              value={form.phone}
              onChange={handlePhoneChange}
              className={`w-full border rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:border-transparent bg-white transition ${
                phoneError
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-200 focus:ring-indigo-400"
              }`}
              placeholder="05X-XXXXXXX"
            />
            {phoneError && (
              <p className="mt-1.5 text-red-500 text-sm font-medium">⚠️ {phoneError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1.5">הודעה</label>
            <textarea
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white transition h-32 resize-none"
              placeholder="כתוב את הודעתך כאן..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading" || !!phoneError}
            className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {status === "loading" ? "שולח..." : "שלח הודעה ✉️"}
          </button>
        </form>

        {status === "success" && (
          <div className="mt-5 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-green-600 font-semibold">✅ ההודעה נשלחה בהצלחה!</p>
            <p className="text-green-400 text-sm mt-1">נחזור אליך בהקדם 😊</p>
          </div>
        )}
        {status === "error" && (
          <div className="mt-5 bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <p className="text-red-500 font-semibold">❌ שגיאה בשליחה</p>
            <p className="text-red-400 text-sm mt-1">אנא נסי שוב.</p>
          </div>
        )}
      </div>
    </main>
  );
}