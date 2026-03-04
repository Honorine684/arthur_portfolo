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
  if (!estAdmin()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const projet = await ajouterProjet(body);
    return NextResponse.json(projet, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
