import { MapPin, Download, ChevronRight } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";

const GlobeGIS = dynamic(() => import("@/components/ui/GlobeGIS"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-blue-950/40 border border-blue-900/30 animate-pulse" />
    </div>
  ),
});



export default function Hero() {
  return (
    <section
      id="accueil"
      className="min-h-screen flex items-center bg-gray-950 px-4 sm:px-6 pt-16"
    >
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-6 lg:gap-16 items-center py-12 lg:py-16">

        {/* ── Colonne gauche : Texte ── */}
        <div className="order-2 lg:order-1">

          {/* Tag */}
          <span className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-widest uppercase bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Expert SIG · Géomatique · Urbanisme
          </span>

          {/* Photo */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 mb-6 shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-emerald-500/15 blur-xl" />
            <Image
              src="/images/arthur_photo.jpeg"
              alt="Arthur Levy APLOGAN"
              fill
              className="rounded-2xl object-cover border border-emerald-500/30 relative z-10"
              sizes="176px"
            />
          </div>

          {/* Nom */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-none tracking-tight mb-2">
            <span className="text-white">Samir</span>
          </h1>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-none tracking-tight mb-6 lg:mb-8">
            <span className="text-gray-500">Arthur Levy APLOGAN</span>
          </h1>

          {/* Titre pro */}
          <p className="text-emerald-400 font-mono text-sm tracking-wide mb-4">
            — Expert SIG & Analyse Territoriale
          </p>

          {/* Pitch */}
          <p className="text-gray-400 leading-relaxed mb-6 max-w-md text-base lg:text-lg">
            Je transforme des données spatiales en outils d&apos;aide à la décision
            pour les territoires, collectivités et bureaux d&apos;études.
          </p>

          {/* Localisation */}
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-8">
            <MapPin size={13} />
            <span>Dijon, France </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10 lg:mb-14">
            <a
              href="#projets"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 sm:px-7 py-3 rounded-lg font-medium transition-colors"
            >
              Voir mes projets <ChevronRight size={16} />
            </a>
            <a
              href="/cv_master.pdf"
              className="inline-flex items-center justify-center gap-2 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white px-6 sm:px-7 py-3 rounded-lg font-medium transition-colors"
            >
              <Download size={15} />
              Télécharger le CV
            </a>
          </div>


        </div>

        {/* ── Colonne droite : Globe 3D ── */}
        <div className="relative h-[300px] sm:h-[400px] lg:h-[580px] order-1 lg:order-2">

          {/* Halo CSS — rend le globe visible sur fond noir */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-4/5 h-4/5 rounded-full bg-blue-950/60 blur-3xl" />
          </div>

          {/* Canvas Three.js */}
          <div className="absolute inset-0 z-10">
            <GlobeGIS />
          </div>

          {/* HUD : Coordonnées — masqué sur très petit écran */}
          <div className="absolute top-4 right-2 sm:top-6 sm:right-4 z-20 bg-gray-900/85 backdrop-blur-sm border border-gray-700/50 rounded-lg px-3 py-2 font-mono pointer-events-none hidden xs:block sm:block">
            <p className="text-gray-500 text-[9px] sm:text-[10px] uppercase tracking-widest mb-0.5">Coordonnées</p>
            <p className="text-emerald-400 text-[10px] sm:text-xs">48.856° N · 2.352° E</p>
          </div>

          {/* HUD : Projection */}
          <div className="absolute bottom-16 sm:bottom-20 left-2 sm:left-4 z-20 bg-gray-900/85 backdrop-blur-sm border border-gray-700/50 rounded-lg px-3 py-2 font-mono pointer-events-none">
            <p className="text-gray-500 text-[9px] sm:text-[10px] uppercase tracking-widest mb-0.5">Projection</p>
            <p className="text-white text-[10px] sm:text-xs">EPSG:4326</p>
          </div>

          {/* HUD : Points actifs */}
          <div className="absolute bottom-4 right-2 sm:bottom-6 sm:right-4 z-20 bg-gray-900/85 backdrop-blur-sm border border-gray-700/50 rounded-lg px-3 py-2 flex items-center gap-2 font-mono pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <p className="text-gray-400 text-[10px] sm:text-xs">10 points actifs</p>
          </div>
        </div>

      </div>
    </section>
  );
}
