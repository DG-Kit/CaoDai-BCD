import type { Metadata } from 'next';
import { Lora, Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { TamGiaoStripe } from '@/components/ThienNhan';
import { CoPhapEmblem } from '@/components/CoPhap';
import { Navbar } from '@/components/Navbar';
import { ThemeProvider, themeInitScript } from '@/components/ThemeProvider';
import { ThemeSegmentedControl } from '@/components/ThemeToggle';

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
        {/* Chạy script khởi tạo Theme ngay lập tức trước khi render giao diện */}
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitScript,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-heritage-paper text-heritage-wood font-sans selection:bg-heritage-gold/20 selection:text-heritage-wood transition-colors duration-150">
        <ThemeProvider>
          {/* Dải 3 màu sắc chủ đạo Tam Giáo Cao Đài (Vàng - Xanh - Đỏ) */}
          <TamGiaoStripe className="h-1.5 w-full" />

          {/* Thông báo tôn chỉ nghiên cứu & bảo tồn */}
          <div className="bg-heritage-parchment border-b border-heritage-border text-xs text-heritage-woodLight text-center py-2 px-4 transition-colors">
            Dự án sưu tầm, số hóa và lưu trữ tư liệu phục vụ nghiên cứu & học tập • Căn cứ theo các bản in và tư liệu lịch sử
          </div>

          {/* Thanh Điều Hướng Chính (Hỗ trợ Responsive Mobile Drawer & Dark Mode Toggle) */}
          <Navbar />

          {/* Nội Dung Trang */}
          <main className="flex-1 w-full flex flex-col">
            {children}
          </main>

          {/* Footer Trang Nhã */}
          <footer className="bg-heritage-parchment border-t border-heritage-border mt-auto transition-colors">
            {/* Dải 3 màu viền đáy cờ Đạo */}
            <TamGiaoStripe className="h-1 w-full" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2 space-y-3">
                  <div className="flex items-center space-x-3">
                    <CoPhapEmblem className="w-8 h-8" />
                    <span className="font-serif font-bold text-heritage-wood text-base">
                      Thư Viện Số Cao Đài
                    </span>
                  </div>
                  <p className="text-xs text-heritage-woodLight leading-relaxed max-w-md">
                    Nền tảng số hóa, bảo tồn và phổ biến kinh sách, thánh giáo, đạo sử và danh bạ cơ sở thờ tự Đạo Cao Đài (Đại Đạo Tam Kỳ Phổ Độ).
                  </p>
                  <div className="flex items-center space-x-2 text-[11px] text-heritage-woodLight">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#EAB308]" title="Bình Bát Vu - Phật" />
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#0284C7]" title="Cây Phất Chủ - Tiên" />
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#DC2626]" title="Cổ Bút & Kinh Xuân Thu - Thánh" />
                    <span className="pl-1">Tam Giáo Cổ Pháp • Vạn Thù Quy Nhất Bản</span>
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
                    Giao Diện & Tùy Chọn
                  </h4>
                  <div className="space-y-3">
                    <p className="text-xs text-heritage-woodLight">
                      Chế độ sáng/tối:
                    </p>
                    <ThemeSegmentedControl />
                  </div>
                </div>
              </div>

              <div className="border-t border-heritage-border/60 mt-8 pt-4 text-center text-xs text-heritage-woodLight">
                © {new Date().getFullYear()} Thư Viện Số Cao Đài • Đại Đạo Tam Kỳ Phổ Độ
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
