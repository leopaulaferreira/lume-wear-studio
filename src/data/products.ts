import type {
  FilterOption,
  PriceRangeId,
  Product,
  ProductCategory,
  ProductColor,
  ProductGender,
  ProductImage,
  ProductVariant,
} from '@/types/product';

import airCampaign from '@/assets/catalog/air-01-campaign.webp';
import airClayCampaign from '@/assets/catalog/air-clay-01-campaign.webp';
import airInkCampaign from '@/assets/catalog/air-ink-01-campaign.webp';
import airFront from '@/assets/catalog/air-02-front.webp';
import airBack from '@/assets/catalog/air-03-back.webp';
import airDetail from '@/assets/catalog/air-04-detail.webp';
import axisCampaign from '@/assets/catalog/axis-01-campaign.webp';
import axisBoneCampaign from '@/assets/catalog/axis-bone-01-campaign.webp';
import axisClayCampaign from '@/assets/catalog/axis-clay-01-campaign.webp';
import axisFront from '@/assets/catalog/axis-02-front.webp';
import axisBack from '@/assets/catalog/axis-03-back.webp';
import axisDetail from '@/assets/catalog/axis-04-detail.webp';
import formCampaign from '@/assets/catalog/form-01-campaign.webp';
import formClayCampaign from '@/assets/catalog/form-clay-01-campaign.webp';
import formInkCampaign from '@/assets/catalog/form-ink-01-campaign.webp';
import formFront from '@/assets/catalog/form-02-front.webp';
import formBack from '@/assets/catalog/form-03-back.webp';
import formDetail from '@/assets/catalog/form-04-detail.webp';
import frameCampaign from '@/assets/catalog/frame-01-campaign.webp';
import frameBoneCampaign from '@/assets/catalog/frame-bone-01-campaign.webp';
import frameInkCampaign from '@/assets/catalog/frame-ink-01-campaign.webp';
import frameFront from '@/assets/catalog/frame-02-front.webp';
import frameBack from '@/assets/catalog/frame-03-back.webp';
import frameDetail from '@/assets/catalog/frame-04-detail.webp';
import pulseCampaign from '@/assets/catalog/pulse-01-campaign.webp';
import pulseGraphiteCampaign from '@/assets/catalog/pulse-graphite-01-campaign.webp';
import pulseStoneCampaign from '@/assets/catalog/pulse-stone-01-campaign.webp';
import pulseFront from '@/assets/catalog/pulse-02-front.webp';
import pulseBack from '@/assets/catalog/pulse-03-back.webp';
import pulseDetail from '@/assets/catalog/pulse-04-detail.webp';
import shieldCampaign from '@/assets/catalog/shield-01-campaign.webp';
import shieldBoneCampaign from '@/assets/catalog/shield-bone-01-campaign.webp';
import shieldOliveCampaign from '@/assets/catalog/shield-olive-01-campaign.webp';
import shieldFront from '@/assets/catalog/shield-02-front.webp';
import shieldBack from '@/assets/catalog/shield-03-back.webp';
import shieldDetail from '@/assets/catalog/shield-04-detail.webp';
import transitCampaign from '@/assets/catalog/transit-01-campaign.webp';
import transitInkCampaign from '@/assets/catalog/transit-ink-01-campaign.webp';
import transitStoneCampaign from '@/assets/catalog/transit-stone-01-campaign.webp';
import transitFront from '@/assets/catalog/transit-02-front.webp';
import transitBack from '@/assets/catalog/transit-03-back.webp';
import transitDetail from '@/assets/catalog/transit-04-detail.webp';
import vectorCampaign from '@/assets/catalog/vector-01-campaign.webp';
import vectorGraphiteCampaign from '@/assets/catalog/vector-graphite-01-campaign.webp';
import vectorFront from '@/assets/catalog/vector-02-front.webp';
import vectorBack from '@/assets/catalog/vector-03-back.webp';
import vectorDetail from '@/assets/catalog/vector-04-detail.webp';

export const colors = {
  ink: { id: 'ink', name: 'Preto tinta', hex: '#151514' },
  graphite: { id: 'graphite', name: 'Grafite', hex: '#353532' },
  bone: { id: 'bone', name: 'Osso', hex: '#EFEAE0' },
  stone: { id: 'stone', name: 'Pedra', hex: '#A99F93' },
  clay: { id: 'clay', name: 'Argila', hex: '#8A4C3F' },
  olive: { id: 'olive', name: 'Oliva mineral', hex: '#444A3F' },
} satisfies Record<string, ProductColor>;

/** Keeps every color independently gallery-ready, with a safe base-gallery fallback. */
const createVariants = (
  availableColors: ProductColor[],
  gallery: ProductImage[],
  galleriesByColor: Partial<Record<string, ProductImage[]>> = {},
): ProductVariant[] =>
  availableColors.map((color) => ({
    color,
    images: galleriesByColor[color.id] ?? gallery,
    usesImageFallback: !galleriesByColor[color.id] && color.id !== availableColors[0]?.id,
  }));

export const products: Product[] = [
  {
    id: '1',
    sku: 'LW-AX-101',
    name: 'Camiseta Axis',
    subtitle: 'Jersey técnico respirável',
    price: 189,
    rating: 4.8,
    reviewCount: 342,
    category: 'camisetas',
    gender: 'unissex',
    activities: ['train', 'transit'],
    variants: createVariants(
      [colors.ink, colors.bone, colors.clay],
      [
        { src: axisCampaign, alt: 'Atleta veste Camiseta Axis preta em cenário arquitetônico' },
        { src: axisFront, alt: 'Vista frontal da Camiseta Axis preta' },
        { src: axisBack, alt: 'Vista posterior da Camiseta Axis preta' },
        { src: axisDetail, alt: 'Detalhe do tecido e costura raglan da Camiseta Axis' },
      ],
      {
        bone: [{ src: axisBoneCampaign, alt: 'Atleta veste Camiseta Axis na cor osso' }],
        clay: [{ src: axisClayCampaign, alt: 'Atleta veste Camiseta Axis na cor argila' }],
      },
    ),
    sizes: ['P', 'M', 'G', 'GG', 'XGG'],
    stockBySize: { P: 8, M: 14, G: 9, GG: 4, XGG: 3 },
    badge: 'best-seller',
    description:
      'Uma camiseta de treino com presença urbana. O jersey frio acompanha o movimento sem aderir ao corpo e mantém a superfície seca nos trajetos mais longos.',
    benefits: ['Jersey de secagem rápida', 'Construção raglan', 'Controle de odor', 'Toque frio e macio'],
    composition: '88% poliamida reciclada, 12% elastano.',
    care: 'Lavar à máquina em ciclo delicado e secar à sombra. Não usar amaciante.',
    fit: 'Modelagem atlética levemente solta. Escolha seu tamanho habitual.',
    relatedIds: ['2', '6', '7', '4'],
  },
  {
    id: '2',
    sku: 'LW-TR-204',
    name: 'Calça Transit',
    subtitle: 'Jogger técnico de quatro vias',
    price: 349,
    rating: 4.9,
    reviewCount: 186,
    category: 'calcas',
    gender: 'masculino',
    activities: ['transit', 'train'],
    variants: createVariants(
      [colors.graphite, colors.ink, colors.stone],
      [
        { src: transitCampaign, alt: 'Atleta em movimento veste Calça Transit grafite' },
        { src: transitFront, alt: 'Vista frontal da Calça Transit grafite' },
        { src: transitBack, alt: 'Vista posterior da Calça Transit grafite' },
        { src: transitDetail, alt: 'Detalhe do bolso com zíper e joelho articulado da Calça Transit' },
      ],
      {
        ink: [{ src: transitInkCampaign, alt: 'Atleta veste Calça Transit em preto tinta' }],
        stone: [{ src: transitStoneCampaign, alt: 'Atleta veste Calça Transit na cor pedra' }],
      },
    ),
    sizes: ['P', 'M', 'G', 'GG', 'XGG'],
    stockBySize: { P: 6, M: 11, G: 12, GG: 5, XGG: 2 },
    badge: 'essencial',
    description:
      'A peça de passagem entre treino e cidade. Construção articulada, tecido silencioso e bolsos seguros em uma silhueta limpa e afunilada.',
    benefits: ['Elasticidade em quatro direções', 'Joelhos articulados', 'Bolsos com zíper', 'Tecido repelente à água'],
    composition: '86% poliamida reciclada, 14% elastano.',
    care: 'Lavar do avesso em água fria. Não passar sobre áreas seladas.',
    fit: 'Corte afunilado com cintura regular. Entre tamanhos, prefira o maior.',
    relatedIds: ['1', '7', '6', '4'],
  },
  {
    id: '3',
    sku: 'LW-FR-307',
    name: 'Moletom Frame',
    subtitle: 'Camada cropped estruturada',
    price: 329,
    rating: 4.7,
    reviewCount: 118,
    category: 'moletons',
    gender: 'feminino',
    activities: ['transit'],
    variants: createVariants(
      [colors.stone, colors.ink, colors.bone],
      [
        { src: frameCampaign, alt: 'Atleta veste Moletom Frame pedra durante alongamento' },
        { src: frameFront, alt: 'Vista frontal do Moletom Frame pedra' },
        { src: frameBack, alt: 'Vista posterior do Moletom Frame pedra' },
        { src: frameDetail, alt: 'Detalhe do capuz e acabamento do Moletom Frame' },
      ],
      {
        ink: [{ src: frameInkCampaign, alt: 'Atleta veste Moletom Frame em preto tinta' }],
        bone: [{ src: frameBoneCampaign, alt: 'Atleta veste Moletom Frame na cor osso' }],
      },
    ),
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    stockBySize: { PP: 4, P: 8, M: 13, G: 7, GG: 3 },
    badge: 'novo',
    description:
      'Volume controlado e comprimento preciso. O Frame cria uma camada térmica compacta para aquecimento, recuperação e rotina urbana.',
    benefits: ['Moletom de alta gramatura', 'Capuz de dupla camada', 'Interior escovado', 'Punhos anatômicos'],
    composition: '74% algodão certificado, 20% poliéster reciclado, 6% elastano.',
    care: 'Lavar com cores similares e secar na horizontal para preservar a forma.',
    fit: 'Modelagem cropped e ampla nos ombros. Escolha seu tamanho habitual.',
    relatedIds: ['8', '5', '7', '2'],
  },
  {
    id: '4',
    sku: 'LW-AI-412',
    name: 'Regata Air',
    subtitle: 'Knit leve de ventilação mapeada',
    price: 159,
    rating: 4.8,
    reviewCount: 267,
    category: 'regatas',
    gender: 'unissex',
    activities: ['run', 'train'],
    variants: createVariants(
      [colors.bone, colors.ink, colors.clay],
      [
        { src: airCampaign, alt: 'Atleta veste Regata Air clara em estúdio mineral' },
        { src: airFront, alt: 'Vista frontal da Regata Air clara' },
        { src: airBack, alt: 'Vista posterior da Regata Air clara' },
        { src: airDetail, alt: 'Detalhe da trama ventilada e cava da Regata Air' },
      ],
      {
        ink: [{ src: airInkCampaign, alt: 'Atleta veste Regata Air em preto tinta' }],
        clay: [{ src: airClayCampaign, alt: 'Atleta veste Regata Air na cor argila' }],
      },
    ),
    sizes: ['P', 'M', 'G', 'GG', 'XGG'],
    stockBySize: { P: 9, M: 16, G: 12, GG: 6, XGG: 4 },
    badge: 'novo',
    description:
      'Ventilação onde o corpo mais pede. A construção leve combina zonas perfuradas e caimento reto para treinos intensos sem excesso visual.',
    benefits: ['Ventilação mapeada', 'Secagem ultrarrápida', 'Proteção UV 50+', 'Construção sem atrito'],
    composition: '91% poliamida reciclada, 9% elastano.',
    care: 'Lavar em saco protetor, ciclo suave e sem amaciante.',
    fit: 'Caimento reto e respirável. Escolha seu tamanho habitual.',
    relatedIds: ['6', '1', '2', '7'],
  },
  {
    id: '5',
    sku: 'LW-PU-518',
    name: 'Top Pulse',
    subtitle: 'Suporte firme de baixo volume',
    price: 219,
    rating: 4.9,
    reviewCount: 421,
    category: 'tops',
    gender: 'feminino',
    activities: ['train', 'run'],
    variants: createVariants(
      [colors.ink, colors.graphite, colors.stone],
      [
        { src: pulseCampaign, alt: 'Atleta veste Top Pulse preto em pose de recuperação' },
        { src: pulseFront, alt: 'Vista frontal do Top Pulse preto' },
        { src: pulseBack, alt: 'Vista posterior com alças cruzadas do Top Pulse' },
        { src: pulseDetail, alt: 'Detalhe da alça e costura do Top Pulse' },
      ],
      {
        graphite: [{ src: pulseGraphiteCampaign, alt: 'Atleta veste Top Pulse grafite' }],
        stone: [{ src: pulseStoneCampaign, alt: 'Atleta veste Top Pulse na cor pedra' }],
      },
    ),
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    stockBySize: { PP: 5, P: 9, M: 14, G: 6, GG: 3 },
    badge: 'best-seller',
    description:
      'Suporte estável com desenho reduzido ao essencial. Alças amplas e base contínua distribuem a pressão durante treinos de médio e alto impacto.',
    benefits: ['Suporte médio-alto', 'Alças largas cruzadas', 'Base contínua', 'Tecido de dupla densidade'],
    composition: '76% poliamida reciclada, 24% elastano.',
    care: 'Lavar à mão ou em ciclo delicado dentro de saco protetor. Secar à sombra.',
    fit: 'Ajuste firme. Para menor compressão, escolha um tamanho acima.',
    relatedIds: ['8', '3', '6', '4'],
  },
  {
    id: '6',
    sku: 'LW-VE-621',
    name: 'Short Vector',
    subtitle: 'Running 2 em 1',
    price: 199,
    rating: 4.7,
    reviewCount: 156,
    category: 'shorts',
    gender: 'unissex',
    activities: ['run', 'train'],
    variants: createVariants(
      [colors.ink, colors.graphite],
      [
        { src: vectorCampaign, alt: 'Atleta veste Short Vector preto em avanço lateral' },
        { src: vectorFront, alt: 'Vista frontal do Short Vector preto' },
        { src: vectorBack, alt: 'Vista posterior do Short Vector preto' },
        { src: vectorDetail, alt: 'Detalhe da camada dupla e abertura lateral do Short Vector' },
      ],
      {
        graphite: [{ src: vectorGraphiteCampaign, alt: 'Atleta veste Short Vector grafite' }],
      },
    ),
    sizes: ['P', 'M', 'G', 'GG'],
    stockBySize: { P: 7, M: 15, G: 8, GG: 4 },
    badge: 'novo',
    description:
      'Duas camadas, uma leitura limpa. A parte interna estabiliza; a externa libera amplitude e inclui um bolso selado para o essencial.',
    benefits: ['Construção 2 em 1', 'Bolso traseiro selado', 'Abertura lateral', 'Cós de secagem rápida'],
    composition: 'Externo: 100% poliéster reciclado. Interno: 78% poliamida, 22% elastano.',
    care: 'Lavar em água fria e secar à sombra. Não passar.',
    fit: 'Comprimento de 17 cm com camada interna ajustada.',
    relatedIds: ['4', '1', '2', '7'],
  },
  {
    id: '7',
    sku: 'LW-SH-729',
    name: 'Jaqueta Shield',
    subtitle: 'Shell urbano impermeável',
    price: 549,
    rating: 4.8,
    reviewCount: 94,
    category: 'jaquetas',
    gender: 'unissex',
    activities: ['run', 'transit'],
    variants: createVariants(
      [colors.ink, colors.olive, colors.bone],
      [
        { src: shieldCampaign, alt: 'Atleta veste Jaqueta Shield preta em estúdio arquitetônico' },
        { src: shieldFront, alt: 'Vista frontal da Jaqueta Shield preta' },
        { src: shieldBack, alt: 'Vista posterior da Jaqueta Shield preta' },
        { src: shieldDetail, alt: 'Detalhe do zíper impermeável e tecido ripstop da Jaqueta Shield' },
      ],
      {
        olive: [{ src: shieldOliveCampaign, alt: 'Atleta veste Jaqueta Shield oliva mineral' }],
        bone: [{ src: shieldBoneCampaign, alt: 'Atleta veste Jaqueta Shield na cor osso' }],
      },
    ),
    sizes: ['P', 'M', 'G', 'GG'],
    stockBySize: { P: 3, M: 7, G: 5, GG: 2 },
    badge: 'essencial',
    description:
      'Proteção de baixo peso para clima instável. A Shield combina ripstop fosco, costuras seladas e ventilação posterior em uma forma compactável.',
    benefits: ['Coluna d’água de 10.000 mm', 'Costuras críticas seladas', 'Corta-vento', 'Compactável no próprio bolso'],
    composition: '100% poliamida reciclada com membrana respirável livre de PFC.',
    care: 'Lavar fechada, em ciclo técnico, sem amaciante. Reativar a repelência com baixa temperatura.',
    fit: 'Corte regular para acomodar uma camada leve por baixo.',
    relatedIds: ['2', '8', '1', '6'],
  },
  {
    id: '8',
    sku: 'LW-FO-834',
    name: 'Legging Form',
    subtitle: 'Compressão responsiva de cintura alta',
    price: 289,
    rating: 4.9,
    reviewCount: 534,
    category: 'leggings',
    gender: 'feminino',
    activities: ['train', 'run'],
    variants: createVariants(
      [colors.graphite, colors.ink, colors.clay],
      [
        { src: formCampaign, alt: 'Atleta em movimento veste Legging Form grafite' },
        { src: formFront, alt: 'Vista frontal da Legging Form grafite' },
        { src: formBack, alt: 'Vista posterior da Legging Form grafite' },
        { src: formDetail, alt: 'Detalhe da cintura e costuras ergonômicas da Legging Form' },
      ],
      {
        ink: [{ src: formInkCampaign, alt: 'Atleta veste Legging Form em preto tinta' }],
        clay: [{ src: formClayCampaign, alt: 'Atleta veste Legging Form na cor argila' }],
      },
    ),
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    stockBySize: { PP: 4, P: 10, M: 15, G: 7, GG: 3 },
    badge: 'best-seller',
    description:
      'Compressão que responde sem restringir. A cintura alta estabiliza e as linhas ergonômicas acompanham a musculatura em diferentes intensidades.',
    benefits: ['Compressão responsiva', 'Cintura alta estável', 'Tecido opaco', 'Costuras planas'],
    composition: '74% poliamida reciclada, 26% elastano.',
    care: 'Lavar do avesso em ciclo delicado e sem amaciante. Secar naturalmente.',
    fit: 'Ajuste compressivo. Escolha seu tamanho habitual.',
    relatedIds: ['5', '3', '7', '4'],
  },
];

export const categories: FilterOption<ProductCategory>[] = [
  { label: 'Camisetas', value: 'camisetas' },
  { label: 'Calças', value: 'calcas' },
  { label: 'Moletons', value: 'moletons' },
  { label: 'Regatas', value: 'regatas' },
  { label: 'Tops', value: 'tops' },
  { label: 'Shorts', value: 'shorts' },
  { label: 'Jaquetas', value: 'jaquetas' },
  { label: 'Leggings', value: 'leggings' },
];

export const priceRanges: Array<FilterOption<PriceRangeId> & { min: number; max: number }> = [
  { label: 'Até R$ 200', value: '0-200', min: 0, max: 200 },
  { label: 'R$ 200 — R$ 300', value: '200-300', min: 200, max: 300 },
  { label: 'R$ 300 — R$ 450', value: '300-450', min: 300, max: 450 },
  { label: 'Acima de R$ 450', value: '450-plus', min: 450, max: Number.POSITIVE_INFINITY },
];

export const genders: FilterOption<ProductGender>[] = [
  { label: 'Feminino', value: 'feminino' },
  { label: 'Masculino', value: 'masculino' },
  { label: 'Unissex', value: 'unissex' },
];

export const colorOptions: ProductColor[] = [
  colors.ink,
  colors.graphite,
  colors.bone,
  colors.stone,
  colors.clay,
  colors.olive,
];

export const sizeOptions = ['PP', 'P', 'M', 'G', 'GG', 'XGG'];

export const getProductById = (id: string) => products.find((product) => product.id === id);

export const getProductVariant = (product: Product, colorId?: string): ProductVariant => {
  const variant =
    product.variants.find((item) => item.color.id === colorId) ?? product.variants[0];

  if (!variant) throw new Error(`Produto ${product.id} não possui variantes.`);
  return variant;
};

export const getProductColors = (product: Product) =>
  product.variants.map((variant) => variant.color);

export const getPrimaryProductImage = (product: Product, colorId?: string): ProductImage => {
  const image = getProductVariant(product, colorId).images[0];
  if (!image) throw new Error(`Produto ${product.id} não possui imagens para a variante.`);
  return image;
};

export const getRelatedProducts = (product: Product) =>
  product.relatedIds
    .map((id) => getProductById(id))
    .filter((related): related is Product => Boolean(related));
