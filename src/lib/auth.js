import crypto from "node:crypto";
import process from "node:process";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { Op } from "sequelize";
import { AdminUser, ensureAdminUserReady } from "../models/AdminUser.js";

const SESSION_COOKIE = "admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
const DEFAULT_EMAIL = process.env.ADMIN_DEFAULT_EMAIL;
const DEFAULT_PASSWORD = process.env.ADMIN_DEFAULT_PASSWORD;

export function hashPassword(plain) {
  const saltRounds = 12;
  return bcrypt.hash(plain, saltRounds);
}

export function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

export async function getCurrentAdmin() {
  await ensureAdminUserReady();
  const store = cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return AdminUser.findOne({
    where: {
      session_token: token,
      is_active: true,
      session_expires_at: {
        [Op.gt]: new Date(),
      },
    },
  });
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

export async function startAdminSession(user) {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  user.session_token = token;
  user.session_expires_at = expiresAt;
  await user.save();

  const store = cookies();
  store.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function endAdminSession() {
  const store = cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    await AdminUser.update(
      { session_token: null, session_expires_at: null },
      { where: { session_token: token } }
    );
  }
  store.delete(SESSION_COOKIE);
}

export function canUseEnvAdmin() {
  return Boolean(DEFAULT_EMAIL && DEFAULT_PASSWORD);
}

export async function verifyEnvAdmin(email, password) {
  if (!canUseEnvAdmin()) return false;
  if (email !== DEFAULT_EMAIL) return false;
  return password === DEFAULT_PASSWORD;
}

export async function createAdminSession(admin) {
  return startAdminSession(admin);
}

export async function clearAdminSession() {
  return endAdminSession();
}
