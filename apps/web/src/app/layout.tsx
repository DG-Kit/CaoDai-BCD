import type { Metadata } from 'next';
import { Lora, Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { BookOpen, Calendar, MapPin, FileEdit, Search, Info } from 'lucide-react';

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
  title: 'Thư Viện Số Cao Đài Ban Chỉnh Đạo',
  description: 'Nền tảng tra cứu, lưu trữ và bảo tồn kinh sách, lịch Đạo và cơ sở thờ tự Hội Thánh Cao Đài Ban Chỉnh Đạo.',
  keywords: ['Cao Đài', 'Ban Chỉnh Đạo', 'Tòa Thánh Bến Tre', 'Thư viện số', 'Kinh Cúng Tứ Thời', 'Lịch Đạo'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${lora.variable} ${beVietnamPro.variable}`}>
      <body className="min-h-screen flex flex-col bg-heritage-paper text-heritage-wood font-sans selection:bg-heritage-gold/20 selection:text-heritage-wood">
        {/* Thông báo tôn chỉ nghiên cứu & bảo tồn */}
        <div className="bg-heritage-parchment border-b border-heritage-border text-xs text-heritage-woodLight text-center py-2 px-4">
          Dự án sưu tầm, số hóa và lưu trữ tư liệu phục vụ nghiên cứu & học tập • Căn cứ theo các bản in và tư liệu lịch sử
        </div>

        {/* Thanh Điều Hướng Chính */}
        <header className="sticky top-0 z-40 bg-heritage-paper/95 backdrop-blur-sm border-b border-heritage-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Logo & Tên dự án */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full bg-heritage-gold/15 border border-heritage-gold/30 flex items-center justify-center text-heritage-gold group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-lg font-serif font-bold text-heritage-wood leading-tight">
                  Thư Viện Số
                </span>
                <span className="block text-xs uppercase tracking-wider text-heritage-goldDark font-medium">
                  Cao Đài Ban Chỉnh Đạo
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-full bg-heritage-gold/20 flex items-center justify-center text-heritage-goldDark">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="font-serif font-bold text-heritage-wood">
                    Thư Viện Số Cao Đài Ban Chỉnh Đạo
                  </span>
                </div>
                <p className="text-xs text-heritage-woodLight leading-relaxed max-w-md">
                  Nền tảng bảo tồn và phổ biến kinh sách, thánh giáo, đạo sử và danh bạ cơ sở thờ tự thuộc Hội Thánh Cao Đài Ban Chỉnh Đạo (Tòa Thánh Bến Tre).
                </p>
                <p className="text-[11px] text-heritage-woodLight/80">
                  Dự án phi lợi nhuận phục vụ nghiên cứu và gìn giữ văn hóa tín ngưỡng truyền thống.
                </p>
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
              © {new Date().getFullYear()} Thư Viện Số Cao Đài Ban Chỉnh Đạo • Gìn giữ di sản tiền nhân
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
