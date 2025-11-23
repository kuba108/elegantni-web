import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize.js";

export const AdminUser = sequelize.define(
  "AdminUser",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(320),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: "admin",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    session_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
    session_expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    last_login_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "admin_users",
    underscored: true,
  }
);

const globalForAdminUser = globalThis;

function syncAdminUserModel() {
  if (!globalForAdminUser.__elegantni_admin_user_sync) {
    globalForAdminUser.__elegantni_admin_user_sync = AdminUser.sync();
  }
  return globalForAdminUser.__elegantni_admin_user_sync;
}

export function ensureAdminUserReady() {
  return syncAdminUserModel();
}
