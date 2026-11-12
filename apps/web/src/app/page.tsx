import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  MapPin,
  FileEdit,
  Search,
  ShieldCheck,
  ArrowRight,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react';
import { ApiHealthWidget } from '@/components/ApiHealthWidget';

export default function HomePage() {
  const modules = [
    {
      title: 'Thư Viện Đạo',
      description: 'Lưu trữ và tra cứu Kinh Cúng Tứ Thời, Thánh Ngôn, Thánh Giáo, Giáo lý và Đạo sử với bản scan đối chiếu gốc.',
      icon: BookOpen,
      href: '/library',
      badge: 'Trọng tâm',
      features: ['Kinh văn điện tử song song scan', 'Tìm kiếm toàn văn', 'Mục lục bài kinh phân cấp'],
    },
    {
      title: 'Lịch Đạo & Ngày Chay',
      description: 'Hệ thống lịch âm dương, ngày kỷ niệm, ngày vía, tùy chọn hiển thị lịch ăn chay (lục trai, thập trai, thiên ngươn) và Can Chi.',
      icon: Calendar,
      href: '/calendar',
      badge: 'Âm Dương',
      features: ['Tùy chọn chế độ ăn chay', 'Hiển thị Can Chi ngày/tháng/năm', 'Quy tắc lặp sự kiện chuẩn xác'],
    },
    {
      title: 'Hệ Thống Thánh Sở',
      description: 'Bản đồ và danh mục Tòa Thánh Bến Tre, Họ đạo, Thánh Thất, Nhà tu thuộc Hội Thánh Cao Đài Ban Chỉnh Đạo.',
      icon: MapPin,
      href: '/worship-sites',
      badge: 'Bản đồ GIS',
      features: ['Tọa độ địa lý PostGIS', 'Lịch sử địa giới hành chính', 'Hồ sơ xác minh từng cơ sở'],
    },
    {
      title: 'Soạn Sớ Văn & Biểu Mẫu',
      description: 'Công cụ soạn thảo sớ văn, biểu mẫu nghi lễ và văn bản hành chính theo đúng chuẩn định dạng và quy tắc phê duyệt.',
      icon: FileEdit,
      href: '/composer',
      badge: 'Biểu mẫu',
      features: ['Mẫu sớ văn nghi thức', 'Kiểm tra trường dữ liệu bắt buộc', 'Xem trước và xuất DOCX/PDF'],
    },
    {
      title: 'Nghiên Cứu & Đạo Sử',
      description: 'Không gian khảo cứu tiểu sử tiền bối, từ điển điển cố, thuật ngữ đạo và các tài liệu khảo cứu có dẫn chứng nguồn gốc.',
      icon: Search,
      href: '/research',
      badge: 'Khảo cứu',
      features: ['Tiểu sử chức sắc tiền bối', 'Từ điển thuật ngữ & điển cố', 'Trích dẫn nguồn học thuật'],
    },
    {
      title: 'Quy Trình Kiểm Duyệt',
      description: 'Cơ chế biên tập, thẩm định độc lập nhiều tầng, gắn nhãn trạng thái xác minh rõ ràng trước khi công khai.',
      icon: ShieldCheck,
      href: '/admin',
      badge: 'Xác thực',
      features: ['Phân quyền theo cơ sở (Scoped RBAC)', 'Lịch sử hiệu chỉnh (Audit Log)', 'Bảo toàn văn tự gốc'],
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-heritage-parchment border border-heritage-border p-6 sm:p-10 lg:p-12">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-heritage-gold/15 border border-heritage-gold/30 text-heritage-goldDark text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Thư Viện Số Cao Đài Ban Chỉnh Đạo</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-heritage-wood leading-tight">
            Bảo tồn di sản kinh văn, đạo sử và tri thức với căn cứ nguồn gốc minh bạch
          </h1>

          <p className="text-base sm:text-lg text-heritage-woodLight leading-relaxed">
            Hệ thống chuyên biệt phục vụ việc sưu tầm, số hóa, lưu trữ và tra cứu kinh sách, lịch Đạo, hệ thống Thánh sở của Hội Thánh Cao Đài Ban Chỉnh Đạo (Tòa Thánh Bến Tre/An Hội).
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/library"
              className="inline-flex items-center space-x-2 bg-heritage-wood text-heritage-paper px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-heritage-goldDark transition-colors shadow-sm"
            >
              <span>Khám phá Thư Viện</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/calendar"
              className="inline-flex items-center space-x-2 bg-heritage-paper border border-heritage-border text-heritage-wood px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-heritage-parchment transition-colors"
            >
              <span>Xem Lịch Đạo & Ngày Chay</span>
            </Link>
          </div>
        </div>

        {/* Trang trí họa tiết chìm */}
        <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-5 pointer-events-none">
          <BookOpen className="w-96 h-96 text-heritage-wood" />
        </div>
      </section>

      {/* Widget Kiểm Tra Kết Nối Backend API */}
      <section>
        <ApiHealthWidget />
      </section>

      {/* 6 Phân Hệ Cốt Lõi */}
      <section className="space-y-6">
        <div className="border-b border-heritage-border pb-3">
          <h2 className="text-2xl font-serif font-bold text-heritage-wood">
            Các Phân Hệ Nghiệp Vụ Cốt Lõi
          </h2>
          <p className="text-sm text-heritage-woodLight mt-1">
            Thiết kế theo cấu trúc Modular Monolith, đảm bảo tính liên kết dữ liệu và tuân thủ tôn chỉ di sản
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.title}
                className="group flex flex-col justify-between bg-heritage-paper rounded-xl border border-heritage-border p-5 hover:border-heritage-gold/50 hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-heritage-parchment border border-heritage-border flex items-center justify-center text-heritage-goldDark group-hover:bg-heritage-gold group-hover:text-heritage-paper transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-heritage-goldDark bg-heritage-gold/10 px-2 py-0.5 rounded border border-heritage-gold/20">
                      {mod.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-heritage-wood group-hover:text-heritage-goldDark transition-colors">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-heritage-woodLight mt-2 leading-relaxed">
                    {mod.description}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-heritage-border/50 pt-3">
                    {mod.features.map((feat) => (
                      <li key={feat} className="text-xs text-heritage-wood flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-heritage-gold shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-heritage-border/60">
                  <Link
                    href={mod.href}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-heritage-goldDark hover:text-heritage-wood transition-colors"
                  >
                    <span>Truy cập phân hệ</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tôn Chỉ & Tiêu Chuẩn Học Thuật */}
      <section className="bg-heritage-wood text-heritage-paper rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-serif font-bold text-heritage-gold">
          Tôn Chỉ Bảo Tồn & Độ Xác Thực Dữ Liệu
        </h3>
        <p className="text-sm text-heritage-paper/80 leading-relaxed max-w-4xl">
          Mọi kinh văn, tài liệu lịch sử, tọa độ cơ sở thờ tự và mốc thời gian sự kiện trong hệ thống đều phải đi kèm thông tin xuất xứ rõ ràng (ấn bản, năm phát hành, đơn vị ban hành, checksum tệp scan). Bản scan gốc luôn là căn cứ đối chiếu tối cao để kiểm chứng tính xác thực của nội dung số hóa.
        </p>
        <div className="pt-2 flex flex-wrap gap-4 text-xs text-heritage-paper/70">
          <div className="flex items-center space-x-1.5">
            <FileText className="w-4 h-4 text-heritage-gold" />
            <span>Bản scan nguyên tác</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Clock className="w-4 h-4 text-heritage-gold" />
            <span>Lịch sử hiệu chỉnh bất biến (Audit Logs)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-heritage-gold" />
            <span>Thẩm định độc lập nhiều tầng</span>
          </div>
        </div>
      </section>
    </div>
  );
}
