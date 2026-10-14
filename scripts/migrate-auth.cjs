const fs=require('node:fs');const {spawnSync}=require('node:child_process');
if(fs.existsSync('.env.local'))process.loadEnvFile('.env.local');
if(!process.env.DATABASE_URL||!process.env.BETTER_AUTH_SECRET)throw new Error('Configure o banco e o segredo em .env.local.');
const result=spawnSync(process.platform==='win32'?'npm.cmd':'npm',['exec','--package=auth','--','auth','migrate','--config','./auth-migration.ts'],{stdio:'inherit',shell:process.platform==='win32',env:process.env});process.exitCode=result.status??1;
