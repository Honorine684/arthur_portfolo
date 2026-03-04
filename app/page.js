import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import Parcours from "@/components/sections/Parcours";
import Apropos from "@/components/sections/Apropos";
import Competences from "@/components/sections/Competences";
import Projets from "@/components/sections/Projets";
import Contact from "@/components/sections/Contact";
import { lireProjets } from "@/lib/projets";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const projets = lireProjets();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Parcours />
        <Apropos />
        <Competences />
        <Projets projets={projets} />
        <Contact />
      </main>
    </>
  );
}
