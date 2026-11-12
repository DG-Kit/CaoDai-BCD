import React from 'react';

interface ThienNhanProps {
  className?: string;
  size?: number;
  withAura?: boolean;
}

/**
 * Biểu tượng Thiên Nhãn (Thánh Nhãn phát hào quang)
 * Điểm nhấn thiêng liêng và đặc trưng nhận diện tối cao của Đạo Cao Đài
 */
export function ThienNhan({ className = 'w-10 h-10', size = 48, withAura = true }: ThienNhanProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Thiên Nhãn Cao Đài"
      role="img"
    >
      <defs>
        {/* Hào quang vàng kim */}
        <radialGradient id="auraGold" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
        </radialGradient>

        {/* Gradient cho đồng tử mắt */}
        <radialGradient id="pupilGrad" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="70%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>

        {/* Gradient cho tròng mắt */}
        <linearGradient id="irisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="50%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>

      {/* Vầng hào quang tỏa sáng (Tia sáng quanh Thiên Nhãn) */}
      {withAura && (
        <g stroke="#D97706" strokeWidth="1.2" opacity="0.75" strokeLinecap="round">
          {/* Các tia hào quang chính tỏa 16 hướng */}
          <line x1="50" y1="6" x2="50" y2="15" />
          <line x1="50" y1="94" x2="50" y2="85" />
          <line x1="6" y1="50" x2="15" y2="50" />
          <line x1="94" y1="50" x2="85" y2="50" />

          <line x1="19" y1="19" x2="26" y2="26" />
          <line x1="81" y1="81" x2="74" y2="74" />
          <line x1="19" y1="81" x2="26" y2="74" />
          <line x1="81" y1="19" x2="74" y2="26" />

          {/* Tia phụ xen kẽ */}
          <line x1="33" y1="11" x2="36" y2="18" />
          <line x1="67" y1="11" x2="64" y2="18" />
          <line x1="33" y1="89" x2="36" y2="82" />
          <line x1="67" y1="89" x2="64" y2="82" />
          <line x1="11" y1="33" x2="18" y2="36" />
          <line x1="11" y1="67" x2="18" y2="64" />
          <line x1="89" y1="33" x2="82" y2="36" />
          <line x1="89" y1="67" x2="82" y2="64" />
        </g>
      )}

      {/* Vùng mây / ánh hào quang nền */}
      <circle cx="50" cy="50" r="32" fill="url(#auraGold)" />

      {/* Khuôn mắt Thiên Nhãn (Mắt trái trang nghiêm) */}
      {/* Lòng trắng */}
      <path
        d="M20 50 C30 31, 70 31, 80 50 C70 69, 30 69, 20 50 Z"
        fill="#FFFFFF"
        stroke="#78350F"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />

      {/* Tròng đen / Con ngươi mắt */}
      <circle cx="50" cy="50" r="14" fill="url(#irisGrad)" stroke="#78350F" strokeWidth="1" />
      
      {/* Đồng tử đen trung tâm */}
      <circle cx="50" cy="50" r="7.5" fill="url(#pupilGrad)" />

      {/* Ánh sáng phản chiếu linh thiêng (Điểm sáng trong mắt Thầy) */}
      <circle cx="47" cy="46" r="2.8" fill="#FFFFFF" opacity="0.95" />
      <circle cx="53" cy="53" r="1.4" fill="#FFFFFF" opacity="0.75" />

      {/* Mí mắt trên và nét vẽ thanh thoát */}
      <path
        d="M24 48 C34 33, 66 33, 76 48"
        fill="none"
        stroke="#9A3412"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M28 36 C38 27, 62 27, 72 36"
        fill="none"
        stroke="#B45309"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Huy hiệu Tam Giáo Cao Đài (Vàng - Xanh - Đỏ) kết hợp Thiên Nhãn
 * Biểu tượng toàn vẹn của Đạo Cao Đài
 */
export function CaoDaiEmblem({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center rounded-full p-1 bg-heritage-paper shadow-sm border border-heritage-border ${className}`}>
      {/* Vòng tròn viền 3 màu Tam Giáo (Vàng: Thái Thanh / Xanh: Thượng Thanh / Đỏ: Ngọc Thanh) */}
      <div className="absolute inset-0 rounded-full border-2 border-transparent [background:conic-gradient(#EAB308_0deg_120deg,#0284C7_120deg_240deg,#DC2626_240deg_360deg)_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] [mask-composite:exclude]" />
      <ThienNhan className="w-full h-full relative z-10 p-0.5" />
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
