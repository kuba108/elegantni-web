#!/usr/bin/env node

import "dotenv/config";
import repl from "node:repl";
import process from "node:process";
import util from "node:util";
import { sequelize, verifyDatabaseConnection } from "../src/lib/sequelize.js";
import { AdminUser } from "../src/models/AdminUser.js";
import { ContactForm } from "../src/models/ContactForm.js";

function formatResult(value) {
  if (value && typeof value === "object" && typeof value.toJSON === "function") {
    return value.toJSON();
  }
  return value;
}

async function bootstrapConsole() {
  try {
    await verifyDatabaseConnection();
    console.log("Connected to database:", sequelize.config?.database);
  } catch (error) {
    console.error("Failed to connect to database:", error.message);
    process.exit(1);
  }

  const server = repl.start({
    prompt: "elegantni-web> ",
    useGlobal: true,
    writer(value) {
      return util.inspect(formatResult(value), {
        colors: true,
        depth: 3,
        compact: false,
      });
    },
  });

  server.context.sequelize = sequelize;
  server.context.AdminUser = AdminUser;
  server.context.ContactForm = ContactForm;

  server.on("exit", () => {
    sequelize?.close?.();
    process.exit(0);
  });
}

bootstrapConsole();
