"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";

export default function ListeProjetsAdmin({ projets: initial }) {
  const [projets, setProjets] = useState(initial);
  const router = useRouter();

  async function supprimer(id) {
    if (!confirm("Supprimer ce projet ?")) return;
    setProjets((prev) => prev.filter((p) => p.id !== id));
    await fetch(`/api/projets/${id}`, { method: "DELETE" });
    router.refresh();
  }

  if (projets.length === 0) {
    return (
      <div className="text-center py-16 text-gray-600">
        <p className="text-sm">Aucun projet pour l&apos;instant.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {projets.map((projet) => (
        <li
          key={projet.id}
          className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4"
        >
          {projet.image && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={projet.image}
              alt=""
              className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate">{projet.titre}</p>
            <p className="text-gray-500 text-xs mt-0.5 truncate">
              {projet.tags?.join(", ")}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={`/admin/dashboard/${projet.id}`}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              title="Modifier"
            >
              <Pencil size={16} />
            </a>
            <button
              onClick={() => supprimer(projet.id)}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
              title="Supprimer"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
