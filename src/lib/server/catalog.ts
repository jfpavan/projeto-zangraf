import 'server-only';import {products,type Product} from '@/lib/products';import {getDatabase,databaseConfigured} from './db';
export async function getProducts():Promise<Product[]>{if(!databaseConfigured())return products;const result=await getDatabase().query('SELECT data FROM zangraf_products WHERE active=true ORDER BY created_at');return result.rows.map(row=>row.data as Product);}
export async function getProduct(id:string){return (await getProducts()).find(p=>p.id===id);}
