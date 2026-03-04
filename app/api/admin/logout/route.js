import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("admin_code");
  return NextResponse.redirect(new URL("/admin", process.env.NEXTAUTH_URL || "http://localhost:3000"));
}
