import { useEffect } from 'react';

interface SeoProps {
  title?: string;
  description: string;
  image?: string;
  type?: 'website' | 'product';
  noIndex?: boolean;
}

const setMeta = (selector: string, attribute: string, value: string) => {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) element.setAttribute(attribute, value);
};

export function Seo({ title, description, image = '/og-lume.jpg', type = 'website', noIndex = false }: SeoProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} — Lume Wear` : 'Lume Wear — Movimento com intenção';
    document.title = fullTitle;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:type"]', 'content', type);
    setMeta('meta[property="og:image"]', 'content', image);
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', image);
    setMeta('meta[name="robots"]', 'content', noIndex ? 'noindex, nofollow' : 'index, follow');
  }, [description, image, noIndex, title, type]);

  return null;
}

