import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { FilterSidebar } from '@/components/collection/FilterSidebar';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';
import { FilterState } from '@/types/product';

export default function Collection() {
  const [searchParams] = useSearchParams();
  const genderParam = searchParams.get('genero');
  const badgeParam = searchParams.get('badge');

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [],
    categories: [],
    genders: genderParam ? [genderParam] : [],
    colors: [],
    sizes: [],
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Price filter
      if (filters.priceRange.length > 0) {
        const matchesPrice = filters.priceRange.some((range) => {
          const [min, max] = range.split('-').map((v) => (v === 'plus' ? Infinity : Number(v)));
          return product.price >= min && product.price <= (max || Infinity);
        });
        if (!matchesPrice) return false;
      }

      // Category filter
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(product.category)) return false;
      }

      // Gender filter
      if (filters.genders.length > 0) {
        if (!filters.genders.includes(product.gender)) return false;
      }

      // Color filter
      if (filters.colors.length > 0) {
        const productColorHexes = product.colors.map((c) => c.hex);
        if (!filters.colors.some((c) => productColorHexes.includes(c))) return false;
      }

      // Size filter
      if (filters.sizes.length > 0) {
        if (!filters.sizes.some((s) => product.sizes.includes(s))) return false;
      }

      // Badge filter from URL
      if (badgeParam) {
        if (product.badge !== badgeParam) return false;
      }

      return true;
    });
  }, [filters, badgeParam]);

  const pageTitle = useMemo(() => {
    if (badgeParam === 'novo') return 'Lançamentos';
    if (badgeParam === 'essencial') return 'Essenciais';
    if (genderParam === 'masculino') return 'Masculino';
    if (genderParam === 'feminino') return 'Feminino';
    return 'Coleção';
  }, [genderParam, badgeParam]);

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="heading-section">{pageTitle}</h1>
          <p className="text-sm text-muted-foreground mt-2">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}
          </p>
        </div>

        {/* Content */}
        <div className="flex gap-12">
          {/* Sidebar */}
          <FilterSidebar filters={filters} onFilterChange={setFilters} />

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">Nenhum produto encontrado</p>
                <button
                  onClick={() =>
                    setFilters({
                      priceRange: [],
                      categories: [],
                      genders: [],
                      colors: [],
                      sizes: [],
                    })
                  }
                  className="mt-4 text-sm underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="opacity-0 animate-fade-up"
                    style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
