import { priceRanges } from '@/data/products';
import type { CatalogSort, FilterState, Product, ProductBadge } from '@/types/product';

export const emptyFilters: FilterState = {
  priceRanges: [],
  categories: [],
  genders: [],
  colors: [],
  sizes: [],
};

export const normalizeSearch = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim();

interface CatalogQuery {
  filters: FilterState;
  badge?: ProductBadge | null;
  search?: string;
  sort?: CatalogSort;
}

export const filterAndSortProducts = (
  catalog: Product[],
  { filters, badge, search = '', sort = 'featured' }: CatalogQuery,
) => {
  const normalizedSearch = normalizeSearch(search);

  const filtered = catalog.filter((product) => {
    if (badge && product.badge !== badge) return false;

    if (normalizedSearch) {
      const searchable = normalizeSearch(
        `${product.name} ${product.subtitle} ${product.description} ${product.category}`,
      );
      if (!searchable.includes(normalizedSearch)) return false;
    }

    if (filters.priceRanges.length > 0) {
      const inSelectedRange = filters.priceRanges.some((rangeId) => {
        const range = priceRanges.find((option) => option.value === rangeId);
        return range ? product.price >= range.min && product.price <= range.max : false;
      });
      if (!inSelectedRange) return false;
    }

    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }

    if (filters.genders.length > 0 && !filters.genders.includes(product.gender)) {
      return false;
    }

    if (
      filters.colors.length > 0 &&
      !filters.colors.some((colorId) => product.colors.some((color) => color.id === colorId))
    ) {
      return false;
    }

    if (
      filters.sizes.length > 0 &&
      !filters.sizes.some(
        (size) => product.sizes.includes(size) && (product.stockBySize[size] ?? 0) > 0,
      )
    ) {
      return false;
    }

    return true;
  });

  return [...filtered].sort((a, b) => {
    switch (sort) {
      case 'newest':
        return Number(b.badge === 'novo') - Number(a.badge === 'novo') || b.id.localeCompare(a.id);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating || b.reviewCount - a.reviewCount;
      case 'featured':
      default:
        return Number(b.badge === 'best-seller') - Number(a.badge === 'best-seller');
    }
  });
};

export const countActiveFilters = (filters: FilterState) =>
  filters.priceRanges.length +
  filters.categories.length +
  filters.genders.length +
  filters.colors.length +
  filters.sizes.length;

