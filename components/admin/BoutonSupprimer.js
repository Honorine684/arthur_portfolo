"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BoutonSupprimer({ id }) {
  const router = useRouter();

  async function supprimer() {
    if (!confirm("Supprimer ce projet ?")) return;

    await fetch(`/api/projets/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      onClick={supprimer}
      className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-gray-800 transition-colors"
    >
      <Trash2 size={15} />
    </button>
  );
}
