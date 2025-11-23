import { Sequelize } from "sequelize";

const databaseUrl =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "Missing DATABASE_URL (or POSTGRES_URL/POSTGRES_DATABASE_URL). Configure the Postgres connection string."
  );
}

const shouldLog = process.env.NODE_ENV === "development";
const useSSL =
  process.env.DATABASE_SSL === "true" ||
  process.env.POSTGRES_SSL === "true" ||
  databaseUrl.includes("sslmode=require");

const dialectOptions = useSSL
  ? {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
  : undefined;

const globalForSequelize = globalThis;

export const sequelize =
  globalForSequelize.__elegantni_sequelize ||
  new Sequelize(databaseUrl, {
    dialect: "postgres",
    logging: shouldLog ? console.log : false,
    dialectOptions,
  });

if (!globalForSequelize.__elegantni_sequelize) {
  globalForSequelize.__elegantni_sequelize = sequelize;
}
