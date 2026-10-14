import {toNextJsHandler} from 'better-auth/next-js';import {getAuth,authenticationConfigured} from '@/lib/server/auth';
async function handle(request:Request){if(!authenticationConfigured())return Response.json({message:'Autenticação ainda não configurada.'},{status:503});const handlers=toNextJsHandler(getAuth());return request.method==='GET'?handlers.GET(request):handlers.POST(request);}
export const GET=handle;export const POST=handle;
