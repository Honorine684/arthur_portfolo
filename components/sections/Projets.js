import { ExternalLink, Map, FileText } from "lucide-react";

function ProjetLigne({ projet, index }) {
  const estPair = index % 2 === 0;

  return (
    <div className="py-12 lg:py-16">
      <div
        className={`flex flex-col gap-8 lg:gap-12 ${
          estPair ? "lg:flex-row" : "lg:flex-row-reverse"
        } items-center`}
      >
        {/* ── Image ── */}
        <div className="w-full lg:w-3/5 rounded-xl overflow-hidden bg-gray-800 shadow-2xl shadow-black/40">
          <div className="relative aspect-[16/10] group">
            {projet.image ? (
              <a
                href={projet.image}
                target="_blank"
                rel="noopener noreferrer"
                title="Voir en plein écran"
                className="block h-full"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={projet.image}
                  alt={projet.titre}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/15 backdrop-blur-sm rounded-full p-4">
                    <ExternalLink size={20} className="text-white" />
                  </div>
                </div>
              </a>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-700">
                <Map size={40} />
                <span className="text-sm font-mono">Aucune image</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Texte ── */}
        <div className="w-full lg:w-2/5 space-y-4">
          {/* Numéro */}
          <span className="text-gray-700 font-mono text-xs tracking-widest">
            {String(index + 1).padStart(2, "0")} /{" "}
            <span className="text-gray-600">PROJET</span>
          </span>

          {/* Tags */}
          {projet.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {projet.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Titre */}
          <h3 className="text-white text-2xl lg:text-3xl font-bold leading-tight">
            {projet.titre}
          </h3>

          {/* Séparateur */}
          <div className="w-10 h-px bg-emerald-500" />

          {/* Description */}
          <p className="text-gray-400 leading-relaxed text-[15px]">
            {projet.description}
          </p>

          {/* Lien */}
          {projet.lien && (
            <a
              href={projet.lien}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors group"
            >
              Voir le projet
              <ExternalLink
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projets({ projets = [] }) {
  return (
    <section id="projets" className="py-8 bg-gray-950 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* En-tête */}
        <div className="py-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Projets</h2>
          <p className="text-gray-500 text-sm font-mono uppercase tracking-widest">
            Cartographie · Analyse spatiale · SIG
          </p>
        </div>

        {/* Liste */}
        {projets.length === 0 ? (
          <div className="py-16 text-center">
            <div className="inline-flex flex-col items-center gap-4 text-gray-600">
              <Map size={48} />
              <p className="text-sm">
                Aucun projet publié.{" "}
                <a href="/admin/dashboard" className="text-emerald-500 hover:text-emerald-400">
                  Ajouter via l&apos;admin →
                </a>
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-800/60">
              {projets.map((projet, i) => (
                <ProjetLigne key={projet.id} projet={projet} index={i} />
              ))}
            </div>

            {/* Rapport complet */}
            <div className="py-10 flex justify-center">
              <a
                href="/images/doc.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-emerald-500/50 text-gray-300 hover:text-white px-6 py-3.5 rounded-xl transition-all duration-200 group"
              >
                <FileText size={18} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Lire le rapport complet — Accessibilité aux soins</span>
                <ExternalLink size={14} className="text-gray-500 group-hover:text-emerald-400 transition-colors" />
              </a>
            </div>
          </>
        )}

      </div>
    </section>
  );
}
