import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { lireProjets, ajouterProjet } from "@/lib/projets";

export const dynamic = "force-dynamic";

function estAdmin() {
  const cookie = cookies().get("admin_code");
  return cookie?.value === process.env.ADMIN_CODE;
}

export async function GET() {
  const projets = lireProjets();
  return NextResponse.json(projets);
}

export async function POST(request) {
  if (!estAdmin()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const body = await request.json();
  const projet = ajouterProjet(body);
  return NextResponse.json(projet, { status: 201 });
}
