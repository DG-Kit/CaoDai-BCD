import React from 'react';

interface TamGiaoLoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export function TamGiaoLoader({ className = '', size = 'md', label }: TamGiaoLoaderProps) {
  const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div className="uiverse-loader" role="status" aria-label="Đang tải">
        <div className={`dot dot-1 ${dotSizes[size]}`} />
        <div className={`dot dot-2 ${dotSizes[size]}`} />
        <div className={`dot dot-3 ${dotSizes[size]}`} />
      </div>
      {label && (
        <span className="text-xs font-serif font-medium text-heritage-woodLight animate-pulse tracking-wide">
          {label}
        </span>
      )}
    </div>
  );
}
