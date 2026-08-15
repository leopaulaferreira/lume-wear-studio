import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface BrandMarkProps {
  className?: string;
  onClick?: () => void;
  compact?: boolean;
}

export function BrandMark({ className, onClick, compact = false }: BrandMarkProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={cn('brand-mark', compact && 'brand-mark--compact', className)}
      aria-label="Lume Wear — página inicial"
    >
      <span>LUME</span>
      <span className="brand-mark__slash">/</span>
      <span className="brand-mark__wear">WEAR</span>
    </Link>
  );
}

