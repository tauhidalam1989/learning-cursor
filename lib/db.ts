// Lazily require @prisma/client so the project can build even when the package
// hasn't been installed yet (temporary fallback). Recommended: install
// @prisma/client and run `npx prisma generate`.
let PrismaClient: any;
try {
  // Use require to avoid TypeScript/ESM resolution errors during build when the
  // package is missing.
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
  const pkg = require('@prisma/client');
  PrismaClient = pkg?.PrismaClient;
} catch {
  PrismaClient = undefined;
}

declare global {
  // eslint-disable-next-line no-var
  var prisma: any | undefined;
}

let prisma: any;

if (PrismaClient) {
  prisma = global.prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
  }
} else {
  // Lightweight stub to allow builds to succeed. Any runtime usage will throw
  // a clear error instructing to install @prisma/client.
  const handler = {
    get() {
      throw new Error(
        "@prisma/client is not installed. Install it and run `npx prisma generate`."
      );
    },
    apply() {
      throw new Error(
        "@prisma/client is not installed. Install it and run `npx prisma generate`."
      );
    },
  };
  prisma = new Proxy(() => {}, handler);
}

export default prisma;

