# Lume Wear — Design System & Product Direction

## 1. Propósito deste documento

Este documento é a fonte única de verdade para o redesign do Lume Wear. Toda decisão visual, de conteúdo e de interação deve reforçar a mesma marca: uma etiqueta brasileira fictícia de performance e athleisure com linguagem editorial, urbana e precisa.

O produto deve parecer uma loja real. A fotografia lidera, a interface organiza e a tecnologia desaparece em favor de uma experiência direta, confiável e desejável.

## 2. Conceito da marca

**Lume Wear** cria peças para o intervalo entre treino, deslocamento e cidade. O nome parte de “lume” como energia interna: não uma luz decorativa, mas o impulso que mantém o corpo em movimento.

### Essência

- Performance sem aparência técnica excessiva.
- Design essencial, com recortes e materiais intencionais.
- Estilo urbano que funciona fora do treino.
- Minimalismo quente, humano e tátil.

### Promessa

**Movimento com intenção.**

### Território verbal

A voz da marca é curta, segura e concreta. Prefere verbos e sensações físicas a superlativos. Evita frases motivacionais genéricas, linguagem de academia e promessas impossíveis.

Exemplos:

- “Entre o ritmo e a pausa.”
- “Feito para mover. Desenhado para permanecer.”
- “Uma camada. Todos os trajetos.”
- “Corpo em ritmo. Cidade em movimento.”

## 3. Público-alvo

Pessoas de 24 a 40 anos, urbanas, digitalmente fluentes e interessadas em treino, bem-estar, design e consumo mais consciente. Compram menos peças, mas valorizam caimento, material, versatilidade e apresentação. Esperam conveniência de e-commerce sem abrir mão de uma experiência visual sofisticada.

O catálogo é inclusivo e organizado por uso e modelagem. Gênero permanece como filtro útil, nunca como único caminho de descoberta.

## 4. Direção artística

### Conceito visual: precisão em movimento

A direção combina fotografia de campanha com uma interface quase tipográfica. O contraste vem de escala, ritmo e enquadramento — não de sombras, gradientes ou ornamentos.

Características:

- fundos minerais, concreto claro, off-white e grafite;
- luz lateral controlada, com sombra definida e textura real;
- corpos em movimento ou em poses tensionadas, nunca “fitness stock”;
- grandes áreas de respiro e cortes editoriais;
- títulos condensados visualmente por peso, caixa alta e tracking;
- linhas finas e blocos de cor chapados como estrutura;
- laranja queimado usado como sinal, não como decoração.

Evitar:

- cenários de academia genéricos;
- equipamentos com marcas reais;
- poses artificiais de catálogo popular;
- gradientes chamativos, neon, glassmorphism e sombras difusas;
- excesso de cards, pills ou bordas arredondadas;
- imagens com estilos, castings e balanços de branco incompatíveis.

## 5. Assinatura visual

### Wordmark

A assinatura principal é tipográfica:

```text
LUME/WEAR
```

Em áreas estreitas, usa-se a versão empilhada:

```text
LUME
WEAR
```

Diretrizes:

- caixa alta;
- peso 700–800;
- tracking levemente negativo em `LUME` e positivo em `WEAR`;
- a barra é um gesto de direção e separação, não um ícone isolado;
- sempre monocromática: tinta sobre claro ou branco sobre escuro;
- sem símbolo de halter, raio, chama ou monograma genérico;
- área de proteção mínima equivalente à altura da letra `L`.

O wordmark deve ser texto/HTML sempre que possível, preservando nitidez, acessibilidade e carregamento.

## 6. Paleta

| Token | Cor | Uso |
| --- | --- | --- |
| `ink` | `#11110F` | Texto principal, botões, fundos de alto contraste |
| `graphite` | `#2A2A27` | Seções editoriais e superfícies escuras |
| `bone` | `#F4F1EB` | Fundo principal quente |
| `paper` | `#FCFBF8` | Superfícies elevadas sem sombra, inputs e drawer |
| `stone-100` | `#E7E3DC` | Divisores e estados neutros |
| `stone-300` | `#C7C1B8` | Bordas e estados desabilitados |
| `stone-500` | `#77736C` | Texto secundário |
| `signal` | `#D85832` | Destaque, progresso, foco comercial e microfeedback |
| `success` | `#2F6B4F` | Confirmações funcionais, uso restrito |
| `danger` | `#B93C31` | Erros e remoções |

Regras:

- O fundo da experiência é `bone`, não branco puro.
- `signal` ocupa no máximo cerca de 10% de uma tela.
- Cards de produto não ganham fundos coloridos; a própria fotografia fornece o campo visual.
- Contraste mínimo segue WCAG AA, incluindo estados de foco e texto secundário.

## 7. Tipografia

O sistema usa fontes do sistema para evitar bloqueio de rede e custo de carregamento.

- **Display e wordmark:** `Arial Narrow`, `Helvetica Neue`, `Arial`, sans-serif.
- **Interface e corpo:** `Inter`, `Helvetica Neue`, `Arial`, sans-serif.
- **Dados e pequenos labels:** mesma família da interface, com caixa alta e tracking controlado.

Escala fluida:

| Papel | Tamanho | Entrelinha | Peso |
| --- | --- | --- | --- |
| Hero | `clamp(3.5rem, 8.8vw, 8.5rem)` | `0.84` | 700 |
| Display de página | `clamp(2.5rem, 5vw, 5.5rem)` | `0.92` | 700 |
| Título de seção | `clamp(2rem, 3.4vw, 4rem)` | `0.98` | 650 |
| Título de produto | `clamp(1.8rem, 3vw, 3rem)` | `1.02` | 600 |
| Corpo grande | `1.125rem` | `1.55` | 400 |
| Corpo | `1rem` | `1.55` | 400 |
| UI | `0.875rem` | `1.4` | 500 |
| Label | `0.6875rem` | `1.2` | 650 |

Títulos podem usar caixa alta. Textos longos e nomes de produto usam caixa natural para leitura. Nunca aplicar uppercase a parágrafos.

## 8. Grid e containers

### Desktop amplo — 1440 px ou mais

- grid de 12 colunas;
- largura máxima: `1600px`;
- gutter externo: `56px`;
- gap: `24px`;
- hero pode ocupar a viewport inteira.

### Notebook — 1024 a 1439 px

- grid de 12 colunas;
- gutter externo: `32px`;
- gap: `20px`.

### Tablet — 768 a 1023 px

- grid de 8 colunas;
- gutter externo: `28px`;
- gap: `16px`;
- filtros deixam de ser sidebar e passam a drawer.

### Mobile — até 767 px

- grid de 4 colunas;
- gutter externo: `20px` em 375 px e `24px` em 430 px;
- gap: `12px`;
- nenhuma informação essencial depende de hover.

## 9. Spacing

Escala base de 4 px:

`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160`

Regras:

- seções editoriais: 96–160 px no desktop, 64–96 px no tablet, 56–72 px no mobile;
- distância entre label e campo: 8 px;
- distância entre blocos de formulário: 20–24 px;
- cards de produto usam 16 px entre imagem e conteúdo;
- espaços devem criar ritmo; não usar margens arbitrárias fora da escala.

## 10. Border radius, bordas e sombras

- Imagens e cards: `0–2px`.
- Botões e inputs: `0–2px`.
- Drawer e modal: sem radius no desktop; até `12px 12px 0 0` em sheet mobile inferior.
- Swatches, avatares e indicadores: `999px` quando a forma circular comunica função.
- Bordas: 1 px com `stone-100` ou `ink` em estados ativos.
- Sombras não definem hierarquia. Usar apenas no header fixo ou modal, com baixa opacidade.

## 11. Cards de produto

O card é editorial, não uma caixa.

- imagem em proporção 4:5;
- sem fundo, borda ou sombra ao redor do conjunto;
- badge pequeno no canto superior, com texto curto;
- segunda imagem aparece no hover em desktop;
- em hover, crossfade de imagem e deslocamento máximo de 4 px no texto;
- nome, categoria, preço e cores aparecem abaixo da imagem;
- avaliação fica na página de produto, evitando ruído no grid;
- estados de foco devem ser tão visíveis quanto hover;
- imagem usa `loading="lazy"`, dimensões estáveis e `object-position` específico por produto.

## 12. Botões

### Primário

- fundo `ink`, texto `paper`;
- altura 52 px no desktop e 56 px no mobile;
- texto de 12–13 px, peso 650, caixa alta e tracking `0.08em`;
- hover: fundo `signal` e leve deslocamento do ícone;
- active: pequena redução de escala (`0.99`);
- disabled: `stone-100` com texto `stone-500`, sem opacidade global.

### Secundário

- transparente, borda `ink`;
- hover inverte para `ink`/`paper`.

### Terciário

- texto + seta, sem caixa;
- sublinhado ou deslocamento de seta no hover.

Targets interativos nunca menores que 44 × 44 px.

## 13. Inputs e formulários

- label persistente acima do campo, sempre associado por `htmlFor`;
- altura mínima 54 px;
- fundo `paper`, borda `stone-300`;
- foco com borda `ink` e outline externo em `signal` de 2 px;
- placeholder apenas como exemplo, nunca como substituto do label;
- mensagens de erro abaixo, com ícone opcional e texto específico;
- agrupamentos relacionados usam `fieldset` e `legend`;
- autofill, teclado mobile e `autocomplete` são configurados corretamente;
- validação acontece ao avançar de etapa e depois acompanha a edição.

## 14. Fotografia

### Linguagem

Uma única campanha visual: estúdio arquitetônico mineral, concreto/off-white, luz lateral de fim de manhã, sombras firmes, contraste moderado e textura real de pele e tecido. Casting adulto diverso, expressão segura e movimento contido.

### Enquadramentos por produto

1. **Campanha:** corpo inteiro ou plano americano, gesto de movimento e ambiente visível.
2. **Frente:** modelagem legível, pose neutra e fundo mineral.
3. **Costas/lateral:** construção, recortes e caimento.
4. **Detalhe:** tecido, costura, bolso, fechamento ou textura.

### Padronização técnica

- produto: 4:5, entrega preferencial em WebP;
- hero/editorial: 16:10 ou 3:2 com área negativa planejada para copy;
- balanço de branco quente e neutro;
- sem logos de terceiros, texto, watermark ou equipamentos de marca;
- tratamento de cor uniforme, pretos preservando textura;
- arquivo final deve equilibrar nitidez e peso, idealmente abaixo de 250 KB por imagem de produto;
- `srcset` não é obrigatório nesta versão, mas todas as imagens têm proporção definida, lazy loading e prioridade apenas quando above the fold.

## 15. Navbar e navegação

### Desktop

- announcement bar discreta acima do header;
- wordmark à esquerda;
- links: Coleção, Masculino, Feminino, Novidades;
- ações: busca real no catálogo e carrinho;
- conta é omitida enquanto não houver fluxo real;
- no topo da Home, versão sobreposta ao hero; após scroll, fundo `paper` translúcido, blur leve, altura reduzida e texto `ink`;
- em páginas internas, fundo sólido desde o início.

### Mobile

- wordmark compacto;
- busca, carrinho e botão de menu sempre acessíveis;
- drawer de navegação ocupa a tela com hierarquia tipográfica grande;
- fecha com botão, `Escape`, clique no overlay e mudança de rota;
- foco fica contido e retorna ao acionador.

## 16. Home

Sequência recomendada:

1. Hero de campanha em tela cheia com headline curta e um CTA dominante.
2. Lançamentos em grid de produto assimétrico.
3. Navegação por universos: Run / Train / Transit.
4. Editorial “Entre o ritmo e a pausa”, com fotografia em escala e texto mínimo.
5. Best sellers.
6. Manifesto de materiais e construção.
7. Benefícios comerciais: frete, troca e pagamento demonstrativo.
8. Newsletter com confirmação local.
9. Footer global.

O hero usa “CORPO EM RITMO.” / “CIDADE EM MOVIMENTO.” como direção principal. Não sobrepor grandes blocos de texto ao rosto ou à peça.

## 17. Coleção

- cabeçalho amplo com título, descrição e contagem;
- toolbar com ordenação, filtros e visualização;
- sidebar apenas em desktop amplo;
- drawer de filtros em tablet/mobile;
- filtros: categoria, gênero, preço, cor e tamanho;
- chips resumem filtros ativos e permitem remoção individual;
- ordenação: destaques, novidades, menor preço, maior preço e melhor avaliados;
- grid: 4 colunas em desktop amplo, 3 em notebook, 2 em tablet/mobile e 1 apenas abaixo de 360 px;
- estado vazio oferece limpar filtros;
- URL deve refletir entradas de navegação como gênero e coleção.

## 18. Produto

### Desktop

- galeria ocupa aproximadamente 60% da largura;
- fotos em grid 2 × 2 ou foco principal com thumbnails conforme quantidade;
- painel de compra sticky;
- nome, categoria, preço, parcelamento, avaliação, cor, tamanho, estoque, quantidade e CTA;
- acordeões: detalhes, material & cuidado, entrega & trocas;
- guia de tamanhos em modal acessível;
- relacionados ao final.

### Mobile

- galeria horizontal com snap, paginação e thumbnails opcionais;
- conteúdo de compra em uma coluna;
- CTA permanece próximo da seleção, sem cobrir conteúdo;
- nenhuma miniatura estreita a imagem principal.

Zoom é discreto e só existe onde cursor/precisão permitem. Em touch, a prioridade é swipe e tap.

## 19. Carrinho

- drawer acessível com `role="dialog"`, nome, foco contido e scroll lock;
- item mostra imagem, nome, cor, tamanho, quantidade, preço unitário e subtotal;
- remoção é clara e anunciada;
- quantidade respeita estoque fictício;
- barra de progresso comunica o valor restante para frete grátis;
- feedback de adição usa região `aria-live` e o próprio drawer — sem mensagens concorrentes atrás dele;
- checkout e continuar comprando têm hierarquia distinta;
- estado vazio inclui contexto e CTA para a coleção.

## 20. Checkout

Fluxo demonstrativo:

`Informações → Entrega → Pagamento → Confirmação`

- shell mais focado, com wordmark, selo de ambiente seguro demonstrativo e retorno à loja;
- stepper numerado mostra atual, concluído e futuro;
- não permite avançar sem campos obrigatórios válidos;
- oferece voltar sem perder dados;
- resumo sticky no desktop e colapsável no mobile;
- entrega padrão e expressa são simuladas;
- pagamento aceita apenas dados fictícios e explica claramente que não há cobrança real;
- finalização mostra pedido simulado e permite voltar à Home;
- nenhuma integração real de pagamento ou backend.

## 21. Microinterações

- duração curta: 160–240 ms para controles, 350–500 ms para imagens e páginas;
- easing principal: `cubic-bezier(0.22, 1, 0.36, 1)`;
- hover de produto usa crossfade, não zoom agressivo;
- header muda após 24–40 px de scroll;
- adicionar ao carrinho gera confirmação visual e anúncio assistivo;
- páginas entram com fade e deslocamento máximo de 12 px;
- skeleton só aparece se houver atraso perceptível; não simular loading desnecessário;
- nunca ocultar conteúdo essencial com `opacity: 0` sem fallback.

### Movimento reduzido

Com `prefers-reduced-motion: reduce`:

- animações e smooth scroll são removidos;
- imagens trocam sem crossfade;
- drawers mantêm apenas mudança instantânea de estado;
- nenhum conteúdo começa invisível.

## 22. Responsividade

Breakpoints de validação obrigatória:

- **375 px:** navegação, filtros, galeria, checkout e targets confortáveis.
- **430 px:** aproveitamento do espaço sem aumentar densidade demais.
- **768 px:** transição para tablet; nenhum sidebar fixo.
- **1024 px:** grid de 3 colunas e PDP equilibrada sem compressão.
- **1440 px:** escala editorial, respiro e uso integral do grid.

Critérios:

- sem scroll horizontal;
- headings não quebram em palavras isoladas;
- imagens preservam foco do produto;
- ações essenciais ficam na primeira sequência de leitura;
- drawers e modais cabem na altura disponível e têm áreas roláveis internas;
- teclado virtual não esconde campos críticos.

## 23. Acessibilidade

- landmarks semânticos: header, nav, main, section, aside e footer;
- um `h1` por página e hierarquia de headings contínua;
- skip link no início da página;
- foco visível e consistente;
- alt descreve peça, cor e enquadramento sem repetir o nome mecanicamente;
- controles de cor e tamanho expõem nome, seleção e indisponibilidade;
- ícones decorativos são ocultos de tecnologias assistivas;
- overlays têm foco contido, `Escape` e retorno de foco;
- mensagens dinâmicas usam `aria-live` com parcimônia;
- estados nunca dependem apenas de cor.

## 24. Performance e SEO visual

- rotas podem ser carregadas sob demanda para reduzir o bundle inicial;
- remover providers, bibliotecas e componentes não utilizados;
- imagens below the fold usam lazy loading e `decoding="async"`;
- hero usa prioridade e dimensões estáveis;
- nenhuma fonte remota bloqueante;
- título e descrição variam por rota/produto;
- Open Graph usa asset próprio da campanha;
- favicon e theme color seguem a marca;
- HTML usa `lang="pt-BR"`;
- conteúdo essencial permanece disponível sem depender de animação.

## 25. Princípio de decisão

Quando houver dúvida entre adicionar um elemento e ampliar o respiro, ampliar o respiro. Quando houver dúvida entre efeito e clareza, escolher clareza. Quando houver dúvida entre aparência técnica e sensação de produto real, escolher o comportamento que uma loja real precisaria sustentar.
