import "./globals.css";
import Providers from "@/components/ui/Providers";

export const metadata = {
  title: {
    default: "Arthur Dupont — Expert SIG & Géomatique",
    template: "%s | Arthur Dupont",
  },
  description:
    "Expert en Systèmes d'Information Géographique, géomatique et urbanisme. Cartographie, analyse spatiale, aménagement du territoire.",
  keywords: ["SIG", "géomatique", "urbanisme", "cartographie", "QGIS", "ArcGIS", "analyse spatiale"],
  authors: [{ name: "Arthur Dupont" }],
  openGraph: {
    title: "Arthur Dupont — Expert SIG & Géomatique",
    description: "Expert en SIG, géomatique et urbanisme.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
