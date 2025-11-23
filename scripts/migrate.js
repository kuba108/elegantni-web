/* eslint-env node */

import "dotenv/config";
import process from "node:process";
import { verifyDatabaseConnection } from "../src/lib/sequelize.js";
import { syncAdminUserModel } from "../src/models/AdminUser.js";
import { syncContactFormModel } from "../src/models/ContactForm.js";

async function migrate() {
  await verifyDatabaseConnection();
  await Promise.all([syncAdminUserModel(), syncContactFormModel()]);
  console.info("Database synced.");
  process.exit(0);
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
