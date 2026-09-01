import { Link } from 'react-router-dom';
import { BrandMark } from './BrandMark';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="site-footer__lead">
          <BrandMark />
          <p>Feito para mover.<br />Desenhado para permanecer.</p>
        </div>

        <div className="site-footer__links">
          <div>
            <h2>Loja</h2>
            <Link to="/colecao">Coleção</Link>
            <Link to="/colecao?genero=feminino">Feminino</Link>
            <Link to="/colecao?genero=masculino">Masculino</Link>
            <Link to="/colecao?badge=novo">Novidades</Link>
          </div>
          <div>
            <h2>Suporte</h2>
            <Link to="/ajuda/entregas">Entregas</Link>
            <Link to="/ajuda/trocas">Trocas & devoluções</Link>
            <Link to="/ajuda/medidas">Guia de medidas</Link>
            <a href="mailto:contato@lumewear.example">Contato</a>
          </div>
          <div>
            <h2>Projeto</h2>
            <Link to="/ajuda/sobre">Sobre a Lume</Link>
            <Link to="/ajuda/privacidade">Privacidade</Link>
            <span>Marca fictícia</span>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} Lume Wear.</p>
          <p>E-commerce demonstrativo criado para portfólio. Nenhuma compra ou cobrança é realizada.</p>
          <p className="site-footer__credit">Software Developer Leonardo de Paula</p>
        </div>
      </div>
    </footer>
  );
}
