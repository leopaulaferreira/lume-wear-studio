import { ChevronDown } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { categories, colorOptions, genders, priceRanges, sizeOptions } from '@/data/products';
import { countActiveFilters, emptyFilters } from '@/lib/catalog';
import type { FilterState } from '@/types/product';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

interface FilterSectionProps {
  title: string;
  children: ReactNode;
}

function FilterSection({ title, children }: FilterSectionProps) {
  const [open, setOpen] = useState(true);

  return (
    <section className="filter-section">
      <button
        type="button"
        className="filter-section__trigger"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
      >
        {title}
        <ChevronDown aria-hidden="true" className={open ? 'is-open' : undefined} />
      </button>
      {open && <div className="filter-section__content">{children}</div>}
    </section>
  );
}

export function FilterPanel({ filters, onFilterChange }: FilterSidebarProps) {
  const toggle = (type: keyof FilterState, value: string) => {
    const current = filters[type] as readonly string[];
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    onFilterChange({ ...filters, [type]: next });
  };

  return (
    <div className="filter-panel">
      <FilterSection title="Categoria">
        {categories.map((category) => (
          <label key={category.value} className="check-option">
            <input
              type="checkbox"
              checked={filters.categories.includes(category.value)}
              onChange={() => toggle('categories', category.value)}
            />
            <span aria-hidden="true" />
            {category.label}
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Modelagem">
        {genders.map((gender) => (
          <label key={gender.value} className="check-option">
            <input
              type="checkbox"
              checked={filters.genders.includes(gender.value)}
              onChange={() => toggle('genders', gender.value)}
            />
            <span aria-hidden="true" />
            {gender.label}
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Preço">
        {priceRanges.map((range) => (
          <label key={range.value} className="check-option">
            <input
              type="checkbox"
              checked={filters.priceRanges.includes(range.value)}
              onChange={() => toggle('priceRanges', range.value)}
            />
            <span aria-hidden="true" />
            {range.label}
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Cor">
        <div className="color-filter" role="group" aria-label="Filtrar por cor">
          {colorOptions.map((color) => {
            const selected = filters.colors.includes(color.id);
            return (
              <button
                key={color.id}
                type="button"
                className={selected ? 'color-filter__option is-active' : 'color-filter__option'}
                onClick={() => toggle('colors', color.id)}
                aria-pressed={selected}
                aria-label={color.name}
              >
                <span style={{ backgroundColor: color.hex }} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Tamanho">
        <div className="size-filter" role="group" aria-label="Filtrar por tamanho">
          {sizeOptions.map((size) => {
            const selected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                className={selected ? 'is-active' : undefined}
                onClick={() => toggle('sizes', size)}
                aria-pressed={selected}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {countActiveFilters(filters) > 0 && (
        <button type="button" className="text-link filter-panel__clear" onClick={() => onFilterChange(emptyFilters)}>
          Limpar todos os filtros
        </button>
      )}
    </div>
  );
}

export function FilterSidebar(props: FilterSidebarProps) {
  return (
    <aside className="collection-sidebar" aria-label="Filtros da coleção">
      <div className="collection-sidebar__sticky">
        <div className="collection-sidebar__heading">
          <h2>Filtrar</h2>
          <span>{countActiveFilters(props.filters) || '—'}</span>
        </div>
        <FilterPanel {...props} />
      </div>
    </aside>
  );
}
