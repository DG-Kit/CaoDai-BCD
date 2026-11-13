import type { Metadata } from 'next';
import { ToDinhExplorer } from '../../components/sites/ToDinhExplorer';

export const metadata: Metadata = {
  title: 'Tòa Thánh Bến Tre & Quần Thể Kiến Trúc | Thư Viện Số Cao Đài Ban Chỉnh Đạo',
  description:
    'Giới thiệu Tòa Thánh Bến Tre, Diêu Trì Bửu Điện, Vườn Kỳ Thọ cùng hệ thống Nhà tu Trung thừa - Thượng thừa Nam Nữ về lịch sử, xây dựng và đường đi đến.',
};

export default function ToDinhPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10 border-b border-heritage-border pb-8 dark:border-heritage-dark-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-caodai-ochre dark:text-caodai-yellow">
          Hội Thánh Cao Đài Ban Chỉnh Đạo
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-heritage-ink sm:text-4xl dark:text-heritage-dark-ink">
          Tòa Thánh Bến Tre &amp; Quần Thể Công Trình Trung Tâm
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-heritage-muted dark:text-heritage-dark-muted">
          Không gian giới thiệu chuyên sâu 7 công trình trọng tâm tại Tòa Thánh Bến Tre gồm{' '}
          <strong className="font-medium text-heritage-ink dark:text-heritage-dark-ink">
            Tòa Thánh Bến Tre (Thánh thất An Hội cũ), Diêu Trì Bửu Điện, Vườn Kỳ Thọ
          </strong>{' '}
          và hệ thống{' '}
          <strong className="font-medium text-heritage-ink dark:text-heritage-dark-ink">
            Nhà tu Trung thừa Nam – Nữ, Nhà tu Thượng thừa Nam – Nữ
          </strong>{' '}
          qua ba phương diện: lịch sử hình thành, kiến trúc xây dựng và hướng dẫn đường đi đến.
        </p>
      </header>

      <ToDinhExplorer />
    </main>
  );
}
