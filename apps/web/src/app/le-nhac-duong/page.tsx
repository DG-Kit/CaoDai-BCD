import React from 'react';
import { Music } from 'lucide-react';
import { LibraryExplorer } from '@/components/library/LibraryExplorer';

export const metadata = {
  title: 'Tài Liệu Lễ Nhạc Đường | Hội Thánh Cao Đài Ban Chỉnh Đạo',
  description:
    'Kho lưu trữ tài liệu Lễ Nhạc Đường, các bài Thài Xuân, Thài Nam, cổ nhạc, nghi thức thiết đàn và hành lễ thuộc Hội Thánh Cao Đài Ban Chỉnh Đạo.',
};

export default function LeNhacDuongPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Tiêu đề trang Tài Liệu Lễ Nhạc Đường */}
      <div className="mb-8 border-b border-heritage-border pb-6 dark:border-heritage-dark-border">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-caodai-ochre dark:text-caodai-yellow">
          <Music className="h-4 w-4" />
          <span>Phân Khu Chuyên Biệt • Nghi Lễ & Cổ Nhạc</span>
        </div>
        <h1 className="mt-2 font-serif text-3xl font-bold text-heritage-ink sm:text-4xl dark:text-heritage-dark-ink">
          Tài Liệu Lễ Nhạc Đường
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-heritage-muted sm:text-base dark:text-heritage-dark-muted">
          Lưu trữ và tra cứu các tài liệu hướng dẫn hành lễ của Lễ Nhạc Đường: các bài Thài Xuân, Thài Nam,
          nhạc lễ truyền thống, nghi thức thiết đàn và quy tắc hành sự nơi Đền Thánh.
        </p>
      </div>

      <LibraryExplorer domain="LE_NHAC_DUONG" />
    </div>
  );
}
