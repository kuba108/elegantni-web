'use server';

import crypto from "node:crypto";
import { cookies } from "next/headers";
import { Op } from "sequelize";
import { AdminUser, ensureAdminUserReady } from "@/models/AdminUser";

const SESSION_COOKIE_NAME = "admin_session";
const DEFAULT_SESSION_TTL = 60 * 60 * 24 * 7; // 7 days

const sessionTtl =
  Number.parseInt(process.env.ADMIN_SESSION_TTL ?? "", 10) ||
  DEFAULT_SESSION_TTL;

const cookieBaseOptions = {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
  secure: process.env.NODE_ENV === "production",
};

function setSessionCookie(token, expiresAt) {
  cookies().set(SESSION_COOKIE_NAME, token, {
    ...cookieBaseOptions,
    expires: expiresAt,
    maxAge: sessionTtl,
  });
}

export async function createAdminSession(admin) {
  await ensureAdminUserReady();
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + sessionTtl * 1000);

  await admin.update({
    session_token: token,
    session_expires_at: expiresAt,
    last_login_at: new Date(),
  });

  setSessionCookie(token, expiresAt);

  return { token, expiresAt };
}

export async function clearAdminSession() {
  await ensureAdminUserReady();
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (token) {
    await AdminUser.update(
      { session_token: null, session_expires_at: null },
      { where: { session_token: token } }
    );
  }
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getCurrentAdmin() {
  await ensureAdminUserReady();
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const admin = await AdminUser.findOne({
    where: {
      session_token: token,
      is_active: true,
      session_expires_at: {
        [Op.gt]: new Date(),
      },
    },
  });

  if (!admin) {
    cookies().delete(SESSION_COOKIE_NAME);
    return null;
  }

  return admin;
}

export async function requireAdmin(options = {}) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    throw new Error("Unauthorized");
  }
  if (options.role && admin.role !== options.role) {
    throw new Error("Forbidden");
  }
  return admin;
}
