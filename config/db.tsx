import * as schema from './schema'
//export const db = drizzle(sql,{schema});
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon('postgresql://neondb_owner:npg_mV4a3yFIhPDu@ep-soft-sun-a578kw77-pooler.us-east-2.aws.neon.tech/ai-kids-story-builder?sslmode=require');
export const db = drizzle({ client: sql });
