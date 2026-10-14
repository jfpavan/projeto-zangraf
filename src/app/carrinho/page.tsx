import { Cart } from '@/components/cart';
export const metadata = { title: 'Carrinho' };
export default function Page() { return <section className="section"><span className="eyebrow">SEU ÁLBUM, DO SEU JEITO</span><h1>Seu carrinho.</h1><p>Confira seus álbuns e as configurações escolhidas.</p><Cart/></section>; }
