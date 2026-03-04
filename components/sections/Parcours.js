const etapes = [
  {
    annee: "De 2017 à 2018",
    type: "Formation",
    titre: "Baccalauréat B (sciences sociales et Economie)",
    lieu: "Lycée Mafory Bangoura Abomey, Benin",
    description:
      "Mise en place du système d'information géographique intercommunal. Cartographie des réseaux, PLU numérique.",
  },
  {
    annee: "De septembre 2019 à juin 2022",
    type: "Formation",
    titre: "Licence en Géographie et Environnement",
    lieu: "Université d'Abomey Calavi Abomey-Calavi, Benin",
    description:
      " Licence (Bac+3) Acquisition des fondamentaux de la géographie physique, humaine et environnementale.",
  },
  {
    annee: "De septembre 2023 à juin 2026",
    type: "Formation",
    titre: "Licence Géographie & Aménagement",
    lieu: "Université de Bourgogne Dijon",
    description:
      "Analyse spatiale avancée, modélisation de données (QGIS,GeoDa), sémiologie graphique et diagnostics urbains",
  },

  {
    annee: "De juin 2021 à août 2021",
    type: "Poste",
    titre: "Stagiaire Géomaticien",
    lieu: "IFRIKA-GIS Benin",
    description:
      "Intégration et mise à jour de bases de données spatiales pour optimiser le tracé des infrastructures.",
  },
  {
    annee: "De septembre 2023 à novembre 2023",
    type: "Poste",
    titre: "Agent de Manutention",
    lieu: "GSF Dijon",
    description:
      "Manutention de marchandises, gestion logistique et optimisation des flux pour une entreprise de nettoyage industriel.",
  },
  {
    annee: "Depuis février 2024",
    type: "Poste",
    titre: "Équipier Polyvalent",
    lieu: "KFC Chenôve",
    description:
      "Service client, préparation de commandes et gestion des opérations quotidiennes dans un environnement de restauration rapide.",
  },

  {
    annee: "De novembre 2023 à janvier 2024",
    type: "Poste",
    titre: "Agent Logistique",
    lieu: "SNCF Dijon",
    description:
      "Gestion des flux de marchandises, coordination des opérations logistiques et optimisation des processus pour une entreprise ferroviaire.",
  },

];

const couleurType = {
  Formation:    "text-blue-400 bg-blue-400/10 border-blue-400/30",
  Poste:        "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  Mission:      "text-amber-400 bg-amber-400/10 border-amber-400/30",
  Indépendant:  "text-purple-400 bg-purple-400/10 border-purple-400/30",
};

const couleurPoint = {
  Formation:    "bg-blue-400 shadow-blue-400/50",
  Poste:        "bg-emerald-400 shadow-emerald-400/50",
  Mission:      "bg-amber-400 shadow-amber-400/50",
  Indépendant:  "bg-purple-400 shadow-purple-400/50",
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

        <div className="relative">
          {/* Ligne verticale centrale */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px sm:-translate-x-px bg-gradient-to-b from-blue-500 via-emerald-500 to-purple-500 opacity-40" />

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
                  {/* Carte */}
                  <div
                    className={`ml-12 sm:ml-0 w-full sm:w-[calc(50%-2.5rem)] ${
                      estDroite ? "sm:pr-10 sm:text-right" : "sm:pl-10 sm:text-left"
                    }`}
                  >
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition-colors">
                      {/* Tag type */}
                      <span
                        className={`inline-block text-[10px] font-mono uppercase tracking-widest border px-2 py-0.5 rounded-full mb-3 ${couleurType[etape.type]}`}
                      >
                        {etape.type}
                      </span>

                      {/* Année */}
                      <p className="text-gray-500 text-xs font-mono mb-1">{etape.annee}</p>

                      {/* Titre */}
                      <h3 className="text-white font-semibold text-base mb-1 leading-snug">
                        {etape.titre}
                      </h3>

                      {/* Lieu */}
                      <p className="text-gray-400 text-sm mb-2">{etape.lieu}</p>

                      {/* Description */}
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {etape.description}
                      </p>
                    </div>
                  </div>

                  {/* Nœud central */}
                  <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 flex flex-col items-center">
                    <div
                      className={`w-3.5 h-3.5 rounded-full shadow-lg ${couleurPoint[etape.type]}`}
                    />
                  </div>

                  {/* Espace côté opposé (desktop only) */}
                  <div className="hidden sm:block sm:w-[calc(50%-2.5rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
