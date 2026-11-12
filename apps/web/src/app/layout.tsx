import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { BookOpen, Calendar, MapPin, FileEdit, Search, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ban Chỉnh Đạo Digital Library | Thư Viện Số Cao Đài Ban Chỉnh Đạo',
  description: 'Nền tảng tra cứu, lưu trữ và bảo tồn kinh sách, lịch Đạo và cơ sở thờ tự Hội Thánh Cao Đài Ban Chỉnh Đạo.',
  keywords: ['Cao Đài', 'Ban Chỉnh Đạo', 'Tòa Thánh Bến Tre', 'Thư viện số', 'Kinh Cúng Tứ Thời', 'Lịch Đạo'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col bg-heritage-paper text-heritage-wood selection:bg-heritage-gold/20 selection:text-heritage-wood">
        {/* Thanh Thông Báo Tôn Chỉ Trung Lập */}
        <div className="bg-heritage-parchment border-b border-heritage-border text-xs text-heritage-woodLight text-center py-1.5 px-4">
          Dự án nghiên cứu, số hóa và bảo tồn di sản văn hóa độc lập • Bản scan gốc là bằng chứng đối chiếu tối cao
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
                  Ban Chỉnh Đạo
                </span>
                <span className="block text-xs uppercase tracking-wider text-heritage-goldDark font-medium">
                  Digital Library
                </span>
              </div>
            </Link>

            {/* Menu Các Phân Hệ Chính */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
              <Link
                href="/library"
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-heritage-wood hover:bg-heritage-parchment hover:text-heritage-goldDark transition-colors"
              >
                <BookOpen className="w-4 h-4 text-heritage-goldDark" />
                <span>Thư Viện Đạo</span>
              </Link>

              <Link
                href="/calendar"
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-heritage-wood hover:bg-heritage-parchment hover:text-heritage-goldDark transition-colors"
              >
                <Calendar className="w-4 h-4 text-heritage-goldDark" />
                <span>Lịch Đạo</span>
              </Link>

              <Link
                href="/worship-sites"
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-heritage-wood hover:bg-heritage-parchment hover:text-heritage-goldDark transition-colors"
              >
                <MapPin className="w-4 h-4 text-heritage-goldDark" />
                <span>Thánh Sở</span>
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
                <span>Nghiên Cứu</span>
              </Link>
            </nav>

            {/* Nút Đăng Nhập / Quản Trị */}
            <div className="flex items-center space-x-3">
              <Link
                href="/admin"
                className="text-xs uppercase tracking-wider font-semibold text-heritage-woodLight hover:text-heritage-goldDark flex items-center space-x-1 border border-heritage-border rounded-md px-2.5 py-1.5 hover:bg-heritage-parchment transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Kiểm Duyệt</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Nội Dung Trang */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Chân Trang */}
        <footer className="bg-heritage-parchment border-t border-heritage-border py-8 text-sm text-heritage-woodLight">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-serif font-bold text-heritage-wood">
                Ban Chỉnh Đạo Digital Library
              </p>
              <p className="text-xs text-heritage-woodLight mt-1">
                Bảo tồn di sản, kinh sách và dữ liệu lịch sử Hội Thánh Cao Đài Ban Chỉnh Đạo.
              </p>
            </div>
            <div className="text-xs text-heritage-woodLight/80 text-center md:text-right">
              Phiên bản 0.1.0 • Xây dựng theo phương pháp Spec-Driven Development
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
