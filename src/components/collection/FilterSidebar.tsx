import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { FilterState } from '@/types/product';
import { priceRanges, genders, colorOptions, sizeOptions, categories } from '@/data/products';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

interface FilterSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function FilterSection({ title, defaultOpen = true, children }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border pb-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <span className="text-xs tracking-wider uppercase font-medium">{title}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && <div className="mt-3 space-y-2.5">{children}</div>}
    </div>
  );
}

export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const handleCheckboxChange = (
    type: keyof FilterState,
    value: string,
    checked: boolean
  ) => {
    const currentValues = filters[type];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);
    onFilterChange({ ...filters, [type]: newValues });
  };

  return (
    <aside className="w-72 flex-shrink-0 pr-8">
      <div className="sticky top-28 space-y-5">
        <h2 className="text-lg font-medium tracking-tight mb-6">Filtros</h2>

        {/* Price */}
        <FilterSection title="Preço">
          {priceRanges.map((range) => (
            <label key={range.value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.priceRange.includes(range.value)}
                onChange={(e) =>
                  handleCheckboxChange('priceRange', range.value, e.target.checked)
                }
                className="filter-checkbox"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {range.label}
              </span>
            </label>
          ))}
        </FilterSection>

        {/* Categories */}
        <FilterSection title="Categoria">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={(e) =>
                  handleCheckboxChange('categories', category, e.target.checked)
                }
                className="filter-checkbox"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors capitalize">
                {category}
              </span>
            </label>
          ))}
        </FilterSection>

        {/* Gender */}
        <FilterSection title="Gênero">
          {genders.map((gender) => (
            <label key={gender.value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.genders.includes(gender.value)}
                onChange={(e) =>
                  handleCheckboxChange('genders', gender.value, e.target.checked)
                }
                className="filter-checkbox"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {gender.label}
              </span>
            </label>
          ))}
        </FilterSection>

        {/* Colors */}
        <FilterSection title="Cor">
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.hex}
                onClick={() =>
                  handleCheckboxChange(
                    'colors',
                    color.hex,
                    !filters.colors.includes(color.hex)
                  )
                }
                className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
                  filters.colors.includes(color.hex)
                    ? 'border-foreground scale-110'
                    : 'border-lume-gray-200 hover:border-lume-gray-400'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </FilterSection>

        {/* Sizes */}
        <FilterSection title="Tamanho">
          <div className="flex flex-wrap gap-2">
            {sizeOptions.slice(0, 6).map((size) => (
              <button
                key={size}
                onClick={() =>
                  handleCheckboxChange(
                    'sizes',
                    size,
                    !filters.sizes.includes(size)
                  )
                }
                className={`w-10 h-10 flex items-center justify-center text-xs border transition-all duration-200 ${
                  filters.sizes.includes(size)
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border hover:border-foreground'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Clear Filters */}
        <button
          onClick={() =>
            onFilterChange({
              priceRange: [],
              categories: [],
              genders: [],
              colors: [],
              sizes: [],
            })
          }
          className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
        >
          Limpar filtros
        </button>
      </div>
    </aside>
  );
}
