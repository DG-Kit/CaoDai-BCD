import { TamGiaoLoader } from '@/components/TamGiaoLoader';

export default function ToDinhLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4">
      <TamGiaoLoader size="lg" label="Đang tải thông tin Tòa Thánh Bến Tre..." />
    </div>
  );
}
