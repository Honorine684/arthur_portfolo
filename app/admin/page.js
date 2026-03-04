"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [code, setCode] = useState("");
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setChargement(true);
    setErreur("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setErreur("Code incorrect.");
      setChargement(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-white text-2xl font-bold text-center mb-2">
          Admin
        </h1>
        <p className="text-gray-500 text-sm text-center mb-8 font-mono">
          arthur<span className="text-emerald-400">.sig</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Code secret"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-center text-lg tracking-widest focus:outline-none focus:border-emerald-500 transition-colors"
            autoFocus
          />
          {erreur && (
            <p className="text-red-400 text-sm text-center">{erreur}</p>
          )}
          <button
            type="submit"
            disabled={chargement || !code}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {chargement ? "Vérification…" : "Accéder"}
          </button>
        </form>
      </div>
    </div>
  );
}
