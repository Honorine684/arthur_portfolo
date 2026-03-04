import fs from "fs";
import path from "path";

const fichier = path.join(process.cwd(), "data", "projets.json");

export function lireProjets() {
  const contenu = fs.readFileSync(fichier, "utf-8");
  return JSON.parse(contenu);
}

function ecrireProjets(projets) {
  fs.writeFileSync(fichier, JSON.stringify(projets, null, 2));
}

export function ajouterProjet(data) {
  const projets = lireProjets();
  const id = Date.now();
  const nouveau = { id, ...data };
  projets.push(nouveau);
  ecrireProjets(projets);
  return nouveau;
}

export function modifierProjet(id, data) {
  const projets = lireProjets();
  const index = projets.findIndex((p) => p.id === id);
  if (index === -1) return null;
  projets[index] = { ...projets[index], ...data };
  ecrireProjets(projets);
  return projets[index];
}

export function supprimerProjet(id) {
  const projets = lireProjets();
  ecrireProjets(projets.filter((p) => p.id !== id));
}
