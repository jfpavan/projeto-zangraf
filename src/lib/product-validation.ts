import type {Product} from './products';
export function parseProduct(value:unknown):Product{
 if(!value||typeof value!=='object')throw new Error('Modelo inválido');const p=value as Record<string,unknown>;
 const text=(key:string,max:number)=>{const v=p[key];if(typeof v!=='string'||!v.trim()||v.length>max)throw new Error('Campo inválido: '+key);return v.trim()};
 const id=text('id',80);if(!/^[a-zA-Z0-9_-]+$/.test(id))throw new Error('Identificador inválido');const color=text('color',7);if(!/^#[0-9a-fA-F]{6}$/.test(color))throw new Error('Cor inválida');
 const raw=p.options;if(!raw||typeof raw!=='object')throw new Error('Opções ausentes');const options={} as Product['options'];for(const key of ['sizes','sheets','covers','finishes'] as const){const list=(raw as Record<string,unknown>)[key];if(!Array.isArray(list)||!list.length||list.length>30||list.some(v=>typeof v!=='string'||!v.trim()||v.length>100))throw new Error('Opções inválidas: '+key);options[key]=[...new Set(list.map(v=>(v as string).trim()))];}
 return {id,name:text('name',100),category:text('category',100),description:text('description',500),color,options};
}
