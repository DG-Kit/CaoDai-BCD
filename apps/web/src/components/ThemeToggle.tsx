'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Tránh hydration mismatch trước khi client mount
  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-xl border border-heritage-border bg-heritage-parchment/60 flex items-center justify-center ${className}`}
        aria-hidden="true"
      >
        <span className="w-4 h-4 rounded-full bg-heritage-border/60 animate-pulse" />
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}
      title={isDark ? 'Giao diện Tối (Đêm rằm) • Nhấn để đổi sang Sáng' : 'Giao diện Sáng (Nắng vàng) • Nhấn để đổi sang Tối'}
      className={`
        relative inline-flex items-center justify-center gap-2 p-2 rounded-xl
        border border-heritage-border bg-heritage-parchment/70 hover:bg-heritage-parchment
        text-heritage-wood hover:text-heritage-goldDark
        transition-all duration-200 shadow-2xs hover:shadow-xs group
        ${className}
      `}
    >
      <div className="relative w-4.5 h-4.5 flex items-center justify-center">
        {/* Biểu tượng Mặt Trời (Light mode) */}
        <Sun
          className={`w-4.5 h-4.5 text-amber-500 transition-all duration-300 absolute ${
            isDark
              ? 'opacity-0 rotate-90 scale-50 pointer-events-none'
              : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        {/* Biểu tượng Mặt Trăng (Dark mode) */}
        <Moon
          className={`w-4.5 h-4.5 text-amber-300 transition-all duration-300 absolute ${
            isDark
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
          }`}
        />
      </div>

      {showLabel && (
        <span className="text-xs font-medium">
          {isDark ? 'Giao diện Tối' : 'Giao diện Sáng'}
        </span>
      )}
    </button>
  );
}

/**
 * Menu 3 tùy chọn: Sáng / Tối / Tự động (hệ thống)
 */
export function ThemeSegmentedControl({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const options = [
    { value: 'light', label: 'Sáng', icon: Sun },
    { value: 'dark', label: 'Tối', icon: Moon },
    { value: 'system', label: 'Hệ thống', icon: Monitor },
  ] as const;

  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl bg-heritage-parchment/80 border border-heritage-border ${className}`}
      role="group"
      aria-label="Chọn chủ đề hiển thị"
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const isSelected = theme === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setTheme(opt.value)}
            className={`
              flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all
              ${
                isSelected
                  ? 'bg-heritage-paper text-heritage-goldDark shadow-xs font-semibold'
                  : 'text-heritage-woodLight hover:text-heritage-wood'
              }
            `}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
