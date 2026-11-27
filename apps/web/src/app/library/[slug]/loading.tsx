import { TamGiaoLoader } from '@/components/TamGiaoLoader';

export default function ScriptureReaderLoading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-24 px-4">
      <TamGiaoLoader size="lg" label="Đang tải văn bản kinh sách & bản scan..." />
    </div>
  );
}
