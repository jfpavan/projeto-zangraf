import {betterAuth} from 'better-auth';
import {Pool} from 'pg';
if(!process.env.DATABASE_URL||!process.env.BETTER_AUTH_SECRET)throw new Error('Configure .env.local antes da migração.');
export const auth=betterAuth({database:new Pool({connectionString:process.env.DATABASE_URL}),secret:process.env.BETTER_AUTH_SECRET,baseURL:process.env.BETTER_AUTH_URL,emailAndPassword:{enabled:true,minPasswordLength:12,maxPasswordLength:128},rateLimit:{enabled:true,storage:'database'}});
