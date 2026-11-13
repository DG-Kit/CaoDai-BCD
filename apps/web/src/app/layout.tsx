import type { Metadata } from 'next';
import { Lora, Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { CoPhapEmblem } from '@/components/CoPhap';
import { TamGiaoStripe } from '@/components/ThienNhan';
import { Navbar } from '@/components/Navbar';
import { ThemeProvider, themeInitScript } from '@/components/ThemeProvider';
import { ThemeSegmentedControl } from '@/components/ThemeToggle';

const lora = Lora({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700'],
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
  keywords: ['Cao Đài', 'Đại Đạo Tam Kỳ Phổ Độ', 'Thư viện số Cao Đài', 'Cổ Pháp', 'Thiên Nhãn', 'Kinh Cúng Tứ Thời', 'Lịch Đạo'],
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${lora.variable} ${beVietnamPro.variable}`}
    >
      <head>
        {/* Script khởi tạo Theme ngay lập tức trước khi render (chống FOUC) */}
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitScript,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-heritage-paper text-heritage-wood font-sans selection:bg-caodai-ochre selection:text-white">
        <ThemeProvider>
          {/* Thông báo tôn chỉ nghiên cứu & bảo tồn - Tôn nghiêm, ấm áp */}
          <div className="bg-heritage-parchment border-b border-heritage-border text-xs text-heritage-woodLight text-center py-2 px-4 font-medium tracking-wide">
            Thư viện số bảo tồn tư liệu Đạo Cao Đài • Căn cứ theo các bản in và tư liệu lịch sử
          </div>

          {/* Thanh Điều Hướng Chính */}
          <Navbar />

          {/* Nội Dung Trang */}
          <main className="flex-1 w-full flex flex-col">
            {children}
          </main>

          {/* Footer Trang Nhã, Tối Giản */}
          <footer className="bg-heritage-parchment border-t border-heritage-border mt-auto">
            {/* Dải 3 màu sắc chủ đạo Tam Giáo Cao Đài (Vàng - Xanh - Đỏ) ở đầu Footer */}
            <TamGiaoStripe className="h-1.5 w-full" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2 space-y-3">
                  <div className="flex items-center space-x-3">
                    <CoPhapEmblem className="w-8 h-8" />
                    <span className="font-serif font-bold text-heritage-wood text-lg tracking-tight">
                      Thư Viện Số Cao Đài
                    </span>
                  </div>
                  <p className="text-xs text-heritage-woodLight leading-relaxed max-w-md">
                    Nền tảng số hóa, bảo tồn và phổ biến kinh sách, thánh giáo, đạo sử và danh bạ cơ sở thờ tự Đạo Cao Đài (Đại Đạo Tam Kỳ Phổ Độ).
                  </p>
                  <div className="text-xs text-heritage-muted font-medium">
                    Tam Giáo Cổ Pháp • Vạn Thù Quy Nhất Bản
                  </div>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-sm text-heritage-wood mb-3 uppercase tracking-wider">
                    Tra Cứu
                  </h4>
                  <ul className="space-y-2 text-xs text-heritage-woodLight font-medium">
                    <li>
                      <Link href="/library" className="hover:text-heritage-wood transition-colors">
                        Kinh Cúng Tứ Thời
                      </Link>
                    </li>
                    <li>
                      <Link href="/library" className="hover:text-heritage-wood transition-colors">
                        Thánh Ngôn & Thánh Giáo
                      </Link>
                    </li>
                    <li>
                      <Link href="/calendar" className="hover:text-heritage-wood transition-colors">
                        Lịch Âm Dương & Ăn Chay
                      </Link>
                    </li>
                    <li>
                      <Link href="/worship-sites" className="hover:text-heritage-wood transition-colors">
                        Danh Bạ Thánh Thất
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-sm text-heritage-wood mb-3 uppercase tracking-wider">
                    Chủ Đề Hiển Thị
                  </h4>
                  <div className="space-y-3">
                    <p className="text-xs text-heritage-woodLight">
                      Chế độ sáng / tối:
                    </p>
                    <ThemeSegmentedControl />
                  </div>
                </div>
              </div>

              <div className="border-t border-heritage-border mt-8 pt-4 text-center text-xs text-heritage-muted">
                © {new Date().getFullYear()} Thư Viện Số Cao Đài • Đại Đạo Tam Kỳ Phổ Độ
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
