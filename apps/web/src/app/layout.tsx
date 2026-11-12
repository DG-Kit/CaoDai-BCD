import type { Metadata } from 'next';
import { Lora, Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { BookOpen, Calendar, MapPin, FileEdit, Search, Info } from 'lucide-react';
import { CaoDaiEmblem, TamGiaoStripe } from '@/components/ThienNhan';

const lora = Lora({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-serif',
  display: 'swap',
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['400', '500', '600', '700'],
  subsets: ['vietnamese', 'latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Thư Viện Số Cao Đài | CaoDai Digital Library',
  description: 'Nền tảng tra cứu, lưu trữ và bảo tồn kinh sách, lịch Đạo và cơ sở thờ tự Đạo Cao Đài (Đại Đạo Tam Kỳ Phổ Độ).',
  keywords: ['Cao Đài', 'Đại Đạo Tam Kỳ Phổ Độ', 'Thư viện số Cao Đài', 'Thiên Nhãn', 'Kinh Cúng Tứ Thời', 'Lịch Đạo'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${lora.variable} ${beVietnamPro.variable}`}>
      <body className="min-h-screen flex flex-col bg-heritage-paper text-heritage-wood font-sans selection:bg-heritage-gold/20 selection:text-heritage-wood">
        {/* Dải 3 màu sắc chủ đạo Tam Giáo Cao Đài (Vàng - Xanh - Đỏ) */}
        <TamGiaoStripe className="h-1.5 w-full" />

        {/* Thông báo tôn chỉ nghiên cứu & bảo tồn */}
        <div className="bg-heritage-parchment border-b border-heritage-border text-xs text-heritage-woodLight text-center py-2 px-4">
          Dự án sưu tầm, số hóa và lưu trữ tư liệu phục vụ nghiên cứu & học tập • Căn cứ theo các bản in và tư liệu lịch sử
        </div>

        {/* Thanh Điều Hướng Chính */}
        <header className="sticky top-0 z-40 bg-heritage-paper/95 backdrop-blur-sm border-b border-heritage-border shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
            {/* Logo nhận diện: Biểu tượng Thiên Nhãn Cao Đài */}
            <Link href="/" className="flex items-center space-x-3 group py-2">
              <CaoDaiEmblem className="w-11 h-11 shrink-0 group-hover:scale-105 transition-transform" />
              <div>
                <span className="block text-lg font-serif font-bold text-heritage-wood leading-tight group-hover:text-heritage-goldDark transition-colors">
                  Thư Viện Số
                </span>
                <span className="block text-xs uppercase tracking-wider text-heritage-goldDark font-semibold">
                  Đạo Cao Đài
                </span>
              </div>
            </Link>

            {/* Menu Các Phân Hệ Dành Cho Độc Giả */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
              <Link
                href="/library"
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-heritage-wood hover:bg-heritage-parchment hover:text-heritage-goldDark transition-colors"
              >
                <BookOpen className="w-4 h-4 text-heritage-goldDark" />
                <span>Kinh Sách</span>
              </Link>

              <Link
                href="/calendar"
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-heritage-wood hover:bg-heritage-parchment hover:text-heritage-goldDark transition-colors"
              >
                <Calendar className="w-4 h-4 text-heritage-goldDark" />
                <span>Lịch Đạo & Ngày Chay</span>
              </Link>

              <Link
                href="/worship-sites"
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-heritage-wood hover:bg-heritage-parchment hover:text-heritage-goldDark transition-colors"
              >
                <MapPin className="w-4 h-4 text-heritage-goldDark" />
                <span>Thánh Sở & Họ Đạo</span>
              </Link>

              <Link
                href="/composer"
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-heritage-wood hover:bg-heritage-parchment hover:text-heritage-goldDark transition-colors"
              >
                <FileEdit className="w-4 h-4 text-heritage-goldDark" />
                <span>Soạn Sớ Văn</span>
              </Link>

              <Link
                href="/research"
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-heritage-wood hover:bg-heritage-parchment hover:text-heritage-goldDark transition-colors"
              >
                <Search className="w-4 h-4 text-heritage-goldDark" />
                <span>Đạo Sử & Khảo Cứu</span>
              </Link>
            </nav>

            {/* Mục Giới thiệu / Hướng dẫn */}
            <div className="flex items-center space-x-3">
              <Link
                href="/about"
                className="text-xs uppercase tracking-wider font-semibold text-heritage-woodLight hover:text-heritage-goldDark flex items-center space-x-1 border border-heritage-border rounded-md px-2.5 py-1.5 hover:bg-heritage-parchment transition-colors"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Giới Thiệu</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Nội Dung Trang */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Footer Trang Nhã */}
        <footer className="bg-heritage-parchment border-t border-heritage-border mt-auto">
          {/* Dải 3 màu viền đáy cờ Đạo */}
          <TamGiaoStripe className="h-1 w-full" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center space-x-3">
                  <CaoDaiEmblem className="w-8 h-8" />
                  <span className="font-serif font-bold text-heritage-wood text-base">
                    Thư Viện Số Cao Đài
                  </span>
                </div>
                <p className="text-xs text-heritage-woodLight leading-relaxed max-w-md">
                  Nền tảng số hóa, bảo tồn và phổ biến kinh sách, thánh giáo, đạo sử và danh bạ cơ sở thờ tự Đạo Cao Đài (Đại Đạo Tam Kỳ Phổ Độ).
                </p>
                <div className="flex items-center space-x-2 text-[11px] text-heritage-woodLight">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#EAB308]" title="Phái Thái - Vàng" />
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#0284C7]" title="Phái Thượng - Xanh" />
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#DC2626]" title="Phái Ngọc - Đỏ" />
                  <span className="pl-1">Tam Giáo Đồng Quy • Vạn Thù Quy Nhất Bản</span>
                </div>
              </div>

              <div>
                <h4 className="font-serif font-semibold text-sm text-heritage-wood mb-3">
                  Tra Cứu
                </h4>
                <ul className="space-y-2 text-xs text-heritage-woodLight">
                  <li>
                    <Link href="/library" className="hover:text-heritage-goldDark">
                      Kinh Cúng Tứ Thời
                    </Link>
                  </li>
                  <li>
                    <Link href="/library" className="hover:text-heritage-goldDark">
                      Thánh Ngôn & Thánh Giáo
                    </Link>
                  </li>
                  <li>
                    <Link href="/calendar" className="hover:text-heritage-goldDark">
                      Lịch Âm Dương & Ăn Chay
                    </Link>
                  </li>
                  <li>
                    <Link href="/worship-sites" className="hover:text-heritage-goldDark">
                      Danh Bạ Thánh Thất
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-serif font-semibold text-sm text-heritage-wood mb-3">
                  Thông Tin
                </h4>
                <ul className="space-y-2 text-xs text-heritage-woodLight">
                  <li>
                    <Link href="/about" className="hover:text-heritage-goldDark">
                      Tôn Chỉ & Mục Tiêu
                    </Link>
                  </li>
                  <li>
                    <Link href="/composer" className="hover:text-heritage-goldDark">
                      Hướng Dẫn Soạn Sớ Văn
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-heritage-goldDark">
                      Quy Định Sử Dụng Tài Liệu
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-heritage-border/60 mt-8 pt-4 text-center text-xs text-heritage-woodLight">
              © {new Date().getFullYear()} Thư Viện Số Cao Đài • Đại Đạo Tam Kỳ Phổ Độ
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
