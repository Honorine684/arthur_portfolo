import { notFound } from "next/navigation";
import FormulaireProjet from "@/components/admin/FormulaireProjet";
import { getProjetParId } from "@/lib/projets";

export const metadata = { title: "Modifier le projet" };

export default async function EditionProjetPage({ params }) {
  const id = parseInt(params.id);
  const projet = await getProjetParId(id);

  if (!projet) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Modifier le projet</h1>
      <FormulaireProjet projet={projet} />
    </div>
  );
}
