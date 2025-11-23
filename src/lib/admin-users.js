export const ADMIN_ALLOWED_ROLES = ["admin", "manager"];

export function sanitizeAdminUser(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    is_active: user.is_active,
    last_login_at: user.last_login_at,
    created_at: user.createdAt,
    updated_at: user.updatedAt,
  };
}
