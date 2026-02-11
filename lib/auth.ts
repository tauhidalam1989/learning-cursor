import crypto from 'crypto';
import prisma from './db';

/**
 * Authentication helper utilities (server-side).
 *
 * Purpose:
 * - Provide hashing and verification utilities using built-in Node crypto (no extra deps).
 * - Small session token helpers used by future auth/session endpoints.
 * - These helpers intentionally do not implement HTTP endpoints or UI.
 *
 * How the admin panel will plug in later:
 * - The admin UI will call secure server routes (e.g. /api/admin/users) which use
 *   these helpers and Prisma models (User, Account, Session) to manage accounts.
 * - Role-based access control: the admin UI should check `user.role` (admin/editor/viewer)
 *   and the backend should enforce permissions using RolePermission entries.
 *
 * Security notes:
 * - Use a secure, slow hash (scrypt/argon2/bcrypt) for passwords. We use scrypt here
 *   via Node's crypto.scrypt for a dependency-free default. In high-security production,
 *   consider Argon2 via a native library.
 */

const SCRYPT_KEYLEN = 64;
const SCRYPT_COST = 16384; // N param - tuned for CPU / memory; adjust for your environment

function randomHex(bytes = 32) {
  return crypto.randomBytes(bytes).toString('hex');
}

export async function hashPassword(password: string) {
  const salt = randomHex(16);
  const derived = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, SCRYPT_KEYLEN, { N: SCRYPT_COST }, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(derivedKey);
    });
  });
  return `${salt}:${derived.toString('hex')}`;
}

export async function verifyPassword(password: string, stored: string) {
  if (!stored) return false;
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const derived = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, SCRYPT_KEYLEN, { N: SCRYPT_COST }, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(derivedKey);
    });
  });
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), derived);
}

/** Create a session token and persist a Session record. */
export async function createSessionForUser(userId: number, expiresInHours = 24) {
  const sessionToken = randomHex(32);
  const expires = new Date(Date.now() + expiresInHours * 60 * 60 * 1000);
  // Persist session via Prisma (will throw if Prisma client isn't available)
  await prisma.session.create({
    data: {
      sessionToken,
      userId,
      expires,
    },
  });
  return { sessionToken, expires };
}

/** Revoke a session by token */
export async function revokeSession(sessionToken: string) {
  await prisma.session.deleteMany({ where: { sessionToken } });
}

/** Find user by email (helper for auth endpoints) */
export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

/** Create user (admin panel will call this via secure server endpoints) */
export async function createUser({ email, name, password, role = 'viewer' }: { email: string; name?: string; password?: string; role?: string }) {
  const data: any = { email, name, role };
  if (password) {
    data.hashedPassword = await hashPassword(password);
  }
  return prisma.user.create({ data });
}

export default {
  hashPassword,
  verifyPassword,
  createSessionForUser,
  revokeSession,
  findUserByEmail,
  createUser,
};

