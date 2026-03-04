import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getProjetParId, mettreAJourProjet, supprimerProjet } from "@/lib/projets";

export async function GET(request, { params }) {
  const id = parseInt(params.id);
  const projet = await getProjetParId(id);
  if (!projet) {
    return NextResponse.json({ error: "Projet introuvable" }, { status: 404 });
  }
  return NextResponse.json(projet);
}

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const id = parseInt(params.id);
  const body = await request.json();
  const projet = await mettreAJourProjet(id, body);
  return NextResponse.json(projet);
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const id = parseInt(params.id);
  await supprimerProjet(id);
  return NextResponse.json({ ok: true });
}
