import { ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Seo } from '@/components/Seo';

const content = {
  entregas: {
    eyebrow: 'Suporte / 01',
    title: 'Entregas',
    intro: 'Prazos claros para você planejar o próximo movimento.',
    sections: [
      ['Quando meu pedido seria enviado?', 'Neste projeto demonstrativo, os pedidos não são enviados. Em uma operação real, a separação aconteceria em 1–2 dias úteis após a confirmação.'],
      ['Quais opções aparecem no checkout?', 'Entrega padrão em 5–7 dias úteis e express em 2–3 dias úteis. O frete padrão é gratuito acima de R$ 499.'],
      ['Existe rastreamento?', 'O fluxo está preparado para receber um código de rastreio em uma futura integração de pedidos.'],
    ],
  },
  trocas: {
    eyebrow: 'Suporte / 02',
    title: 'Trocas & devoluções',
    intro: 'Uma experiência simples também depois da escolha.',
    sections: [
      ['Qual seria o prazo?', 'A política fictícia considera solicitações em até 30 dias corridos após o recebimento.'],
      ['Como a peça deve estar?', 'Sem sinais de uso, com etiquetas e embalagem original. Este projeto não recebe solicitações reais.'],
      ['Como começar?', 'Em uma versão comercial, a área de pedidos iniciaria a logística reversa. Aqui, o conteúdo demonstra a experiência prevista.'],
    ],
  },
  medidas: {
    eyebrow: 'Suporte / 03',
    title: 'Guia de medidas',
    intro: 'O tamanho certo começa com uma medida confortável, sem apertar o corpo.',
    sections: [
      ['Parte superior', 'Meça o contorno do tórax na região de maior volume. A cintura deve ser medida na parte mais estreita.'],
      ['Parte inferior', 'Meça o quadril na parte mais larga e compare com a tabela disponível em cada página de produto.'],
      ['Entre dois tamanhos?', 'Consulte a indicação de caimento da peça. Para compressão menor, prefira o tamanho maior.'],
    ],
  },
  privacidade: {
    eyebrow: 'Projeto / Legal',
    title: 'Privacidade',
    intro: 'Este showcase foi construído para demonstrar produto e interface, não para coletar dados.',
    sections: [
      ['Quais dados são salvos?', 'Apenas os itens do carrinho ficam no armazenamento local do seu navegador para manter a seleção entre visitas.'],
      ['E os formulários?', 'Busca, newsletter e checkout funcionam como demonstração. Os valores digitados não são enviados a servidores.'],
      ['Cookies e analytics', 'O projeto não instala cookies de publicidade nem ferramentas de análise por padrão.'],
    ],
  },
  sobre: {
    eyebrow: 'Projeto / Conceito',
    title: 'Sobre a Lume',
    intro: 'Uma marca fictícia criada para explorar o encontro entre performance, design e cidade.',
    sections: [
      ['Movimento com intenção', 'A Lume propõe um sistema enxuto de peças técnicas para treino, recuperação e deslocamento urbano.'],
      ['Identidade original', 'Nome, direção de arte, catálogo, conteúdo e imagens foram desenvolvidos para este projeto de portfólio.'],
      ['Escopo', 'Trata-se de uma experiência frontend. Estoque, avaliações, entrega e checkout são simulações sem operação comercial.'],
    ],
  },
} as const;

export default function InfoPage() {
  const { topic = '' } = useParams<{ topic: string }>();
  const page = content[topic as keyof typeof content];

  if (!page) {
    return (
      <Layout>
        <section className="info-page page-shell"><h1>Conteúdo não encontrado.</h1><Link to="/" className="text-link">Voltar ao início</Link></section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Seo title={page.title} description={page.intro} noIndex={topic === 'privacidade'} />
      <article className="info-page page-shell">
        <header><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.intro}</p></header>
        <div className="info-page__sections">
          {page.sections.map(([title, body], index) => <section key={title}><span>0{index + 1}</span><div><h2>{title}</h2><p>{body}</p></div></section>)}
        </div>
        <aside><p>Não encontrou o que procurava?</p><a href="mailto:contato@lumewear.example" className="text-link">Falar com o suporte demonstrativo <ArrowRight aria-hidden="true" /></a></aside>
      </article>
    </Layout>
  );
}
