import Link from "next/link";
import { Plus, Pencil, Eye, EyeOff } from "lucide-react";
import { getTousProjets } from "@/lib/projets";
import BoutonSupprimer from "@/components/admin/BoutonSupprimer";

export default async function AdminPage() {
  const projets = await getTousProjets();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Projets</h1>
        <Link
          href="/admin/projets/nouveau"
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Nouveau projet
        </Link>
      </div>

      {projets.length === 0 ? (
        <p className="text-gray-500 text-center py-16">
          Aucun projet. Créez-en un !
        </p>
      ) : (
        <div className="space-y-3">
          {projets.map((projet) => (
            <div
              key={projet.id}
              className="bg-gray-900 rounded-xl px-6 py-4 flex items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{projet.titre}</p>
                <p className="text-gray-500 text-sm truncate">
                  {projet.description}
                </p>
              </div>

              <div className="flex items-center gap-1 text-gray-500">
                {projet.publie ? (
                  <Eye size={15} className="text-emerald-400" />
                ) : (
                  <EyeOff size={15} />
                )}
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/projets/${projet.id}`}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Pencil size={15} />
                </Link>
                <BoutonSupprimer id={projet.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
