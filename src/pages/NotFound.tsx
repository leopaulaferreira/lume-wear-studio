import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Seo } from '@/components/Seo';

export default function NotFound() {
  return (
    <Layout>
      <Seo title="Página não encontrada" description="A página procurada não existe na Lume Wear." noIndex />
      <section className="not-found page-shell">
        <p className="eyebrow">Erro / 404</p>
        <span aria-hidden="true">404</span>
        <h1>Fora da rota,<br />ainda em movimento.</h1>
        <p>A página que você procurou não existe ou mudou de endereço.</p>
        <div>
          <Link to="/colecao" className="button button--primary">Explorar coleção <ArrowRight aria-hidden="true" /></Link>
          <Link to="/" className="text-link">Voltar ao início</Link>
        </div>
      </section>
    </Layout>
  );
}
