"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";

export default function FormulaireProjet({ projet }) {
  const router = useRouter();
  const estEdition = !!projet;

  const [form, setForm] = useState({
    titre: projet?.titre ?? "",
    description: projet?.description ?? "",
    tags: projet?.tags?.join(", ") ?? "",
    image: projet?.image ?? "",
    lien: projet?.lien ?? "",
  });
  const [chargement, setChargement] = useState(false);
  const [uploadEnCours, setUploadEnCours] = useState(false);
  const [erreur, setErreur] = useState("");

  function changer(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function uploaderImage(e) {
    const fichier = e.target.files?.[0];
    if (!fichier) return;
    setUploadEnCours(true);
    const fd = new FormData();
    fd.append("fichier", fichier);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) setForm((f) => ({ ...f, image: data.url }));
    setUploadEnCours(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setChargement(true);
    setErreur("");

    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const url = estEdition ? `/api/projets/${projet.id}` : "/api/projets";
    const methode = estEdition ? "PUT" : "POST";

    const res = await fetch(url, {
      method: methode,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      const data = await res.json();
      setErreur(data.error || "Une erreur est survenue.");
      setChargement(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Titre */}
      <div>
        <label className="block text-gray-400 text-sm mb-1.5">Titre *</label>
        <input
          name="titre"
          value={form.titre}
          onChange={changer}
          required
          placeholder="Ex: Cartographie de l'accessibilité urbaine"
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-gray-400 text-sm mb-1.5">Description *</label>
        <textarea
          name="description"
          value={form.description}
          onChange={changer}
          required
          rows={4}
          placeholder="Décris le projet, les outils utilisés, les résultats…"
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-gray-400 text-sm mb-1.5">
          Tags <span className="text-gray-600">(séparés par des virgules)</span>
        </label>
        <input
          name="tags"
          value={form.tags}
          onChange={changer}
          placeholder="QGIS, PostGIS, Accessibilité"
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      {/* Image */}
      <div>
        <label className="block text-gray-400 text-sm mb-1.5">Image</label>
        {form.image ? (
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-gray-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={form.image}
              alt=""
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, image: "" }))}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center gap-3 w-full h-36 bg-gray-900 border border-dashed border-gray-700 hover:border-emerald-500 rounded-xl cursor-pointer transition-colors">
            {uploadEnCours ? (
              <span className="text-gray-400 text-sm">Upload en cours…</span>
            ) : (
              <>
                <Upload size={20} className="text-gray-500" />
                <span className="text-gray-500 text-sm">
                  Cliquer pour uploader
                </span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={uploaderImage}
            />
          </label>
        )}
        <input
          name="image"
          value={form.image}
          onChange={changer}
          placeholder="Ou coller une URL d'image"
          className="mt-2 w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      {/* Lien */}
      <div>
        <label className="block text-gray-400 text-sm mb-1.5">
          Lien <span className="text-gray-600">(optionnel)</span>
        </label>
        <input
          name="lien"
          value={form.lien}
          onChange={changer}
          placeholder="https://…"
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      {erreur && <p className="text-red-400 text-sm">{erreur}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={chargement}
          className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {chargement
            ? "Enregistrement…"
            : estEdition
            ? "Enregistrer"
            : "Ajouter le projet"}
        </button>
        <a
          href="/admin/dashboard"
          className="px-5 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm font-medium transition-colors text-center"
        >
          Annuler
        </a>
      </div>
    </form>
  );
}
