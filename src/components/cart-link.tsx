'use client';
import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { ShoppingBag } from 'lucide-react';
import { readCart } from '@/lib/cart';
function subscribe(callback: () => void) {
 window.addEventListener('zangraf-cart-change', callback);
 window.addEventListener('storage', callback);
 return () => { window.removeEventListener('zangraf-cart-change', callback); window.removeEventListener('storage', callback); };
}
function getCount() { try { return readCart().reduce((total, item) => total + item.quantity, 0); } catch { return 0; } }
export function CartLink() {
 const count = useSyncExternalStore(subscribe, getCount, () => 0);
 return <Link href="/carrinho" className="cart-link" aria-label={count ? 'Carrinho, '+count+' álbuns' : 'Carrinho vazio'}><ShoppingBag size={20}/>{count > 0 && <span className="cart-count" aria-hidden="true">{count > 99 ? '99+' : count}</span>}</Link>;
}
