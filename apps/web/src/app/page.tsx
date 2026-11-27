/*
 * From Uiverse.io by ElSombrero2 - https://uiverse.io/ElSombrero2/fresh-wombat-97
 * MIT License, Copyright (c) ElSombrero2 (Rakotondrasoa Nirilala)
 *
 * From Uiverse.io by adamgiebl - https://uiverse.io/adamgiebl/new-bird-34
 * MIT License, Copyright (c) adamgiebl (Adam Giebl)
 */
import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  MapPin,
  FileEdit,
  Search,
  BookMarked,
  Sparkles,
  Music,
} from 'lucide-react';
import { ThienNhanPortrait } from '@/components/ThienNhan';

export default function HomePage() {
  const categories = [
    {
      title: 'Kinh Sách',
      description: 'Tra cứu riêng biệt Kinh Cúng Tứ Thời, Quan Hôn Tang Tế, Thánh Ngôn Hiệp Tuyển và các tài liệu giáo lý với bản scan gốc đối chiếu.',
      icon: BookOpen,
      href: '/library',
      tag: 'Kinh Văn',
      highlights: ['Kinh Cúng Tứ Thời', 'Thánh Ngôn & Thánh Giáo', 'Bản scan đối chiếu'],
    },
    {
      title: 'Tài Liệu Lễ Nhạc Đường',
      description: 'Kho tài liệu chuyên biệt về Lễ Nhạc Đường: các bài Thài Xuân, Thài Nam, cổ nhạc, nghi thức thiết đàn và hướng dẫn hành lễ.',
      icon: Music,
      href: '/le-nhac-duong',
      tag: 'Lễ Nhạc',
      highlights: ['Thài Xuân & Thài Nam', 'Nghi thức hành lễ', 'Tài liệu Lễ Nhạc Đường'],
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
      title: 'Tòa Thánh Bến Tre',
      description: 'Giới thiệu Tòa Thánh Bến Tre, Diêu Trì Bửu Điện, Vườn Kỳ Thọ cùng hệ thống Nhà Tu Nam Nữ về lịch sử, kiến trúc và đường đi đến.',
      icon: MapPin,
      href: '/to-dinh',
      tag: 'Di Tích & Đường Đi',
      highlights: ['Tòa Thánh & Diêu Trì Bửu Điện', 'Vườn Kỳ Thọ & 4 Nhà Tu Nam Nữ', 'Lịch sử, Xây dựng & Đường đi đến'],
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
      description: 'Tư liệu về nguồn gốc thành lập Đại Đạo Tam Kỳ Phổ Độ, công hạnh của chư vị tiền bối khai sáng và các bài khảo cứu lịch sử.',
      icon: Search,
      href: '/research',
      tag: 'Lịch Sử',
      highlights: ['Lịch sử Đại Đạo', 'Tiểu sử các bậc tiền bối', 'Từ điển thuật ngữ Đạo'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Khối Banner Đầu Trang: Kiến Trúc Phẳng Nguyên Khối, Không Bo Tròn, Không Card Chồng Card */}
      <section className="border border-heritage-border bg-heritage-paper p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Cột Nội Dung Bên Trái */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 border border-heritage-border bg-heritage-parchment text-xs font-semibold tracking-wider uppercase text-caodai-ochre">
              <span>Đại Đạo Tam Kỳ Phổ Độ • Thư Viện Tư Liệu Truyền Thống</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-heritage-wood leading-tight">
              Gìn giữ và lưu truyền di sản kinh văn, đạo sử Cao Đài
            </h1>

            <p className="text-base sm:text-lg text-heritage-woodLight leading-relaxed font-normal">
              Không gian lưu trữ, số hóa và phục vụ đồng đạo cùng quý độc giả tra cứu kinh sách, lịch Đạo, hệ thống Thánh sở và tư liệu lịch sử với nguồn gốc rõ ràng, tôn trọng nguyên tác.
            </p>

            {/* Thanh Tìm Kiếm Nhanh: Tích hợp Uiverse Input & Button */}
            <div className="pt-2 max-w-2xl">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="uiverse-search-group flex-1">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="uiverse-search-icon">
                    <g>
                      <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                    </g>
                  </svg>
                  <input
                    className="uiverse-search-input"
                    type="search"
                    placeholder="Tìm tên bài kinh, thánh ngôn, ngày lễ, địa danh..."
                  />
                </div>
                <button type="button" className="uiverse-shine-button shrink-0">
                  Tra cứu
                </button>
              </div>
            </div>
          </div>

          {/* Cột Bức Họa Thiên Nhãn: Hiển thị trực tiếp, trang trọng, không bọc thêm card phụ */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-center justify-center">
            <ThienNhanPortrait className="w-48 h-48 sm:w-56 sm:h-56" />
            <div className="mt-4 text-center space-y-1">
              <span className="block font-serif font-bold text-base text-heritage-wood">
                Thiên Nhãn Thầy Ngự
              </span>
              <span className="block text-xs text-heritage-woodLight italic">
                &ldquo;Thầy là các con, các con là Thầy&rdquo;
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Các Chuyên Mục Chính: Bảng Lưới Kẻ Chỉ Thư Viện Nguyên Khối (Không Card Lồng Card) */}
      <section className="space-y-6">
        <div className="border-b border-heritage-border pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-serif font-bold text-heritage-wood tracking-tight">
              Chuyên Mục Tra Cứu
            </h2>
            <p className="text-sm text-heritage-woodLight mt-1 font-sans">
              Mời quý độc giả và đồng đạo lựa chọn chuyên mục cần tìm hiểu
            </p>
          </div>
        </div>

        {/* Lưới các ô chuyên mục có hiệu ứng viền chuyển động & nút thao tác */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="uiverse-category-card group"
              >
                <div className="uiverse-category-card__content p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    {/* Hàng đầu: Icon trực tiếp & Nhãn thể loại (Không lồng hộp bao quanh) */}
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="w-6 h-6 text-caodai-ochre group-hover:scale-105 transition-transform" />
                      <span className="text-xs font-bold uppercase tracking-wider text-caodai-ochre">
                        {cat.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-heritage-wood group-hover:text-caodai-vermilion transition-colors">
                      {cat.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-heritage-woodLight mt-2.5 leading-relaxed font-normal">
                      {cat.description}
                    </p>

                    <ul className="mt-4 space-y-1.5 border-t border-heritage-border/70 pt-3">
                      {cat.highlights.map((item) => (
                        <li key={item} className="text-xs text-heritage-woodLight flex items-center space-x-2 font-medium">
                          <span className="w-1.5 h-1.5 bg-caodai-ochre shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-3 border-t border-heritage-border/70">
                    <Link
                      href={cat.href}
                      className="uiverse-action-btn"
                    >
                      <span>Xem nội dung</span>
                      <div className="uiverse-action-btn__icon" aria-hidden="true">
                        <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path
                            d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cam Kết Tôn Trọng Nguyên Tác: Góc vuông phẳng trang nhã */}
      <section className="bg-heritage-wood text-heritage-paper border border-heritage-border p-6 sm:p-8 space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-caodai-ochre" />
          <h3 className="text-xl font-serif font-bold tracking-tight">
            Tôn Chỉ Bảo Tồn Tư Liệu & Đạo Pháp
          </h3>
        </div>

        <p className="text-sm text-heritage-paper/90 leading-relaxed max-w-4xl font-normal">
          Mỗi bài kinh văn, tài liệu lịch sử hay thông tin địa danh lưu trữ trên thư viện đều được đối chiếu cẩn trọng với các ấn bản in xưa và tài liệu lưu trữ chính thức. Bản scan tư liệu gốc luôn được đính kèm song song để độc giả có thể tự mình tra cứu, kiểm chứng và bảo đảm tính trung thực của văn bản tiền nhân để lại.
        </p>

        <div className="pt-2 flex flex-wrap gap-6 text-xs text-heritage-paper/80 border-t border-heritage-paper/20 font-medium">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-caodai-ochre" />
            <span><strong>Phái Thái:</strong> Phật giáo - Từ Bi</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-caodai-indigo" />
            <span><strong>Phái Thượng:</strong> Tiên giáo - Thanh Tịnh</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-caodai-vermilion" />
            <span><strong>Phái Ngọc:</strong> Nho giáo - Công Bình</span>
          </div>
          <div className="flex items-center space-x-1.5 ml-auto text-heritage-paper/70">
            <BookMarked className="w-4 h-4" />
            <span>Vạn Thù Quy Nhất Bản</span>
          </div>
        </div>
      </section>
    </div>
  );
}
