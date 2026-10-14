import 'server-only';
import { Pool } from 'pg';
let pool: Pool | undefined;
export function databaseConfigured(){return Boolean(process.env.DATABASE_URL);}
export function getDatabase(){if(!process.env.DATABASE_URL)throw new Error('Banco de dados não configurado');return pool??=new Pool({connectionString:process.env.DATABASE_URL,max:5,connectionTimeoutMillis:5000,idleTimeoutMillis:10000});}
