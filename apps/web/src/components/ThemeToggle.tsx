/*
 * From Uiverse.io by andrew-demchenk0 - https://uiverse.io/andrew-demchenk0/honest-stingray-90
 * MIT License, Copyright (c) andrew-demchenk0 (A)
 */
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

  if (!mounted) {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`} aria-hidden="true">
        <div className="h-[34px] w-[64px] rounded-[30px] bg-heritage-parchment border border-heritage-border animate-pulse" />
        {showLabel && <span className="text-xs font-semibold text-heritage-muted">Giao diện</span>}
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  const switchEl = (
    <label
      className={`uiverse-theme-switch ${showLabel ? '' : className}`}
      title={isDark ? 'Chế độ Tối • Nhấn để đổi sang Sáng' : 'Chế độ Sáng • Nhấn để đổi sang Tối'}
    >
      <span className="uiverse-theme-switch__sun" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g fill="#ffd43b">
            <circle r="5" cy="12" cx="12" />
            <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z" />
          </g>
        </svg>
      </span>
      <span className="uiverse-theme-switch__moon" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
        </svg>
      </span>
      <input
        type="checkbox"
        className="uiverse-theme-switch__input"
        checked={isDark}
        onChange={toggleTheme}
        aria-label={isDark ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}
      />
      <span className="uiverse-theme-switch__slider" />
    </label>
  );

  if (!showLabel) {
    return switchEl;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {switchEl}
      <span className="text-xs font-semibold text-heritage-wood">
        {isDark ? 'Giao diện Tối' : 'Giao diện Sáng'}
      </span>
    </div>
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
      className={`inline-flex items-center p-0.5 rounded-lg bg-heritage-subtle border border-heritage-border ${className}`}
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
              flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all
              ${
                isSelected
                  ? 'bg-heritage-wood text-heritage-paper shadow-2xs'
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
