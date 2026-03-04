import fs from "fs";
import path from "path";

// Local (dev sans token) → fichier JSON
// Production Vercel (avec BLOB_READ_WRITE_TOKEN) → Vercel Blob
const USE_BLOB = !!process.env.BLOB_READ_WRITE_TOKEN;
const LOCAL_FILE = path.join(process.cwd(), "data", "projets.json");
const BLOB_KEY = "projets";

// ── Lecture ──────────────────────────────────────────────

async function lireBlob() {
  console.log("[projets] lireBlob...");
  const { list } = await import("@vercel/blob");
  const { blobs } = await list({ prefix: BLOB_KEY, limit: 1 });
  console.log("[projets] blobs trouvés:", blobs.length);
  if (!blobs.length) return [];
  const res = await fetch(blobs[0].url, { cache: "no-store" });
  return await res.json();
}

function lireLocal() {
  try {
    return JSON.parse(fs.readFileSync(LOCAL_FILE, "utf-8"));
  } catch {
    return [];
  }
}

export async function lireProjets() {
  return USE_BLOB ? lireBlob() : lireLocal();
}

// ── Écriture ─────────────────────────────────────────────

async function ecrireProjets(projets) {
  if (USE_BLOB) {
    console.log("[projets] ecrireBlob, nb projets:", projets.length);
    const { put } = await import("@vercel/blob");
    const result = await put(BLOB_KEY, JSON.stringify(projets), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
    });
    console.log("[projets] blob écrit:", result.url);
  } else {
    fs.writeFileSync(LOCAL_FILE, JSON.stringify(projets, null, 2));
  }
}

// ── CRUD ─────────────────────────────────────────────────

export async function ajouterProjet(data) {
  const projets = await lireProjets();
  const nouveau = { id: Date.now(), ...data };
  await ecrireProjets([...projets, nouveau]);
  return nouveau;
}

export async function modifierProjet(id, data) {
  const projets = await lireProjets();
  const index = projets.findIndex((p) => p.id === id);
  if (index === -1) return null;
  projets[index] = { ...projets[index], ...data };
  await ecrireProjets(projets);
  return projets[index];
}

export async function supprimerProjet(id) {
  const projets = await lireProjets();
  await ecrireProjets(projets.filter((p) => p.id !== id));
}
