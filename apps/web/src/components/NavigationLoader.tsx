'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { TamGiaoLoader } from '@/components/TamGiaoLoader';

export function NavigationLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);

  // Khi pathname hoặc searchParams thay đổi -> chuyển trang hoàn tất, tắt loading
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Tìm thẻ <a> gần nhất
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Bỏ qua liên kết bên ngoài, neo #, tải về, mở tab mới, hoặc phím tắt
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('//') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#') ||
        target.target === '_blank' ||
        target.hasAttribute('download') ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey ||
        e.defaultPrevented
      ) {
        return;
      }

      // Kiểm tra xem có phải điều hướng sang URL khác không
      try {
        const currentUrl = new URL(window.location.href);
        const targetUrl = new URL(href, window.location.href);

        if (
          targetUrl.pathname === currentUrl.pathname &&
          targetUrl.search === currentUrl.search
        ) {
          return;
        }

        setIsNavigating(true);
      } catch {
        if (href !== pathname) {
          setIsNavigating(true);
        }
      }
    };

    document.addEventListener('click', handleClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, [pathname]);

  // Bộ đếm an toàn tối đa 4 giây tự động tắt nếu trang không phản hồi
  useEffect(() => {
    if (!isNavigating) return;
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isNavigating]);

  if (!isNavigating) return null;

  return (
    <>
      {/* Thanh vệt sáng Tam Giáo chạy ngang ở đỉnh đầu màn hình */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-1 overflow-hidden bg-heritage-border">
        <div className="h-full w-full bg-gradient-to-r from-caodai-ochre via-caodai-indigo to-caodai-vermilion animate-pulse" />
      </div>

      {/* Khung Overlay Loading Tam Giáo ở trung tâm màn hình */}
      <div
        className="fixed inset-0 z-[99] flex items-center justify-center bg-heritage-paper/80 dark:bg-heritage-dark-paper/80 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        role="status"
        aria-live="polite"
      >
        <div className="flex flex-col items-center justify-center px-8 py-7 rounded-2xl border border-heritage-border bg-heritage-parchment/95 dark:border-heritage-dark-border dark:bg-heritage-dark-surface/95 shadow-2xl">
          <TamGiaoLoader size="lg" label="Đang chuyển trang..." />
        </div>
      </div>
    </>
  );
}
