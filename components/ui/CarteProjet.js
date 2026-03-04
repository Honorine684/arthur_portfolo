import { ExternalLink } from "lucide-react";

export default function CarteProjet({ projet }) {
  return (
    <article className="bg-gray-900 rounded-xl overflow-hidden hover:ring-1 hover:ring-emerald-500 transition-all group">
      {projet.image && (
        <div className="h-44 bg-gray-800 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={projet.image}
            alt={projet.titre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {projet.tags?.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">{projet.titre}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {projet.description}
        </p>
        {projet.lien && (
          <a
            href={projet.lien}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-400 text-sm hover:text-emerald-300 transition-colors"
          >
            Voir le projet <ExternalLink size={13} />
          </a>
        )}
      </div>
    </article>
  );
}
