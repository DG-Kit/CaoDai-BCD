import { TamGiaoLoader } from '@/components/TamGiaoLoader';

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center py-20 px-4">
      <TamGiaoLoader size="lg" label="Đang tải dữ liệu..." />
    </div>
  );
}
