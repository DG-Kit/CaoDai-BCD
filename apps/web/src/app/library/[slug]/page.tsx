import React from 'react';
import { SplitLibraryReader } from '@/components/library/SplitLibraryReader';

export const metadata = {
  title: 'Bộ Đọc Đối Chiếu Kinh Sách | Hội Thánh Cao Đài Ban Chỉnh Đạo',
  description:
    'Đọc bản văn số hóa song song với bản scan gốc để đối chiếu từng câu chữ kinh văn.',
};

interface LibraryDetailPageProps {
  params: {
    slug: string;
  };
}

export default function LibraryDetailPage({ params }: LibraryDetailPageProps) {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
      <SplitLibraryReader slug={params.slug} />
    </div>
  );
}
