import React from 'react';
import Image from 'next/image';

interface ThienNhanProps {
  className?: string;
  size?: number;
  rounded?: boolean;
}

/**
 * Biểu tượng Thiên Nhãn (Hình vẽ tả thực do người dùng cung cấp)
 * Chân dung Thiên Nhãn linh thiêng với chân mày, mí mắt và đồng tử thanh tịnh
 */
export function ThienNhan({
  className = 'w-12 h-12',
  size = 48,
  rounded = false,
}: ThienNhanProps) {
  return (
    <div
      className={`relative inline-block overflow-hidden ${rounded ? 'rounded-full' : 'rounded-lg'} ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/thien-nhan.jpg"
        alt="Thiên Nhãn Cao Đài"
        fill
        sizes={`${size}px`}
        className="object-cover object-center"
        priority
      />
    </div>
  );
}

/**
 * Bức họa Thiên Nhãn đầy đủ (Bao gồm chân mày và chất giấy mỹ thuật)
 * Dùng cho các vị trí trang trọng như Hero section, trang giới thiệu
 */
export function ThienNhanPortrait({
  className = 'w-48 h-48 sm:w-56 sm:h-56',
}: {
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden border border-heritage-border bg-heritage-paper ${className}`}>
      <Image
        src="/images/thien-nhan.jpg"
        alt="Thiên Nhãn Thầy Ngự - Cao Đài Ban Chỉnh Đạo"
        fill
        sizes="(max-width: 768px) 192px, 224px"
        className="object-cover object-center hover:scale-105 transition-transform duration-500"
        priority
      />
    </div>
  );
}

/**
 * Huy hiệu Tam Giáo Cao Đài (Vàng - Xanh - Đỏ) kết hợp bức họa Thiên Nhãn
 * Biểu tượng toàn vẹn nhận diện trên Header và Footer
 */
export function CaoDaiEmblem({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-full p-0.5 bg-heritage-paper shadow-sm shrink-0 ${className}`}
    >
      {/* Vòng tròn viền 3 màu Tam Giáo (Vàng: Thái Thanh / Xanh: Thượng Thanh / Đỏ: Ngọc Thanh) */}
      <div className="absolute inset-0 rounded-full border-2 border-transparent [background:conic-gradient(#EAB308_0deg_120deg,#0284C7_120deg_240deg,#DC2626_240deg_360deg)_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] [mask-composite:exclude]" />
      
      {/* Ảnh Thiên Nhãn cắt tròn cân đối ở tâm */}
      <div className="relative w-full h-full rounded-full overflow-hidden">
        <Image
          src="/images/thien-nhan.jpg"
          alt="Thiên Nhãn"
          fill
          sizes="48px"
          className="object-cover object-[50%_52%] scale-110"
        />
      </div>
    </div>
  );
}

/**
 * Dải ruy-băng Tam Giáo (Cờ Đạo: Vàng - Xanh - Đỏ)
 */
export function TamGiaoStripe({ className = 'h-1.5 w-full' }: { className?: string }) {
  return (
    <div className={`flex ${className}`} aria-hidden="true">
      <div className="flex-1 bg-[#EAB308]" title="Màu Vàng: Phái Phật (Thái Thanh)" />
      <div className="flex-1 bg-[#0284C7]" title="Màu Xanh: Phái Tiên (Thượng Thanh)" />
      <div className="flex-1 bg-[#DC2626]" title="Màu Đỏ: Phái Thánh (Ngọc Thanh)" />
    </div>
  );
}
