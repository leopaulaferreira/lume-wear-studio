import { describe, expect, it } from 'vitest';
import { products } from '@/data/products';
import { emptyFilters, filterAndSortProducts, normalizeSearch } from '@/lib/catalog';

describe('catálogo Lume Wear', () => {
  it('mantém uma galeria válida e independente para cada cor', () => {
    products.forEach((product) => {
      expect(product.variants.length).toBeGreaterThan(0);
      product.variants.forEach((variant) => {
        expect(variant.color.id).toBeTruthy();
        expect(variant.images.length).toBeGreaterThan(0);
      });

      if (product.variants.length > 1) {
        expect(product.variants[1].images).not.toBe(product.variants[0].images);
      }

      expect(new Set(product.variants.map((variant) => variant.images[0].src)).size).toBe(
        product.variants.length,
      );
      expect(product.variants.every((variant) => !variant.usesImageFallback)).toBe(true);
    });
  });

  it('normaliza buscas em português e encontra produtos por descrição', () => {
    expect(normalizeSearch('  Compressão ')).toBe('compressao');
    const result = filterAndSortProducts(products, {
      filters: emptyFilters,
      search: 'compressão responsiva',
    });
    expect(result.map((product) => product.name)).toEqual(['Legging Form']);
  });

  it('combina filtros de gênero, categoria, cor e tamanho em estoque', () => {
    const result = filterAndSortProducts(products, {
      filters: {
        ...emptyFilters,
        genders: ['feminino'],
        categories: ['leggings'],
        colors: ['graphite'],
        sizes: ['M'],
      },
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('8');
  });

  it('ordena preços sem alterar o array original', () => {
    const originalOrder = products.map((product) => product.id);
    const result = filterAndSortProducts(products, {
      filters: emptyFilters,
      sort: 'price-desc',
    });
    expect(result[0].name).toBe('Jaqueta Shield');
    expect(products.map((product) => product.id)).toEqual(originalOrder);
  });
});
