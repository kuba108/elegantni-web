import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { getCurrentAdmin } from "@/lib/auth";

export default async function ProtectedAdminLayout({ children }) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const safeAdmin = {
    name: admin.name,
    email: admin.email,
    role: admin.role,
  };

  return <AdminShell admin={safeAdmin}>{children}</AdminShell>;
}
