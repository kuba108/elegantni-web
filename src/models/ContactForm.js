import { DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize.js";

export const ContactForm = sequelize.define(
  "ContactForm",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(160),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(320),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
    service_interest: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    processed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    processed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    processed_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    tableName: "contact_forms",
    underscored: true,
  }
);

const globalForContactForm = globalThis;

export function syncContactFormModel() {
  if (!globalForContactForm.__elegantni_contact_form_sync) {
    globalForContactForm.__elegantni_contact_form_sync =
      ContactForm.sync();
  }
  return globalForContactForm.__elegantni_contact_form_sync;
}

export function ensureContactFormReady() {
  return syncContactFormModel();
}
