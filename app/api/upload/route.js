import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const TYPES_AUTORISES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const TAILLE_MAX = 5 * 1024 * 1024; // 5 Mo

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const formData = await request.formData();
  const fichier = formData.get("fichier");

  if (!fichier || fichier.size === 0) {
    return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
  }

  if (!TYPES_AUTORISES.includes(fichier.type)) {
    return NextResponse.json(
      { error: "Format non supporté. Utilisez JPG, PNG, WebP ou GIF." },
      { status: 400 }
    );
  }

  if (fichier.size > TAILLE_MAX) {
    return NextResponse.json(
      { error: "Fichier trop lourd (max 5 Mo)." },
      { status: 400 }
    );
  }

  const extension = fichier.name.split(".").pop().toLowerCase();
  const nomFichier = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
  const dossier = path.join(process.cwd(), "public", "images");

  await mkdir(dossier, { recursive: true });
  const buffer = Buffer.from(await fichier.arrayBuffer());
  await writeFile(path.join(dossier, nomFichier), buffer);

  return NextResponse.json({ url: `/images/${nomFichier}` });
}
