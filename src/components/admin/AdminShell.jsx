'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Heart } from "lucide-react";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Objednávky" },
  { href: "/admin/slots", label: "Termíny" },
  { href: "/admin/users", label: "Uživatelé" },
];

export default function AdminShell({ children, admin }) {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <BackgroundGlow />
      <div className="relative z-10 flex flex-col md:flex-row min-h-screen">
        <aside className="w-full md:w-72 bg-black/40 border-b md:border-b-0 md:border-r border-white/10 backdrop-blur-3xl">
          <div className="p-8 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/40">
                Blixo
              </p>
              <h1 className="text-3xl font-semibold mt-2">Admin</h1>
            </div>
            {admin && (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 space-y-1">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Přihlášen
                </p>
                <p className="text-sm font-medium text-white">
                  {admin.name || admin.email}
                </p>
                <p className="text-xs text-white/50">{admin.email}</p>
              </div>
            )}
            <nav className="space-y-2">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </nav>
            <LogoutButton />
            
            <p className="text-xs text-gray-500 text-center mt-8">
              Vytvořil ElegantniWeb <Heart className="w-4 h-4 inline-block ml-1" />
              </p>
          </div>
        </aside>
        <main className="flex-1 p-6 md:p-10 bg-white/5 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto space-y-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

function NavLink({ href, label }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "block px-4 py-3 rounded-2xl border border-white/10 backdrop-blur-3xl transition",
        "hover:border-white/40 hover:bg-white/10",
        isActive && "border-white/60 bg-white/10 shadow-2xl"
      )}
    >
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login?from=" + encodeURIComponent(pathname);
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="w-full mt-6 px-4 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm text-white/80"
    >
      {loading ? "Odhlasuji…" : "Odhlásit se"}
    </button>
  );
}

function BackgroundGlow() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/30 blur-[160px]" />
      <div className="absolute top-1/3 -right-24 w-80 h-80 bg-cyan-500/20 blur-[140px]" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500/20 blur-[160px]" />
    </div>
  );
}
