import * as Dialog from '@radix-ui/react-dialog';
import { ArrowRight, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FilterPanel, FilterSidebar } from '@/components/collection/FilterSidebar';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/product/ProductCard';
import { Seo } from '@/components/Seo';
import { categories, colorOptions, genders, priceRanges, products, sizeOptions } from '@/data/products';
import { countActiveFilters, filterAndSortProducts } from '@/lib/catalog';
import type {
  CatalogSort,
  FilterState,
  ProductBadge,
  ProductCategory,
  ProductGender,
  PriceRangeId,
} from '@/types/product';

const badgeValues: ProductBadge[] = ['best-seller', 'novo', 'essencial'];
const sortValues: CatalogSort[] = ['featured', 'newest', 'price-asc', 'price-desc', 'rating'];

const parseList = <T extends string>(value: string | null, allowed: readonly T[]): T[] =>
  value?.split(',').filter((item): item is T => allowed.includes(item as T)) ?? [];

const labels: Record<string, string> = {
  feminino: 'Feminino',
  masculino: 'Masculino',
  unissex: 'Unissex',
  novo: 'Novidades',
  'best-seller': 'Mais vendidos',
  essencial: 'Essenciais',
};

export default function Collection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const categoryValues = categories.map((option) => option.value);
  const genderValues = genders.map((option) => option.value);
  const priceValues = priceRanges.map((option) => option.value);
  const colorValues = colorOptions.map((option) => option.id);

  const filters: FilterState = {
    categories: parseList<ProductCategory>(searchParams.get('categoria'), categoryValues),
    genders: parseList<ProductGender>(searchParams.get('genero'), genderValues),
    priceRanges: parseList<PriceRangeId>(searchParams.get('preco'), priceValues),
    colors: parseList(searchParams.get('cor'), colorValues),
    sizes: parseList(searchParams.get('tamanho'), sizeOptions),
  };
  const badgeParam = searchParams.get('badge');
  const badge = badgeValues.includes(badgeParam as ProductBadge) ? (badgeParam as ProductBadge) : null;
  const sortParam = searchParams.get('ordem');
  const sort = sortValues.includes(sortParam as CatalogSort) ? (sortParam as CatalogSort) : 'featured';
  const search = searchParams.get('q') ?? '';

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });
    setSearchParams(next, { replace: true });
  };

  const updateFilters = (next: FilterState) => {
    updateParams({
      categoria: next.categories.join(',') || null,
      genero: next.genders.join(',') || null,
      preco: next.priceRanges.join(',') || null,
      cor: next.colors.join(',') || null,
      tamanho: next.sizes.join(',') || null,
    });
  };

  const results = filterAndSortProducts(products, { filters, badge, search, sort });

  const title = search
    ? `Resultados para “${search}”`
    : badge
      ? labels[badge]
      : filters.genders.length === 1
        ? labels[filters.genders[0]]
        : 'Coleção 01';
  const activeCount = countActiveFilters(filters);

  const chips = [
    ...filters.categories.map((value) => ({ key: `categoria-${value}`, label: categories.find((item) => item.value === value)?.label ?? value, remove: () => updateFilters({ ...filters, categories: filters.categories.filter((item) => item !== value) }) })),
    ...filters.genders.map((value) => ({ key: `genero-${value}`, label: labels[value], remove: () => updateFilters({ ...filters, genders: filters.genders.filter((item) => item !== value) }) })),
    ...filters.priceRanges.map((value) => ({ key: `preco-${value}`, label: priceRanges.find((item) => item.value === value)?.label ?? value, remove: () => updateFilters({ ...filters, priceRanges: filters.priceRanges.filter((item) => item !== value) }) })),
    ...filters.colors.map((value) => ({ key: `cor-${value}`, label: colorOptions.find((item) => item.id === value)?.name ?? value, remove: () => updateFilters({ ...filters, colors: filters.colors.filter((item) => item !== value) }) })),
    ...filters.sizes.map((value) => ({ key: `tamanho-${value}`, label: `Tam. ${value}`, remove: () => updateFilters({ ...filters, sizes: filters.sizes.filter((item) => item !== value) }) })),
  ];

  return (
    <Layout>
      <Seo
        title={title}
        description="Explore a coleção Lume Wear: peças técnicas para treino, corrida e vida urbana."
      />

      <header className="collection-hero page-shell">
        <p className="eyebrow">Performance / Transit / 2026</p>
        <div className="collection-hero__title">
          <h1>{title}</h1>
          <p>Peças precisas para o movimento diário. Do primeiro ritmo ao último trajeto.</p>
        </div>
      </header>

      <section className="collection page-shell" aria-label="Catálogo de produtos">
        <div className="collection-toolbar">
          <p aria-live="polite"><strong>{results.length}</strong> {results.length === 1 ? 'peça' : 'peças'}</p>
          <div className="collection-toolbar__actions">
            <Dialog.Root open={filterOpen} onOpenChange={setFilterOpen}>
              <Dialog.Trigger asChild>
                <button type="button" className="filter-drawer-trigger">
                  <SlidersHorizontal aria-hidden="true" />
                  Filtros {activeCount > 0 && <span>{activeCount}</span>}
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />
                <Dialog.Content className="filter-drawer">
                  <div className="filter-drawer__header">
                    <div>
                      <Dialog.Title>Filtrar coleção</Dialog.Title>
                      <Dialog.Description>Refine por categoria, modelagem, preço, cor e tamanho.</Dialog.Description>
                    </div>
                    <Dialog.Close className="icon-button" aria-label="Fechar filtros"><X aria-hidden="true" /></Dialog.Close>
                  </div>
                  <div className="filter-drawer__body"><FilterPanel filters={filters} onFilterChange={updateFilters} /></div>
                  <Dialog.Close className="button button--primary button--full">Ver {results.length} {results.length === 1 ? 'peça' : 'peças'}</Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>

            <label className="sort-control">
              <span>Ordenar</span>
              <select value={sort} onChange={(event) => updateParams({ ordem: event.target.value === 'featured' ? null : event.target.value })}>
                <option value="featured">Destaques</option>
                <option value="newest">Mais recentes</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
                <option value="rating">Melhor avaliados</option>
              </select>
            </label>
          </div>
        </div>

        {(chips.length > 0 || badge || search) && (
          <div className="filter-chips" aria-label="Filtros ativos">
            {search && <button type="button" onClick={() => updateParams({ q: null })}>Busca: {search}<X aria-hidden="true" /></button>}
            {badge && <button type="button" onClick={() => updateParams({ badge: null })}>{labels[badge]}<X aria-hidden="true" /></button>}
            {chips.map((chip) => <button type="button" key={chip.key} onClick={chip.remove}>{chip.label}<X aria-hidden="true" /></button>)}
            <button type="button" className="filter-chips__clear" onClick={() => setSearchParams({})}>Limpar tudo</button>
          </div>
        )}

        <div className="collection-layout">
          <FilterSidebar filters={filters} onFilterChange={updateFilters} />
          <div className="collection-results">
            {results.length > 0 ? (
              <div className="product-grid">
                {results.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 4} />)}
              </div>
            ) : (
              <div className="collection-empty">
                <p className="eyebrow">Sem resultados</p>
                <h2>Vamos abrir o campo.</h2>
                <p>Tente remover alguns filtros ou explore a coleção completa.</p>
                <button type="button" className="button button--primary" onClick={() => setSearchParams({})}>
                  Limpar filtros <ArrowRight aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <aside className="collection-note">
        <div className="page-shell">
          <p>01 / Lume System</p>
          <h2>Uma única camada.<br />Todos os trajetos.</h2>
          <Link to="/produto/7" className="text-link text-link--light">Conheça a Shield <ArrowRight aria-hidden="true" /></Link>
        </div>
      </aside>
    </Layout>
  );
}
