const competences = [
  {
    categorie: "SIG & Cartographie",
    items: ["QGIS", "ArcGIS Pro", "MapInfo", "PostGIS", "GeoServer"],
  },
  {
    categorie: "Données & Analyse",
    items: ["Python (GeoPandas)", "R spatial", "SQL", "OpenData", "INSEE"],
  },
  {
    categorie: "Urbanisme",
    items: ["PLU / PLUi", "SCOT", "Foncier", "Risques naturels", "Mobilité"],
  },
  {
    categorie: "Web & Outils",
    items: ["Leaflet", "MapLibre GL", "GDAL", "Overpass API", "Git"],
  },
];

export default function Competences() {
  return (
    <section id="competences" className="py-24 px-6 bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          Compétences
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {competences.map((bloc) => (
            <div key={bloc.categorie} className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-emerald-400 font-semibold mb-4">
                {bloc.categorie}
              </h3>
              <div className="flex flex-wrap gap-2">
                {bloc.items.map((item) => (
                  <span
                    key={item}
                    className="bg-gray-800 text-gray-300 text-sm px-3 py-1 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
