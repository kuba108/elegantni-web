import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function AdminLoginPage() {
  const admin = await getCurrentAdmin();
  if (admin) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden px-4 py-16">
      <LoginBackground />
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10 space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            Elegantniweb Admin
          </p>
          <h1 className="text-4xl font-semibold">Přihlášení</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

function LoginBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-20 left-10 w-96 h-96 bg-purple-600/20 blur-[200px]" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-blue-500/20 blur-[180px]" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-emerald-500/20 blur-[200px]" />
    </div>
  );
}
