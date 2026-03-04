import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { modifierProjet, supprimerProjet } from "@/lib/projets";

export const dynamic = "force-dynamic";

function estAdmin() {
  const cookie = cookies().get("admin_code");
  return cookie?.value === process.env.ADMIN_CODE;
}

export async function PUT(request, { params }) {
  if (!estAdmin()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const id = parseInt(params.id);
  const body = await request.json();
  const projet = modifierProjet(id, body);
  if (!projet) {
    return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  }
  return NextResponse.json(projet);
}

export async function DELETE(request, { params }) {
  if (!estAdmin()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const id = parseInt(params.id);
  supprimerProjet(id);
  return NextResponse.json({ ok: true });
}
