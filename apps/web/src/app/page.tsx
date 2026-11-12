import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  MapPin,
  FileEdit,
  Search,
  ArrowRight,
  BookMarked,
  Sparkles,
  Compass,
} from 'lucide-react';
import { ThienNhan } from '@/components/ThienNhan';

export default function HomePage() {
  const categories = [
    {
      title: 'Kinh Sách & Giáo Lý',
      description: 'Tra cứu Kinh Cúng Tứ Thời, Quan Hôn Tang Tế, Thánh Ngôn Hiệp Tuyển và các tài liệu giáo lý với bản scan tài liệu gốc để đối chiếu.',
      icon: BookOpen,
      href: '/library',
      tag: 'Kinh Văn',
      highlights: ['Kinh Cúng Tứ Thời', 'Thánh Ngôn & Thánh Giáo', 'Bản scan đối chiếu'],
    },
    {
      title: 'Lịch Đạo & Ngày Ăn Chay',
      description: 'Lịch âm dương, ngày sóc vọng, các ngày lễ vía lớn trong năm cùng tùy chọn xem lịch ăn chay (lục trai, thập trai, thiên ngươn) và Can Chi.',
      icon: Calendar,
      href: '/calendar',
      tag: 'Âm Dương',
      highlights: ['Các ngày sóc vọng & đại lễ', 'Lịch ăn chay theo sở nguyện', 'Tra cứu Can Chi ngày tháng'],
    },
    {
      title: 'Thánh Sở & Họ Đạo',
      description: 'Danh mục và bản đồ chỉ đường đến Tòa Thánh Bến Tre, các Thánh Thất, Điện Thờ Phật Mẫu và cơ sở tu học tại các địa phương.',
      icon: MapPin,
      href: '/worship-sites',
      tag: 'Địa Chỉ',
      highlights: ['Tòa Thánh Bến Tre (An Hội)', 'Danh bạ Thánh Thất các tỉnh', 'Địa chỉ và chỉ đường'],
    },
    {
      title: 'Soạn Sớ Văn & Biểu Mẫu',
      description: 'Hỗ trợ đồng đạo soạn thảo sớ văn dâng lễ, sớ cầu an, cầu siêu và các biểu mẫu nghi lễ gia đạo theo đúng khuôn phép truyền thống.',
      icon: FileEdit,
      href: '/composer',
      tag: 'Nghi Lễ',
      highlights: ['Mẫu sớ văn cúng tế', 'Xem trước khi in ấn', 'Xuất bản in rõ nét'],
    },
    {
      title: 'Đạo Sử & Gương Tiền Bối',
      description: 'Tư liệu về nguồn gốc thành lập Hội Thánh Cao Đài Ban Chỉnh Đạo, công hạnh của chư vị tiền bối khai sáng và các bài khảo cứu lịch sử.',
      icon: Search,
      href: '/research',
      tag: 'Lịch Sử',
      highlights: ['Lịch sử Hội Thánh', 'Tiểu sử các bậc tiền bối', 'Từ điển thuật ngữ Đạo'],
    },
  ];

  return (
    <div className="space-y-12">
      {/* Khối Banner Giới Thiệu Đầu Trang với Điểm Nhấn Thiên Nhãn & Tam Giáo */}
      <section className="relative overflow-hidden rounded-2xl bg-heritage-parchment border border-heritage-border p-6 sm:p-10 lg:p-12 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Cột Nội Dung Bên Trái */}
          <div className="lg:col-span-8 space-y-5">
            {/* Huy hiệu 3 màu Tam Giáo */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-heritage-paper border border-heritage-border text-xs font-semibold tracking-wide">
              <span className="flex space-x-1 items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" title="Màu Vàng: Phái Phật (Thái Thanh)" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" title="Màu Xanh: Phái Tiên (Thượng Thanh)" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" title="Màu Đỏ: Phái Thánh (Ngọc Thanh)" />
              </span>
              <span className="text-heritage-goldDark">Cao Đài Ban Chỉnh Đạo • Tòa Thánh Bến Tre</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-heritage-wood leading-tight">
              Gìn giữ và lưu truyền di sản kinh văn, đạo sử Cao Đài
            </h1>

            <p className="text-base sm:text-lg text-heritage-woodLight leading-relaxed">
              Không gian lưu trữ, số hóa và phục vụ đồng đạo cùng quý độc giả tra cứu kinh sách, lịch Đạo, hệ thống Thánh sở và tư liệu lịch sử với nguồn gốc rõ ràng, tôn trọng nguyên tác.
            </p>

            {/* Thanh Tìm Kiếm Nhanh */}
            <div className="pt-2 max-w-xl">
              <div className="relative flex items-center shadow-xs">
                <Search className="w-5 h-5 text-heritage-woodLight absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Tìm tên bài kinh, thánh ngôn, ngày lễ, địa danh..."
                  className="w-full bg-heritage-paper border border-heritage-border rounded-lg pl-11 pr-24 py-3 text-sm text-heritage-wood placeholder:text-heritage-woodLight/60 focus:outline-none focus:ring-2 focus:ring-heritage-gold/50 focus:border-heritage-gold transition-all"
                />
                <button
                  type="button"
                  className="absolute right-1.5 bg-heritage-wood text-heritage-paper text-xs font-medium px-4 py-2 rounded-md hover:bg-heritage-goldDark transition-colors"
                >
                  Tra cứu
                </button>
              </div>
              <p className="text-xs text-heritage-woodLight/80 mt-1.5 pl-1">
                Gợi ý: <span className="underline cursor-pointer hover:text-heritage-goldDark">Kinh Cúng Tứ Thời</span>, <span className="underline cursor-pointer hover:text-heritage-goldDark">Lịch sóc vọng</span>, <span className="underline cursor-pointer hover:text-heritage-goldDark">Tòa Thánh Bến Tre</span>
              </p>
            </div>
          </div>

          {/* Cột Biểu Tượng Thiên Nhãn Trang Trọng Bên Phải */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="relative p-6 rounded-2xl bg-heritage-paper/90 border border-heritage-border shadow-md flex flex-col items-center text-center">
              {/* Vòng tròn hào quang bao quanh Thiên Nhãn */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-heritage-gold/30 bg-heritage-gold/5 animate-pulse" />
                <ThienNhan className="w-32 h-32 relative z-10" size={128} withAura={true} />
              </div>
              <div className="mt-3">
                <span className="block font-serif font-bold text-sm text-heritage-wood">
                  Thiên Nhãn Thầy Ngự
                </span>
                <span className="block text-[11px] text-heritage-woodLight italic mt-0.5">
                  &ldquo;Thầy là các con, các con là Thầy&rdquo;
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Biểu trưng Thiên Nhãn mờ chìm nghệ thuật làm watermark nền */}
        <div className="absolute right-[-40px] bottom-[-40px] opacity-[0.04] pointer-events-none">
          <ThienNhan className="w-[450px] h-[450px]" size={450} withAura={true} />
        </div>
      </section>

      {/* Các Chuyên Mục Chính */}
      <section className="space-y-6">
        <div className="border-b border-heritage-border pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-serif font-bold text-heritage-wood">
              Chuyên Mục Tra Cứu
            </h2>
            <p className="text-sm text-heritage-woodLight mt-1">
              Mời quý độc giả và đồng đạo lựa chọn chuyên mục cần tìm hiểu
            </p>
          </div>
          <Compass className="w-6 h-6 text-heritage-goldDark hidden sm:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="group flex flex-col justify-between bg-heritage-paper rounded-xl border border-heritage-border p-5 hover:border-heritage-gold/50 hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-heritage-parchment border border-heritage-border flex items-center justify-center text-heritage-goldDark group-hover:bg-heritage-gold group-hover:text-heritage-paper transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-heritage-goldDark bg-heritage-gold/10 px-2.5 py-0.5 rounded border border-heritage-gold/20">
                      {cat.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-heritage-wood group-hover:text-heritage-goldDark transition-colors">
                    {cat.title}
                  </h3>

                  <p className="text-xs text-heritage-woodLight mt-2 leading-relaxed">
                    {cat.description}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-heritage-border/50 pt-3">
                    {cat.highlights.map((item) => (
                      <li key={item} className="text-xs text-heritage-wood flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-heritage-gold shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-heritage-border/60">
                  <Link
                    href={cat.href}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-heritage-goldDark hover:text-heritage-wood transition-colors"
                  >
                    <span>Xem nội dung</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cam Kết Tôn Trọng Nguyên Tác & Ý Nghĩa Tam Giáo */}
      <section className="bg-heritage-wood text-heritage-paper rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-5 h-5 text-heritage-gold" />
          <h3 className="text-xl font-serif font-bold text-heritage-gold">
            Tôn Chỉ Bảo Tồn Tư Liệu & Đạo Pháp
          </h3>
        </div>

        <p className="text-sm text-heritage-paper/85 leading-relaxed max-w-4xl">
          Mỗi bài kinh văn, tài liệu lịch sử hay thông tin địa danh lưu trữ trên thư viện đều được đối chiếu cẩn trọng với các ấn bản in xưa và tài liệu lưu trữ chính thức của Hội Thánh Cao Đài Ban Chỉnh Đạo. Bản scan tư liệu gốc luôn được đính kèm song song để độc giả có thể tự mình tra cứu, kiểm chứng và bảo đảm tính trung thực của văn bản tiền nhân để lại.
        </p>

        <div className="pt-2 flex flex-wrap gap-6 text-xs text-heritage-paper/80 border-t border-heritage-paper/15">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#EAB308]" />
            <span><strong>Phái Thái (Vàng):</strong> Phật giáo - Từ Bi</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#0284C7]" />
            <span><strong>Phái Thượng (Xanh):</strong> Tiên giáo - Thanh Tịnh</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#DC2626]" />
            <span><strong>Phái Ngọc (Đỏ):</strong> Nho giáo - Công Bình</span>
          </div>
          <div className="flex items-center space-x-1.5 ml-auto text-heritage-paper/60">
            <BookMarked className="w-4 h-4 text-heritage-gold" />
            <span>Vạn Thù Quy Nhất Bản</span>
          </div>
        </div>
      </section>
    </div>
  );
}
