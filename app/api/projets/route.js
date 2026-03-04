import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getTousProjets, creerProjet } from "@/lib/projets";

export async function GET() {
  const projets = await getTousProjets();
  return NextResponse.json(projets);
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json();
  const projet = await creerProjet(body);
  return NextResponse.json(projet, { status: 201 });
}
