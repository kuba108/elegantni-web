import bcrypt from "bcryptjs";
import { AdminUser, ensureAdminUserReady } from "@/models/AdminUser";
import { createAdminSession } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body ?? {};

    if (!email || !password) {
      return Response.json(
        { error: "Email i heslo jsou povinné." },
        { status: 400 }
      );
    }

    await ensureAdminUserReady();

    const admin = await AdminUser.findOne({ where: { email } });
    if (!admin || !admin.is_active) {
      return Response.json(
        { error: "Nesprávné přihlašovací údaje." },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(
      password,
      admin.password_hash
    );

    if (!isValidPassword) {
      return Response.json(
        { error: "Nesprávné přihlašovací údaje." },
        { status: 401 }
      );
    }

    await createAdminSession(admin);

    return Response.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login failed", error);
    return Response.json(
      { error: "Nepodařilo se přihlásit. Zkuste to prosím znovu." },
      { status: 500 }
    );
  }
}
