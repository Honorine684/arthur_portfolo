import fs from "fs";
import path from "path";

const USE_BLOB = !!process.env.BLOB_READ_WRITE_TOKEN;
const LOCAL_FILE = path.join(process.cwd(), "data", "projets.json");
const BLOB_KEY = "projets";

// ── Lecture ──────────────────────────────────────────────

async function lireBlob() {
  const { list, download } = await import("@vercel/blob");
  const { blobs } = await list({ prefix: BLOB_KEY, limit: 1 });
  if (!blobs.length) return [];
  // download() fonctionne avec stores public ET private
  const res = await download(blobs[0].url);
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
    const { put } = await import("@vercel/blob");
    // "private" : fonctionne avec stores public ET private
    await put(BLOB_KEY, JSON.stringify(projets), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
    });
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
