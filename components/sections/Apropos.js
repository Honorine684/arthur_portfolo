export default function Apropos() {
  return (
    <section id="apropos" className="py-24 px-6 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          À propos
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Actuellement en Licence 3 à l&apos;Université de Bourgogne, je me spécialise
              en analyse spatiale et modélisation de données territoriales.
            </p>
            <p>
              Fort d&apos;une solide maîtrise de QGIS et d&apos;une expérience en diagnostics
              de terrain (accessibilité, morphologie urbaine), je souhaite intégrer un Master
              pour approfondir mes compétences en ingénierie géographique et analyse des
              politiques publiques.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Licence 3", value: "L3" },
              { label: "Spécialité", value: "SIG" },
              { label: "Outil phare", value: "QGIS" },
              { label: "Localisation", value: "Dijon" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-800 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-emerald-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
