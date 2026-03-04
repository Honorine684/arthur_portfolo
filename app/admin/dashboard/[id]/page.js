import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lireProjets } from "@/lib/projets";
import FormulaireProjet from "@/components/admin/FormulaireProjet";

export const dynamic = "force-dynamic";

export default async function EditerProjetPage({ params }) {
  const cookie = cookies().get("admin_code");
  if (cookie?.value !== process.env.ADMIN_CODE) {
    redirect("/admin");
  }

  const id = parseInt(params.id);
  const projets = await lireProjets();
  const projet = projets.find((p) => p.id === id);

  if (!projet) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <a
            href="/admin/dashboard"
            className="text-gray-500 hover:text-white text-sm transition-colors"
          >
            ← Retour
          </a>
          <h1 className="text-white text-2xl font-bold mt-4">
            Modifier le projet
          </h1>
        </div>
        <FormulaireProjet projet={projet} />
      </div>
    </div>
  );
}
