'use client';
import Link from 'next/link';
export default function ErrorPage({reset}:{reset:()=>void}) {
 return <section className="section empty"><h1>Vamos tentar novamente?</h1><p>Não foi possível carregar esta página.</p><div className="error-actions"><button className="button" onClick={reset}>Tentar novamente</button><Link className="text-link" href="/albuns">Voltar aos álbuns</Link></div></section>;
}
