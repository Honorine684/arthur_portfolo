// ── Formations & expériences principales ──────────────────────────
const etapes = [
  {
    annee: "Sept. 2023 → Juin 2026",
    type: "Formation",
    titre: "Licence Géographie & Aménagement",
    lieu: "Université de Bourgogne — Dijon, France",
    description:
      "Analyse spatiale avancée, modélisation de données (QGIS, GeoDa), sémiologie graphique et diagnostics urbains.",
  },
  {
    annee: "Juin 2021 → Août 2021",
    type: "Mission",
    titre: "Stagiaire Géomaticien",
    lieu: "IFRIKA-GIS — Bénin",
    description:
      "Intégration et mise à jour de bases de données spatiales pour optimiser le tracé des infrastructures.",
  },
  {
    annee: "Sept. 2019 → Juin 2022",
    type: "Formation",
    titre: "Licence en Géographie et Environnement",
    lieu: "Université d'Abomey-Calavi — Bénin",
    description:
      "Acquisition des fondamentaux de la géographie physique, humaine et environnementale.",
  },
  {
    annee: "2017 → 2018",
    type: "Formation",
    titre: "Baccalauréat B — Sciences Sociales & Économie",
    lieu: "Lycée Mafory Bangoura — Abomey, Bénin",
    description:
      "Obtention du Baccalauréat série B avec spécialisation en sciences économiques et sociales.",
  },
];

// ── Jobs complémentaires ───────────────────────────────────────────
const jobs = [
  {
    annee: "Sept. → Nov. 2023",
    titre: "Agent de Manutention",
    lieu: "GSF — Dijon",
    description: "Gestion logistique et flux en environnement industriel.",
  },
  {
    annee: "Nov. 2023 → Jan. 2024",
    titre: "Agent Logistique",
    lieu: "SNCF — Dijon",
    description: "Coordination des opérations logistiques ferroviaires.",
  },
  {
    annee: "Depuis fév. 2024",
    titre: "Équipier Polyvalent",
    lieu: "KFC — Chenôve",
    description: "Service client et gestion des opérations quotidiennes.",
  },
];

const couleurType = {
  Formation: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  Poste:     "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  Mission:   "text-amber-400 bg-amber-400/10 border-amber-400/30",
};

const couleurPoint = {
  Formation: "bg-blue-400 shadow-blue-400/50",
  Poste:     "bg-emerald-400 shadow-emerald-400/50",
  Mission:   "bg-amber-400 shadow-amber-400/50",
};

export default function Parcours() {
  return (
    <section id="parcours" className="py-24 px-4 sm:px-6 bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          Parcours
        </h2>
        <p className="text-gray-500 text-center mb-16 text-sm font-mono uppercase tracking-widest">
          Formation · Expérience · Évolution
        </p>

        {/* ── Timeline principale ──────────────────────────── */}
        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px sm:-translate-x-px bg-gradient-to-b from-blue-500 via-amber-500 to-blue-500 opacity-40" />

          <div className="space-y-10 sm:space-y-0">
            {etapes.map((etape, i) => {
              const estDroite = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`relative flex items-start sm:items-center gap-6 sm:gap-0 ${
                    estDroite ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`ml-12 sm:ml-0 w-full sm:w-[calc(50%-2.5rem)] ${
                      estDroite ? "sm:pr-10 sm:text-right" : "sm:pl-10"
                    }`}
                  >
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition-colors">
                      <span
                        className={`inline-block text-[10px] font-mono uppercase tracking-widest border px-2 py-0.5 rounded-full mb-3 ${couleurType[etape.type]}`}
                      >
                        {etape.type}
                      </span>
                      <p className="text-gray-500 text-xs font-mono mb-1">{etape.annee}</p>
                      <h3 className="text-white font-semibold text-base mb-1 leading-snug">
                        {etape.titre}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">{etape.lieu}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{etape.description}</p>
                    </div>
                  </div>

                  <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 flex flex-col items-center">
                    <div className={`w-3.5 h-3.5 rounded-full shadow-lg ${couleurPoint[etape.type]}`} />
                  </div>

                  <div className="hidden sm:block sm:w-[calc(50%-2.5rem)]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Jobs complémentaires ─────────────────────────── */}
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-800" />
            <p className="text-gray-500 text-xs font-mono uppercase tracking-widest whitespace-nowrap">
              Expériences complémentaires
            </p>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {jobs.map((job, i) => (
              <div
                key={i}
                className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <p className="text-gray-500 text-[10px] font-mono">{job.annee}</p>
                </div>
                <h4 className="text-white font-medium text-sm mb-0.5">{job.titre}</h4>
                <p className="text-emerald-400/70 text-xs mb-2">{job.lieu}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{job.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
