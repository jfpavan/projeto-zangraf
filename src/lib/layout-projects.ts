import type { Configuration } from './products';
export type LayoutName = 'inteira' | 'dupla' | 'quatro';
export type Photo = { id: string; name: string; blob: Blob };
export type Slot = { photoId: string | null; x: number; y: number };
export type Spread = { id: string; layout: LayoutName; slots: Slot[] };
export type LayoutProject = { id: string; name: string; updatedAt: string; photos: Photo[]; spreads: Spread[]; productId?: string; configuration?: Configuration; cartItemId?: string };
export function rectangles(layout: LayoutName) {
 if (layout === 'inteira') return [{x:0,y:0,w:1,h:1}];
 if (layout === 'dupla') return [{x:0,y:0,w:.5,h:1},{x:.5,y:0,w:.5,h:1}];
 return [{x:0,y:0,w:.5,h:.5},{x:.5,y:0,w:.5,h:.5},{x:0,y:.5,w:.5,h:.5},{x:.5,y:.5,w:.5,h:.5}];
}
export function changeLayout(spread: Spread, layout: LayoutName): Spread { return {...spread,layout,slots:rectangles(layout).map((_,i)=>spread.slots[i]||{photoId:null,x:50,y:50})}; }
function database(): Promise<IDBDatabase> { return new Promise((resolve,reject)=>{const request=indexedDB.open('zangraf-projects-v1',1);request.onupgradeneeded=()=>request.result.createObjectStore('projects',{keyPath:'id'});request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(new Error('Não foi possível abrir os projetos locais.'));}); }
async function operation<T>(mode: IDBTransactionMode, action:(store:IDBObjectStore)=>IDBRequest<T>):Promise<T>{const db=await database();return new Promise((resolve,reject)=>{const tx=db.transaction('projects',mode);const request=action(tx.objectStore('projects'));let result:T;request.onsuccess=()=>{result=request.result};tx.oncomplete=()=>{db.close();resolve(result)};tx.onerror=()=>{db.close();reject(new Error('Não foi possível salvar ou carregar o projeto.'))};tx.onabort=()=>{db.close();reject(new Error('Operação cancelada pelo navegador.'))};});}
export function saveProject(project:LayoutProject){return operation('readwrite',store=>store.put(project));}
export function loadProject(id:string){return operation<LayoutProject|undefined>('readonly',store=>store.get(id));}
export async function listProjects(){const projects=await operation<LayoutProject[]>('readonly',store=>store.getAll());return projects.sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt));}

export function removePhoto(project: LayoutProject, photoId: string): LayoutProject {
 return {...project, photos:project.photos.filter(p=>p.id!==photoId),spreads:project.spreads.map(s=>({...s,slots:s.slots.map(slot=>slot.photoId===photoId?{photoId:null,x:50,y:50}:slot)}))};
}
export function duplicateSpread(project: LayoutProject, index: number): LayoutProject {
 if(!project.spreads[index]||project.spreads.length>=20)throw new Error('Não foi possível duplicar a lâmina.');
 const spreads=[...project.spreads];const source=spreads[index];spreads.splice(index+1,0,{...source,id:crypto.randomUUID(),slots:source.slots.map(slot=>({...slot}))});return {...project,spreads};
}
export function removeSpread(project: LayoutProject,index:number):LayoutProject {
 if(project.spreads.length<=1||!project.spreads[index])throw new Error('O projeto precisa de pelo menos uma lâmina.');
 return {...project,spreads:project.spreads.filter((_,i)=>i!==index)};
}
export function copyProject(project:LayoutProject):LayoutProject {
 const {cartItemId: _cart, ...original}=project;
 return {...original,id:crypto.randomUUID(),name:(project.name||'Meu álbum')+' — cópia',updatedAt:new Date().toISOString(),spreads:project.spreads.map(s=>({...s,id:crypto.randomUUID(),slots:s.slots.map(slot=>({...slot}))}))};
}
