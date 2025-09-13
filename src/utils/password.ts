import crypto from "crypto";

const SALT_LENGTH = 16;

export const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(SALT_LENGTH).toString("hex");

  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return `${salt}${hash}`;
};

export const verifyPassword = (password: string, hashedPassword: string) => {
  const [salt, originalHash] = hashedPassword.split(":");

  if (!salt || !originalHash) return false;

  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return hash === originalHash;
};
