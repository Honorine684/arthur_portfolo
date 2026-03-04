import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lireProjets } from "@/lib/projets";
import ListeProjetsAdmin from "@/components/admin/ListeProjetsAdmin";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const cookie = cookies().get("admin_code");
  if (cookie?.value !== process.env.ADMIN_CODE) {
    redirect("/admin");
  }

  const projets = lireProjets();

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-white text-2xl font-bold">Projets</h1>
            <p className="text-gray-500 text-sm font-mono mt-1">
              {projets.length} projet{projets.length !== 1 ? "s" : ""}
            </p>
          </div>
          <a
            href="/admin/dashboard/nouveau"
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            + Ajouter
          </a>
        </div>

        <ListeProjetsAdmin projets={projets} />

        <div className="mt-12 pt-6 border-t border-gray-800 flex justify-between items-center">
          <a href="/" className="text-gray-500 hover:text-white text-sm transition-colors">
            ← Voir le site
          </a>
          <form action="/api/admin/logout" method="POST">
            <button className="text-gray-500 hover:text-red-400 text-sm transition-colors">
              Déconnexion
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
