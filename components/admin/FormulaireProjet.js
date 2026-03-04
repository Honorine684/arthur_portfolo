"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, ImageIcon } from "lucide-react";

export default function FormulaireProjet({ projet }) {
  const router = useRouter();
  const estEdition = !!projet?.id;
  const inputFichier = useRef(null);

  const [form, setForm] = useState({
    titre: projet?.titre ?? "",
    description: projet?.description ?? "",
    tags: projet?.tags?.join(", ") ?? "",
    image: projet?.image ?? "",
    lien: projet?.lien ?? "",
    publie: projet?.publie ?? false,
    ordre: projet?.ordre ?? 0,
  });

  const [uploadEnCours, setUploadEnCours] = useState(false);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");

  function changer(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  async function gererUpload(e) {
    const fichier = e.target.files?.[0];
    if (!fichier) return;

    setUploadEnCours(true);
    setErreur("");

    const formData = new FormData();
    formData.append("fichier", fichier);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (!res.ok) {
      setErreur(data.error ?? "Erreur lors de l'upload.");
    } else {
      setForm((prev) => ({ ...prev, image: data.url }));
    }

    setUploadEnCours(false);
    // Reset input pour permettre de re-sélectionner le même fichier
    inputFichier.current.value = "";
  }

  function supprimerImage() {
    setForm((prev) => ({ ...prev, image: "" }));
  }

  async function soumettre(e) {
    e.preventDefault();
    setChargement(true);
    setErreur("");

    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      ordre: parseInt(form.ordre) || 0,
    };

    const url = estEdition ? `/api/projets/${projet.id}` : "/api/projets";
    const methode = estEdition ? "PUT" : "POST";

    const res = await fetch(url, {
      method: methode,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setErreur("Une erreur est survenue.");
      setChargement(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={soumettre} className="space-y-6 max-w-2xl">
      <div>
        <label className="block text-sm text-gray-400 mb-1">Titre *</label>
        <input
          name="titre"
          value={form.titre}
          onChange={changer}
          required
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Description *</label>
        <textarea
          name="description"
          value={form.description}
          onChange={changer}
          required
          rows={4}
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">
          Tags (séparés par des virgules)
        </label>
        <input
          name="tags"
          value={form.tags}
          onChange={changer}
          placeholder="QGIS, PostGIS, Python"
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* Image upload */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">Image du projet</label>

        {form.image ? (
          /* Prévisualisation */
          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-900 border border-gray-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={form.image}
              alt="Aperçu"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => inputFichier.current?.click()}
                className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 backdrop-blur-sm"
              >
                <Upload size={14} />
                Changer
              </button>
              <button
                type="button"
                onClick={supprimerImage}
                className="bg-red-500/70 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5"
              >
                <X size={14} />
                Supprimer
              </button>
            </div>
          </div>
        ) : (
          /* Zone de dépôt */
          <button
            type="button"
            onClick={() => inputFichier.current?.click()}
            disabled={uploadEnCours}
            className="w-full h-40 border-2 border-dashed border-gray-700 hover:border-emerald-500 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploadEnCours ? (
              <span className="text-sm">Upload en cours…</span>
            ) : (
              <>
                <ImageIcon size={28} />
                <span className="text-sm">Cliquer pour uploader une image</span>
                <span className="text-xs">JPG, PNG, WebP — max 5 Mo</span>
              </>
            )}
          </button>
        )}

        <input
          ref={inputFichier}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={gererUpload}
          className="hidden"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Lien externe</label>
        <input
          name="lien"
          value={form.lien}
          onChange={changer}
          placeholder="https://..."
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 items-end">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Ordre d&apos;affichage</label>
          <input
            name="ordre"
            type="number"
            value={form.ordre}
            onChange={changer}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
        <label className="flex items-center gap-3 cursor-pointer pb-2">
          <input
            type="checkbox"
            name="publie"
            checked={form.publie}
            onChange={changer}
            className="w-4 h-4 accent-emerald-500"
          />
          <span className="text-gray-300">Publié</span>
        </label>
      </div>

      {erreur && <p className="text-red-400 text-sm">{erreur}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={chargement || uploadEnCours}
          className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          {chargement ? "Enregistrement…" : estEdition ? "Mettre à jour" : "Créer"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="border border-gray-700 text-gray-300 px-6 py-2 rounded-lg hover:border-gray-500 transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
