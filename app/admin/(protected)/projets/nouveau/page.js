import FormulaireProjet from "@/components/admin/FormulaireProjet";

export const metadata = { title: "Nouveau projet" };

export default function NouveauProjetPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Nouveau projet</h1>
      <FormulaireProjet />
    </div>
  );
}
