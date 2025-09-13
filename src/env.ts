import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const getEnvVariable = (name: string) => {
  // Check that the environment variable is defined
  const variable = process.env[name];
  if (!variable) throw new Error(`Missing env var: ${name}`);

  return variable;
};

export const PORT = Number(process.env.PORT ?? 3000);
export const SESSION_SECRET = getEnvVariable("SESSION_SECRET");

export const DB_USER = getEnvVariable("DB_USER");
export const DB_PASSWORD = getEnvVariable("DB_PASSWORD");
export const DB_NAME = getEnvVariable("DB_NAME");
export const DB_HOST = process.env.DB_HOST ?? "localhost";
export const DB_PORT = Number(process.env.DB_PORT ?? 5432);
