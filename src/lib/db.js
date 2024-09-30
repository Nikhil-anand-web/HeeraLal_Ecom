import { PrismaClient } from '@prisma/client';

let db;

if (process.env.APP_ENV === 'PROD') {
  db = new PrismaClient(); // For production, create a new instance
} else {
  if (!global.db) {
    global.db = new PrismaClient(); // Store in global for development
  }
  db = global.db; // Use the global instance in development
}

export default db;


