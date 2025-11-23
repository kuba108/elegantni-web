import bcrypt from "bcryptjs";
import { ValidationError } from "sequelize";
import { AdminUser, ensureAdminUserReady } from "@/models/AdminUser";
import { requireAdmin } from "@/lib/auth";
import {
  ADMIN_ALLOWED_ROLES,
  sanitizeAdminUser,
} from "@/lib/admin-users";

function mapErrorToResponse(error) {
  if (error.message === "Unauthorized") {
    return Response.json({ error: "Nepřihlášený uživatel." }, { status: 401 });
  }
  if (error.message === "Forbidden") {
    return Response.json(
      { error: "Nemáte oprávnění k této akci." },
      { status: 403 }
    );
  }
  if (error instanceof ValidationError) {
    return Response.json({ error: error.message }, { status: 400 });
  }
  return null;
}

export async function GET() {
  try {
    await requireAdmin({ role: "admin" });
    await ensureAdminUserReady();
    const users = await AdminUser.findAll({
      order: [["createdAt", "DESC"]],
    });
    return Response.json({ users: users.map(sanitizeAdminUser) });
  } catch (error) {
    console.error("Failed to list admin users", error);
    const mapped = mapErrorToResponse(error);
    if (mapped) return mapped;
    return Response.json(
      { error: "Nepodařilo se načíst administrátory." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await requireAdmin({ role: "admin" });
    await ensureAdminUserReady();

    const body = await request.json();
    const { email, password, name, role = "admin" } = body ?? {};

    if (!email || !password) {
      return Response.json(
        { error: "Email i heslo jsou povinné." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return Response.json(
        { error: "Heslo musí mít alespoň 8 znaků." },
        { status: 400 }
      );
    }

    if (!ADMIN_ALLOWED_ROLES.includes(role)) {
      return Response.json(
        { error: "Neplatná role uživatele." },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    let user;
    try {
      user = await AdminUser.create({
        email: email.toLowerCase(),
        password_hash: passwordHash,
        name: name?.trim() || null,
        role,
        is_active: true,
      });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return Response.json(
          { error: "Uživatel s tímto emailem již existuje." },
          { status: 409 }
        );
      }
      throw error;
    }

    return Response.json(
      { user: sanitizeAdminUser(user) },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create admin user", error);
    const mapped = mapErrorToResponse(error);
    if (mapped) return mapped;
    return Response.json(
      { error: "Nepodařilo se vytvořit administrátora." },
      { status: 500 }
    );
  }
}
