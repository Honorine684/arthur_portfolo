import prisma from "./db";

function deserialiserTags(projet) {
  return {
    ...projet,
    tags: JSON.parse(projet.tags || "[]"),
  };
}

export async function getProjetsPublies() {
  const projets = await prisma.projet.findMany({
    where: { publie: true },
    orderBy: { ordre: "asc" },
  });
  return projets.map(deserialiserTags);
}

export async function getTousProjets() {
  const projets = await prisma.projet.findMany({
    orderBy: { ordre: "asc" },
  });
  return projets.map(deserialiserTags);
}

export async function getProjetParId(id) {
  const projet = await prisma.projet.findUnique({ where: { id } });
  if (!projet) return null;
  return deserialiserTags(projet);
}

export async function creerProjet(data) {
  return prisma.projet.create({
    data: {
      ...data,
      tags: JSON.stringify(data.tags ?? []),
    },
  });
}

export async function mettreAJourProjet(id, data) {
  return prisma.projet.update({
    where: { id },
    data: {
      ...data,
      tags: data.tags ? JSON.stringify(data.tags) : undefined,
      updatedAt: new Date(),
    },
  });
}

export async function supprimerProjet(id) {
  return prisma.projet.delete({ where: { id } });
}
