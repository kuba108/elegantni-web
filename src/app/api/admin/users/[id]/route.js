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

export async function PATCH(request, { params }) {
  try {
    await requireAdmin({ role: "admin" });
    await ensureAdminUserReady();

    const { id } = params;
    if (!id) {
      return Response.json({ error: "Chybí ID uživatele." }, { status: 400 });
    }

    const user = await AdminUser.findByPk(id);
    if (!user) {
      return Response.json({ error: "Uživatel nenalezen." }, { status: 404 });
    }

    const payload = await request.json();
    const updates = {};

    if (Object.prototype.hasOwnProperty.call(payload, "name")) {
      updates.name = payload.name?.trim() || null;
    }

    if (Object.prototype.hasOwnProperty.call(payload, "role")) {
      if (!ADMIN_ALLOWED_ROLES.includes(payload.role)) {
        return Response.json(
          { error: "Neplatná role uživatele." },
          { status: 400 }
        );
      }
      updates.role = payload.role;
    }

    if (Object.prototype.hasOwnProperty.call(payload, "is_active")) {
      updates.is_active = Boolean(payload.is_active);
      if (!updates.is_active) {
        updates.session_token = null;
        updates.session_expires_at = null;
      }
    }

    if (payload.password) {
      if (payload.password.length < 8) {
        return Response.json(
          { error: "Heslo musí mít alespoň 8 znaků." },
          { status: 400 }
        );
      }
      updates.password_hash = await bcrypt.hash(payload.password, 12);
    }

    if (Object.keys(updates).length === 0) {
      return Response.json(
        { error: "Nejsou vyplněna žádná data ke změně." },
        { status: 400 }
      );
    }

    await user.update(updates);
    return Response.json({ user: sanitizeAdminUser(user) });
  } catch (error) {
    console.error("Failed to update admin user", error);
    const mapped = mapErrorToResponse(error);
    if (mapped) return mapped;
    return Response.json(
      { error: "Úprava uživatele se nezdařila." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const currentAdmin = await requireAdmin({ role: "admin" });
    await ensureAdminUserReady();

    const { id } = params;
    if (!id) {
      return Response.json({ error: "Chybí ID uživatele." }, { status: 400 });
    }

    const user = await AdminUser.findByPk(id);
    if (!user) {
      return Response.json({ error: "Uživatel nenalezen." }, { status: 404 });
    }

    if (user.id === currentAdmin.id) {
      return Response.json(
        { error: "Nemůžete odstranit svůj vlastní účet." },
        { status: 400 }
      );
    }

    await user.destroy();
    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to delete admin user", error);
    const mapped = mapErrorToResponse(error);
    if (mapped) return mapped;
    return Response.json(
      { error: "Smazání uživatele se nezdařilo." },
      { status: 500 }
    );
  }
}
