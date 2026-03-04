import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const TYPES_AUTORISES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const TAILLE_MAX = 5 * 1024 * 1024;

function estAdmin() {
  const cookie = cookies().get("admin_code");
  return cookie?.value === process.env.ADMIN_CODE;
}

export async function POST(request) {
  if (!estAdmin()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const formData = await request.formData();
  const fichier = formData.get("fichier");

  if (!fichier || fichier.size === 0) {
    return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
  }
  if (!TYPES_AUTORISES.includes(fichier.type)) {
    return NextResponse.json({ error: "Format non supporté (JPG, PNG, WebP, GIF)." }, { status: 400 });
  }
  if (fichier.size > TAILLE_MAX) {
    return NextResponse.json({ error: "Fichier trop lourd (max 5 Mo)." }, { status: 400 });
  }

  const ext = fichier.name.split(".").pop().toLowerCase();
  const nom = `images/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  // Production (Vercel) → Vercel Blob
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    const blob = await put(nom, fichier, { access: "public" });
    return NextResponse.json({ url: blob.url });
  }

  // Développement local → filesystem
  const { writeFile, mkdir } = await import("fs/promises");
  const path = await import("path");
  const dossier = path.join(process.cwd(), "public", "images");
  await mkdir(dossier, { recursive: true });
  await writeFile(
    path.join(dossier, nom.replace("images/", "")),
    Buffer.from(await fichier.arrayBuffer())
  );
  return NextResponse.json({ url: `/${nom}` });
}
