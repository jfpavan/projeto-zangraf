const fs=require('node:fs');const {Pool}=require('pg');
if(fs.existsSync('.env.local'))process.loadEnvFile('.env.local');
if(!process.env.DATABASE_URL)throw new Error('DATABASE_URL não configurada.');
const pool=new Pool({connectionString:process.env.DATABASE_URL});
(async()=>{try{await pool.query(fs.readFileSync('database/001-commerce.sql','utf8'));console.log('Estrutura comercial criada. Cadastre o catálogo pela administração.');}finally{await pool.end();}})().catch(()=>{console.error('Falha ao preparar o banco. Verifique conexão e migração de autenticação.');process.exitCode=1;});
