import * as Dialog from '@radix-ui/react-dialog';
import { ArrowRight, Search, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPrimaryProductImage, products } from '@/data/products';
import { normalizeSearch } from '@/lib/catalog';
import { formatCurrency } from '@/lib/format';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const results = useMemo(() => {
    const normalized = normalizeSearch(query);
    if (!normalized) return products.slice(0, 4);

    return products
      .filter((product) =>
        normalizeSearch(`${product.name} ${product.subtitle} ${product.category}`).includes(normalized),
      )
      .slice(0, 6);
  }, [query]);

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();
    onOpenChange(false);
    navigate(value ? `/colecao?q=${encodeURIComponent(value)}` : '/colecao');
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="search-dialog">
          <div className="search-dialog__topline">
            <Dialog.Title className="eyebrow">Buscar na Lume</Dialog.Title>
            <Dialog.Close className="icon-button" aria-label="Fechar busca">
              <X aria-hidden="true" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Busque peças por nome, categoria ou característica.
          </Dialog.Description>

          <form onSubmit={submitSearch} className="search-dialog__form" role="search">
            <Search aria-hidden="true" />
            <label htmlFor="site-search" className="sr-only">
              Buscar produtos
            </label>
            <input
              id="site-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="O que você procura?"
              autoComplete="off"
              autoFocus
            />
            <button type="submit" className="icon-button" aria-label="Ver resultados da busca">
              <ArrowRight aria-hidden="true" />
            </button>
          </form>

          <div className="search-dialog__results" aria-live="polite">
            <p className="search-dialog__label">
              {query ? `${results.length} resultado${results.length === 1 ? '' : 's'}` : 'Mais procurados'}
            </p>

            {results.length > 0 ? (
              <div className="search-results-grid">
                {results.map((product) => {
                  const image = getPrimaryProductImage(product);

                  return (
                    <Link
                      key={product.id}
                      to={`/produto/${product.id}`}
                      onClick={() => onOpenChange(false)}
                      className="search-result"
                    >
                      <img
                        src={image.src}
                        alt=""
                        width="1122"
                        height="1402"
                        loading="lazy"
                      />
                      <span>
                        <strong>{product.name}</strong>
                        <small>{formatCurrency(product.price)}</small>
                      </span>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="search-dialog__empty">
                <p>Nenhuma peça encontrada para “{query}”.</p>
                <Link to="/colecao" onClick={() => onOpenChange(false)} className="text-link">
                  Ver toda a coleção <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
