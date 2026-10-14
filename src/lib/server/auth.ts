import 'server-only';
import {betterAuth} from 'better-auth';import {nextCookies} from 'better-auth/next-js';import {headers} from 'next/headers';import {getDatabase,databaseConfigured} from './db';
export function authenticationConfigured(){return databaseConfigured()&&Boolean(process.env.BETTER_AUTH_SECRET&&process.env.BETTER_AUTH_URL);}
function createAuth(){if(!authenticationConfigured())throw new Error('Autenticação não configurada');return betterAuth({database:getDatabase(),secret:process.env.BETTER_AUTH_SECRET,baseURL:process.env.BETTER_AUTH_URL,emailAndPassword:{enabled:true,minPasswordLength:12,maxPasswordLength:128},rateLimit:{enabled:true,storage:'database'},plugins:[nextCookies()]});}
let instance:ReturnType<typeof createAuth>|undefined;
export function getAuth(){return instance??=createAuth();}
export async function getSession(){return authenticationConfigured()?getAuth().api.getSession({headers:await headers()}):null;}
export async function isAdmin(userId:string){const result=await getDatabase().query('SELECT user_id FROM zangraf_admins WHERE user_id=$1',[userId]);return result.rowCount===1;}
