import { TamGiaoLoader } from '@/components/TamGiaoLoader';

export default function LeNhacDuongLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4">
      <TamGiaoLoader size="lg" label="Đang tải tư liệu Lễ Nhạc Đường..." />
    </div>
  );
}
