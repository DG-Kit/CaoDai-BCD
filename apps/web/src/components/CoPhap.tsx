import React from 'react';

interface CoPhapProps {
  className?: string;
  size?: number;
}

/**
 * Biểu tượng Cổ Pháp Tam Giáo của Đạo Cao Đài:
 * 1. Bình Bát Vu: Tượng trưng Phật Đạo (Thích Giáo - Phái Thái - Màu Vàng)
 * 2. Cây Phất Chủ: Tượng trưng Tiên Đạo (Lão Giáo - Phái Thượng - Màu Xanh)
 * 3. Cây Cổ Bút & Cuốn Xuân Thu: Tượng trưng Thánh Đạo (Nho Giáo - Phái Ngọc - Màu Đỏ)
 */
export function CoPhap({ className = 'w-10 h-10', size = 48 }: CoPhapProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Cổ Pháp Tam Giáo Cao Đài"
      role="img"
    >
      <defs>
        {/* Hào quang nền */}
        <radialGradient id="cpAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#FDE68A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>

        {/* Kim sắc cho Bình Bát Vu */}
        <linearGradient id="batVuGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="40%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#A16207" />
        </linearGradient>

        {/* Sắc gỗ/ngọc cho Cổ Bút */}
        <linearGradient id="butGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="50%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>

        {/* Cán và lông Phất Chủ */}
        <linearGradient id="phatChuCan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="60%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>
      </defs>

      {/* Ánh hào quang tỏa nhẹ ở tâm */}
      <circle cx="50" cy="50" r="42" fill="url(#cpAura)" />

      {/* 1. CỔ BÚT & CUỐN XUÂN THU (Thánh Đạo - Nho Giáo - Màu Đỏ) */}
      <g id="xuan-thu-va-co-but">
        {/* Cuốn Kinh Xuân Thu (sách lụa thẻ/quyển xếp) */}
        <rect
          x="30"
          y="56"
          width="40"
          height="20"
          rx="3"
          fill="#FFFBEB"
          stroke="#B45309"
          strokeWidth="1.5"
        />
        {/* Gáy sách và nếp trang */}
        <path d="M30 62 H70" stroke="#DC2626" strokeWidth="1" strokeOpacity="0.8" />
        <path d="M30 68 H70" stroke="#DC2626" strokeWidth="1" strokeOpacity="0.8" />
        {/* Nhãn sách chữ son */}
        <rect x="42" y="58" width="16" height="15" rx="1" fill="#DC2626" />
        <text
          x="50"
          y="69"
          fill="#FEF3C7"
          fontSize="7"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="serif"
        >
          春秋
        </text>

        {/* Cây Cổ Bút (vắt chéo nghiêng góc 45 độ) */}
        <g transform="rotate(40 46 44)">
          {/* Thân bút ngọc đỏ son */}
          <rect x="44.5" y="16" width="3.5" height="42" rx="1.5" fill="url(#butGrad)" stroke="#7F1D1D" strokeWidth="0.8" />
          {/* Đuôi bút nạm vàng */}
          <path d="M44.5 16 C44.5 13, 48 13, 48 16 Z" fill="#FBBF24" />
          {/* Khâu giữ lông bút */}
          <rect x="44" y="54" width="4.5" height="4" fill="#FBBF24" stroke="#B45309" strokeWidth="0.5" />
          {/* Ngòi lông thỏ/chồn vuốt nhọn */}
          <path d="M44.2 58 C45.5 63, 46.2 68, 46.2 70 C46.2 68, 47 63, 48.3 58 Z" fill="#1E293B" />
        </g>
      </g>

      {/* 2. CÂY PHẤT CHỦ (Tiên Đạo - Lão Giáo - Màu Xanh Lam) */}
      <g id="phat-chu" transform="rotate(-38 52 46)">
        {/* Cán phất chủ lam ngọc */}
        <rect x="48" y="14" width="3.5" height="40" rx="1.5" fill="url(#phatChuCan)" stroke="#0C4A6E" strokeWidth="0.8" />
        {/* Đầu cán nạm vòng bạc */}
        <circle cx="49.7" cy="14" r="2.5" fill="#E2E8F0" stroke="#0284C7" strokeWidth="0.8" />
        {/* Bầu giữ chùm lông */}
        <path d="M47 50 C47 55, 52.5 55, 52.5 50 Z" fill="#BAE6FD" stroke="#0284C7" strokeWidth="0.8" />
        {/* Chùm lông phất trần trắng ngà uốn lượn mềm mại */}
        <path
          d="M48 54 C44 60, 42 68, 46 76 C42 69, 45 61, 49.5 54"
          fill="#F8FAFC"
          stroke="#94A3B8"
          strokeWidth="0.8"
        />
        <path
          d="M50 54 C51 62, 54 70, 50 78 C54 71, 53 62, 51.5 54"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="1"
        />
        <path
          d="M51.5 54 C55 60, 58 66, 56 74 C58 66, 55 60, 52.5 54"
          fill="#F8FAFC"
          stroke="#94A3B8"
          strokeWidth="0.8"
        />
      </g>

      {/* 3. BÌNH BÁT VU (Phật Đạo - Thích Giáo - Màu Vàng Kim) */}
      <g id="binh-bat-vu">
        {/* Thân bát vu hình bán cầu tròn trịa, vững chãi ngự giữa */}
        <path
          d="M36 43 C36 53, 42 60, 50 60 C58 60, 64 53, 64 43 C64 41, 36 41, 36 43 Z"
          fill="url(#batVuGrad)"
          stroke="#78350F"
          strokeWidth="1.8"
        />
        {/* Miệng bình bát vu viền vàng bóng */}
        <ellipse cx="50" cy="42.5" rx="14" ry="3.5" fill="#FEF08A" stroke="#B45309" strokeWidth="1.2" />
        {/* Lòng trong miệng bát */}
        <ellipse cx="50" cy="42.5" rx="10.5" ry="2" fill="#78350F" opacity="0.6" />
        {/* Vệt sáng kim quang trên thân bát */}
        <path
          d="M39 45 C40 52, 44 57, 49 58"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.8"
        />
      </g>
    </svg>
  );
}

/**
 * Huy hiệu Cổ Pháp Tam Giáo Cao Đài (Vòng tròn viền 3 màu Vàng - Xanh - Đỏ)
 * Điểm nhấn nhận diện chính thức trên Header và Footer của trang web
 */
export function CoPhapEmblem({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-full p-1 bg-heritage-paper shadow-xs shrink-0 ${className}`}
      title="Cổ Pháp Tam Giáo Cao Đài (Bình Bát, Cây Phất Chủ, Cổ Bút & Kinh Xuân Thu)"
    >
      {/* Vòng tròn viền 3 màu Tam Giáo (Vàng: Thái Thanh / Xanh: Thượng Thanh / Đỏ: Ngọc Thanh) */}
      <div className="absolute inset-0 rounded-full border-2 border-transparent [background:conic-gradient(#EAB308_0deg_120deg,#0284C7_120deg_240deg,#DC2626_240deg_360deg)_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] [mask-composite:exclude]" />
      
      {/* Cổ Pháp Tam Giáo ở trung tâm */}
      <div className="relative w-full h-full rounded-full flex items-center justify-center bg-heritage-parchment/60 overflow-hidden">
        <CoPhap className="w-[92%] h-[92%]" />
      </div>
    </div>
  );
}
