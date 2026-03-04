"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import {
  BookOpen,
  Target,
  Map,
  Zap,
  X,
  ZoomIn,
} from "lucide-react";

const IcosahedreStrategique = dynamic(
  () => import("@/components/ui/IcosahedreStrategique"),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
);

// ── Données loisirs ────────────────────────────────────────────────

const loisirs = [
  {
    icone: BookOpen,
    label: "Mangas",
    desc: "Narration, arcs de progression, univers construits — l'art de la complexité.",
    couleur: "text-violet-400",
    bg: "bg-violet-400/10 border-violet-400/20",
  },
  {
    icone: Target,
    label: "Football",
    desc: "Lire le terrain, anticiper, coordonner. Le collectif au service du résultat.",
    couleur: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
  },
  {
    icone: Map,
    label: "Cartographie",
    desc: "Transformer des données en représentations spatiales lisibles et décisives.",
    couleur: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
  },
  {
    icone: Zap,
    label: "Stratégie",
    desc: "Réflexion, itération, décision. Optimiser chaque mouvement avant d'agir.",
    couleur: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
  },
];

// ── Images tests de personnalité ───────────────────────────────────
// Ajoute tes images ici — { src, titre, legende }

const testsPersonnalite = [
  {
    src: "/images/personnality.jpeg",
    titre: "Test de personnalité",
    legende:
      "Ce que révèle ce test sur ma manière de travailler : esprit d'analyse, sens de la coordination, goût du défi et recherche de performance.",
  },
];

// ── Lightbox ───────────────────────────────────────────────────────

function Lightbox({ image, onClose }) {
  if (!image) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.titre}
          className="w-full rounded-2xl"
        />
        {image.legende && (
          <p className="mt-3 text-gray-400 text-sm text-center">
            {image.legende}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Composant principal ────────────────────────────────────────────

export default function LoisirsPersonnalite() {
  const [imageOuverte, setImageOuverte] = useState(null);

  return (
    <section
      id="personnalite"
      className="py-24 px-4 bg-gray-950 relative overflow-hidden"
    >
      {/* Fond décoratif */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* En-tête */}
        <div className="mb-14">
          <p className="text-emerald-400 text-sm font-mono tracking-widest uppercase mb-3">
            Au-delà du SIG
          </p>
          <h2 className="text-3xl font-bold text-white">
            Loisirs & Personnalité
          </h2>
        </div>

        {/* Grille principale */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── Colonne gauche ───────────────────────────────────── */}
          <div className="space-y-10">

            {/* État d'esprit */}
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-emerald-500/40 to-transparent" />
              <p className="text-emerald-400 text-xs font-mono uppercase tracking-widest mb-5 pl-4">
                État d&apos;esprit
              </p>
              <blockquote className="pl-4 space-y-4">
                <p className="text-gray-200 text-lg leading-relaxed">
                  Esprit{" "}
                  <span className="text-emerald-400 font-semibold">shōnen</span>
                  , mental de compétiteur :{" "}
                  <span className="text-white font-medium">
                    toujours apprendre, toujours progresser.
                  </span>
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Coordinateur dans l&apos;âme, j&apos;avance sur le terrain en
                  relevant des{" "}
                  <span className="text-gray-200">défis concrets</span>. Des
                  cartes d&apos;isochrones aux mangas, je lis le jeu,{" "}
                  <span className="text-emerald-400">j&apos;affine la stratégie</span>{" "}
                  et je joue pour gagner.
                </p>
              </blockquote>
            </div>

            {/* Loisirs */}
            <div>
              <p className="text-emerald-400 text-xs font-mono uppercase tracking-widest mb-5">
                Centres d&apos;intérêt
              </p>
              <div className="grid grid-cols-2 gap-3">
                {loisirs.map(({ icone: Icone, label, desc, couleur, bg }) => (
                  <div
                    key={label}
                    className={`border rounded-2xl p-4 ${bg} transition-all hover:scale-[1.02]`}
                  >
                    <Icone size={20} className={`${couleur} mb-3`} />
                    <p className={`font-semibold text-sm mb-1.5 ${couleur}`}>
                      {label}
                    </p>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Colonne droite ───────────────────────────────────── */}
          <div className="space-y-8">

            {/* 3D */}
            <div className="relative">
              <div className="h-[280px] sm:h-[320px] relative">
                {/* Glow derrière le canvas */}
                <div
                  aria-hidden
                  className="absolute inset-0 m-auto w-48 h-48 rounded-full bg-emerald-500/15 blur-3xl"
                />
                <IcosahedreStrategique />
              </div>
              {/* Labels flottants décoratifs */}
              <div className="absolute top-6 left-4 bg-gray-900/80 backdrop-blur-sm border border-gray-700/60 rounded-lg px-3 py-1.5 text-xs font-mono text-emerald-400">
                Analyse
              </div>
              <div className="absolute bottom-8 right-4 bg-gray-900/80 backdrop-blur-sm border border-gray-700/60 rounded-lg px-3 py-1.5 text-xs font-mono text-blue-400">
                Stratégie
              </div>
              <div className="absolute top-1/2 right-6 -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm border border-gray-700/60 rounded-lg px-3 py-1.5 text-xs font-mono text-amber-400">
                Progression
              </div>
            </div>

            {/* Tests de personnalité */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <p className="text-emerald-400 text-xs font-mono uppercase tracking-widest">
                  Tests de personnalité
                </p>
                <div className="flex-1 h-px bg-gray-800" />
              </div>

              {testsPersonnalite.length === 0 ? (
                <div className="border border-dashed border-gray-800 rounded-2xl p-8 text-center text-gray-600 text-sm">
                  Tes images de tests apparaîtront ici.
                </div>
              ) : (
                <>
                  <div
                    className={`grid gap-3 ${
                      testsPersonnalite.length === 1
                        ? "grid-cols-1"
                        : "grid-cols-2"
                    }`}
                  >
                    {testsPersonnalite.map((test) => (
                      <button
                        key={test.src}
                        onClick={() => setImageOuverte(test)}
                        className="group relative rounded-xl overflow-hidden border border-gray-800 hover:border-emerald-500/50 transition-colors"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={test.src}
                          alt={test.titre}
                          className="w-full object-cover aspect-[4/3]"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <ZoomIn
                            size={20}
                            className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                        <p className="absolute bottom-2 left-2 text-xs text-white/70 font-mono">
                          {test.titre}
                        </p>
                      </button>
                    ))}
                  </div>

                  <p className="mt-4 text-gray-500 text-sm leading-relaxed border-l-2 border-emerald-500/30 pl-3">
                    Ce que révèle ce test sur ma manière de travailler : esprit
                    d&apos;analyse, sens de la coordination, goût du défi et
                    recherche de performance.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Lightbox image={imageOuverte} onClose={() => setImageOuverte(null)} />
    </section>
  );
}
