'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { products } from '@/lib/products';
import { readCart, writeCart, type CartItem } from '@/lib/cart';
import { AlbumArt } from './album-art';
export function Cart() {
 const [items, setItems] = useState<CartItem[]>([]);
 const [ready, setReady] = useState(false);
 const [error, setError] = useState('');
 useEffect(() => { try { setItems(readCart()); } catch { setError('Não foi possível carregar o carrinho nesta sessão.'); } setReady(true); }, []);
 function update(next: CartItem[]) { try { writeCart(next); setItems(next); setError(''); } catch { setError('Não foi possível atualizar o carrinho.'); } }
 if (!ready) return <p role="status">Carregando carrinho…</p>;
 return <>{error && <p role="alert">{error}</p>}{items.length ? <div className="cart-layout"><div>{items.map(item => { const product = item.product || products.find(p => p.id === item.productId)!; return <article className="cart-item" key={item.id}><AlbumArt color={product.color}/><div><h2>{product.name}</h2><p>{Object.values(item.configuration).join(' · ')}</p><p className="small">Produto demonstrativo · Preço a definir</p><Link className="text-link" href={'/diagramador?item='+encodeURIComponent(item.id)+(item.layoutProjectId?'&projeto='+encodeURIComponent(item.layoutProjectId):'')}>{item.layoutProjectId?'Abrir diagramação':'Diagramar álbum'}</Link><div className="quantity"><button aria-label={'Diminuir quantidade de '+product.name} disabled={item.quantity === 1} onClick={() => update(items.map(i => i.id === item.id ? {...i, quantity: i.quantity - 1} : i))}><Minus size={16}/></button><span aria-live="polite">{item.quantity}</span><button aria-label={'Aumentar quantidade de '+product.name} disabled={item.quantity === 99} onClick={() => update(items.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i))}><Plus size={16}/></button><button className="back" onClick={() => update(items.filter(i => i.id !== item.id))}><Trash2 size={16}/> Remover</button></div></div></article>; })}</div><aside className="order-summary"><h2>Resumo</h2><p>{items.reduce((sum, i) => sum + i.quantity, 0)} álbum(ns) configurado(s)</p><dl className="review"><div><dt>Produtos</dt><dd>A definir</dd></div><div><dt>Frete</dt><dd>A definir</dd></div><div><dt>Total</dt><dd>A definir</dd></div></dl><p className="small">Demonstração sem cobrança. As regras comerciais serão fornecidas pela Zangraf.</p><Link className="button" href="/revisar-pedido">Continuar compra <ArrowRight size={16}/></Link><Link className="text-link" href="/albuns">Escolher outro álbum</Link></aside></div> : <div className="empty"><h2>Seu carrinho está esperando uma história.</h2><p>Configure um álbum para começar.</p><Link className="button" href="/albuns">Explorar álbuns</Link></div>}</>;
}
export function OrderReview() {
 const [items, setItems] = useState<CartItem[]>([]); const [ready, setReady] = useState(false); const [error,setError]=useState('');
 useEffect(() => { try { setItems(readCart()); } catch { setError('Não foi possível ler o carrinho.'); } setReady(true); }, []);
 if (!ready) return <p role="status">Carregando revisão…</p>;
 return <div className="form-panel"><h2>{items.length ? 'Tudo pronto para a próxima etapa.' : 'Escolha um álbum para começar.'}</h2>{error && <p role="alert">{error}</p>}{items.map(i => <p key={i.id}><strong>{(i.product || products.find(p => p.id === i.productId))?.name} × {i.quantity}</strong><br/>{Object.values(i.configuration).join(' · ')}</p>)}<p>Esta é uma revisão demonstrativa. Nenhum pedido foi enviado. Finalização, frete e pagamento estarão disponíveis em uma etapa futura.</p><Link className="button" href={items.length ? '/carrinho' : '/albuns'}>{items.length ? 'Voltar ao carrinho' : 'Explorar álbuns'}</Link></div>;
}
