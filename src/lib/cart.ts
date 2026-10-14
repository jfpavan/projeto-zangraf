import {parseProduct} from './product-validation';
import { products, type Configuration, type Product } from './products';
export type CartItem = { id: string; productId: string; configuration: Configuration; quantity: number; product?: Product; layoutProjectId?: string };
export const CART_KEY = 'zangraf-cart-v1';
export function validConfiguration(productId: string, value: Configuration, snapshot?: Product) {
 const p = snapshot || products.find(p => p.id === productId);
 return !!(p && value && p.options.sizes.includes(value.size) && p.options.sheets.includes(value.sheets) && p.options.covers.includes(value.cover) && p.options.finishes.includes(value.finish));
}
export function readCart(): CartItem[] {
 const stored = sessionStorage.getItem(CART_KEY);
 let raw: unknown;
 try { raw = JSON.parse(stored || '[]'); } catch { return []; }
 if (!Array.isArray(raw)) return [];
 return raw.filter((item): item is CartItem => !!item && typeof item.id === 'string' && validSnapshot(item) && validConfiguration(item.productId, item.configuration, item.product) && Number.isInteger(item.quantity) && item.quantity >= 1 && item.quantity <= 99);
}
export function writeCart(items: CartItem[]) { sessionStorage.setItem(CART_KEY, JSON.stringify(items)); if (typeof window !== 'undefined') window.dispatchEvent(new Event('zangraf-cart-change')); }
function validSnapshot(item: CartItem){if(!item.product)return true;try{return parseProduct(item.product).id===item.productId}catch{return false}}
export function addToCart(productOrId: string | Product, configuration: Configuration) {
 const product = typeof productOrId === 'string' ? products.find(p=>p.id===productOrId) : parseProduct(productOrId);
 const productId = typeof productOrId === 'string' ? productOrId : productOrId.id;
 if (!validConfiguration(productId, configuration, product)) throw new Error('Configuração inválida');
 const cart = readCart();
 const match = cart.find(i => i.productId === productId && (['size','sheets','cover','finish'] as const).every(key => i.configuration[key] === configuration[key]));
 if (match) { if (match.quantity >= 99) throw new Error('Limite de quantidade'); match.quantity += 1; }
 else cart.push({id: crypto.randomUUID(), productId, product, configuration, quantity: 1});
 writeCart(cart);
}
