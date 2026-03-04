import "./globals.css";

export const metadata = {
  title: {
    default: "Arthur Levy APLOGAN — Géographie & SIG",
    template: "%s | Arthur Levy APLOGAN",
  },
  description:
    "Portfolio de Arthur Levy APLOGAN, étudiant en Licence Géographie & Aménagement à l'Université de Bourgogne. Cartographie, analyse spatiale, SIG.",
  keywords: ["SIG", "géomatique", "urbanisme", "cartographie", "QGIS", "analyse spatiale", "Dijon"],
  authors: [{ name: "Arthur Levy APLOGAN" }],
  openGraph: {
    title: "Arthur Levy APLOGAN — Géographie & SIG",
    description: "Cartographie, analyse spatiale, SIG.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="dark">
      <body>{children}</body>
    </html>
  );
}
