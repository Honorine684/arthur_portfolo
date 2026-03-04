import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { lireProjets, ajouterProjet } from "@/lib/projets";

export const dynamic = "force-dynamic";

function estAdmin() {
  const cookie = cookies().get("admin_code");
  return cookie?.value === process.env.ADMIN_CODE;
}

export async function GET() {
  try {
    const projets = await lireProjets();
    return NextResponse.json(projets);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  console.log("[POST /api/projets] début");
  if (!estAdmin()) {
    console.log("[POST /api/projets] non autorisé");
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const body = await request.json();
    console.log("[POST /api/projets] body reçu:", JSON.stringify(body).slice(0, 200));
    console.log("[POST /api/projets] USE_BLOB:", !!process.env.BLOB_READ_WRITE_TOKEN);
    const projet = await ajouterProjet(body);
    console.log("[POST /api/projets] projet créé, id:", projet.id);
    return NextResponse.json(projet, { status: 201 });
  } catch (e) {
    console.error("[POST /api/projets] ERREUR:", e.message, e.stack);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
