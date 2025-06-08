import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './config/schema.tsx',
  dialect: 'postgresql',
  dbCredentials: {
    url:'postgresql://neondb_owner:npg_mV4a3yFIhPDu@ep-soft-sun-a578kw77-pooler.us-east-2.aws.neon.tech/ai-kids-story-builder?sslmode=require',
  },
});
