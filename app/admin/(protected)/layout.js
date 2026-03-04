import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = { title: "Admin" };

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="border-b border-gray-800 px-6 h-14 flex items-center justify-between">
        <span className="text-white font-mono text-sm">
          admin<span className="text-emerald-400">.sig</span>
        </span>
        <a
          href="/api/auth/signout"
          className="text-gray-400 hover:text-white text-sm transition-colors"
        >
          Déconnexion
        </a>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
