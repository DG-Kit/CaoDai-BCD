import React from 'react';
import { BookOpen } from 'lucide-react';
import { LibraryExplorer } from '@/components/library/LibraryExplorer';

export const metadata = {
  title: 'Thư Viện Kinh Sách | Hội Thánh Cao Đài Ban Chỉnh Đạo',
  description:
    'Kho lưu trữ, tra cứu và đối chiếu bản gốc kinh sách, Thánh ngôn, Thánh giáo, Đạo sử thuộc Hội Thánh Cao Đài Ban Chỉnh Đạo.',
};

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Tiêu đề trang Thư viện */}
      <div className="mb-8 border-b border-heritage-border pb-6 dark:border-heritage-dark-border">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-caodai-ochre dark:text-caodai-yellow">
          <BookOpen className="h-4 w-4" />
          <span>Phân Hệ Trọng Tâm • Bảo Tồn Nguyên Bản</span>
        </div>
        <h1 className="mt-2 font-serif text-3xl font-bold text-heritage-ink sm:text-4xl dark:text-heritage-dark-ink">
          Thư Viện Kinh Sách & Tư Liệu Đạo
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-heritage-muted sm:text-base dark:text-heritage-dark-muted">
          Tra cứu các bộ kinh, Thánh ngôn, Thánh giáo và tài liệu hành lễ của Hội Thánh Cao Đài Ban Chỉnh Đạo.
          Mỗi ấn bản đều lưu giữ nguyên vẹn bản văn kèm bản scan gốc đối chiếu làm bằng chứng tối cao.
        </p>
      </div>

      <LibraryExplorer />
    </div>
  );
}
