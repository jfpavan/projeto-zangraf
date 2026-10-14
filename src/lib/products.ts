export type Product = { id: string; name: string; category: string; color: string; description: string; options: { sizes: string[]; sheets: string[]; covers: string[]; finishes: string[] } };
export const products: Product[] = [
{id:'essencial',name:'Essencial',category:'Clássicos',color:'#c7b79b',description:'Uma composição leve, com a beleza das formas simples.',options:{sizes:['Quadrado','Horizontal'],sheets:['15 lâminas','20 lâminas'],covers:['Linho','Capa fotográfica'],finishes:['Fosco','Acetinado']}},
{id:'memoria',name:'Memória',category:'Contemporâneos',color:'#52614f',description:'Textura e personalidade para histórias que ficam.',options:{sizes:['Quadrado','Vertical'],sheets:['20 lâminas','25 lâminas'],covers:['Linho'],finishes:['Fosco']}},
{id:'atemporal',name:'Atemporal',category:'Clássicos',color:'#a37661',description:'Uma presença marcante, em uma proposta elegante.',options:{sizes:['Horizontal','Quadrado'],sheets:['15 lâminas','25 lâminas'],covers:['Tecido','Capa fotográfica'],finishes:['Fosco','Brilhante']}}
];
export type Configuration = { size: string; sheets: string; cover: string; finish: string };
export type AlbumProject = { id: string; productId: string; configuration: Configuration; layoutProjectId?: string; orderId?: string };
// Valores e regras comerciais serão fornecidos pela Zangraf.
export function getQuote(_product: Product, _configuration: Configuration): null { return null; }
