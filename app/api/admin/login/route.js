import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  const { code } = await request.json();

  if (code !== process.env.ADMIN_CODE) {
    return NextResponse.json({ error: "Code incorrect" }, { status: 401 });
  }

  cookies().set("admin_code", code, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
    path: "/",
  });

  return NextResponse.json({ ok: true });
}
